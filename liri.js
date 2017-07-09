var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = keys.spotifyKeys;
var fs = require("fs");
var request = require('request');
var random = require('./random.js');

var nodeArgs = process.argv;

var movieName = "";

var action = process.argv[2];
var value = process.argv[3];
var output;


function myTweets() {
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'ANTHONY70518011'};
var counter = 0;

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for(var i = 0; i < tweets.length; i++)  {
        output = ('\n' + '@' + params.screen_name + ' said ' + tweets[i].text + ' at ' + tweets[i].created_at +'\n');
        console.log(output);
        // append();
      }
    } else {
      console.log('twitter error');
    }
});
}



function spotifyThisSong(value) {
  var client = new Spotify(keys.spotifyKeys);
  var thisSong = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        thisSong = thisSong + "+" + nodeArgs[i];
    } else {
        thisSong += nodeArgs[i];
    }
  }

  if(value == undefined) {
    var value = "The Sign Ace of Base";
  }

  client.search({ type: 'track', query: value }, function(err, data) {
   var thisSong;
      if(!err && (data.tracks.items.length >= 1)) {
        thisSong = data.tracks.items[0];
        var artistConcat = thisSong.artists[0].name;
        for(var a = 1; a < thisSong.artists.length; a++) {
          artistConcat += ', ' + thisSong.artists[a].name;
        }
        output = ('\nSong Info \n\nArtist: ' + artistConcat + '\n\nSong Title: ' + thisSong.name + '\n\nOriginal Album: ' + thisSong.album.name + '\n\nPreview: ' + thisSong.preview_url + '\n');
        console.log(output);
        append();
      
      } else {
        console.log('spotify error or there is no song matching that title.');
      }
    });
}



function movieThis() {
  // I can't seem to get the undefined to work.
    if(value == undefined) {
    var value = "Mr Nobody";
  }
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
        // I can't figure out the tomatorating response
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).rottentomatoesrating);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        //console.log(JSON.stringify(response));
    } else {
      console.log("If you haven't watched Mr. Nobody, then you should 'http://www.imdb.com/title/tt0485947/' It's on Netflix!");
    }
});
}
function doWhatItSays() {

  var pickRandom = Math.floor(Math.random() * random.commands.length);
  action = random.commands[pickRandom].comm;
  value = random.commands[pickRandom].argu;
  output = ("\nyou've selected the random command " + random.commands[pickRandom].comm + " to learn more about " + random.commands[pickRandom].argu + '.\n');
choose();
append();
}

function choose() {
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
}

function append() {
  fs.appendFile('log.txt', output, function callback(error) {
    if(!error) {
      console.log('this data has been added to your log.');
    } else {
      console.log("sorry, the data didn't write to file.");
    }
  });
}

choose();
