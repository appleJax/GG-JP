import { createUserObject } from 'DB/utils';

it('returns a valid user object', async () => {
  const profile = {
    id_str: 'u1',
    name: 'name',
    screen_name: 'handle',
    profile_image_url_https: 'avatar',
    profile_banner_url: 'banner'
  };

  const newUserObject = await createUserObject(profile, 'noSideEffects');

  expect(newUserObject).toEqual(expectedUser());
});


function expectedUser() {
  return {
    userId: 'u1',
    name: 'name',
    handle: 'handle',
    avatar: 'avatar',
    profileBanner: 'banner',
    following: [],
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