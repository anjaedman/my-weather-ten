import { useState } from "react";
import axios from "axios";
import WeatherForm from "./Components/WeatherForm";
import WeatherDisplay from "./Components/WeatherDisplay";
import "./App.css"; // ✅ All CSS här

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "74f90edf917d0ac2f26cad59accec277";

  const fetchWeather = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather({
        current: response.data,
        forecast: forecastResponse.data,
      });
    } catch (err) {
      setWeather(null);
      setError("Stad hittades inte");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Vädret</h1>
      <WeatherForm city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {error && <p className="error-message">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
