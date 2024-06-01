document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '9f2a08c252911f3a9584a1bc4b337561'; // Replace with your OpenWeatherMap API key

    // Function to set weather icon based on weather condition
    function setWeatherIcon(element, weatherCondition) {
        console.log(`Setting icon for condition: ${weatherCondition}`); // Debug log
        switch (weatherCondition) {
            case 'Clouds':
                element.src = 'images/cloudy-icon.png';
                break;
            case 'Clear':
                element.src = 'images/sun-icon.png';
                break;
            case 'Rain':
                element.src = 'images/rain-icon.png';
                break;
            case 'Thunderstorm':
                element.src = 'images/thunderstorm-icon.png';
                break;
            default:
                element.src = 'images/unknown.png';
        }
    }

    // Function to capitalize each word in a string
    function toTitleCase(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Function to update today's date
    function updateTodayDate() {
        const today = moment().format('dddd, D MMMM YYYY');
        document.getElementById('todayDate').textContent = today;
    }

    // Function to fetch weather data based on latitude and longitude
    function fetchWeather(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
                document.querySelector('.current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
                document.querySelector('.condition').textContent = toTitleCase(data.weather[0].description);
                document.querySelector('.weather-item .value').textContent = `${data.main.humidity}%`;
                document.querySelector('.weather-item:nth-child(2) .value').textContent = `${data.wind.speed} km/h`;
                const weatherIcon = document.querySelector('.w-icon');
                setWeatherIcon(weatherIcon, data.weather[0].main);
            });

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const forecastContainer = document.querySelector('.forecast');
                const forecastList = data.list;
                const dailyForecasts = {};

                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
                const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // Format tomorrow's date as 'yyyy-mm-dd'

                forecastList.forEach((reading) => {
                    const date = reading.dt_txt.split(' ')[0];
                    if (date >= tomorrowDateString) {
                        if (!dailyForecasts[date]) {
                            dailyForecasts[date] = {
                                icon: reading.weather[0].main,
                                minTemp: reading.main.temp_min,
                                maxTemp: reading.main.temp_max
                            };
                        } else {
                            if (reading.main.temp_min < dailyForecasts[date].minTemp) {
                                dailyForecasts[date].minTemp = reading.main.temp_min;
                            }
                            if (reading.main.temp_max > dailyForecasts[date].maxTemp) {
                                dailyForecasts[date].maxTemp = reading.main.temp_max;
                            }
                        }
                    }
                });

                let forecastHTML = '';
                Object.keys(dailyForecasts).forEach(date => {
                    forecastHTML += `
                        <div class="forecast-card">
                            <div class="day">${moment(date).format('ddd')}</div>
                            <img src="" alt="weather icon" class="f-icon" data-weather="${dailyForecasts[date].icon}">
                            <div class="temp">Day - ${Math.round(dailyForecasts[date].maxTemp)}&deg;C</div>
                            <div class="temp">Night - ${Math.round(dailyForecasts[date].minTemp)}&deg;C</div>
                        </div>
                    `;
                });

                forecastContainer.innerHTML = forecastHTML;

                // Set icons for forecast cards
                document.querySelectorAll('.f-icon').forEach(icon => {
                    setWeatherIcon(icon, icon.getAttribute('data-weather'));
                });
            });
    }

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon);
        }, error => {
            console.error('Error getting location: ', error);
            // Fallback location (e.g., Skudai, Johor) if location access is denied or fails
            const fallbackLat = 1.5377;
            const fallbackLon = 103.6572;
            fetchWeather(fallbackLat, fallbackLon);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Fallback location (e.g., Skudai, Johor) if geolocation is not supported
        const fallbackLat = 1.5377;
        const fallbackLon = 103.6572;
        fetchWeather(fallbackLat, fallbackLon);
    }

    //Back button interaction
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'https://www.figma.com/proto/qdZu3kGqiyiSoPB7sLTUrc/prototype?page-id=109%3A553&node-id=491-4549&viewport=3223%2C1725%2C0.53&t=eEuM4sqM4VrzoEHW-1&scaling=scale-down&starting-point-node-id=323%3A5415';
    });

    // Update today's date
    updateTodayDate();
});
