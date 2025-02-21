import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import HostsPage from "./pages/HostsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OTPPage from "./pages/OTPPage";
import Dashboard from "./pages/Dashboard";

function App() {
  // check if the local storage userData exists if yes showDashboard if no show login
  const userData = JSON.parse(localStorage.getItem("userData"));
  const CheckItem = () => {
    if (userData) {
      // show dashboard
      return <Dashboard />;
    } else {
      // show login
      return <LoginPage />;
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/hosts" element={<HostsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={CheckItem()} />
        <Route path="/dashboard" element={CheckItem()} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OTPPage />} />
      </Routes>
    </Router>
  );
}

export default App;
