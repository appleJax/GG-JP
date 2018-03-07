
export function buildUpdatesForRank(stats) {

  const usersToUpdate = {};
  const currentRanks = {
    allTimeStats: 0,
    monthlyStats: 0,
    weeklyStats:  0
  };

  stats.forEach(({ _id: category, scores }) => {
    const end = scores.length;
    let i = 0;
    for (; i < end; i++) {
      const currentStat = scores[i];
      if (currentStat.score === 0) continue;

      currentStat.users.sort((a, b) => a[category].avgTimeToAnswer - b[category].avgTimeToAnswer);
      let currentAvgTime = -1;
      let skip = 1;

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

      if (skip > 1) currentRanks[category] += skip;

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
