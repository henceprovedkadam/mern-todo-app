// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./WelcomePages/Welcome.js";
import Login from "./WelcomePages/Login.js";
import SignUp from "./WelcomePages/SignUp.js";

const rootElement = document.getElementById("root");
if(!rootElement){
  throw new Error("Root Element not found.")
}

createRoot(rootElement).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>,
  // {/* </StrictMode>, */}
);
