import models from 'Models'
import { getFollowing } from 'Twitter/utils'
import {
  addLinkAndResults,
  average,
  tryCatch
} from 'Utils'

const {
  Scoreboard,
  Sponsor,
  Timestamp
} = models

export async function addSponsor(statusText) {
  const sponsors = await tryCatch(
    Sponsor.findOne().lean().exec()
  )

  if (!sponsors || sponsors.queue.length === 0) {
    return statusText
  }

  const sponsorMessage = getSponsorMessage(sponsors)
  await updateSponsorIndex(sponsors)

  return insertSponsorMessage(statusText, sponsorMessage)
}

export async function formatAnswerStatus(answerText, questionId, userPoints) {
  const status = addLinkAndResults(answerText, questionId, userPoints)
  return addSponsor(status)
}

export function aggregateStats() {
  return Scoreboard.aggregate([
    { $match: { isPrivate: false } },
    { $project: {
        _id: 0,
        orderBy: { $literal: [ 'weeklyStats', 'monthlyStats', 'yearlyStats', 'allTimeStats' ] },
        userId:                       1,
        'allTimeStats.avgAnswerTime': 1,
        'allTimeStats.score':         1,
        'allTimeStats.rank':          1,
        'allTimeStats.bestRank':      1,
        'yearlyStats.avgAnswerTime':  1,
        'yearlyStats.score':          1,
        'yearlyStats.rank':           1,
        'monthlyStats.avgAnswerTime': 1,
        'monthlyStats.score':         1,
        'monthlyStats.rank':          1,
        'weeklyStats.avgAnswerTime':  1,
        'weeklyStats.score':          1,
        'weeklyStats.rank':           1
      }
    },
    { $unwind: '$orderBy' },
    { $group:
      { _id:
        { orderBy: '$orderBy',
          score:
          { $cond: {
              if: { $eq: ['$orderBy', 'weeklyStats'] },
              then: '$weeklyStats.score',
              else:
              { $cond: {
                  if: { $eq: ['$orderBy', 'monthlyStats'] },
                  then: '$monthlyStats.score',
                  else:
                  { $cond: {
                      if: { $eq: ['$orderBy', 'yearlyStats'] },
                      then: '$yearlyStats.score',
                      else: '$allTimeStats.score'
                  }}
              }}
          }}
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
  ]).exec()
}

export async function buildStatUpdates(newWeek, newMonth, newYear) {
  const users = await tryCatch(
    Scoreboard.find().lean().exec()
  )

  const {
    year:  currentYear,
    month: currentMonth,
    week:  currentWeek,
    day:   currentDay
  } = await tryCatch(
    Timestamp.findOne().lean().exec()
  )

  const bulkUpdateOps = []
  let i = 0
  let end = users.length
  for (; i < end; i++) {
    const user = users[i]
    const { userId } = user
    const dailyStats = calculateNewStats(user.dailyStats, currentDay)

    const op = {
      updateOne: {
        filter: { userId },
        update: {
          $set: { dailyStats }
        }
      }
    }

    if (newWeek) {
      const { weeklyStats } = user
      const newWeeklyStats = calculateNewStats(weeklyStats, currentWeek, true)
      op.updateOne.update.$set.weeklyStats = newWeeklyStats
    }

    if (newMonth) {
      const { monthlyStats } = user
      const newMonthlyStats = calculateNewStats(monthlyStats, currentMonth, true)
      op.updateOne.update.$set.monthlyStats = newMonthlyStats
    }

    if (newYear) {
      const { yearlyStats } = user
      const newYearlyStats = calculateNewStats(yearlyStats, currentYear, true)
      op.updateOne.update.$set.yearlyStats = newYearlyStats
    }

    bulkUpdateOps.push(op)
  }

  return bulkUpdateOps
}

export function buildRankUpdates(stats, currentTimestamp) {
  if (!stats || stats.length === 0) {
    return []
  }

  const usersToUpdate = {}
  const currentRanks = {
    allTimeStats: 0,
    yearlyStats:  0,
    monthlyStats: 0,
    weeklyStats:  0
  }

  stats.forEach(({ _id: category, scores }) => {
    let skip = 1
    const end = scores.length
    let i = 0
    for (; i < end; i++) {
      const currentStat = scores[i]
      if (currentStat.score === 0) {
        continue
      }

      currentStat.users.sort(
        (a, b) =>
          a[category].avgAnswerTime - b[category].avgAnswerTime
      )
      let currentAvgTime = -1

      currentStat.users.forEach(user => {
        if (user[category].avgAnswerTime > currentAvgTime) {
          currentRanks[category] += skip
          skip = 1
          currentAvgTime = user[category].avgAnswerTime
        } else skip++

        const previousRank = user[category].rank
        const currentRank = currentRanks[category]
        if (previousRank !== currentRank) {
          const cachedUpdate = usersToUpdate[user.userId] || {}
          cachedUpdate[category] = currentRank

          if (category === 'allTimeStats') {
            const oldBestRank = user.allTimeStats.bestRank.value
            if (
              currentRank > 0 &&
              (oldBestRank === 0 || currentRank <= oldBestRank)
            ) {
              cachedUpdate.bestRank = {
                value: currentRank,
                timestamp: currentTimestamp
              }
            }
          }

          usersToUpdate[user.userId] = cachedUpdate
        }
      }) // users.forEach
    } // next score
  })

  const bulkUpdateOps = []
  const userIdsToUpdate = Object.keys(usersToUpdate)

  const end = userIdsToUpdate.length
  let i = 0
  for (; i < end; i++) {
    const currentUser = userIdsToUpdate[i]
    const userId = currentUser
    const op = {
      updateOne: {
        filter: { userId },
        update: {
          $set: {}
        }
      }
    }
    const userUpdates = usersToUpdate[currentUser]
    Object.keys(currentRanks).forEach(category => {
      const newRank = userUpdates[category]
      if (newRank) {
        op.updateOne.update.$set[`${category}.rank`] = newRank
      }
    })

    const newBestRank = userUpdates.bestRank
    if (newBestRank) {
      op.updateOne.update.$set['allTimeStats.bestRank'] = newBestRank
    }

    if (Object.keys(op.updateOne.update.$set).length > 0) {
      bulkUpdateOps.push(op)
    }
  } // for loop

  return bulkUpdateOps
}

export function calculateNewStats(oldStats, currentTimestamp, addRank) {
  const {
    score,
    average: {
      n,
      value: oldAverage
    },
    avgAnswerTime,
    highestScore,
    lowestAvgAnswerTime,
    history
  } = oldStats

  const newDataPoint = {
    score,
    avgAnswerTime,
    timestamp: currentTimestamp
  }

  const newHigh = highestScore
  const newLow = lowestAvgAnswerTime

  if (score > 0 && score >= highestScore.value) {
    newHigh.value = score
    newHigh.timestamp = currentTimestamp
  }

  if (
    avgAnswerTime > 0 &&
    avgAnswerTime <= lowestAvgAnswerTime.value
  ) {
    newLow.value = avgAnswerTime
    newLow.timestamp = currentTimestamp
  }

  const newStats = {
    attempts: 0,
    correct: 0,
    totalPossible: 0,
    score: 0,
    avgAnswerTime: 0,
    average: {
      n: n + 1,
      value: average(score, oldAverage, n)
    },
    highestScore: newHigh,
    lowestAvgAnswerTime: newLow
  }

  if (addRank) {
    newStats.rank = 0

    const { bestRank, rank } = oldStats
    const newBestRank = bestRank

    if (
      rank > 0 &&
      (bestRank.value === 0 || rank <= bestRank.value)
    ) {
      newBestRank.value = rank
      newBestRank.timestamp = currentTimestamp
    }

    newStats.bestRank = newBestRank
    newDataPoint.rank = oldStats.rank
  }

  newStats.history = history.concat(newDataPoint)

  return newStats
}

// noSideEffects for testing purposes
export async function createUserObject(profile, noSideEffects) {
  const {
    id_str: userId,
    name,
    screen_name: handle,
    profile_image_url_https: avatar,
    profile_banner_url: profileBanner
  } = profile

  const following = noSideEffects
    ? []
    : await tryCatch(
      getFollowing(userId)
    )

  return {
    userId,
    name,
    handle,
    avatar,
    profileBanner,
    following
  }
}

// noSideEffects for testing purposes
export async function findOrCreateUser(userId, twitterUser, noSideEffects) {
  let user = await tryCatch(
    Scoreboard.findOne({ userId }).lean().exec()
  )

  if (!user) {
    user = await tryCatch(
      createUserObject(twitterUser, noSideEffects)
    )
    await tryCatch(
      Scoreboard.create(user)
    )
  } else {
    const {
      name,
      screen_name: handle,
      profile_image_url_https: avatar,
      profile_banner_url: profileBanner
    } = twitterUser

    const following = noSideEffects
      ? []
      : await tryCatch(
        getFollowing(userId)
      )

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
    )
  }
  return user
}

export function getUser(user) {
  return Scoreboard.findOne(user).lean().exec()
}

// private functions

function getSponsorMessage(sponsors) {
  const sponsor = sponsors.queue[sponsors.index]

  const numSponsorMessages = sponsors.messages.length
  const randomIndex = Math.floor(
    Math.random() * numSponsorMessages
  )

  return sponsors.messages[randomIndex].replace('SPONSOR', sponsor)
}

function insertSponsorMessage(statusText, sponsorMessage) {
  let statusLines = statusText.split('\n').filter(line =>
    !line.startsWith('Game: ')
  )

  statusLines.splice(-1, 0, sponsorMessage)

  return statusLines.join('\n')
}

function updateSponsorIndex(sponsors) {
  const numSponsors = sponsors.queue.length
  let index = sponsors.index

  if (++index >= numSponsors) {
    index = 0
  }

  return tryCatch(
    Sponsor.updateOne({}, {
      $set: { index }
    }).exec()
  )
}
