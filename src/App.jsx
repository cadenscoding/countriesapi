import React from 'react';
import  {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import './App.css';
// import About from '../src/Pages/About.jsx';

const App = () => {
  return (
    <>
    
     
        <Routes>
          <Route path="/" element={<Home />} />
         
        </Routes>
     
  
    </>
  );
};

export default App;