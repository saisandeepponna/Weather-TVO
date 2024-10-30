//Importing necessary libraries like React, axios for API requests and search-icon from react-icons
import React, { useState } from "react";
import axios from "axios";
import { TfiSearch } from "react-icons/tfi";

const Weather = () => {
  //setting up state variables
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch weather data from OpenWeather API
  const fetchWeather = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_WEATHER_URL}/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError("City not found. Please try again.");
    }
  };

  // Handles city input changes and updates the city state
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Submits form and calls the fetchWeather function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  // Function to get the background color class based on temperature range
  const getTemperatureClass = (temp) => {
    if (temp <= 0) return "bg-blue-300";
    if (temp > 0 && temp <= 20) return "bg-green-100";
    return "bg-red-300";
  };

  return (
    <div className="flex flex-col items-center my-12 space-y-6">
      <form
        className="flex flex-row justify-center space-x-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter the city name"
          className="text-gray-700 text-lg font-light p-3 w-72 shadow-lg rounded-lg
          capitalize placeholder:lowercase focus:outline-none"
        />
        <button type="submit">
          <TfiSearch
            size={30}
            className="cursor-pointer transition transform hover:scale-110"
          />
        </button>
      </form>
      <h3 className="text-center space-y-2">
        <p>TVO assessment by Sai Sandeep Ponna</p>
        <p>Contact: ponnasaisandeep@gmail.com</p>
        <p>Happy Halloween :)</p>
      </h3>


      {error && (
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      )}

      {weatherData && (
        <div
          className={`p-6 rounded-lg shadow-lg ${getTemperatureClass(
            weatherData.main.temp
          )} text-center`}
        >
          <h2 className="text-2xl font-bold text-gray-800">
            {weatherData.name}
          </h2>
          <div className=" flex items-center justify-center space-x-4 my-4">
            <img
              src={`${import.meta.env.VITE_WEATHER_IMG}/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-16 h-16"
            />
            <p className="text-4xl font-semibold">
              {Math.round(weatherData.main.temp)}°C
            </p>
          </div>
          <p className="text-lg font-medium capitalize">
            {weatherData.weather[0].description}
          </p>
          <div className="details mt-4 space-y-1">
            <p className="text-gray-500">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-gray-500">Wind: {weatherData.wind.speed} m/s</p>
            <p className="text-gray-500">
              Feels like: {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;