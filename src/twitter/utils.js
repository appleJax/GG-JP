import Twitter          from 'Config/twitter';
import { tryCatch }     from 'Utils';
import evaluateResponse from './evaluateResponse';

const { TWITTER_ACCOUNT, DM_URL } = process.env;

export async function fetchTwitterUser(userId) {
  const params = { user_id: userId };

  return await tryCatch(
    Twitter.get('users/show', params)
    .then(({ data }) => data)
  );
}

export async function getFollowing(userId) {
  const params = {
    user_id: userId,
    stringify_ids: true
  };

  return await tryCatch(
    Twitter.get('friends/ids', params)
    .then(({ data }) => data.ids)
  );
}

  //
  // post a tweet with media
  //
export function postMedia(status, mainImages, altText1, prevLineImages, altText2) {
  return tryCatch(new Promise(async (resolve, reject) => {

    const mainImageId = await tryCatch(uploadMedia(mainImages[0], altText1));
    const mainMediaIds = [ mainImageId ];
    for (let i = 1; i < mainImages.length; i++) {
      const nextImage = await tryCatch(uploadMedia(mainImages[i], ''));
      mainMediaIds.push(nextImage);
    }

    const prevLineMediaIds = [];
    if (prevLineImages && prevLineImages.length > 0) {
      const prevLineImageId = await tryCatch(uploadMedia(prevLineImages[0], altText2));
      prevLineMediaIds.push(prevLineImageId);

      for (let i = 1; i < prevLineImages.length; i++) {
        const nextImage = await tryCatch(uploadMedia(prevLineImages[i], ''));
        prevLineMediaIds.push(nextImage);
      }
    }

    const media_ids = prevLineMediaIds.concat(mainMediaIds);

    const params = {
      status,
      media_ids,
      attachment_url: DM_URL,
      tweet_mode: 'extended',
      include_ext_alt_text: true
    };
    Twitter.post('statuses/update', params, (err, data, response) => {
      if (err) {
        console.error(err)
        reject(new Error("Posting status failed."));
      };
      const mediaUrls = data.extended_entities.media.map(
        obj => ({
          image: obj.media_url_https,
          altText: obj.ext_alt_text
        })
      );
      const result = {
        tweetId:  data.id_str,
        postedAt: new Date(data.created_at).getTime(),
        mediaUrls
      };
      resolve(result);
    });
  }));
}

export async function processDMs() {
  const params = { count: 50 };
  let missedDMs = [];

  do {
    const {
      data: {
        nextCursor,
        events
      }
    } = await tryCatch(Twitter.get('direct_messages/events/list', params));

    missedDMs = missedDMs.concat(events);
    params.cursor = nextCursor;

  } while (params.cursor)

  let reply;
  
  for (let i = missedDMs.length - 1; i >= 0; i--) {
    console.log('DM object:', missedDMs[i]);
    reply = missedDMs[i];
    await tryCatch(evaluateResponse(reply));
  }
}

export function retrieveAndCountMissedReplies(liveQuestions) {
  return tryCatch(new Promise(async (resolve, reject) => {
    const lastQuestionPosted = getLastQuestionPosted(liveQuestions);
    const params = {
      q: `@${TWITTER_ACCOUNT}`,
      count: 100,
      since_id: lastQuestionPosted
    };

    let missedReplies = [];
    let nextResults;
    do {
      const {
        data: {
          statuses,
          search_metadata
        }
      } = await tryCatch(Twitter.get('search/tweets', params));

      missedReplies = missedReplies.concat(statuses);
      nextResults = search_metadata.next_results;

      if (nextResults)
        params.max_id = nextResults.match(/max_id=(\d+)/)[1]

    } while (nextResults)

    let reply;
    let i = missedReplies.length - 1;
    for (; i >= 0; i--) {
      reply = missedReplies[i];
      await tryCatch(evaluateResponse(reply, liveQuestions));
    }

    resolve();
  }));
}


// private functions

function getLastQuestionPosted(liveQuestions) {
  return liveQuestions.reduce((maxId, card) =>
    (card.questionId > maxId)
      ? card.questionId
      : maxId
  , 0);
}

// EFFECTS:
// uploads a single image with altText to Twitter
//
// RETURNS:
// media_id which is necessary for
// attaching media to a tweet
//
function uploadMedia(b64Image, altText) {
  return tryCatch(new Promise((resolve, reject) => {
    // first we must post the media to Twitter
    Twitter.post('media/upload', { media_data: b64Image }, (err, data, response) => {
      if (err) {
        console.error(err);
        reject(new Error("Media upload failed."));
        return;
      }

      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      const mediaIdStr = data.media_id_string;
      if (!altText) {
        resolve(mediaIdStr);
        return;
      }

      const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      Twitter.post('media/metadata/create', meta_params, (err, data, response) => {
        if (err) {
          console.error(err);
          reject(new Error("Media upload succeeded, media creation failed."));
        }
        // now we can reference the media and post a tweet (media will attach to the tweet)
        resolve(mediaIdStr);
      });
    });
  }));
}
