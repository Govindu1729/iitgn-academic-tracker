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
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  // Use useEffect for navigation instead of doing it during render
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await signup(email, password, program, admissionYear);
    }
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-blue-600 hover:underline"
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
