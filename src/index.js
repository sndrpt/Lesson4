let now = new Date();

function showToday() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = document.querySelector("#detail-today");
  today.innerHTML = `${weekDay}, ${hour}:${minutes}`;
}

showToday();

//Celsius/Fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function showForecast(response) {
  forecastData = response.data.daily;

  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row weekdays-row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                  <div class="col weekday-col">
                    <div class="card weekday-card">
                      ${formatDay(forecastDay.dt)}
                      <br />
                      <br />
                      <span class="temperature-weekday forecast-temp-max">${Math.round(
                        forecastDay.temp.max
                      )}°C</span>
                      <span class="temperature-weekday forecast-temp-min">${Math.round(
                        forecastDay.temp.min
                      )}°C</span>
                      <img src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png" alt=""/>
                    </div>
                  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c0579156688656753a8395372ffe7755";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//Search

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;
  search(city);
}

function search(city) {
  let apiKey = "c0579156688656753a8395372ffe7755";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(showWeather);
}

function showWeather(response) {
  celsiusTemp = response.data.main.temp;

  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#displayed-city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

let enteredCity = document.querySelector("#input-form");
enteredCity.addEventListener("submit", handleSubmit);

search("Szczecin");

//Current location

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "c0579156688656753a8395372ffe7755";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", showLocation);
