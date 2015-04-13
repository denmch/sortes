// Requirements
var Twit = require('twit');
var request = require('request');

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY
, consumer_secret:      process.env.CONSUMER_SECRET
, access_token:         process.env.ACCESS_TOKEN
, access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

var callback = function handleError(error) {
   if (error) {
   console.error('response status:', error.statusCode);
   console.error('data:', error.data);
  }
};

// Listen for mentions
function startStreaming() {
  var stream = T.stream('statuses/filter', { track: '@LotsByVergil', in_reply_to_status_id: null });

  stream.on('tweet', function(tweet) {

// Get a random line from the Aeneid
    request({url: 'http://api.aeneid.eu/sortes?version=latin', json: true}, function(err, res, json) {
    // Post it in reply
      T.post('statuses/update', { status: '@' + tweet.user.screen_name + " " + json["book"] + ". " + json["start_line"] + ": \n" + json["text"] , in_reply_to_status_id: tweet.id_str
      }, function(err, data, response) {
        console.log(data)
      })
    });
  });
};

startStreaming();