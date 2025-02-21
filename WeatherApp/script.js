// Define the elements
const searchInput = document.querySelector('.search');
const searchIcon = document.querySelector('.search-icon');
const locationDisplay = document.querySelector('#default-Loc');
const temperatureDisplay = document.querySelector('.temp h2');
const weatherDescriptionDisplay = document.querySelector('.temp h3');
const humidityDisplay = document.querySelector('#hum');
const windSpeedDisplay = document.querySelector('#win');
const humidityIcon = document.querySelector('#humidityimg');
const windIcon = document.querySelector('#windimg');
const weatherIcon = document.querySelector(".weather-icon")
// OpenWeather API key and URL
const apiKey = 'f51eb3cfc888d137d1dbea099d7dc678'
 // Replace with your OpenWeather API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data by city name
async function getWeather(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    
    if (response.ok) {
        const data = await response.json();
        updateWeatherUI(data);
        setDayNightMode(data);
        getLocalTime(data.coord.lat, data.coord.lon);
    } else {
        alert('City not found or invalid.');
    }
}

// Function to update the UI with fetched weather data
function updateWeatherUI(data) {
    // Update the location
    locationDisplay.innerHTML = `<h1>${data.name}</h1>`;
    
    // Update temperature
    temperatureDisplay.textContent = `${Math.round(data.main.temp)} ℃`;
    
    // Update weather description
    weatherDescriptionDisplay.textContent = data.weather[0].description;

    // Update humidity
    humidityDisplay.textContent = `${data.main.humidity}%`;
    
    // Update wind speed
    windSpeedDisplay.textContent = `${data.wind.speed} km/hr`;

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src="images/img/clouds.png"
    } else if(data.weather[0].main == "Clear"){
        weatherIcon.src="images/img/clear.png"
    } else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src="images/img/drizzle.png"
    } else if(data.weather[0].main == "Rain"){
        weatherIcon.src="images/img/rainy.png"
    } else if(data.weather[0].main == "Mist"){
        weatherIcon.src="images/img/mist.png"
    } else if(data.weather[0].main == "Snow"){
        weatherIcon.src="images/img/snow.png" 
    } else if(data.weather[0].main == "wind"){
        weatherIcon.src="images/img/windy.png"
    }

}

async function getLocalTime(lat, lon) {
    const timezoneUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    try {
        const response = await fetch(timezoneUrl);
        const data = await response.json();

        // Get the local time (UNIX timestamp) and timezone offset in seconds
        const localTimeUnix = data.current.dt + data.timezone;  // Adding timezone offset
        const localTime = new Date(localTimeUnix * 1000);  // Convert to milliseconds

        // Display the local time in the #time-display element
        document.getElementById("time-display").textContent = localTime.toLocaleString();
    } catch (error) {
        console.log("Error fetching local time: ", error);
        document.getElementById("time-display").textContent = "Unable to fetch time";
    }
}



// setting the day and night modes based on the timings.

function setDayNightMode(data) {
    const now = new Date();
    const currentTime = now.getTime() / 1000; // current time in UNIX timestamp
    
    // Get the sunrise and sunset times in UNIX format
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    // If current time is between sunrise and sunset, it's day time
    if (currentTime >= sunrise && currentTime <= sunset) {
        document.body.classList.remove('night-mode');
        document.body.classList.add('day-mode');
    } else {
        document.body.classList.remove('day-mode');
        document.body.classList.add('night-mode');
    }
}

// Event listener for the search icon
searchIcon.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
        searchInput.value = ''; // Clear the search input after the search
    } else {
        alert('Please enter a city name.');
    }
});

// Optional: You can trigger the search with 'Enter' key
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
            searchInput.value = '';
        }
    }
});

// Optional: Get weather based on the user's location
navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const response = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    
    if (response.ok) {
        const data = await response.json();
        locationDisplay.innerHTML = `<h1>My Location</h1>`;
        updateWeatherUI(data);
    } else {
        alert('Unable to fetch weather for your location.');
    }
}, (error) => {
    console.log('Error getting location: ', error);
});
