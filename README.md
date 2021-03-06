## LIRI- Language Interpretation and Recognition Interface

## ABOUT LIRI
LIRI (not SIRI) is a command line node application that takes in parameters and gives back data. The user can use four commands to return specific data. These are the commands:

* concert-this

* spotify-this-song

* movie-this

* do-what-it-says

## HOW TO USE LIRI

* Clone the repo to your terminal
* Run npm Install
* Cd into the folder you just created
* Input command using syntax node liri.js "command" "movie/song/band"

## EXAMPLES

EXAMPLE 1:

Input "node liri.js concert-this journey" to see a (long) list of upcoming events for the rock band Journey with the venue name, city, and date included.


![2019-12-18 (5)](https://user-images.githubusercontent.com/55059602/71144269-14e3fd00-21e3-11ea-9141-85f01799ce56.png)

EXAMPLE 2:

Input "node liri.js movie-this cinderella" to show information on the first result for "Cinderella".

![2019-12-18 (6)](https://user-images.githubusercontent.com/55059602/71145227-79ed2200-21e6-11ea-8dd3-940352e7edef.png)


## TECHNOLOGIES USED

* Javascript
* Node.js
* Node Packages:
    * Node-Spotify-API
    * Axios
    * DotEnv
* APIs used:
    * Bands in Town
    * OMDB
