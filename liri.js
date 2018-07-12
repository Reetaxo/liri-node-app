require("dotenv").config(); 

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// console.log(process.argv[2]);

var command = process.argv[2];

switch(command){
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":

    // case "spotify-this-song '<song name here>'":
    // console.log("you played spotify");
    // console.log(process.argv[3]);
    spotifyThisSong(process.argv[3]);
    break;

    case "OMDB":
    console.log("movies watched");
    break;

    default: 
    console.log("none of those");

}
//  show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets () {
console.log("works");

var params = {screen_name: 'PrettySadityx7'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);

for (i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
    console.log(tweets[i].created_at);
}

  }
});
}

function spotifyThisSong (arg3) {
    console.log("No music");

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(data); 
    });
}


// node liri.js spotify-this-song '<song name here>'

// This will show the following information about the song in your terminal/bash window

// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.