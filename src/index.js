// Function to fetch weather data and update the HTML elements
function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#weather-conditions");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#windspeed");
    let timeElement = document.querySelector("#time");
    let dayElement = document.querySelector("#day");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="images/clear-sunny.png" class="weather-app-icon" width="150"/>`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatTime(date);
    dayElement.innerHTML = formatDay(date);
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    getForecast(response.data.city);
    console.log(response.data);
}
// Function to format time from timestamp data to actual time
function formatTime(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
 }

 function formatDay(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days [date.getDay()];
    return `${day}`;
 }

function searchCity(city) {
    let apiKey = "2f78437a500ef24fc3e9894233eftb0o";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city) {
let apiKey = "2f78437a500ef24fc3e9894233eftb0o";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);

}
function displayForecast(response) {
    console.log(response.data);
    
    let forecastHtml = ""; 

    response.data.daily.forEach(function (day, index) {
        if (index > 0 && index < 6) {
        forecastHtml = 
        forecastHtml +
        `
        <div class="weather-forecast-data">
        <div class="weather-forecast-day">${formatForecastDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">${Math.round(day.temperature.maximum)}°<span class="temp-low">${Math.round(day.temperature.minimum)}°</span></div>
        </div>
        `;
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Stockholm");
getForecast("Stockholm");
