import React from 'react';
import './App.css';
import Home from './components/pages/index'
import Companies from './components/pages/companies/index'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 className="bg-teal-50 text-3xl font-bold underline">Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="companies" element={<Companies />} />
      </Routes>
    </div>
  );
}

export default App;
