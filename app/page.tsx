'use client'; // This is needed because we're using useState

import { useState } from 'react';

export default function Home() {
  // State to store the city name and weather data
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) return; // Don't fetch if city is empty

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
      
      if (data.error) {
        setError('City not found. Please try again.');
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Weather Dashboard
      </h1>

      {/* Search Section */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {/* Weather Display */}
      {weather && !error && (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{weather.name}</h2>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Temperature</span>
              <span className="text-xl">{Math.round(weather.main.temp)}°C</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Weather</span>
              <span className="text-xl capitalize">
                {weather.weather[0].description}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Humidity</span>
              <span className="text-xl">{weather.main.humidity}%</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Wind Speed</span>
              <span className="text-xl">{weather.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
