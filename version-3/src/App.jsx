import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Details from "./components/Details.jsx";
import CountriesCards from "./components/CountriesCards.jsx";
import Layout from "./components/Layout";
import UserSaved from "./Pages/UserSaved.jsx";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAy2PMxmmmYaO4WWmL0koR0bjr-YK1uNoA",
  authDomain: "countriesapi-8fe81.firebaseapp.com",
  projectId: "countriesapi-8fe81",
  storageBucket: "countriesapi-8fe81.firebasestorage.app",
  messagingSenderId: "914190366695",
  appId: "1:914190366695:web:5f4e712d79d22af9a82f42",
  measurementId: "G-B1F3MHCBMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const App = () => {
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("currentUserName") || "";
    setCurrentUserName(savedName);
    console.log("Loaded currentUserName from localStorage:", savedName);
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
            element={<UserSaved currentUserName={currentUserName} />}
          />
        </Routes>
      </Layout>
    </>
  );
};

export default App;