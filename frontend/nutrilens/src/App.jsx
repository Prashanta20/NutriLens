import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import FoodDetails from "./FoodDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<FoodDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
