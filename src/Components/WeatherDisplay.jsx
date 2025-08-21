import "./WeatherDisplay.css";

function WeatherDisplay({ weather }) {
  const desiredHours = [8, 12, 18, 23];
  const today = new Date().toISOString().split("T")[0];

  // Dagens prognos
  const todayForecastList = weather.forecast.list.filter((item) =>
    item.dt_txt.startsWith(today)
  );

  const todayForecast = {};
  todayForecastList.forEach((item) => {
    const dateObj = new Date(item.dt * 1000);
    const hour = dateObj.getHours();
    const closestHour = desiredHours.reduce((prev, curr) =>
      Math.abs(curr - hour) < Math.abs(prev - hour) ? curr : prev
    );
    todayForecast[closestHour] = item;
  });

  // 5-dygnsprognos
  const forecastByDay = {};
  weather.forecast.list.forEach((item) => {
    const dateObj = new Date(item.dt * 1000);
    const date = dateObj.toISOString().split("T")[0];
    const hour = dateObj.getHours();
    const closestHour = desiredHours.reduce((prev, curr) =>
      Math.abs(curr - hour) < Math.abs(prev - hour) ? curr : prev
    );
    if (!forecastByDay[date]) forecastByDay[date] = {};
    forecastByDay[date][closestHour] = item;
  });

  // Funktion för temperaturklass
  const tempClass = (temp) => {
    if (temp <= 5) return "cold";
    if (temp <= 15) return "mild";
    if (temp <= 25) return "warm";
    return "hot";
  };

  return (
    <div className="weather-container">
      <h2>{weather.current.name}</h2>
      <p className="current-temp">{Math.round(weather.current.main.temp)}°C</p>
      <p className="current-desc">{weather.current.weather[0].description}</p>

      <h3>Dagens prognos</h3>
      <div className="weather-today">
        {Object.entries(todayForecast).map(([hour, item]) => (
          <div key={item.dt} className="weather-card">
            <p className="hour">{hour}:00</p>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
              alt={item.weather[0].description}
            />
            <p className="temp" data-temp={tempClass(item.main.temp)}>
              {Math.round(item.main.temp)}°C
            </p>
            <p className="desc">{item.weather[0].description}</p>
          </div>
        ))}
      </div>

      <h3>5-dygnsprognos</h3>
      {Object.entries(forecastByDay).map(([date, hoursObj]) => (
        <div key={date} className="forecast-day">
          <h4>
            {(() => {
              const dateStr = new Date(date).toLocaleDateString("sv-SE", {
                weekday: "short",
                day: "numeric",
                month: "short",
              });
              return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
            })()}
          </h4>
          <div className="weather-day">
            {Object.entries(hoursObj).map(([hour, item]) => (
              <div key={item.dt} className="weather-card">
                <p className="hour">{hour}:00</p>
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                  alt={item.weather[0].description}
                />
                <p className="temp" data-temp={tempClass(item.main.temp)}>
                  {Math.round(item.main.temp)}°C
                </p>
                <p className="desc">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;
