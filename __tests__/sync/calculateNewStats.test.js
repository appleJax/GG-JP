const { calculateNewStats } = require('DB/utils');


const currentTimestamp = 2;

const oldHistory = [{
  score: 1,
  avgAnswerTime: 1,
  timestamp: 1
}];

let sampleStats;

beforeEach(() => {
  sampleStats = {
    score: 10,
    avgAnswerTime: 5,
    highestScore: {
      value: 5,
      timestamp: 1
    },
    lowestAvgAnswerTime: {
      value: 10,
      timestamp: 1
    },
    average: {
      n: 1,
      value: 20
    },
    history: oldHistory
  };
});


it('should zero out current totals', () => {
  const newStats = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats.attempts).toEqual(0);
  expect(newStats.correct).toEqual(0);
  expect(newStats.totalPossible).toEqual(0);
  expect(newStats.score).toEqual(0);
  expect(newStats.avgAnswerTime).toEqual(0);
});

it('should add a rank field when the rank parameter is truthy', () => {
  const newStatsNoRank = calculateNewStats(sampleStats, currentTimestamp, false);
  const newStatsWithRank = calculateNewStats(sampleStats, currentTimestamp, 'withRank');

  expect(newStatsNoRank.rank).toBeUndefined();
  expect(newStatsWithRank.rank).toEqual(0);
});

it('should calculate a new average score', () => {
  const newStats = calculateNewStats(sampleStats, currentTimestamp);
  const newAverage = {
    n: 2,
    value: 15
  };

  expect(newStats.average).toEqual(newAverage);
});

it('should add a new data point to history', () => {
  const newStats = calculateNewStats(sampleStats, currentTimestamp);
  const newHistory = oldHistory.concat({
    score: 10,
    avgAnswerTime: 5,
    timestamp: 2
  });

  expect(newStats.history).toEqual(newHistory);
});

it('should update highestScore if new score is > 0 && >= current highestScore', () => {
  sampleStats.score = 1;
  sampleStats.highestScore.value = 1;
  const newStats1 = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats1.highestScore.value).toEqual(1);
  expect(newStats1.highestScore.timestamp).toEqual(currentTimestamp);

  sampleStats.score = 2;
  const newStats2 = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats2.highestScore.value).toEqual(2);
  expect(newStats2.highestScore.timestamp).toEqual(currentTimestamp);
});

it('should NOT update highestScore if new score is <= 0', () => {
  sampleStats.score = 0;
  sampleStats.highestScore.value = 0;
  const newStats1 = calculateNewStats(sampleStats, currentTimestamp);

  sampleStats.score = -1;
  const newStats2 = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats1.highestScore.value).toEqual(0);
  expect(newStats2.highestScore.value).toEqual(0);
});

it('should NOT update highestScore if new score is < current highestScore', () => {
  sampleStats.score = 1;
  sampleStats.highestScore.value = 2;
  const newStats = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats.highestScore.value).toEqual(2);
});

it('should update lowestAvgAnswerTime if avgAnswerTime > 0 && <= current lowestAvgAnswerTime', () => {
  sampleStats.avgAnswerTime = 1;
  sampleStats.lowestAvgAnswerTime.value = 2;
  const newStats = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats.lowestAvgAnswerTime.value).toEqual(1);
});

it('should NOT update lowestAvgAnswerTime if avgAnswerTime > current lowestAvgAnswerTime', () => {
  sampleStats.avgAnswerTime = 2;
  sampleStats.lowestAvgAnswerTime.value = 1;
  const newStats = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats.lowestAvgAnswerTime.value).toEqual(1);
});

it('should NOT update lowestAvgAnswerTime if avgAnswerTime <= 0', () => {
  sampleStats.avgAnswerTime = 0;
  sampleStats.lowestAvgAnswerTime.value = 1;
  const newStats = calculateNewStats(sampleStats, currentTimestamp);

  expect(newStats.lowestAvgAnswerTime.value).toEqual(1);
});
