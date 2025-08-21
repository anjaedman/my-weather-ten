import { useEffect } from "react";
import "./WeatherForm.css"; // ✅ Ny CSS för formuläret

function WeatherForm({ city, setCity, fetchWeather }) {
  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, [setCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    localStorage.setItem("lastCity", city);
    fetchWeather();
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Skriv stad"
        className="city-input"
      />
      <button type="submit" className="search-button">
        Sök
      </button>
    </form>
  );
}

export default WeatherForm;
