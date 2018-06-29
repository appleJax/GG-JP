const { calculateNewStats } = require('DB/utils')

const currentTimestamp = 2

const oldHistory = [{
  score: 1,
  avgAnswerTime: 1,
  timestamp: 1
}]

let sampleStats

beforeEach(() => {
  sampleStats = {
    rank: 1,
    score: 10,
    avgAnswerTime: 5,
    bestRank: {
      value: 3,
      timestamp: 1
    },
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
  }
})

it('should zero out current totals', () => {
  const newStats = calculateNewStats(sampleStats, currentTimestamp)

  expect(newStats.attempts).toEqual(0)
  expect(newStats.correct).toEqual(0)
  expect(newStats.totalPossible).toEqual(0)
  expect(newStats.score).toEqual(0)
  expect(newStats.avgAnswerTime).toEqual(0)
})

it('should add a rank field when the addRank parameter is truthy', () => {
  const newStatsNoRank = calculateNewStats(sampleStats, currentTimestamp, false)
  const newStatsWithRank = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

  expect(newStatsNoRank.rank).toBeUndefined()
  expect(newStatsWithRank.rank).toEqual(0)
})

it('should calculate a new average score', () => {
  const newStats = calculateNewStats(sampleStats, currentTimestamp)
  const newAverage = {
    n: 2,
    value: 15
  }

  expect(newStats.average).toEqual(newAverage)
})

describe('should add a new data point to history', () => {
  test('without rank when addRank parameter is falsy', () => {
    const newStats = calculateNewStats(sampleStats, currentTimestamp)
    const newHistory = oldHistory.concat({
      score: 10,
      avgAnswerTime: 5,
      timestamp: 2
    })

    expect(newStats.history).toEqual(newHistory)
  })

  test('with rank when addRank parameter is truthy', () => {
    const newStats = calculateNewStats(sampleStats, currentTimestamp, 'withRank')
    const newHistory = oldHistory.concat({
      rank: 1,
      score: 10,
      avgAnswerTime: 5,
      timestamp: 2
    })

    expect(newStats.history).toEqual(newHistory)
  })
})

describe('should conditionally update bestRank', () => {
  test('YES, if new rank is > 0 && <= current bestRank', () => {
    sampleStats.rank = 1
    sampleStats.bestRank.value = 2
    const newStats1 = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

    expect(newStats1.bestRank.value).toEqual(1)
    expect(newStats1.bestRank.timestamp).toEqual(currentTimestamp)

    sampleStats.rank = 2
    sampleStats.bestRank.value = 2
    const newStats2 = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

    expect(newStats2.bestRank.value).toEqual(2)
    expect(newStats2.bestRank.timestamp).toEqual(currentTimestamp)
  })

  test('YES, if new rank is > 0 && current bestRank === 0', () => {
    sampleStats.rank = 2
    sampleStats.bestRank.value = 0
    const newStats1 = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

    expect(newStats1.bestRank.value).toEqual(2)
    expect(newStats1.bestRank.timestamp).toEqual(currentTimestamp)
  })

  test('NOT if new rank is > current bestRank', () => {
    sampleStats.rank = 3
    sampleStats.bestRank.value = 2
    const newStats = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

    expect(newStats.bestRank.value).toEqual(2)
    expect(newStats.bestRank.timestamp).not.toEqual(currentTimestamp)
  })

  test('NOT if new rank is <= 0', () => {
    sampleStats.rank = 0
    sampleStats.bestRank.value = 2
    const newStats1 = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

    sampleStats.score = -1
    const newStats2 = calculateNewStats(sampleStats, currentTimestamp, 'withRank')

    expect(newStats1.bestRank.value).toEqual(2)
    expect(newStats2.bestRank.value).toEqual(2)
  })

  test('NOT if addRank parameter is falsy', () => {
    sampleStats.rank = 1
    sampleStats.bestRank.value = 2
    const newStats = calculateNewStats(sampleStats, currentTimestamp, false)

    expect(newStats.bestRank).toBeUndefined()
  })
})

describe('should conditionally update highestScore', () => {
  test('YES, if new score is > 0 && >= current highestScore', () => {
    sampleStats.score = 1
    sampleStats.highestScore.value = 1
    const newStats1 = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats1.highestScore.value).toEqual(1)
    expect(newStats1.highestScore.timestamp).toEqual(currentTimestamp)

    sampleStats.score = 2
    const newStats2 = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats2.highestScore.value).toEqual(2)
    expect(newStats2.highestScore.timestamp).toEqual(currentTimestamp)
  })

  test('NOT if new score is <= 0', () => {
    sampleStats.score = 0
    sampleStats.highestScore.value = 0
    const newStats1 = calculateNewStats(sampleStats, currentTimestamp)

    sampleStats.score = -1
    const newStats2 = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats1.highestScore.value).toEqual(0)
    expect(newStats2.highestScore.value).toEqual(0)
  })

  test('NOT if new score is < current highestScore', () => {
    sampleStats.score = 1
    sampleStats.highestScore.value = 2
    const newStats = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats.highestScore.value).toEqual(2)
  })
})

describe('should conditionally update lowestAvgAnswerTime', () => {
  test('YES, if avgAnswerTime > 0 && <= current lowestAvgAnswerTime', () => {
    sampleStats.avgAnswerTime = 1
    sampleStats.lowestAvgAnswerTime.value = 2
    const newStats = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats.lowestAvgAnswerTime.value).toEqual(1)
  })

  test('NOT if avgAnswerTime > current lowestAvgAnswerTime', () => {
    sampleStats.avgAnswerTime = 2
    sampleStats.lowestAvgAnswerTime.value = 1
    const newStats = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats.lowestAvgAnswerTime.value).toEqual(1)
  })

  test('NOT if avgAnswerTime <= 0', () => {
    sampleStats.avgAnswerTime = 0
    sampleStats.lowestAvgAnswerTime.value = 1
    const newStats = calculateNewStats(sampleStats, currentTimestamp)

    expect(newStats.lowestAvgAnswerTime.value).toEqual(1)
  })
})
