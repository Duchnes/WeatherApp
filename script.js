const apiKey = '9ce88d4052d2c64d23755ab86497a6f0';
const main = document.getElementById('main');
const form = document.getElementById('form');
const cityname = document.getElementById('cityname');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city));
        if (!resp.ok) throw new Error('Failed to fetch weather data');
        const respData = await resp.json();
        addWeatherToPage(respData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
            ${temp}°C
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        </h2>
        <small>${data.weather[0].main}</small>
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.round(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityname.value.trim();
    if (city) {
        getWeatherByLocation(city);
    } else {
        console.error('Please enter a city name');
    }
});
