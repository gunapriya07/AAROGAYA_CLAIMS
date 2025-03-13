// App.js - Main component
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Page Components
import Support from './Support';
import Security from './Security';
import SubmitClaim from './SubmitClaim';
import Profile from './Profile';
import Dashboard from './Dashboard';
// import Register from '../Register';

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <p>
        
      </p>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Top Navigation Bar */}
        <nav className="bg-pink-500 text-white px-4 py-2 flex justify-between items-center shadow-md sticky top-0 z-50">
          <div className="flex items-center">
            <button 
              className="text-2xl mr-4 focus:outline-none" 
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold">Healthcare Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Link to="/Profile">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src="/api/placeholder/32/32" alt="User" className="rounded-full h-8 w-8" />
                <span>Dr. Smith</span>
              </div>
              </Link>
             
            </div>
          </div>
        </nav>

        <div className="flex flex-1">
          {/* Side Navigation */}
          <div 
            className={`bg-pink-500 text-white transition-all duration-300 ${
              sidebarOpen ? 'w-64' : 'w-16'
            }`}
          >
            <ul className="py-4">
              <li className="mb-2">
                <Link 
                  to="/Dashboard" 
                  className="flex items-center px-4 py-3 hover:bg-pink-600 transition-colors"
                >
                  <span className="text-xl mr-3 min-w-6">📊</span>
                  <span className={`${!sidebarOpen && 'hidden'}`}>Dashboard</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/SubmitClaim" 
                  className="flex items-center px-4 py-3 hover:bg-pink-600 transition-colors"
                >
                  <span className="text-xl mr-3 min-w-6">📝</span>
                  <span className={`${!sidebarOpen && 'hidden'}`}>Claims Management</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/security" 
                  className="flex items-center px-4 py-3 hover:bg-pink-600 transition-colors"
                >
                  <span className="text-xl mr-3 min-w-6">🔒</span>
                  <span className={`${!sidebarOpen && 'hidden'}`}>Security & Privacy</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/support" 
                  className="flex items-center px-4 py-3 hover:bg-pink-600 transition-colors"
                >
                  <span className="text-xl mr-3 min-w-6">🙋🏻‍♂️</span>
                  <span className={`${!sidebarOpen && 'hidden'}`}>Support & FAQs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              {/* <Route path='/Register' element={<Register/>}/> */}
              <Route path='/Dashboard'element={<Dashboard/>}/>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/SubmitClaim" element={<SubmitClaim/>} />
              <Route path="/Security" element={<Security/>} />
              <Route path="/Support" element={<Support/>} />
              <Route path="" element={<Navigate to="" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default Main;