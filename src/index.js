//1
let now = new Date();
let date = now.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currently = document.querySelector(".day_time");
currently.innerHTML = `${day} ${hours}:${minutes}`;


//2
function temperature(response) {
let temperature = Math.round(response.data.main.temp);
let temperatureCity = document.querySelector(".degrees_now");
temperatureCity.innerHTML = `${temperature}`;
let cityGeo = document.querySelector("#city_now");
cityGeo.innerHTML = response.data.name;
}


function currentSity(event) {
event.preventDefault();
let textInput = document.querySelector("#city");
let changeCity = document.querySelector("#city_now");
changeCity.innerHTML = `${textInput.value}`;
 let apiKey = "79ecd77b9336a83dd439bcbfd2adb260";
 let units = "metric";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.value}&appid=${apiKey}&units=${units}`;

axios.get(`${apiUrl}`).then(temperature);
}

let city = document.querySelector("#city_search");
city.addEventListener("submit", currentSity);


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
button.addEventListener("click", getTemp);














//3
/*function changeCelsius (event) {
  event.preventDefault();
  degreesNow.innerHTML = `25`;
}
let celsFahr = document.querySelector("#icon_celsius");
let degreesNow = document.querySelector(".degrees_now");
celsFahr.addEventListener("click", changeCelsius);


function changeFahrenheit(event) {
  event.preventDefault();
  degreesNow.innerHTML = ((25 * 1.8) + 32);
}
let fahrenheit = document.querySelector("#icon_fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);*/

//HW W5


/*function temperature(response) {
  let apiKey = "79ecd77b9336a83dd439bcbfd2adb260";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(response.data);


axios.get(apiUrl).then(temperature);
}*/