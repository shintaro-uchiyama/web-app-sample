import React from "react";
import "./App.css";
import Home from "./components/pages/index";
import Companies from "./components/pages/companies/index";
import Schedule from "./components/pages/schedule/index";
import { Routes, Route } from "react-router-dom";
import { SideMenu, NavBar } from "./components/parts/navigations";

function App() {
  return (
    <div className="App">
      <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <SideMenu />
          <div className="flex flex-col w-full md:space-y-4">
            <NavBar />
            <Routes>
              <Route path="companies" element={<Companies />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
