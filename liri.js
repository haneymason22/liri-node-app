require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");
var moment = require("moment")

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var command = process.argv[2]

switch (command) {
    case "concert-this":
      concert();
      break;
    case "spotify-this-song":
      song();
      break;
    case "movie-this":
      movie();
      break;
    case "do-what-it-says":
      followDirections();
      break;
};
  

var input = process.argv[3]



function concert() {
    var artistName = process.argv[3]

    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("City: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + moment(response.data[i].datetime).format("L"));
            }
        
        })
        .catch(function(error) {
          if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            
            console.log("Error", error.message);
          }
          console.log(error.config);
        });

}
    



function song() {
    if (!input) {
        input = "The Sign Ace of Base";
    }

    spotify.search({type: "track", query: userQuery}, function(err, data) {
        if (err) {
            logThis(err);
        }

        var userSong = data.tracks.items;
        logThis("Artist: " + userSong[0].artists[0].name);
        logThis("Song Name: " + userSong[0].name);
        logThis("Preview Link: " + userSong[0].preview_url);
        logThis("Album: " + userSong[0].album.name);
    });
};

  





function movie() {

    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    
    var movieName = process.argv[3];

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
          console.log("Movie Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        })
        .catch(function(error) {
          if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      
}

function followDirections() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
      if (error) {
        console.log(error);
      } else {
        var dataArray = data.split(',');
        var dataCommand = dataArray[0];
        var dataInput = dataArray[1];
        console.log("Hold on. Let me read the file.")
        switch (dataCommand) {
          case "concert-this":
            concert();
            break;
          case "spotify-this-song":
            input = dataInput;
            song();
            break;
          case "movie-this":
            input = dataInput;
            movie();
            break;
          default:
            console.log("Something went wrong!")
        }
      }
    })
  }

