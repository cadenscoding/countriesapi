import React, { useEffect, useState } from "react";
import Header from "../components/Header"; 
import CountriesCards from "../components/CountriesCards"; 
import "../App.css"; 

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
    
      <Header search={search} setSearch={setSearch} />

     
      <CountriesCards countries={filteredCountries} />
    </div>
  );
};

export default Home;