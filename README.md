# weather-api

A simple weather application that displays current weather and a 5-day forecast using the OpenWeatherMap API. This project is built using HTML, CSS, and JavaScript.

## Features

- Displays current weather conditions including temperature, weather condition, humidity, and wind speed.
- Shows a 5-day weather forecast with daily high and low temperatures.
- Updates weather information based on the user's current location.
- Uses the OpenWeatherMap API to fetch weather data.

## Demo

Check out the live demo [here](https://your-username.github.io/weather-app/).

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/weather-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd weather-app
    ```
3. Open `index.html` in your web browser to view the app locally.

## Usage

- Upon loading, the app will request access to your location to display the weather information.
- If location access is denied, it will default to a fallback location (Skudai, Johor).
- The weather information is fetched from the OpenWeatherMap API.

## Configuration

You need an API key from OpenWeatherMap to use this app. Replace the placeholder API key in `main.js` with your own API key.

```javascript
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
