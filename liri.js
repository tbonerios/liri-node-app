var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = keys.spotifyKeys;
var fs = require("fs");
var request = require('request');


var nodeArgs = process.argv;

var movieName = "";

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong(value);
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}

function myTweets() {
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'ANTHONY70518011'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  else {
  	console.log(error);
  }
});
}



// function spotifyThisSong(value){
//   var client = new Spotify(keys.spotifyKeys);

//   if(value === undefined) {
//     var value = "The+Sign";
//   }

//   client.search({ type: 'track', query: value }, function(err, data) {
//     if (err) {
//        console.log(err);
//        return;
//     } 
//       console.log((data.tracks.items[0]));
//   });
// }

function spotifyThisSong(value) {
	var client = new Spotify(keys.spotifyKeys);
	var songName = "";

	for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        songName = songName + "+" + nodeArgs[i];
    } else {
        songName += nodeArgs[i];
    }
  }

  if(songName === undefined) {
    var songName = "The Sign";
  }

  client.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occured ' + err);
    }
    console.log((data.tracks.items[1]));
  });
}



function movieThis() {
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).Rated);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).TomatoMeter);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        //console.log(JSON.stringify(response));
    }
});
}

function doWhatItSays(){

fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    // Print each element (item) of the array/
    console.log(output[i]);
  }
});
}