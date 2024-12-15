## Project Idea: Weather Dashboard

Let's create a simple weather dashboard using the OpenWeatherMap API. This project will help you learn about fetching data from an API, displaying it in a React component, and using Next.js API routes.

## Step-by-Step Guide

### 1. Set up your Next.js project

First, create a new Next.js project using the following command:

```bash
npx create-next-app@latest my-weather-app
cd my-weather-app
```

### 2. Sign up for OpenWeatherMap API

Go to the OpenWeatherMap website and sign up for a free API key

### 3. Create an API route

In your Next.js project, create a new file `pages/api/weather.js` to handle the API requests

```javascript
import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
```

### 4. Create the main component

Update your `pages/index.js` file to create the weather dashboard:

```javascript
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div className={styles.container}>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
```

### 5. Add styling

You can add some basic styling to your `styles/Home.module.css` file to make your app look better.

### 6. Run your app

Start your development server with:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see your weather dashboard in action!

## Next Steps

Once you've got this basic app working, you can expand on it by:

1. Adding more weather details (e.g., humidity, wind speed)
2. Implementing error handling for invalid city names
3. Adding a 5-day forecast feature
4. Improving the UI with icons for different weather conditions


