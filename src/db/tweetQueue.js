import models from 'Models';
import { getRecentAnswers } from 'DB/ops';
import { getHour, tryCatch } from 'Utils';

const {
  DeckTitle,
  NewCard,
  LiveQuestion,
  Queue,
  Schedule
} = models;

// exported for testing
export const QUEUE_SIZE = 6;
const NO_CARD = {};
const RANDOM_DECK = {};

export async function getNextCardToTweet() {
  const nextCardId = await tryCatch(
    updateTweetQueue()
  );

  if (!nextCardId)
    return NO_CARD;

  const nextCard = await tryCatch(
    NewCard.findOne({ cardId: nextCardId }).lean().exec()
  );

  await tryCatch(LiveQuestion.create(nextCard));
  await tryCatch(NewCard.deleteOne({ cardId: nextCardId }).exec());

  return nextCard;
}

// exported for testing
export async function getCardForTimeslot(hour) {
  const scheduledDeck = await tryCatch(
    getScheduledDeck(hour)
  );

  const randomCardId = await tryCatch(
    getCardFromDeck(scheduledDeck)
  );

  if (!randomCardId)
    console.error('No appropriate cards available.');

  return randomCardId;
}

// exported for testing
export async function getCardFromDeck(scheduledDeck) {
  let randomCard = await tryCatch(
    pullCard(scheduledDeck)
  );

  if (empty(randomCard)) {
    console.error('Empty deck. Please Add More Cards to DB.');
    return null;
  }

  const Spoilers = await SpoilChecker();
  let spoiled = Spoilers.check(randomCard);

  let tries = 0;
  while(spoiled) {
    if (tries > 20) {
      console.error('All new cards contain spoilers. Please try again later.');
      return null;
    }
    if (tries++ > 10)
      scheduledDeck = {};

    randomCard = await tryCatch(
      pullCard(scheduledDeck)
    );

    spoiled = Spoilers.check(randomCard);
  }

  return randomCard.cardId;
}

async function getQueuedCards() {
  const queuedIds = await tryCatch(
    Queue.findOne().lean().then(obj => obj.queue.map(card => card.cardId))
  );

  const queuedCards = [];

  for (let i = 0; i < queuedIds.length; i++) {
    const nextCard = await tryCatch(
      NewCard.findOne({ cardId: queuedIds[i] }).lean().exec()
    );

    queuedCards.push(nextCard);
  }

  return queuedCards;
}

// exported for testing
export async function getScheduledDeck(hour) {
  hour = hour || getHour();
  const timeslot = await tryCatch(
    Schedule.findOne({ time: hour }).lean().exec()
  );

  if (!timeslot) {
    console.log('No timeslot found in schedule for:', hour);
    console.log('Picking card from random deck...');
    return RANDOM_DECK;
  }

  const scheduledDeck = timeslot.deck;
  const availableCards = await tryCatch(
    NewCard.find({ game: scheduledDeck }).count().exec()
  );

  if (availableCards > 0)
    return { game: scheduledDeck };

  const newScheduledDeck = await tryCatch(
    updateScheduledDeck(hour, scheduledDeck)
  );

  return newScheduledDeck;
}

async function pullCard(deck) {
  return await tryCatch(
    NewCard.aggregate([
      { $match: deck },
      { $sample: { size: 1 }}
    ])
    .then(cards => Promise.resolve(cards[0]))
  );
}

async function saveQueue(tweetQueue) {
  return await tryCatch(
    Queue.update({}, { $set: { queue: tweetQueue } }).exec()
  );
}

async function SpoilChecker() {
  const liveCards = await tryCatch(
    LiveQuestion.find().lean().exec()
  );
  const recentCards = await tryCatch(getRecentAnswers());
  const queuedCards = await tryCatch(getQueuedCards());
  const queueCount = queuedCards.length;

  const spoilerText = getSpoilerText(
    [ ...queuedCards,
      ...liveCards,
      ...recentCards.slice(0, 12 - queueCount)
    ]
  );

  const liveCardSlice = Math.max(0, 4 - queueCount);
  const willBeLive = [
    ...queuedCards.slice(0, 4),
    ...liveCards.slice(0, liveCardSlice)
  ];
  const liveAnswers = getLiveAnswers(willBeLive);

  return {
    check: (randomCard) => {
     return empty(randomCard) ||
            queuedCards.find(card => card.cardId === randomCard.cardId) ||
            isSpoiled(randomCard, spoilerText, liveAnswers);
    }
  };
}

// exported for testing
export async function updateScheduledDeck(hour, scheduledDeck) {
  await tryCatch(
    DeckTitle.updateOne(
      { fullTitle: scheduledDeck },
      { $set: { finished: true } }
    ).exec()
  );

  let allDecks = await tryCatch(
    DeckTitle.find({
      totalCards: { $gt: 0 },
      finished:   { $ne: true }
    }).lean().exec()
  );
  allDecks = allDecks.map(doc => doc.fullTitle);

  let alreadyScheduled = await tryCatch(
    Schedule.find().lean().exec()
  )
  alreadyScheduled = alreadyScheduled.map(doc => doc.deck);

  for (let i = 0; i < allDecks.length; i++) {
    const currentTitle = allDecks[i];
    if (alreadyScheduled.find(title => title === currentTitle))
      continue;

    const availableCards = await tryCatch(
      NewCard.find({ game: currentTitle }).count().exec()
    );

    if (availableCards > 0) {
      await tryCatch(
        Schedule.updateOne(
          { time: hour },
          { $set: { deck: currentTitle } }
        ).exec()
      );
      return { game: currentTitle };
    }
  }
  return {};
}

// exported for testing
export async function updateTweetQueue() {
  const tweetQueue = await tryCatch(
    Queue.findOne().lean().then(obj => obj.queue)
  );

  const lastTimeslot = getLastTimeslot(tweetQueue);
  let timeslot = getNextTimeslot(lastTimeslot);
  
  while (tweetQueue.length <= QUEUE_SIZE) {
    const nextCardId = await tryCatch(
      getCardForTimeslot(timeslot)
    );

    if (empty(nextCardId))
      break;
    
    tweetQueue.unshift({
      cardId: nextCardId,
      time: timeslot
    });

    await saveQueue(tweetQueue);
    timeslot = getNextTimeslot(timeslot);
  }

  if (tweetQueue.length === 0)
    return null;

  const nextCardToTweet = tweetQueue.pop().cardId;
  await saveQueue(tweetQueue);

  return nextCardToTweet;
}


// utility functions

function empty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function getLastTimeslot(tweetQueue) {
 return (tweetQueue[0] && tweetQueue[0].time) || -1;
}

function getLiveAnswers(cards) {
  return cards.reduce(
    (allAnswers, card) =>
      allAnswers.concat(card.answers)
    , []);
}

function getNextTimeslot(lastTimeslot) {
  return lastTimeslot < 0
    ? getHour()
    : (lastTimeslot + 6) % 24;
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
    , '');
}

function getSpoilerText(cards) {
  return cards.reduce(
    (allText, card) =>
      allText + ' ' + [
        ...card.answers,
        ...(card.mediaUrls || []).map(obj => obj.altText),
        card.otherVisibleContext
      ].join(' ')
    , '');
}

// exported for testing
export function isSpoiled(questionCard, spoilerText, liveAnswers) {
  const questionSpoilerText = getQuestionSpoilerText([ questionCard ]);

  const existingSpoilers = questionCard.answers.some(
    answer => spoilerText.includes(answer)
  );
  const willSpoil = liveAnswers.some(
    answer => questionSpoilerText.includes(answer)
  );

  return existingSpoilers || willSpoil;
}