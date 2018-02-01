const Twitter = require('../twitterConfig');
const { tryCatch } = require('Utils/utils');

module.exports = {

  //
  // post a tweet with media
  //
  postMedia(status, b64Image1, altText1, b64Image2, altText2) {
    return new Promise(async (resolve, reject) => {
      const media_id1 = await tryCatch(uploadMedia(b64Image1, altText1));
      const media_ids = [media_id1];
      if (b64Image2) {
        const media_id2 = await tryCatch(uploadMedia(b64Image2, altText2));
        media_ids.unshift(media_id2);
      }

      const params = { status, media_ids };
      Twitter.post('statuses/update', params, (err, data, response) => {
        if (err) {
          console.error(err)
          reject("Posting status failed.");
        };
        const result = {
          questionId:       data.id_str,
          questionPostedAt: data.created_at
        };
        resolve(result);
      });
    });
  },

  getFollowing(userId) {
    return new Promise((resolve, reject) => {
      Twitter.get('friends/ids', { userId }, (err, data, response) => {
        if (err) console.error(err);
        resolve(data.ids);
      });
    });
  }

} // module.exports


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
        reject("Media upload failed.")
        return;
      }
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      const mediaIdStr = data.media_id_string;
      const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      Twitter.post('media/metadata/create', meta_params, (err, data, response) => {
        if (err) {
          console.error(err);
          reject("Media upload succeeded, media creation failed.");
        }
        // now we can reference the media and post a tweet (media will attach to the tweet)
        resolve(mediaIdStr);
      });
    });
  });
}
