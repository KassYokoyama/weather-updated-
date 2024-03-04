const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var cityName = String(req.body.cityNameInput);
        console.log(req.body.cityInput);
    
        
        const units = "imperial";
        const apiKey = "0c258df830517dcb0bb96a6a5d8bad3e";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&APPID=" + apiKey; // Build the URL for the JSON query
     // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windGust = weatherData.wind.gust;
            const sunrise = weatherData.sys.sunrise;
            const sunset = weatherData.sys.sunset;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            
            
            
            
            // displays the output of the results
            res.write("<h1>The weather in " + city + " is " + weatherDescription);
            res.write("<img src=" + imageURL +">");
            res.write("<h2>Temperature: " + temp.toFixed(1) + " Degrees Fahrenheit");
            res.write("<h3>Feels Like : " + feelsLike.toFixed(1) + " Degrees Fahrenheit");
            res.write("<h4>Humidity: " + humidity + "%");
            res.write("<h4>Wind Speed: " + windSpeed.toFixed(1) + " miles/hour");
            res.write("<h4>Wind Gust: " + windGust + " miles/hour");
            res.write("<h4>Sunrise: " + sunrise);
            res.write("<h4>Sunset: " + sunset);
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
