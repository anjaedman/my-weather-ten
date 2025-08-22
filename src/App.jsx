import { useState, useEffect } from "react";
import axios from "axios";
import WeatherForm from "./Components/WeatherForm";
import WeatherDisplay from "./Components/WeatherDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("Uppsala"); // standardstad
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false); // styr visning av 5-dygn

  const apiKey = "DIN_API_KEY";

  const fetchWeather = async (cityName) => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=sv`
      );
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=sv`
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
    fetchWeather(city); // laddar Uppsala direkt
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather(city);
      setShowForecast(false); // göm prognos tills man aktivt trycker fram den
    }
  };

  return (
    <div className="App">
      <h1>Vädret</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Skriv stad..."
        />
        <button type="submit">Sök</button>
      </form>

      {error && <p>{error}</p>}

      {/* Alltid dagens prognos */}
      {weather && (
        <WeatherDisplay
          weather={weather}
          forecast={showForecast ? forecast : null}
        />
      )}

      {/* Knapp för att visa/dölja 5-dygn */}
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
