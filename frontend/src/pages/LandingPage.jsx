// frontend/src/pages/LandingPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { programList } from '../utils/programRequirements';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('BTech_CSE');
  const [admissionYear, setAdmissionYear] = useState(2026);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in - only once
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await signup(email, password, program, admissionYear);
      }
      // Navigation happens via useEffect when user is set
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Features */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4">
              <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                IIT Gandhinagar
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Track Your Academic Journey
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Plan courses, calculate CPI, and track your degree requirements
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">📚</div>
                <div className="text-sm font-medium">Course History</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">🎯</div>
                <div className="text-sm font-medium">Basket Tracking</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">📊</div>
                <div className="text-sm font-medium">CPI Calculator</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">📅</div>
                <div className="text-sm font-medium">Semester Planner</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Login/Signup Form */}
          <div className="flex-1 max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center mb-6">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">IITGN Email</label>
                  <input
                    type="email"
                    placeholder="username@iitgn.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">Program</label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                      >
                        {Object.entries(programList).map(([code, { name }]) => (
                          <option key={code} value={code}>{name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Admission Year</label>
                      <select
                        value={admissionYear}
                        onChange={(e) => setAdmissionYear(parseInt(e.target.value))}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                      >
                        {[2022, 2023, 2024, 2025, 2026, 2027].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded-lg transition font-semibold ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    isLogin ? 'Login' : 'Sign Up'
                  )}
                </button>
              </form>
              
              <p className="text-center mt-4 text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  disabled={isSubmitting}
                  className="text-blue-600 hover:underline disabled:text-gray-400"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}