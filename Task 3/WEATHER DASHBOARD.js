const apiKey = 'https://api.openweathermap.org/data/2.5/weather?q={perambalur}&appid={API key}';  // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherContainer = document.getElementById('weather-container');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();

        if (weatherData.cod === '404') {
            showError();
        } else {
            showWeatherData(weatherData);
            showForecastData(forecastData);
        }
    } catch (error) {
        showError();
    }
}

function showWeatherData(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherContainer.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function showForecastData(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';  // Clear existing forecast data

    // Filter forecast data to get one forecast per day (e.g., at 12:00 PM)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        const date = new Date(forecast.dt_txt);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        forecastItem.innerHTML = `
            <p>${formattedDate}</p>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Forecast Icon">
            <p>${forecast.main.temp} °C</p>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

function showError() {
    weatherContainer.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

function clearInput() {
    cityInput.value = '';
}
