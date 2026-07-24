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
    // Try to refresh access token using HttpOnly refresh cookie
    (async () => {
      try {
        const res = await api.post('/auth/refresh');
        const { accessToken, user } = res.data;
        if (accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
        if (user) {
          setUser(user);
          try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
        }
      } catch (e) {
        // no valid session
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, user } = res.data;
      if (accessToken) api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      if (user) {
        setUser(user);
        try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
      }
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (email, password, program, admissionYear) => {
    try {
      const res = await api.post('/auth/signup', { 
        email, 
        password, 
        program: program || 'BTech_CSE',
        admissionYear: admissionYear || 2026
      });
      const { accessToken, user } = res.data;
      if (accessToken) api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      if (user) {
        setUser(user);
        try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
      }
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
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
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success('Logged out');
    })();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
