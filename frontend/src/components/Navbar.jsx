import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';

export default function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="text-lg md:text-2xl font-bold text-blue-600 truncate">
            IITGN Academic Tracker
          </Link>
          
          {/* Desktop Navigation */}
          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/basket-tracking" className="text-gray-700 hover:text-blue-600">Baskets</Link>
                <Link to="/course-history" className="text-gray-700 hover:text-blue-600">Courses</Link>
                <Link to="/semester-planner" className="text-gray-700 hover:text-blue-600">Planner</Link>
                <Link to="/honours-minor" className="text-gray-700 hover:text-blue-600">Honours/Minor</Link>
                <UserProfileDropdown />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          ) : (
            <Link to="/" className="text-gray-700 hover:text-blue-600">Login</Link>
          )}
        </div>
        
        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Dashboard</Link>
              <Link to="/basket-tracking" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Baskets</Link>
              <Link to="/course-history" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Courses</Link>
              <Link to="/semester-planner" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Planner</Link>
              <Link to="/honours-minor" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Honours/Minor</Link>
              <div className="pt-2 border-t">
                <UserProfileDropdown />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
