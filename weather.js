let currentWeatherData = null;

let currentUnit = "C";

function celciusToFahrenheit(celcius) {
  return (celcius * 9) / 5 + 32;
}

function renderWeather(weatherData) {
  const locationDisplay = document.getElementById("location-display");
  const temperatureDisplay = document.getElementById("temperature-display");
  const humidityDisplay = document.getElementById("humidity-display");

  locationDisplay.textContent = weatherData.location;
  humidityDisplay.textContent = weatherData.humidity;

  let displayTemp;

  if (currentUnit === "F") {
    displayTemp = celciusToFahrenheit(weatherData.temperature);
  } else {
    displayTemp = weatherData.temperature;
  }
  temperatureDisplay.textContent = `${displayTemp.toFixed(1)}°${currentUnit}`;
}

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=JYKB7BTRQZ995LH8CJJARE723&unitGroup=metric&include=current&contentType=json`,
  );
  const data = await response.json();

  const weatherData = getRelevantData(data);

  currentWeatherData = weatherData;
  renderWeather(weatherData);
}

function getRelevantData(data) {
  return {
    location: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    icon: data.currentConditions.icon,
    humidity: data.currentConditions.humidity,
  };
}

const weatherForm = document.getElementById("weather-form");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = document.getElementById("location-input").value;

  getWeatherData(inputValue);
});

const unitToggle = document.getElementById("unit-toggle");
unitToggle.addEventListener("click", () => {
  if (currentUnit === "C") {
    currentUnit = "F";
  } else {
    currentUnit = "C";
  }

  renderWeather(currentWeatherData);
});
