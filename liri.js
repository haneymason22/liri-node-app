require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");

var Spotify = require('node-spotify-api');
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
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function(response) {
        
        console.log(response.data.Year)
    });
    


}
    



function song() {
    var songName = "";
    if (input === undefined) {
      songName = 'The Sign Ace of Base'
    } else {
      songName = input;
    }
    console.log(`--------------------`);
    console.log(`Here's what I found about the song!`)
    spotify.search({ type: 'track', query: song }, function (error, data) {
      if (!error) {
        console.log(`Song: ${data.tracks.items[0].name}`);
        console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
        console.log(`Album: ${data.tracks.items[0].album.name}`);
        console.log(`Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
        var songData = `\nUsed spotify-this-song to find: \nArtist: ${data.tracks.items[0].artists[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: ${data.tracks.items[0].album.name}\n--------------------`
        fs.appendFile('log.txt', songData, function (error) {
          if (error) throw error;
        });
      }
    });
  }
  





function movie() {
    var movieName = process.argv[3];

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
          console.log("Movie Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Score: " + response.data.Rating);
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

