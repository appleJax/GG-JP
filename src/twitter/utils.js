import Twitter          from 'Config/twitter';
import models           from 'Models';
import { tryCatch }     from 'Utils';
import evaluateResponse from './evaluateResponse';

const { Timestamp } = models;
const {
  APP_URL,
  TWITTER_ACCOUNT
} = process.env;

export function fetchTwitterUser(userId) {
  const params = { user_id: userId };

  return Twitter.get('users/show', params)
    .then(({ data }) => data);
}

export function formatTopTenTweet(topTen, category) {
  const timePeriod = toTimePeriod(category);
  let status = `Congrats to this past ${timePeriod}'s Top Ten!\n`;
  topTen.forEach(user =>
    status += `\n${user[category].rank}. @${user.handle}`
  );
  status += `\n\nランキング: ${APP_URL}/stats`;
  return status;
}

export function getFollowing(userId) {
  const params = {
    user_id: userId,
    stringify_ids: true
  };

  return Twitter.get('friends/ids', params)
    .then(({ data }) => data.ids);
}

//
// post a tweet with media
//
export async function postMedia(
  status,
  mainImages,
  altText1,
  prevLineImages,
  altText2
) {

  const mainImageId = await tryCatch(
    uploadMedia(mainImages[0], altText1)
  );
  const mainMediaIds = [ mainImageId ];

  for (let i = 1; i < mainImages.length; i++) {
    const nextImage = await tryCatch(
      uploadMedia(mainImages[i], '')
    );
    mainMediaIds.push(nextImage);
  }

  const prevLineMediaIds = [];
  if (prevLineImages && prevLineImages.length > 0) {
    const prevLineImageId = await tryCatch(
      uploadMedia(prevLineImages[0], altText2)
    );
    prevLineMediaIds.push(prevLineImageId);

    for (let i = 1; i < prevLineImages.length; i++) {
      const nextImage = await tryCatch(
        uploadMedia(prevLineImages[i], '')
      );
      prevLineMediaIds.push(nextImage);
    }
  }

  const media_ids = prevLineMediaIds.concat(mainMediaIds);

  const params = {
    status,
    media_ids,
    tweet_mode: 'extended',
    include_ext_alt_text: true
  };

  return Twitter.post('statuses/update', params)
    .then(({ data }) => {
      const mediaUrls = data.extended_entities.media.map(
        obj => ({
          image: obj.media_url_https,
          altText: obj.ext_alt_text
        })
      );

      return {
        tweetId:  data.id_str,
        postedAt: new Date(data.created_at).getTime(),
        mediaUrls
      };
    })
    .catch(console.error);
}

export function postTweet(status) {
  return Twitter.post(
    'statuses/update',
    { status }
  ).catch(console.error);
}

export async function processDMs() {
  const DMs = await tryCatch(
    fetchDMs()
  );

  await tryCatch(
    evaluateDMs(DMs)
  );
}


// private functions

async function evaluateDMs(directMessages) {
  let reply;
  
  for (let i = directMessages.length - 1; i >= 0; i--) {
    reply = directMessages[i];
    if (reply) {
      await tryCatch(
        evaluateResponse(reply)
      );
    }
  }
}

// exported for testing
export async function fetchDMs(twitterClient = Twitter) {
  const params = { count: 50 };
  const lastReadDM = await tryCatch(
    Timestamp.findOne().lean().then(doc => doc.lastReadDM)
  );

  let directMessages = [];
  let firstRequest = true;
  let lastTimestamp = 0;

  do {

    const {
      data: {
        nextCursor,
        events
      }
    } = await tryCatch(
      twitterClient.get('direct_messages/events/list', params)
    );

    if (firstRequest) {
      const mostRecentTimestamp = getMostRecentTimestamp(events);

      if (mostRecentTimestamp > lastReadDM)
        await updateLastReadDM(mostRecentTimestamp);
      else return [];
    }

    lastTimestamp = getLastTimestamp(events);
    directMessages = directMessages.concat(events);
    params.cursor = nextCursor;
    firstRequest = false;

  } while (params.cursor && lastTimestamp > lastReadDM)

  return directMessages.filter(msg =>
    toTimestamp(msg.created_timestamp) > lastReadDM
  );
}

function getLastTimestamp(events) {
  const lastIndex = events.length - 1;
  return events[lastIndex] &&
    toTimestamp(
      events[lastIndex].created_timestamp
    );
}

function getLastQuestionPosted(liveQuestions) {
  return liveQuestions.reduce((maxId, card) =>
    (card.questionId > maxId)
      ? card.questionId
      : maxId
  , 0);
}

function getMostRecentTimestamp(events) {
  return !events || !events[0]
    ? 0
    : toTimestamp(
        events[0].created_timestamp
      );
}

function toTimePeriod(category) {
  return category === 'weeklyStats'
    ? 'week'
    : 'month';
}

function toTimestamp(timeString) {
  return new Date(+timeString).getTime();
}

async function updateLastReadDM(timestamp) {
  return await tryCatch(
    Timestamp.update({},
      { $set: { lastReadDM: timestamp }}
    ).exec()
  );
}

// EFFECTS:
// uploads a single image with altText to Twitter
//
// RETURNS:
// media_id which is necessary for
// attaching media to a tweet
function uploadMedia(b64Image, altText) {
    // first we must post the media to Twitter
  return Twitter.post(
      'media/upload',
      { media_data: b64Image }
    ).then(({ data }) => {

      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      const mediaIdStr = data.media_id_string;
      if (!altText) return mediaIdStr;

      const meta_params = {
        media_id: mediaIdStr,
        alt_text: { text: altText }
      };

      return Twitter.post(
        'media/metadata/create',
        meta_params
      ).then((_) =>
        // now we can reference the media and post a tweet
        // (media will attach to the tweet)
        mediaIdStr
      ).catch(console.error);

    }).catch(console.error);
}