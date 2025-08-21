import { useState } from "react";
import axios from "axios";
import WeatherForm from "./Components/WeatherForm";
import WeatherDisplay from "./Components/WeatherDisplay";
import "./WeatherApp.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "DIN_API_KEY_HÄR";

  const getWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=sv`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Kunde inte hitta staden, försök igen.");
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Väderapp</h1>
      <WeatherForm city={city} setCity={setCity} getWeather={getWeather} />
      {error && <p>{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
