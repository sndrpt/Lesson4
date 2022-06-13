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

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "5";
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = 5 * 1.8 + 32;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

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
  console.log(response.data);
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
