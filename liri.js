var args = process.argv;
var fs = require("fs");
var twitter = require("twitter");
// var spotify = require("spotify");
var request = require("request");

var imdb = require("imdb");
var nameToImdb = require("name-to-imdb");
var logFile = "log.txt";

var myTweets = function()
{
  
};

var spotifyThisSong = function()
{
  
};

var movieId = "";

var movieThis = function()
{
  var movieTitle = "";
  if(args.length > 2)
  {
    for(var i = 3; i < args.length; i++)
    {
  	  movieTitle += args[i];
    }
  }

  if(movieTitle === "")
  {
    movieTitle = "Mr.%20Nobody.";
  }

  // http://www.omdbapi.com/?i=tt3896198&apikey=31c4373a
  // http://www.omdbapi.com/?t=omg&apikey=31c4373a

  // request("http://www.omdbapi.com/?t=omg&apikey=BanMePls",
  request("http://www.omdbapi.com/?t=" + movieTitle + "&apikey=BanMePls",
          function(error, response, body) {
  // If the request was successful...
  if (!error && response.statusCode === 200) {
    // console.log(body);
    var jsonParse = JSON.parse(body);
    // console.log(result);
    var miscRatings = jsonParse.Ratings;
    console.log("\nmiscRatings ...\n" + miscRatings);

    var rottenTomatoes = "";
    for(var i = 0; i < miscRatings.length; i++)
    {
      if(miscRatings[i].Source === "Rotten Tomatoes")
      {
        rottenTomatoes = miscRatings[i].Value;
        // console.log("I found the RottenTomatoes.");
        break;
      }
    }

    var result = "Title:                " + jsonParse.Title +
             "\r\nYear:                 " + jsonParse.Year +
             "\r\nIMDBRating:           " + jsonParse.imdbRating +
             "\r\nRottenTomatoesRating: " + rottenTomatoes +
             "\r\nCountry:              " + jsonParse.Country +
             "\r\nLanguage:             " + jsonParse.Language +
             "\r\nPlot:                 " + jsonParse.Plot +
             "\r\nActors:               " + jsonParse.Actors;

    console.log(result);

    fs.appendFile(logFile, result, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Content Added!");
      }
    });
    /*
    var result = [];
    result.push("Title:                " + jsonParse.Title);
    result.push("Year:                 " + jsonParse.Year);
    result.push("IMDBRating:           " + jsonParse.imdbRating);
    result.push("RottenTomatoesRating: " + rottenTomatoes);
    result.push("Country:              " + jsonParse.Country);
    result.push("Language:             " + jsonParse.Language);
    result.push("Plot:                 " + jsonParse.Plot);
    result.push("Actors:               " + jsonParse.Actors);


    for(var i = 0; i < 8; i++)
    {
      console.log(result[i]);
    }

    for(var i = 0; i < 8; i++)
    {
      fs.appendFile(logFile, result[i], function(err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Content Added!");
        }
      });
    }
    */
  }
});

  /*
  movieId = "";

  nameToImdb({ name: movieTitle }, function(err, res, inf) { 
  	// console.log("This is the movieId lookup pass.");
    console.log("The movieId is " + res); // prints "tt0121955" 
    movieId += res;
    // console.log(inf); // inf contains info on where we matched that name - e.g. locally, or on google 
  });

  setTimeout(getMovie, 3000);

  imdb(movieId, (err, data) => {
    if (err)
      console.log(err.stack);

    if (data)
      console.log(data);
  });
  */
};

var doWhatItSays = function()
{

};

var getMovie = function()
{
  // TODO: OMG!  This API really sux.
  // I need to get a better API here.
  // For some reason,  the API starts bitching about 
  //  whether or not the movieId is right when the API
  // is required.
  // console.log("This is the movie lookup pass.");
  imdb(movieId, (err, data) => {
    if (err)
      console.log(err.stack);

    if (data)
      console.log(data);
  });
};

switch(args[2])
{
  case "my-tweets":         myTweets();
                            break;
  case "spotify-this-song": spotifyThisSong();
                            break;
  case "movie-this":        movieThis();
                            break;
  case "do-what-it-says":   doWhatItSays();
                            break;
  default:
};

