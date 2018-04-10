import models from 'Models'
import { getFollowing } from 'Twitter/utils'
import { getHour, tryCatch } from 'Utils'

const {
  DeckTitle,
  NewCard,
  OldCard,
  LiveQuestion,
  Schedule,
  Scoreboard
} = models;

const {
  MONGODB_URI: url,
  MONGO_DB:    DB
} = process.env;

export async function aggregateStats() {
  return await tryCatch(Scoreboard.aggregate([
    { $project: {
        _id: 0,
        orderBy: { $literal: [ 'weeklyStats', 'monthlyStats', 'allTimeStats' ] },
        userId:                         1,
        'allTimeStats.avgTimeToAnswer': 1,
        'allTimeStats.score':           1,
        'allTimeStats.rank':            1,
        'monthlyStats.avgTimeToAnswer': 1,
        'monthlyStats.score':           1,
        'monthlyStats.rank':            1,
        'weeklyStats.avgTimeToAnswer':  1,
        'weeklyStats.score':            1,
        'weeklyStats.rank':             1
      }
    },
    { $unwind: '$orderBy' },
    { $group:
      { _id:
        { orderBy: '$orderBy',
          score:
          { $cond: {
            if: { $eq: ['$orderBy', 'weeklyStats' ] },
            then: '$weeklyStats.score',
            else:
            { $cond: {
                if: { $eq: ['$orderBy', 'monthlyStats'] },
                then: '$monthlyStats.score',
                else: '$allTimeStats.score'
                }
              }
            }
          }
        },
        users: { $push: '$$CURRENT' }
      }
    },
    { $sort: { '_id.score': -1 } },
    { $group:
      { _id: '$_id.orderBy',
        scores: {
          $push: {
            score: '$_id.score',
            users: '$users'
          }
        }
      }
    }
  ]).exec());
}

export function buildUpdatesForRank(stats) {
  if (!stats || stats.length === 0)
    return [];

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
      if (currentStat.score === 0)
        continue;

      currentStat.users.sort(
        (a, b) =>
          a[category].avgTimeToAnswer - b[category].avgTimeToAnswer
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

// noSideEffects for testing purposes
export async function createUserObject(profile, noSideEffects) {
  const {
    id_str: userId,
    name,
    screen_name: handle,
    profile_image_url_https: avatar,
    profile_banner_url: profileBanner
  } = profile;

  const following = noSideEffects
    ? []
    : await tryCatch(
      getFollowing(userId)
    );

  return {
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
  };
}

// noSideEffects for testing purposes
export async function findOrCreateUser(userId, twitterUser, noSideEffects) {
  let user = await tryCatch(
    Scoreboard.findOne({ userId }).lean().exec()
  );

  if (!user) {
    user = await tryCatch(
      createUserObject(twitterUser)
    );
    await tryCatch(
      Scoreboard.create(user)
    );

  } else {
    const {
      name,
      screen_name: handle,
      profile_image_url_https: avatar,
      profile_banner_url: profileBanner
    } = twitterUser;

    const following = noSideEffects
      ? []
      : await tryCatch (
          getFollowing(userId)
        );

    user = await tryCatch(
      Scoreboard.findOneAndUpdate(
        { userId },
        { $set: {
            avatar,
            following,
            name,
            handle,
            profileBanner
          }
        },
        { new: true, lean: true }
      ).exec()
    );
  }
  return user;
}

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

export async function getUser(userId) {
  return await tryCatch(
    Scoreboard.findOne({ userId }).lean().exec()
  );
}


// private functions
// (exported for testing)
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
