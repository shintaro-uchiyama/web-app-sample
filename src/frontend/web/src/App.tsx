import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Companies from "./components/pages/companies/index";
import Home from "./components/pages/index";
import Schedule from "./components/pages/schedule/index";
import { Draw } from "./components/pages/draw/index";
import Docs from "./components/pages/docs/index";
import { NavBar, SideMenu } from "./components/parts/navigations";

function App() {
  return (
    <div className="App">
      <main className="bg-gray-100 h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <SideMenu />
          <div className="flex flex-col w-full md:space-y-4">
            <span>aabccddooppaaajj</span>
            <NavBar />
            <Routes>
              <Route path="companies" element={<Companies />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="draw" element={<Draw />} />
              <Route path="docs" element={<Docs />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
