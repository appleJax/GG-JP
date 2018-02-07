const Twitter = require('../twitterConfig');
const { tryCatch } = require('Utils/utils');

module.exports = {

  //
  // post a tweet with media
  //
  postMedia(status, b64Image1, altText1, b64Image2, altText2) {
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
          questionId:       data.id_str,
          questionPostedAt: data.created_at,
          mediaUrls
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
