import React from "react";
import { useLocation } from "react-router-dom";

function Details({ currentUserName }) {
  const { state: country } = useLocation();

  const saveFlag = () => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    const userFlags = usersData[currentUserName]?.savedFlags || [];

    const updatedUserData = {
      ...usersData,
      [currentUserName]: {
        ...usersData[currentUserName],
        savedFlags: [...userFlags, { name: country.name.common, flag: country.flags.svg }],
      },
    };

    localStorage.setItem("usersData", JSON.stringify(updatedUserData));
  };

  return (
    <div className="details-container">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <div className="details-text">
        <h1>{country.name.common}</h1>
        <p><strong>Population:</strong>{country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
        <button onClick={saveFlag}>Save Flag</button>
      </div>
    </div>
  );
}
 
export default Details;