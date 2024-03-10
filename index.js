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

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const units = "imperial";
    const apiKey = "0c258df830517dcb0bb96a6a5d8bad3e";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&APPID=${apiKey}`;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const cloudiness = weatherData.clouds.all;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}.png`;
            res.write("<h1>Weather Information</h1>");
            res.write("<h2>Description: " + weatherDescription);
            res.write(`<img src="${imageURL}">`);
            res.write("<h2>Temperature: " + temp.toFixed(1) + "°F");
            res.write("<h3>Humidity: " + humidity + "%");
            res.write("<h3>Wind Speed: " + windSpeed.toFixed(1) + " mph");
            res.write("<h3>Cloudiness: " + cloudiness + "%");
            res.send();
        });
    });
});
