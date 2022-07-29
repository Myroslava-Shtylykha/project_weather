/// Time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


/// Weather future 
function forecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast_future");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Thue", "Wed", "Thur", "Fri", "Sut",];
  days.forEach(function(day) {
forecastHTML = forecastHTML +
  `<div class="col-2">
  <div class="day_future">${day}</div>
            <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="" width="40"> 
           <div class="temperature_future"> 
            <span class="temperature_future_max">27°</span> 
            <span class="temperature_future_min">15°</span> 
            </div>
            </div>
  `;
  })

  

  forecastHTML = forecastHTML + `</div>`;
 forecastElement.innerHTML = forecastHTML;
}




///  Weather, icon

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "79ecd77b9336a83dd439bcbfd2adb260";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 
 
  axios.get(apiUrl).then(forecast);
}

function temperature(response) {
  
  let city = document.querySelector("#city_now");
  let temperatureCity = document.querySelector(".degrees_now");
  let descriptionWeather = document.querySelector(".description");
  let wind = document.querySelector("#wind_card");
  let humidity = document.querySelector("#humidity_card");
  let pressure = document.querySelector("#pressure_card");
  let icon = document.querySelector("#icon");
  let dateElement = document.querySelector(".day_time");

  celsiusTemperature = Math.round(response.data.main.temp);

  city.innerHTML = response.data.name;
  pressure.innerHTML = response.data.main.pressure;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  descriptionWeather.innerHTML = response.data.weather[0].main;
  temperatureCity.innerHTML = Math.round(response.data.main.temp);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "79ecd77b9336a83dd439bcbfd2adb260";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(temperature);
}

function currentSity(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#city");
  search(citySearchElement.value);
}

/// Fahr/Cels

function changeFahrenheit(event) {
  event.preventDefault();
  let degreesNow = document.querySelector(".degrees_now");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  degreesNow.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let degreesNow = document.querySelector(".degrees_now");
  degreesNow.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;




let city = document.querySelector("#city_search");
city.addEventListener("submit", currentSity);

let fahrenheit = document.querySelector("#icon_fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

let celsius = document.querySelector("#icon_celsius");
celsius.addEventListener("click", changeCelsius);

search("Sydney");

/*Поточна геопозиція

function showPosition(position) {
  let apiKey = "79ecd77b9336a83dd439bcbfd2adb260";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(temperature);
}


function getTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".searchGeo");
button.addEventListener("click", getTemp);*/
