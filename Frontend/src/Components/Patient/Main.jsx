
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaEnvelope, FaRegHospital } from './Icons';

// Professional SVG icons
const IconDashboard = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="9" rx="2" />
    <rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="12" width="7" height="9" rx="2" />
    <rect x="3" y="17" width="7" height="4" rx="2" />
  </svg>
);
const IconClaims = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 3v4M17 3v4" />
    <path d="M8 10h8M8 14h5" />
  </svg>
);
const IconSecurity = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconSupport = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 6" />
    <circle cx="12" cy="17" r="1" />
  </svg>
);

function Main({ children }) {  // Add children prop here
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');
  const [userName, setUserName] = useState('');
  const location = useLocation();

  // Update active page based on current URL
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    const pageName = path || 'Dashboard';
    // Map path to menu item name
    const pageNameMap = {
      'Dashboard': 'Dashboard',
      'SubmitClaim': 'Claims Management',
      'Security': 'Security & Privacy',
      'Support': 'Support & FAQs',
      'Profile': 'Profile'
    };
    setActivePage(pageNameMap[pageName] || 'Dashboard');

    // Fetch user name from localStorage
    const storedName = localStorage.getItem('name') || localStorage.getItem('username') || 'User';
    setUserName(storedName);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <IconDashboard />, path: '/Dashboard' },
    { name: 'Claims Management', icon: <IconClaims />, path: '/SubmitClaim' },
    { name: 'Security & Privacy', icon: <IconSecurity />, path: '/Security' },
    { name: 'Support & FAQs', icon: <IconSupport />, path: '/Support' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Now on the left as a permanent fixture */}
      <aside 
        className={`bg-indigo-100 transition-all duration-300 h-screen sticky top-0 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-200">
          <div className="flex items-center gap-2">
            <FaRegHospital size={28} className="text-blue-600" />
            <h2 className={`font-bold text-indigo-800 text-lg tracking-tight ${!sidebarOpen && 'hidden'}`}> 
              <span style={{ color: '#60a5fa' }}>AARO</span><span style={{ color: '#1e293b' }}>GAYA</span>
            </h2>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-indigo-200 text-indigo-600"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <span>&#x25C0;</span> : <span>&#x25B6;</span>}
          </button>
        </div>
        
        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2 px-3">
                <Link 
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    activePage === item.name 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-indigo-200'
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className={`${!sidebarOpen && 'hidden'} font-medium`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Profile Section - At bottom of sidebar */}
        <div className={`absolute bottom-0 w-full p-4 border-t border-indigo-200 ${!sidebarOpen && 'hidden'}`}>
          <Link to="/Profile">
            <div className="flex items-center space-x-3 hover:bg-indigo-200 p-2 rounded-lg transition-colors">
              <img 
                src="/api/placeholder/40/40" 
                alt={userName}
                className="rounded-full border-2 border-indigo-300"
              />
              <div>
                <p className="font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{activePage}</h1>
            <p className="text-sm text-gray-500">Welcome back, {userName}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600" aria-label="Notifications">
              <FaBell size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600" aria-label="Messages">
              <FaEnvelope size={20} />
            </button>
            {sidebarOpen && (
              <Link to="/Profile" className="md:hidden">
                <img 
                  src="/api/placeholder/36/36" 
                  alt="Dr. Smith" 
                  className="rounded-full border-2 border-indigo-300"
                />
              </Link>
            )}
          </div>
        </header>

        {/* Page Content - Now renders children */}
        <main className="flex-1 p-6 overflow-auto">
          {children} {/* This renders the children passed to Main */}
        </main>
      </div>
    </div>
  );
}

export default Main;