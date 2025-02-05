import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Details from "./components/Details.jsx";
import CountriesCards from "./components/CountriesCards.jsx";
import Layout from "./components/Layout";
import UserSaved from "./Pages/UserSaved.jsx";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)


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
          <Route path="/Details" element={<Details db={db} />} />  
          <Route
          path="/UserSaved" element={<UserSaved db={db} />} 
        />
        </Routes>
      </Layout>
    </>
  );
};

export default App;