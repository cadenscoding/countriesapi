import React from "react";
import { useLocation } from "react-router-dom";
import "./CountryDetails.css"; 


function Details() {
  const location = useLocation();
  const country = location.state;



  return (
    <>

    <div className="details-container">
      <img
        src={country.flags.svg}
        className="details-flag"
      />
      <div className="details-text">
        <h1>{country.name.common}</h1>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    </div>
    </>
  );
}

export default Details;