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
export async function updateTweetQueue() {
  const tweetQueue = await tryCatch(
    Queue.findOne().lean().then(obj => obj.queue)
  );

  const queuedIds = tweetQueue.map(obj => obj.cardId);
  const lastTimeslot = getLastTimeslot(tweetQueue);
  let timeslot = getNextTimeslot(lastTimeslot);
  let tries = 0;
  
  while (tweetQueue.length <= QUEUE_SIZE) {
    if (++tries > 25)
      break;
    
    const nextCardId = await tryCatch(
      getCardForTimeslot(timeslot)
    );

    if (queuedIds.includes(nextCardId))
      continue;
    
    tweetQueue.unshift({
      cardId: nextCardId,
      time: timeslot
    });

    queuedIds.push(nextCardId);
    timeslot = getNextTimeslot(timeslot);
  }

  if (tweetQueue.length === 0)
    return null;

  const nextCardToTweet = tweetQueue.pop().cardId;

  await tryCatch(
    Queue.updateOne({}, { $set: { queue: tweetQueue } }).exec()
  );

  return nextCardToTweet;
}

// exported for testing
export async function getCardFromDeck(scheduledDeck) {
  let randomCard = await tryCatch(
    NewCard.aggregate([
      { $match: scheduledDeck },
      { $sample: { size: 1 }}
    ])
    .then(cards => Promise.resolve(cards[0]))
  );
  if (randomCard == null) {
    console.error('Empty deck. Please Add More Cards to DB.');
    return null;
  }

  const liveCards = await tryCatch(LiveQuestion.find().lean().exec());
  const recentCards = await tryCatch(getRecentAnswers());
  const spoilerText = getSpoilerText(liveCards.concat(recentCards));
  const liveAnswers = getLiveAnswers(liveCards);

  let spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
  let tries = 0;
  while(spoiled) {
    if (tries > 20) {
      console.error('All new cards contain spoilers. Please try again later.');
      return null;
    }
    if (tries > 10)
      scheduledDeck = {};

    randomCard = await tryCatch(
      NewCard.aggregate([
        { $match: scheduledDeck },
        { $sample: { size: 1 }}
      ])
      .then(cards => Promise.resolve(cards[0]))
    );
    spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
    tries++;
  }

  return randomCard.cardId;
}

// exported for testing
export async function getCardForTimeslot(hour) {
  const scheduledDeck = await tryCatch(
    getScheduledDeck(hour)
  );

  const randomCardId = await tryCatch(
    getCardFromDeck(scheduledDeck)
  );

  if (!randomCardId) {
    console.error('No appropriate cards available.');
    return null;
  }

  return randomCardId;
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
    return {};
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


// utility functions

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
        card.answers,
        card.mediaUrls.map(obj => obj.altText),
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