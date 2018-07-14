require("dotenv").config(); 

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");


var keys = require("./keys");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(process.argv[2]);

var command = process.argv[2];

var stuff =  process.argv.slice(3).join("+");

var movieName = process.argv.slice(4).join("+");

switch(command){
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":

    // case "spotify-this-song '<song name here>'":
    // console.log("you played spotify");
    // console.log(process.argv[3]);
    // spotifyThisSong(process.argv[3]);
    spotifyThisSong();
    break;

    case "movie-this":
    myMovies();
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

function spotifyThisSong () {
    console.log("No music");

spotify.search({ type: 'track', query: stuff }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log("****************************")
    // Artist(s)
    console.log("The Artist(s) name is: " + data.tracks.items[0].artists[0].name);

    // The song's name
    console.log("The song's name: " + data.tracks.items[0].name); 

    // The album that the song is from
    console.log("The album that the song is from: " + data.tracks.items[0].album.name);

    // A preview link of the song from Spotify
    console.log("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
    // console.log(data.tracks.items[0]); 
    // console.log("The realease date of this song is: " + data.tracks.items[0].album.release_date); 

    });
    
}

function myMovies(){ 
    console.log(queryUrl);
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {

// * Title of the movie.
    console.log("Title of the movie: " + JSON.parse(body).Year);
// * Year the movie came out.
    console.log("Release Year: " + JSON.parse(body).Year);
// * IMDB Rating of the movie.
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
 // * Rotten Tomatoes Rating of the movie.

 // * Country where the movie was produced.

 // * Language of the movie.

 // * Plot of the movie.

 // * Actors in the movie.
  }
});
}

