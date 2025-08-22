import { useState, useEffect } from "react";
import axios from "axios";
import WeatherForm from "./Components/WeatherForm";
import WeatherDisplay from "./Components/WeatherDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("Långshyttan");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  const apiKey = "74f90edf917d0ac2f26cad59accec277";

  const fetchWeather = async (cityName) => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=74f90edf917d0ac2f26cad59accec277&units=metric&lang=sv`
      );
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=74f90edf917d0ac2f26cad59accec277&units=metric&lang=sv`
      );
      setForecast(forecastRes.data);

      setError(null);
    } catch (err) {
      setError("Kunde inte hämta vädret, kontrollera stadsnamnet.");
      setWeather(null);
      setForecast(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
      setShowForecast(false);
    }
  };

  return (
    <div className="App">
      <h1>Vädret</h1>
      <WeatherForm city={city} setCity={setCity} getWeather={handleSearch} />
      {error && <p>{error}</p>}
      {weather && forecast && (
        <WeatherDisplay
          weather={weather}
          forecast={showForecast ? forecast : null}
        />
      )}
      {forecast && (
        <button
          className="toggle-btn"
          onClick={() => setShowForecast(!showForecast)}
        >
          {showForecast ? "Dölj 5-dygnsprognos" : "Visa 5-dygnsprognos"}
        </button>
      )}
    </div>
  );
}

export default App;
