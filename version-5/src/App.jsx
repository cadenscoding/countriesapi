import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Details from "./components/Details.jsx";
import CountriesCards from "./components/CountriesCards.jsx";
import Layout from "./components/Layout.jsx";
import UserSaved from "./Pages/UserSaved.jsx";

function App() {
  const [user, setUser] = useState(null);
  const API_URL = "https://countriesapi-x8bi.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/user/1`); 
        const data = await response.json();
        if (response.ok) {
          setUser(data); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<CountriesCards />} />
        <Route path="/details" element={<Details />} />
        <Route path="/usersaved" element={<UserSaved user_id={user?.user_id} />} />
      </Routes>
    </Layout>
  );
}

export default App;