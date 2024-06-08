import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiFog, WiThunderstorm, WiDrizzle, WiHumidity, WiStrongWind, WiAlien } from 'react-icons/wi';
import { useTheme } from '../ThemeContext';
import city from '../asset/city.jpg';
import city1 from '../asset/city1.jpg';
import background from '../asset/background.jpg';
import background1 from '../asset/background1.jpg';

const Weather = () => {
  const [location, setLocation] = useState('Delhi'); // Default location
  const [weather, setWeather] = useState(null); // Single weather data object
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  
  const { darkMode, toggleDarkMode } = useTheme();
  
  const backgroundImages = [city1, city, background, background1];


  useEffect(() => {
    fetchWeather();
  }, []); // Fetch weather data initially for the default location

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setLoading(false);
       // Change the background image index
    setBackgroundIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <WiDaySunny size={80} />;
      case 'Rain':
        return <WiRain size={80} />;
      case 'Snow':
        return <WiSnow size={80} />;
      case 'Clouds':
        return <WiCloudy size={80} />;
      case 'Fog':
      case 'Mist':
      case 'Haze':
        return <WiFog size={80} />;
      case 'Thunderstorm':
        return <WiThunderstorm size={80} />;
      case 'Drizzle':
        return <WiAlien size={80} />;
      default:
        return <WiDaySunny size={80} />;
    }
  };

  const handleSearch = async () => {
    if (location) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setBackgroundIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
        setError(null);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 404) {
          setError('Location not found. Please try again.');
        } else {
          setError('Could not fetch weather data. Please try again.');
        }
      }
    } else {
      setError('Please enter a valid location.');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-blue-500' : 'bg-gray-100 text-gray-900'}`} style={{ backgroundImage: `url(${backgroundImages[backgroundIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8" style={{ backdropFilter: darkMode ? 'none' : 'transparent', backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.5)' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <h1 className="text-4xl font-bold">Weather App</h1>
          <button onClick={toggleDarkMode} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Update input value state
            placeholder="Enter city name"
            className="border border-gray-300 p-2 rounded-md w-full sm:w-auto flex-grow"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-5 py-3 rounded-md w-full sm:w-auto text-center flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
        {loading && <div className="text-center text-blue-500">Loading...</div>}
        {error && <div className="text-center font-bold mb-4 text-red-500">{error}</div>}
        {weather && (
          <div className={`p-6 rounded-xl shadow-md overflow-hidden mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-3xl font-bold mb-2 text-center">{weather.name}</h2>
            <div className="flex items-center justify-center mb-4">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <p className="text-xl capitalize text-center mb-2">{weather.weather[0].description}</p>
            <p className="text-4xl font-bold text-center mb-2">{weather.main.temp}°C</p>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <p className="text-xl">Humidity</p>
              <WiHumidity size={40} />
              <p className="text-xl">{weather.main.humidity}%</p>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <p className="text-xl">Wind Speed</p>
              <WiStrongWind size={40} />
              <p className="text-xl">{weather.wind.speed} m/s</p>
            </div>
            <p className="text-lg text-center">Date and Time: {new Date().toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
