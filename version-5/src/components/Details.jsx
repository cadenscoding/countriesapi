import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Details() {
  const { state: country } = useLocation();
  const [viewCount, setViewCount] = useState(0);

  const API_URL = "https://countriesapi-x8bi.onrender.com";

  useEffect(() => {
    const viewCount = async () => {
      try {
        const response = await fetch(`${API_URL}/click-country/${country.cca3}`, {
          method: "POST",
        });
        const data = await response.json();
        if (response.ok) {
          setViewCount(data.country_count);
        }
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };

    viewCount();
  }, [country.cca3]);

  const saveFlag = async () => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      alert("No user id");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/save-country`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: storedUserId,
          country_code: country.cca3,
          country_name: country.name.common,
          flag: country.flags.svg,
          region: country.region,
          capital: country.capital ? country.capital[0] : null, 
          population: country.population,
        }),
      });

      if (response.ok) {
        alert("Country saved!");
      } else {
        alert("Failed to save country.");
      }
    } catch (error) {
      console.error("Error saving country:", error);
    }
  };

  return (
    <div className="details-container">
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <div className="details-text">
        <h1>{country.name.common}</h1>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>View Count:</strong> {viewCount}</p>
        <button onClick={saveFlag}>Save Country</button>
      </div>
    </div>
  );
}

export default Details;