import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Main({ children }) {  // Add children prop here
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');
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
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/Dashboard' },
    { name: 'Claims Management', icon: '📝', path: '/SubmitClaim' },
    { name: 'Security & Privacy', icon: '🔒', path: '/Security' },
    { name: 'Support & FAQs', icon: '🙋🏻‍♂️', path: '/Support' }
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
          <h2 className={`font-bold text-indigo-800 ${!sidebarOpen && 'hidden'}`}>AAROCYACLAIM</h2>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-indigo-200 text-indigo-600"
          >
            {sidebarOpen ? '◀' : '▶'}
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
                alt="Dr. Smith" 
                className="rounded-full border-2 border-indigo-300"
              />
              <div>
                <p className="font-medium text-gray-800">Dr. Smith</p>
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
            <p className="text-sm text-gray-500">Welcome back, Dr. Smith</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
              🔔
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
              ✉️
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