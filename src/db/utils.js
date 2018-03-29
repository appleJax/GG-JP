import { MongoClient } from 'mongodb';
import models from 'Models'
import { getFollowing } from 'Twitter/utils'
import { getHour, tryCatch } from 'Utils'

const {
  DeckTitle,
  NewCard,
  OldCard,
  LiveQuestion,
  Schedule
} = models;

const {
  MONGODB_URI: url,
  MONGO_DB:    DB
} = process.env;

export function buildUpdatesForRank(stats) {

  const usersToUpdate = {};
  const currentRanks = {
    allTimeStats: 0,
    monthlyStats: 0,
    weeklyStats:  0
  };

  stats.forEach(({ _id: category, scores }) => {
    let skip = 1;
    const end = scores.length;
    let i = 0;
    for (; i < end; i++) {
      const currentStat = scores[i];
      if (currentStat.score === 0) continue;

      currentStat.users.sort(
        (a, b) => a[category].avgTimeToAnswer - b[category].avgTimeToAnswer
      );
      let currentAvgTime = -1;

      currentStat.users.forEach(user => {
        if (user[category].avgTimeToAnswer > currentAvgTime) {
          currentRanks[category] += skip;
          skip = 1;
          currentAvgTime = user[category].avgTimeToAnswer;
        } else skip++;

        const previousRank = user[category].rank;
        const currentRank = currentRanks[category];
        if (previousRank !== currentRank) {
          const cachedUpdate = usersToUpdate[user.userId] || {};
          cachedUpdate[category] = currentRank;
          usersToUpdate[user.userId] = cachedUpdate;
        }
      }); // users.forEach
    } // next score
  });

  const bulkUpdateOps = [];
  const userIdsToUpdate = Object.keys(usersToUpdate);

  const end = userIdsToUpdate.length;
  let i = 0;
  for (; i < end; i++) {
    const currentUser = userIdsToUpdate[i];
    const userId = currentUser;
    const op = {
      updateOne: {
        filter: { userId },
        update: {
          $set: {}
        }
      }
    };
    const userUpdates = usersToUpdate[currentUser];
    Object.keys(currentRanks).forEach(category => {
      const newRank = userUpdates[category];
      if (newRank)
        op.updateOne.update.$set[`${category}.rank`] = newRank;
    });

    if (Object.keys(op.updateOne.update.$set).length > 0)
      bulkUpdateOps.push(op);

  } // for loop

  return bulkUpdateOps;
}

export function createUserObject(profile) {
  return new Promise(async (resolve, reject) => {
    const {
      id_str: userId,
      name,
      screen_name: handle,
      profile_image_url_https: avatar,
      profile_banner_url: profileBanner
    } = profile;
    const following = await tryCatch(
      getFollowing(userId)
    );

    resolve({
      userId,
      name,
      handle,
      avatar,
      profileBanner,
      following,
      allTimeStats: {
        attempts: 0,
        correct: [],
        incorrect: [],
        unanswered: [],
        totalPossible: 0,
        rank: 0,
        score: 0,
        avgTimeToAnswer: 0
      },
      monthlyStats: {
        attempts: 0,
        correct: 0,
        totalPossible: 0,
        rank: 0,
        score: 0,
        avgTimeToAnswer: 0,
        average: {
          n: 0,
          value: 0
        }
      },
      weeklyStats: {
        attempts: 0,
        correct: 0,
        totalPossible: 0,
        rank: 0,
        score: 0,
        avgTimeToAnswer: 0,
        average: {
          n: 0,
          value: 0
        }
      },
      dailyStats: {
        attempts: 0,
        correct: 0,
        totalPossible: 0,
        score: 0,
        avgTimeToAnswer: 0,
        average: {
          n: 0,
          value: 0
        }
      }
    });
  });
}


export async function findOrCreateUser(userId, twitterUser) {
  const mongo = await tryCatch(MongoClient.connect(url));
  const scoreboard = mongo.db(DB).collection('scoreboard');

  let user = await tryCatch(
    scoreboard.findOne({ userId })
  );

  if (!user) {
    user = await tryCatch(
      createUserObject(twitterUser)
    );
    await tryCatch(
      scoreboard.insert(user)
    );

  } else {

    const {
      name,
      screen_name: handle,
      profile_image_url_https: avatar,
      profile_banner_url: profileBanner
    } = twitterUser;
    const following = await tryCatch (
      getFollowing(userId)
    );
    user = await tryCatch(
      scoreboard.findOneAndUpdate({ userId },
        { $set: {
            avatar,
            following,
            name,
            handle,
            profileBanner
          }
        },
        { returnOriginal: false }
      )
      .then(doc => Promise.resolve(doc.value))
    );
  }

  mongo.close();
  return user;
}

export function getScheduledDeck(hour) {
  return tryCatch(new Promise(async (resolve, reject) => {
    hour = hour || getHour();
    const timeslot = await tryCatch(
      Schedule.findOne({ time: hour }).exec()
    );

    if (!timeslot) {
      console.log('No timeslot found in schedule for:', hour);
      console.log('Picking card from random deck...');
      resolve({});
      return;
    }

    const scheduledDeck = timeslot.deck;
    const availableCards = await tryCatch(
      NewCard.find({ game: scheduledDeck }).count().exec()
    );

    if (availableCards > 0) {
      resolve({ game: scheduledDeck });
      return;
    }

    const newScheduledDeck = await tryCatch(
      updateScheduledDeck(hour, scheduledDeck)
    );

    resolve(newScheduledDeck);
  }));
}

export function getUser(userId) {
  return new Promise(async (resolve, reject) => {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const user = await tryCatch(
      scoreboard.findOne({ userId })
    );

    resolve(user);
    mongo.close();
  });
}


// private functions

function updateScheduledDeck(hour, scheduledDeck) {
  return tryCatch(new Promise(async (resolve, reject) => {
    await tryCatch(
      DeckTitle.update(
        { deck: scheduledDeck },
        { $set: { finished: true } }
      ).exec()
    );

    const allDecks = await tryCatch(
      DeckTitle.find({
        totalCards: { $gt: 0 },
        finished:   { $ne: true }
      }).exec().then(docs => docs.map(doc => doc.fullTitle))
    );
    const alreadyScheduled = await tryCatch(
      Schedule.find().exec().then(docs => docs.map(doc => doc.deck))
    );

    for (let i = 0; i < allDecks.length; i++) {
      const currentTitle = allDecks[i];
      if (alreadyScheduled.find(title => title === currentTitle))
        continue;

      const availableCards = await tryCatch(
        NewCard.find({ game: currentTitle }).count().exec()
      );
      if (availableCards > 0) {
        await tryCatch(
          Schedule.update(
            { time: hour },
            { $set: { deck: currentTitle } }
          ).exec()
        );
        resolve({ game: currentTitle });
        return;
      }
    }

    resolve({});
  }));
}
