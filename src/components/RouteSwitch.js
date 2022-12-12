import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "./leaderboard";
import App from "../App"
import React from "react";
import ReactDOM from "react-dom/client";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </BrowserRouter>
    );
  };
  
  export default RouteSwitch;