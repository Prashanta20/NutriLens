import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Import the App component

// Render the App component wrapped in Router
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
