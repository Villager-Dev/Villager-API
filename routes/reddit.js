const Express = require('express');
const Axios = require('axios');

const router = Express.Router();

var imagesCache = []; // should be dictionary of lists {'subreddits': []}
var lastUpdate;

function updateCache(subreddits, limit) {
  Axios.get(`https://reddit.com/r/${subreddits}/hot/.json?limit=${limit}`)
  .then(redditRes => {
    if (redditRes.status != 200) {
      return false;
    }

    imagesCache[subreddits] = [];
    let posts = redditRes.data.data.children;

    console.log('got posts');

    for (i = 0; i < posts.length; i++) {
      let postData = posts[i].data;

      if (!(postData.removal_reason || postData.is_video || postData.pinned || postData.stickied || postData.selftext)) {
        imagesCache[subreddits].push({
          id: postData.id,
          subreddit: postData.subreddit,
          author: postData.author,
          title: postData.title,
          permalink: 'https://reddit.com' + postData.permalink,
          url: postData.url,
          upvotes: postData.ups,
          downs: postData.downs,
          nsfw: postData.over_18,
          spoiler: postData.spoiler
        });
      }
    }

    console.log('after for loop')

    return true;
  })
  .catch(e => {
    console.log(e);
    return false;
  });
}

router.get('/gimme/:subreddits', (req, res) => {
  let subreddits = req.params.subreddits;

  console.log(imagesCache[subreddits]);

  if (((new Date()) - lastUpdate) / 1000 >= 60 || imagesCache[subreddits] === undefined || imagesCache[subreddits].length < 1) { // update cache if last update 30 seconds or more ago or cache is empty
    let success = updateCache(subreddits, 10);

    console.log(imagesCache[subreddits]);

    let post = imagesCache[subreddits][Math.floor(Math.random() * imagesCache[subreddits].length)];
    res.status(200).json(Object.assign({}, {success: true}, post));

    if (success) {
      updateCache(subreddits, 75);
    }
  } else {
    let post = imagesCache[subreddits][Math.floor(Math.random() * imagesCache[subreddits].length)];
    res.status(200).json(Object.assign({}, {success: true}, post));
  }
});

module.exports = router;
