import React from "react";

import Map from "./components/Map"
import Home from "./components/Home"
import Users from "./components/Users"
import "./App.css";
import './components/Typography.css';
import './components/Buttons.css';
import './components/Navbar.css';
import './components/Footer.css';

import {
  Routes,
  Route
} from "react-router-dom";

function App() { 
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/map" element={<Map />} />
    <Route path="/users" element={<Users />} />
  </Routes>
  );
}

export default App;
