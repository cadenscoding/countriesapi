import React from 'react';
import  {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import './App.css';
// import UserSaved from './Pages/UserSaved.jsx';
import Details from './components/Details.jsx';
import CountriesCards from './components/CountriesCards.jsx';
import Layout from "./components/Layout";
import UserSaved from './Pages/UserSaved.jsx';

const App = () => {
  return (
    <>
    
     <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<CountriesCards />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/UserSaved" element={<UserSaved />} />
      </Routes>
      </Layout>

      
      
        
     
  
    </>
  );
};

export default App;