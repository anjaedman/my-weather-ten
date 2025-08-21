import { useState, useEffect } from "react";

function WeatherForm({ city, setCity, fetchWeather }) {
  // När komponenten mountas, hämta sparad stad från localStorage
  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, [setCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return; // Om inget är skrivet, gör inget
    localStorage.setItem("lastCity", city); // Spara stad
    fetchWeather();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "1rem",
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center", // ändrad
        flexWrap: "wrap", // radbryt på mobil
      }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Skriv stad"
        style={{
          textAlign: "center",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #60cd62ff",
          backgroundColor: "#132f14ff",
          flex: "1", // växer med skärmen
          minWidth: "150px", // smalare på mobil
          maxWidth: "300px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4caf50",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Sök
      </button>
    </form>
  );
}

export default WeatherForm;
