import "./WeatherDisplay.css";

function WeatherDisplay({ weather, forecast, showForecast }) {
  const desiredHours = [8, 12, 18, 23];

  const closestHour = (hour) => {
    return desiredHours.reduce((prev, curr) =>
      Math.abs(curr - hour) < Math.abs(prev - hour) ? curr : prev
    );
  };

  // Dagens prognos
  const today = new Date().toISOString().split("T")[0];
  const todayForecastList = forecast
    ? forecast.list.filter((item) => item.dt_txt.startsWith(today))
    : [];

  const todayForecast = {};
  todayForecastList.forEach((item) => {
    const hour = new Date(item.dt * 1000).getHours();
    const ch = closestHour(hour);
    if (!todayForecast[ch]) todayForecast[ch] = item;
  });

  // 5-dygnsprognos per dag
  const forecastByDay = {};
  if (forecast) {
    forecast.list.forEach((item) => {
      const dateObj = new Date(item.dt * 1000);
      const date = dateObj.toISOString().split("T")[0];
      const hour = dateObj.getHours();
      const ch = closestHour(hour);

      if (!forecastByDay[date]) forecastByDay[date] = {};
      if (!forecastByDay[date][ch]) forecastByDay[date][ch] = item;
    });
  }

  const tempClass = (temp) => {
    if (temp <= 5) return "cold";
    if (temp <= 15) return "mild";
    if (temp <= 25) return "warm";
    return "hot";
  };

  return (
    <div className="weather-container">
      <h2>{weather.name}</h2>
      <p className="current-temp">{Math.round(weather.main.temp)}°C</p>
      <p className="current-desc">{weather.weather[0].description}</p>

      {/* Dagens prognos alltid synlig */}
      {Object.keys(todayForecast).length > 0 && (
        <>
          <h3>Dagens prognos</h3>
          <div className="weather-today">
            {Object.entries(todayForecast).map(([hour, item]) => (
              <div key={item.dt} className="weather-card today-card">
                <p className="hour">{hour}:00</p>
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                  alt={item.weather[0].description}
                />
                <p className={`temp ${tempClass(item.main.temp)}`}>
                  {Math.round(item.main.temp)}°C
                </p>
                <p className="desc">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 5-dygnsprognos visas endast om showForecast är true */}
      {showForecast && forecast && (
        <>
          <h3>5-dygnsprognos</h3>
          <div className="forecast-container">
            {Object.entries(forecastByDay).map(([date, hoursObj]) => (
              <div key={date} className="forecast-day">
                <h4>
                  {new Date(date).toLocaleDateString("sv-SE", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
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
                      <p className={`temp ${tempClass(item.main.temp)}`}>
                        {Math.round(item.main.temp)}°C
                      </p>
                      <p className="desc">{item.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherDisplay;
