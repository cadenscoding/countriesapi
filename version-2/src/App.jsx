import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Details from "./components/Details.jsx";
import CountriesCards from "./components/CountriesCards.jsx";
import Layout from "./components/Layout";
import UserSaved from "./Pages/UserSaved.jsx";


function App() {
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const savedFullname = localStorage.getItem("fullname");
    if (savedFullname) {
      setFullname(savedFullname);
    }
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<CountriesCards />} />
          <Route path="/Details" element={<Details />} />
          <Route
          path="/UserSaved"
          element={<UserSaved fullname={fullname} />}
        />
        </Routes>
      </Layout>
    </>
  );
};

export default App;