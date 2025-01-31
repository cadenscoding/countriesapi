import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Details({ fullname }) {
  const { state: country } = useLocation();
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const countryKey = `viewCount-${country.name.official}`;
    const sessionKey = `viewed-${country.name.official}`;

  
    if (!sessionStorage.getItem(sessionKey)) {
      let currentViewCount = parseInt(localStorage.getItem(countryKey)) || 0;
      const newViewCount = currentViewCount + 1;

      
      localStorage.setItem(countryKey, newViewCount);
      sessionStorage.setItem(sessionKey, "true");

      
      setViewCount(newViewCount);
    } else {
      
      setViewCount(parseInt(localStorage.getItem(countryKey)) || 0);
    }
  }, [country.name.common]);

  const saveFlag = () => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    let userFlags = usersData?.savedCountries || [];

    let updatedUserData = {
      ...usersData,
      savedCountries: [
        ...userFlags,
        {
          name: country.name.common,
          flag: country.flags.svg,
          population: country.population,
          region: country.region,
          capital: country.capital,
        },
      ],
    };

    localStorage.setItem("usersData", JSON.stringify(updatedUserData));
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