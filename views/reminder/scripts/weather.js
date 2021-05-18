

// weather javascript
function weatherBalloon(cityName) {
    const key = '10aba6b846030ba580871513e9aea6d5';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            drawWeather(data)
        })
}

function drawWeather(d) {
    const celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    const description = d.weather[0].description;
    const calendar_picture = document.querySelector(".calendar-picture");

    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;

    if (description.indexOf('rain') > 0) {
        calendar_picture.classList.add("rainy");
    } else if (description.indexOf('cloud') > 0) {
        calendar_picture.classList.add("cloudy");
    } else if (description.indexOf('sunny') > 0) {
        calendar_picture.classList.add("sunny");
    }
}

function pageLoaded() {
    // This is hardcoded atm, possible in future to make it find city nearby
    weatherBalloon( "Vancouver,CA" );
}