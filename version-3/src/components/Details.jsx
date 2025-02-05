import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ref, get, set, update } from "firebase/database";

function Details({ db }) {
  const { state: country } = useLocation();
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchViewCount = async () => {
      const countryRef = ref(db, `users/savedCountries/${country.name.common}/viewCount`);
      const snapshot = await get(countryRef);

      if (snapshot.exists()) {
        setViewCount(snapshot.val() + 1);
      } else {
        setViewCount(1);
      }

      
      update(ref(db, `users/user1/savedCountries/${country.name.common}`), {
        viewCount: snapshot.exists() ? snapshot.val() + 1 : 1,
      });
    };

    fetchViewCount();
  }, [db, country.name.common]);

  const saveCountry = async () => {
    const userRef = ref(db, "users/user1/savedCountries");

    const snapshot = await get(userRef);
    let savedCountries = snapshot.exists() ? snapshot.val() : {};

    savedCountries[country.name.common] = {
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      region: country.region,
      capital: country.capital,
      viewCount,
    };

    await set(userRef, savedCountries);
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
        <button onClick={saveCountry}>Save Country</button>
      </div>
    </div>
  );
}

export default Details;
