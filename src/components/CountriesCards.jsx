import React, { useEffect, useState } from "react";

function CountriesCards(){
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        setCountries(data);
        
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
    {countries.map((country) => (
        <div key={country.cca3}>
          <img src={country.flags.svg} alt={country.name.common} width={100} />
          <h3>{country.name.common}</h3>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
        </div>
      ))}
      </div>
  );
};

export default CountriesCards;