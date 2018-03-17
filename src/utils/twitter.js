const { TWITTER_ACCOUNT } = process.env;
import Twitter, { TwitApp } from 'Config/twitterBot';
import { tryCatch } from 'Utils';
import { evaluateResponse } from '../evaluateTwitterReply';


export function getFollowing(userId) {
  return new Promise((resolve, reject) => {
    TwitApp.get('friends/ids',
      { user_id: userId, stringify_ids: true }
    ).then(({ data }) => resolve(data.ids)
    ).catch(console.error)
  });
}

  //
  // post a tweet with media
  //
export function postMedia(status, b64Image1, altText1, b64Image2, altText2) {
  return new Promise(async (resolve, reject) => {
    const mediaId1 = await tryCatch(uploadMedia(b64Image1, altText1));
    const media_ids = [mediaId1];
    if (b64Image2) {
      const mediaId2 = await tryCatch(uploadMedia(b64Image2, altText2));
      media_ids.unshift(mediaId2);
    }

    const params = { status, media_ids, tweet_mode: 'extended', include_ext_alt_text: true };
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
  });
}

export function retrieveAndCountMissedReplies(liveQuestions) {
  return new Promise(async (resolve, reject) => {
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
  });
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
  return new Promise((resolve, reject) => {
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
  });
}
