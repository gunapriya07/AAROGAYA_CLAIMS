import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Landing & Authentication pages
import RegisterPage from "./Components/Register";
import LANDING from "./Components/Landing";
import Login from "./Components/Login";

// Main layout component
import Main from "./Components/Patient/Main";

// Patient pages
import Profile from "./Components/Patient/Profile";
import Security from "./Components/Patient/Security";
import SubmitClaim from "./Components/Patient/SubmitClaim";
import Dashboard from "./Components/Patient/Dashboard";
import Support from "./Components/Patient/Support";

// Layout wrapper component - simplified to ensure it works correctly
const MainLayout = ({ children }) => {
  return <Main>{children}</Main>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LANDING />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<Login />} />
        
        {/* Patient dashboard routes with layout */}
        <Route path="/Dashboard" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/Profile" element={
          <MainLayout>
            <Profile />
          </MainLayout>
        } />
        <Route path="/SubmitClaim" element={
          <MainLayout>
            <SubmitClaim />
          </MainLayout>
        } />
        <Route path="/Security" element={
          <MainLayout>
            <Security />
          </MainLayout>
        } />
        <Route path="/Support" element={
          <MainLayout>
            <Support />
          </MainLayout>
        } />
        
        {/* Redirect /Main to Dashboard */}
        <Route path="/Main" element={<Navigate to="/Dashboard" replace />} />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;