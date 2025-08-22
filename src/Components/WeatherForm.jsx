function WeatherForm({ city, setCity, getWeather }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // hindrar sidan från att ladda om
    if (city.trim()) {
      getWeather(); // ✅ anropar getWeather utan att skicka event
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ange stad"
        className="weather-input"
      />
      <button type="submit" className="weather-button">
        Sök
      </button>
    </form>
  );
}

export default WeatherForm;
