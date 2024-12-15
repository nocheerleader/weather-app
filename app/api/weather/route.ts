// Import NextResponse to handle API responses in Next.js
import { NextResponse } from 'next/server';

// Define a GET function that will handle incoming requests to this API route
// The 'async' keyword means this function can use 'await' for promises
export async function GET(request: Request) {
  // Create a URL object from the incoming request URL
  // Then destructure to get just the searchParams part
  const { searchParams } = new URL(request.url);
  
  // Get the 'city' parameter from the URL
  // Example: /api/weather?city=London would get 'London'
  const city = searchParams.get('city');
  
  // Get your API key from environment variables (.env.local file)
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    // Fetch weather data from OpenWeatherMap API
    // Using template literals (``) to insert city and apiKey into the URL
    // 'units=metric' gives us temperature in Celsius
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    // Convert the response to JSON format
    const data = await response.json();
    
    // Return the weather data as a JSON response
    return NextResponse.json(data);

  } catch (error) {
    // If anything goes wrong (like API is down or network issues)
    // Return an error message with a 500 status code
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
