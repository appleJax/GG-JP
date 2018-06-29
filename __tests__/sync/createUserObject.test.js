import { createUserObject } from 'DB/utils'

const profile = {
  id_str: 'u1',
  name: 'name',
  screen_name: 'handle',
  profile_image_url_https: 'avatar',
  profile_banner_url: 'banner'
}

const expectedUser = {
  userId: 'u1',
  name: 'name',
  handle: 'handle',
  avatar: 'avatar',
  profileBanner: 'banner',
  following: []
}

it('returns a valid user object', async () => {
  const newUserObject = await createUserObject(profile, 'noSideEffects')

  expect(newUserObject).toEqual(expectedUser)
})
