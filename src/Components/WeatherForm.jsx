function WeatherForm({ city, setCity, getWeather }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) getWeather();
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
