// frontend/src/components/UserProfileDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user's display name from email
  const getDisplayName = () => {
    if (!user?.email) return 'User';
    const emailPrefix = user.email.split('@')[0];
    // Convert to title case
    return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
  };

  const getInitials = () => {
    if (!user?.email) return 'U';
    const emailPrefix = user.email.split('@')[0];
    return emailPrefix.charAt(0).toUpperCase();
  };

  const getRollNumber = () => {
    if (!user?.email) return 'Not available';
    const emailPrefix = user.email.split('@')[0];
    // If email has numbers at the end, treat as roll number
    const match = emailPrefix.match(/\d+$/);
    if (match) return match[0];
    return emailPrefix;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleSettings = () => {
    navigate('/program-setup');
    setIsOpen(false);
  };

  // Generate a consistent color based on email
  const getProfileColor = () => {
    if (!user?.email) return 'bg-gray-500';
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = user.email.length % colors.length;
    return colors[index];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 focus:outline-none"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getProfileColor()}`}>
          {getInitials()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">{getDisplayName()}</p>
          <p className="text-xs text-gray-500">{getRollNumber()}</p>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Profile Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ${getProfileColor()}`}>
                {getInitials()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{getDisplayName()}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-gray-400 mt-1">Roll No: {getRollNumber()}</p>
              </div>
            </div>
          </div>

          {/* Program Info */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-500">Program</p>
            <p className="text-sm font-medium text-gray-700">
              {user?.program?.replace('BTech_', 'B.Tech ') || 'Not set'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Admission Year: {user?.admissionYear || 'Not set'}</p>
          </div>

          {/* Honours/Minor Status */}
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Honours Track</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${user?.pursuingHonours ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user?.pursuingHonours ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">Minor Track</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${user?.pursuingMinor ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user?.pursuingMinor ? `Active (${user?.minorDiscipline || '?'})` : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleSettings}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Program Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
