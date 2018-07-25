import models from 'Models'
import { getRecentAnswers } from 'DB/ops'
import { tryCatch } from 'Utils'

const {
  DeckTitle,
  NewCard,
  LiveQuestion,
  Queue,
  Schedule
} = models

const NO_CARD = {}

// exported for testing
export const QUEUE_SIZE = 6

export async function getNextCardToTweet() {
  const nextCardId = await tryCatch(
    updateTweetQueue()
  )

  if (!nextCardId) {
    return NO_CARD
  }

  const nextCard = await tryCatch(
    NewCard.findOne({ cardId: nextCardId }).lean().exec()
  )

  await tryCatch(LiveQuestion.create(nextCard))
  await tryCatch(NewCard.deleteOne({ cardId: nextCardId }).exec())

  return nextCard
}

export async function replaceQueueCard(req) {
  const {
    body: {
      cardId
    }
  } = req

  const tweetQueue = await getTweetQueue()

  const index = tweetQueue.findIndex(entry => entry.cardId === cardId)
  const deck = tweetQueue[index].deck

  const newCard = await tryCatch(
    getCardFromDeck({ game: deck }, index + 1)
  )

  if (!newCard) {
    console.error('Tried to replace card from deck, but all other cards from this deck contain spoilers.')
    return
  }

  tweetQueue[index] = {
    cardId: newCard.cardId,
    deck: newCard.game
  }

  await saveQueue(tweetQueue)
}

// private functions

// exported for testing
export async function getCardFromDeck(scheduledDeck, queuePosition) {
  let randomCard = await tryCatch(
    pullCard(scheduledDeck)
  )

  const Spoilers = await SpoilChecker(queuePosition)
  let spoiled = Spoilers.check(randomCard)

  let tries = 0
  while (spoiled) {
    if (tries > 20) {
      console.error('Could not schedule new deck. Please add more decks to DB.')
      return null
    }
    if (tries++ > 10) {
      scheduledDeck = await tryCatch(
        updateScheduledDeck(scheduledDeck.game)
      )
    }

    randomCard = await tryCatch(
      pullCard(scheduledDeck)
    )

    spoiled = Spoilers.check(randomCard)
  }

  return randomCard
}

async function getQueuedCards() {
  const queuedIds = await getQueuedIds()

  const queuedCards = []

  for (let i = 0; i < queuedIds.length; i++) {
    const nextCard = await tryCatch(
      NewCard.findOne({ cardId: queuedIds[i] }).lean().exec()
    )

    queuedCards.push(nextCard)
  }

  return queuedCards
}

function getQueuedIds() {
  return getTweetQueue().then(
    queue => queue.map(card => card.cardId)
  )
}

function getTweetQueue() {
  return tryCatch(
    Queue.findOne().lean().then(obj => obj.queue)
  )
}

function pullCard(deck) {
  return NewCard.aggregate([
    { $match: deck },
    { $sample: { size: 1 } }
  ]).then(cards => cards[0])
}

function saveQueue(tweetQueue) {
  return Queue.update({},
    { $set: { queue: tweetQueue } }
  ).exec()
}

async function SpoilChecker(queuePosition) {
  const liveCards = await tryCatch(
    LiveQuestion.find().lean().exec()
  )
  const recentCards = await tryCatch(getRecentAnswers())
  const queuedCards = await tryCatch(getQueuedCards())
  const offset = queuedCards.length - queuePosition

  const spoilerText = getSpoilerText(
    [ ...queuedCards.slice(queuePosition),
      ...liveCards,
      ...recentCards.slice(0, 12 - offset)
    ]
  )

  const liveCardSlice = Math.max(0, 4 - offset)
  const willBeLive = [
    ...queuedCards.slice(queuePosition, queuePosition + 4),
    ...liveCards.slice(0, liveCardSlice)
  ]
  const liveAnswers = getLiveAnswers(willBeLive)

  return {
    check: (randomCard) =>
      empty(randomCard) ||
      queuedCards.find(card => card.cardId === randomCard.cardId) ||
      isSpoiled(randomCard, spoilerText, liveAnswers)
  }
}

// exported for testing
export async function updateScheduledDeck(scheduledDeck) {
  await tryCatch(
    DeckTitle.updateOne(
      { fullTitle: scheduledDeck },
      { $set: { finished: true } }
    ).exec()
  )

  let allDecks = await tryCatch(
    DeckTitle.find({
      totalCards: { $gt: 0 },
      finished:   { $ne: true }
    }).lean().exec()
  )
  allDecks = allDecks.map(doc => doc.fullTitle)

  let alreadyScheduled = await tryCatch(
    // CHANGE TO Schedule.findOne() after refactor!!!!!
    Schedule.findOne({ lineup: { $exists: true } }).lean().then(doc => doc.lineup)
  )

  for (let i = 0; i < allDecks.length; i++) {
    const currentTitle = allDecks[i]
    if (alreadyScheduled.includes(currentTitle)) {
      continue
    }

    const availableCards = await tryCatch(
      NewCard.find({ game: currentTitle }).count().exec()
    )

    if (availableCards > 0) {
      const oldDeckIndex = alreadyScheduled.indexOf(scheduledDeck)
      const newLineup = alreadyScheduled.slice()
      if (oldDeckIndex < 0) {
        newLineup.push(currentTitle)
      } else {
        newLineup[oldDeckIndex] = currentTitle
      }

      await tryCatch(
        Schedule.updateOne(
          {},
          { $set: { lineup: newLineup } }
        ).exec()
      )
      return { game: currentTitle }
    }
  }
  return {}
}

export async function fillTweetQueue(queueSize) {
  const tweetQueue = await getTweetQueue()

  const currentDeck = await getQueuedDeck(tweetQueue)
  let nextDeck = await getNextDeck(currentDeck)
  
  while (tweetQueue.length <= queueSize) {
    const nextCard = await tryCatch(
      getCardFromDeck(nextDeck)
    )

    if (empty(nextCard)) {
      return
    }

    tweetQueue.unshift({
      cardId: nextCard.cardId,
      deck: nextCard.game
    })

    await saveQueue(tweetQueue)
    nextDeck = await getNextDeck({ game: nextCard.game })
  }
}

async function getQueuedDeck(tweetQueue) {
  if (tweetQueue && tweetQueue[0]) {
    return { game: tweetQueue[0].deck }
  }

  const game = await tryCatch(
    // CHANGE TO Schedule.findOne() after refactor!!!!!
    Schedule.findOne({ lineup: { $exists: true } }).lean().then(doc => doc.lineup[doc.lineup.length - 1])
  )

  return { game }
}

// exported for testing
export async function getNextDeck(queueSlot) {
  const deckLineup = await tryCatch(
    // CHANGE TO Schedule.findOne() after refactor!!!!!
    Schedule.findOne({ lineup: { $exists: true } }).lean().then(doc => doc.lineup)
  )

  const index = deckLineup.indexOf(queueSlot.game)
  const nextDeck = deckLineup[index + 1] || deckLineup[0]

  return { game: nextDeck }
}

// exported for testing
export async function updateTweetQueue() {
  await tryCatch(
    fillTweetQueue(QUEUE_SIZE)
  )
  const tweetQueue = await getTweetQueue()

  if (tweetQueue.length === 0) {
    return null
  }

  const nextCardToTweet = tweetQueue.pop().cardId
  await saveQueue(tweetQueue)

  return nextCardToTweet
}

// utility functions

function empty(obj) {
  return !obj || Object.keys(obj).length === 0
}

function getLiveAnswers(cards) {
  return cards.filter(Boolean).reduce(
    (allAnswers, card) =>
      allAnswers.concat(card.answers)
    , [])
}

function getQuestionSpoilerText(cards) {
  return cards.reduce(
    (allText, card) =>
      allText + ' ' + [
        card.prevLineAltText,
        card.questionAltText,
        card.answerAltText,
        card.otherVisibleContext
      ].join(' ')
    , '')
}

function getSpoilerText(cards) {
  return cards.filter(Boolean).reduce(
    (allText, card) =>
      allText + ' ' + [
        ...card.answers,
        ...(card.mediaUrls || []).map(obj => obj.altText),
        card.otherVisibleContext
      ].join(' ')
    , '')
}

// exported for testing
export function isSpoiled(questionCard, spoilerText, liveAnswers) {
  const questionSpoilerText = getQuestionSpoilerText([ questionCard ])

  const existingSpoilers = questionCard.answers.some(
    answer => spoilerText.includes(answer)
  )
  const willSpoil = liveAnswers.some(
    answer => questionSpoilerText.includes(answer)
  )

  return existingSpoilers || willSpoil
}
