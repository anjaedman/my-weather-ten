import { useState } from "react";
import axios from "axios";
import WeatherForm from "./Components/WeatherForm";
import WeatherDisplay from "./Components/WeatherDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "74f90edf917d0ac2f26cad59accec277";

  const fetchWeather = async () => {
    try {
      setError(null); // Reset error state
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74f90edf917d0ac2f26cad59accec277&units=metric`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=74f90edf917d0ac2f26cad59accec277&units=metric`
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
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif",
        backgroundColor: "rgb(6, 24, 10)", // ✅ din bakgrund
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Vädret
      </h1>
      <WeatherForm city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
