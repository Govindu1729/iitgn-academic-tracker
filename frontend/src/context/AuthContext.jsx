// frontend/src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const checkAuth = async () => {
      try {
        // Check if we have a token in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          if (isMounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        // Try to refresh the token
        const res = await api.post('/auth/refresh', {}, { 
          withCredentials: true,
          timeout: 10000 
        });
        
        if (isMounted && res.data) {
          const { accessToken, user: userData } = res.data;
          if (accessToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            localStorage.setItem('token', accessToken);
          }
          if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        }
      } catch (error) {
        // Silent fail - user is not authenticated
        console.log('No active session');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Delay the check slightly to prevent rapid re-renders
    timeoutId = setTimeout(checkAuth, 50);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, user: userData } = res.data;
      
      if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('token', accessToken);
      }
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (email, password, program, admissionYear) => {
    try {
      // Map old program codes to new discipline format
      const disciplineMap = {
        'BTech_CSE': 'CSE', 'BTech_AI': 'AI', 'BTech_EE': 'EE',
        'BTech_ME': 'ME', 'BTech_CL': 'CL', 'BTech_CE': 'CE',
        'BTech_MSE': 'MSE', 'BTech_ICDT': 'ICDT',
        'BTech_DoubleMajor': 'CSE', 'BTech_MTech_Dual': 'CSE', 'BTech_MSc_Dual': 'CSE'
      };
      
      let primaryDiscipline = disciplineMap[program] || 'CSE';
      let programType = 'BTech';
      
      if (program === 'BTech_DoubleMajor') programType = 'DualMajor';
      else if (program === 'BTech_MTech_Dual') programType = 'DualDegree';
      else if (program === 'BTech_MSc_Dual') programType = 'MScDual';
      
      const res = await api.post('/auth/signup', { 
        email, password, primaryDiscipline, programType,
        secondaryDiscipline: '', admissionYear: admissionYear || 2026,
        currentSemester: 1, pursuingHonours: false,
        pursuingMinor: false, minorDiscipline: ''
      });
      
      const { accessToken, user: userData } = res.data;
      
      if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('token', accessToken);
      }
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const res = await api.put('/auth/profile', updates);
      const updatedUser = res.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  const logout = () => {
    (async () => {
      try {
        await api.post('/auth/logout');
      } catch (e) {
        // ignore
      }
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success('Logged out');
    })();
  };

  // Show loader only during initial auth check
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      updateProfile, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};