const baseurl = "http://api.weatherapi.com/v1/current.json?key=1dfeb1fafb7b450a98b143039240803&q=";


document.getElementById("submitButton").addEventListener('click', function() {
    const location = document.getElementById("textInput").value;
    getWeatherDataFromAPI(location);
});

function getWeatherDataFromAPI(location) {
    Promise.all([
        fetch(`http://api.weatherapi.com/v1/current.json?key=1dfeb1fafb7b450a98b143039240803&q=${location}`, { mode: 'cors' }).then(response => response.json()),
        fetch(`http://api.weatherapi.com/v1/marine.json?key=1dfeb1fafb7b450a98b143039240803&q=${location}`, { mode: 'cors' }).then(response => response.json()),
        fetch(`http://api.weatherapi.com/v1/forecast.json.json?key=1dfeb1fafb7b450a98b143039240803&q=${location}`, { mode: 'cors' }).then(response => response.json())
    ])
    .then(function(responses) {
        const [currentWeather, marineWeather, forecastWeather] = responses;
        console.log('Current weather:', currentWeather);
        console.log('Marine weather:', marineWeather);
        console.log('Forecast weather:', forecastWeather);
        fillData(currentWeather, marineWeather, forecastWeather);
    })
    .catch(error => console.error('Error fetching data:', error));
};

function fillData(currentWeather, marineWeather, forecastWeather){
    const weatherConText = document.getElementById("weather_con_text");
    const currentTemp = document.getElementById("current_temp");
    const maxTemp = document.getElementById("max_temp");
    const minTemp = document.getElementById("min_temp");
    const fellsLike = document.getElementById("feels_like");
    const humidity = document.getElementById("humidity");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const windspeed = document.getElementById("wind_speed");
    const windspeedMax = document.getElementById("wind_speed_max");
    const windDirection = document.getElementById("wind_dir");
    const windDegree = document.getElementById("wind_degree");
    const uvIndex = document.getElementById("uv_index");

    weatherConText.textContent = currentWeather.current.condition.text;
    currentTemp.textContent = "Current Temperature: " + currentWeather.current.temp_c;
    maxTemp.textContent = "Maximum Temperature: " + forecastWeather.forecast.forecastday[0].day.maxtemp_c;
    minTemp.textContent = "Minimum Temperature: " + forecastWeather.forecast.forecastday[0].day.mintemp_c;
    fellsLike.textContent = "Feels like: " + currentWeather.current.feelslike_c;
    humidity.textContent = "Humidity: " + currentWeather.current.humidity;
    sunrise.textContent = "Sunrise: " + forecastWeather.forecast.forecastday[0].astro.sunrise;
    sunset.textContent = "Sunset: " + forecastWeather.forecast.forecastday[0].astro.sunset;
    windspeed.textContent = "Wind Speed: " + currentWeather.current.wind_kph;
    windspeedMax.textContent = "Maximum Wind Speed: " + forecastWeather.forecast.forecastday[0].day.maxwind_kph; 
    windDirection.textContent = "Wind Direction: " + currentWeather.current.wind_dir;
    windDegree.textContent = "Wind Degree: " + currentWeather.current.wind_degree;
    uvIndex.textContent = "UV-Index: " + currentWeather.current.uv;
}

