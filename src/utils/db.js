import { MongoClient }  from 'mongodb';
import { getFollowing } from 'Utils/twitter'
import { getHour, tryCatch } from 'Utils'

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

export function getScheduledDeck(mongo, newCards) {
  return tryCatch(new Promise(async (resolve, reject) => {
    const schedule = mongo.db(DB).collection('schedule');

    const currentHour = getHour();
    const timeslot = await tryCatch(
      schedule.findOne({ time: currentHour })
    );

    if (!timeslot) {
      console.error('No timeslot found in schedule for:', currentHour);
      console.error('Picking card from random deck...');
      resolve({});
      return;
    }

    const scheduledGame = timeslot.deck;
    let availableCards = await tryCatch(
      newCards.find({ game: scheduledGame }).count()
    );

    if (availableCards > 0) {
      resolve({ game: scheduledGame });
      return;
    }

    // scheduled deck is empty
    // so schedule a new deck in its place
    const deckTitles = mongo.db(DB).collection('deckTitles');
    await tryCatch(
      deckTitles.update(
        { deck: scheduledGame },
        { $set: { finished: true } }
      )
    );

    const allDecks = await tryCatch(
      deckTitles.find({
        totalCards: { $gt: 0 },
        finished:   { $ne: true }
      }).toArray().then(docs => docs.map(doc => doc.fullTitle))
    );
    const alreadyScheduled = await tryCatch(
      schedule.find().toArray().then(docs => docs.map(doc => doc.deck))
    );

    for (let i = 0; i < allDecks.length; i++) {
      const currentTitle = allDecks[i];
      if (alreadyScheduled.find(title => title === currentTitle))
        continue;

      availableCards = await tryCatch(
        newCards.find({ game: currentTitle }).count()
      );
      if (availableCards > 0) {
        await tryCatch(
          schedule.update(
            { time: currentHour },
            { $set: { deck: currentTitle } }
          )
        );
        resolve({ game: currentTitle });
        return;
      }
    }

    resolve({});
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
