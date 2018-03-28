// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
// var request = require('request');
// var twitter = require('twitter');
// var spotify = require('spotify');
// var keys = require("./keys.js");

// var twitterKeys = keys.twitterKeys;

// //twitter

// var client = new Twitter({
//     consumer_key: twitterKeys.consumer_key,
//     consumer_secret: twitterKeys.consumer_secret,
//     access_token_key: twitterKeys.access_token_key,
//     access_token_secret: twitterKeys.access_token_secret
//   });
var fs = require("fs");

//request npm package
var request = require("request");

//import npm package Twitter
var Twitter = require('twitter');

//node-spotify-api
var Spotify = require('node-spotify-api');

//authenticate from keys.js
var keys = require('./keys.js');
var T = new Twitter(keys);

//Grab all of the command line arguments from Node
var cmd = process.argv[2];
var option1 = process.argv[3];

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Look at the initial CLI parameter and execute code based on that parameter
if (cmd === "my-tweets") {
// This will show your last 20 tweets and when they were created in your terminal/bash window.
getTweets();

} else if (cmd === "spotify-this-song") {
	// If the process.argv[3] value exists (same as option1 != null)
	if (option1) {
        getSpotify(option1); //Run the function (below) with the song name
    } else {
        getSpotify("Ace of Base"); //Otherwise run the default song
    }

} else if (cmd === "movie-this") {
	if(option1) {
		var nodeArgs = process.argv.slice(2).join(' '); //concats if there are multiple word arguments
		movieName = option1;
		getMovie(); //Run the function (below) with the song name
	} else {
		movieName = "Mr.Nobody"; //Otherwise return the default movie 
		getMovie();
	} 

} else if (cmd === "do-what-it-says") {
	readFile(); //Function Below
	} else {
		console.log("Your instructions could not be understood.  Please check random.txt and try again.");

} 

//create function called getTweets
function getTweets() {
	var params = {
		screen_name: "Jozie_68",
		trim_user: true,
		count: 20
	};

//returns a collection of the most recent Tweets posted by the user indicated by the screen_name parameters
console.dir(cmd);
T.get('statuses/user_timeline', params, function(error, tweets, response) {		
	if (!error && response.statusCode === 200) 
		tweets.forEach(function(t) {
			console.log(t.text);
			console.log('----------------');
		});
	});

} //end getTweets function

//1)Artists(s), 2)song's name, 3)a preview link of the song from spotify, 4)the album that the song is from												                                    
function getSpotify(input) {
	var spotify = new Spotify({
		id: '97d05772cd42485c99ac65c34863e799',
		secret: 'c641361037b04989a03cb145b551e04e',
	});
//Search for song if input parameter exists 
if (input) {
	spotify.search ({ 
		type: 'track',
		query: input
	}, function(err, data) {
			//Let the user know if they encountered an error 
			if (err) {
			return console.log('Error occurred: ' + err);
			}
			// 1) Artist
			console.dir("Artist: " + data.tracks.items[0].album.artists[0].name); 
			console.log('----------------');
			// 2) Song
			console.dir("Song: " + data.tracks.items[0].name);
			console.log('----------------');
			// 3) A preview link of the song from Spotify 
			console.dir("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
			console.log('----------------');
			// 4) Album that the song is from
			console.dir("The album that the song is from: " + data.tracks.items[0].album.name);
			console.log('----------------');

		}); //end spotify.search	

//If not track is available then default to the "The Sign" by Ace of Base	
} else {
	spotify.search({
		type: 'track',
		query: input	
	}, function(err, data) {
		if (err) {
            //Let the user know if they encountered an error
            return console.log("song cannot be found " + err);
        }
            // 1) Artist
            console.dir("Artist: " + data.tracks.items[0].album.artists[0].name); 
            console.log('----------------');
			// 2) Song
			console.dir("Song: " + data.tracks.items[0].name);
			console.log('----------------');
			// 3) A preview link of the song from Spotify 
			console.dir("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
			console.log('----------------');
			// 4) Album that the song is from
			console.dir("The album that the song is from: " + data.tracks.items[0].album.name);
			console.log('----------------');

		});// end spotify search
	
	} //end getSpotify

} //end getSpotify function

//getMovie function 
function getMovie() {

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.dir(queryUrl);

request(queryUrl, function(error, response, body) {

 // If the request is successful
 if (!error && response.statusCode === 200) {

 	var omdb = JSON.parse(body, null, 2);

 	console.dir("Title of the movie: " + omdb.Title);
 	console.dir("Year the movie came out: " + omdb.Year);
 	console.dir("imdbRating: " + omdb.imdbRating);
 	console.dir("Rotten Tomatoes Rating of the movie: " + omdb.Ratings[1].Value);
 	console.dir("Language: " + omdb.Language);
 	console.dir("Plot: " + omdb.Plot);
 	console.dir("Actors: " + omdb.Actors);

 		}	

	});

} // end getMovie function

function readFile() {

//Use fs to read info from a local file
fs.readFile("random.txt", "utf-8", function(error, data) {

// If the code experiences any errors it will log the error to the console.
if (error) {
	return console.log(error);
}

// Then split the text into an array by commas (to make it more readable) and trim white spaces
var dataArr = data.trim().split(",");

// We will then re-display the content as an array for later use.
console.log(dataArr);
	

	});

}