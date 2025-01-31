
import React from "react";
import { Link } from "react-router-dom";

function CountriesCards({ countries }) {
  return (
    <div className="countries-container">
      {countries.map((country) => (
        <Link
          key={country.cca3}
          to="/Details"
          state={country} 
          className="country-link"
        >
          <div className="country-card">
            <img
              src={country.flags.svg}
              className="country-flag"
              width={100}
            />
            <h3>{country.name.common}</h3>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong>{country.capital ? country.capital[0] : "N/A"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesCards;