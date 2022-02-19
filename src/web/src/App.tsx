import React from "react";
import "./App.css";
import Home from "./components/pages/index";
import Companies from "./components/pages/companies/index";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="companies" element={<Companies />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
