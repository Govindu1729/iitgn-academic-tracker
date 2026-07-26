// frontend/src/services/api.js
import axios from 'axios';

// Get the API URL from environment or use localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true, // Important for cookies
  timeout: 30000 // 30 seconds timeout
});

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true
        });
        
        const { accessToken, user } = response.data;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle CORS errors
    if (error.message === 'Network Error') {
      console.error('Network error - possible CORS issue:', error);
      return Promise.reject({
        message: 'Network error. Please check your connection and CORS settings.',
        original: error
      });
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error(`[API Error] ${errorMessage}`, error);
    
    return Promise.reject(error);
  }
);

// ==================== API SERVICES ====================
export const courseAPI = {
  getAll: () => api.get('/courses'),
  getBySemester: () => api.get('/courses/by-semester'),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  exportCourses: () => api.get('/courses/export', { responseType: 'blob' })
};

export const analyticsAPI = {
  getGPA: () => api.get('/analytics/gpa'),
  getBasketSummary: () => api.get('/analytics/basket-summary'),
  getProgressAnalysis: () => api.get('/analytics/progress-analysis'),
  getCreditsStatus: () => api.get('/analytics/credits-status')
};

export const programAPI = {
  getRequirements: (programCode) => api.get(`/programs/requirements/${programCode}`),
  getPrograms: () => api.get('/programs/list'),
  getDisciplines: () => api.get('/programs/disciplines'),
  getProgramTypes: () => api.get('/programs/program-types'),
  getApplicablePrograms: () => api.get('/programs/applicable-programs'),
  generateRequirements: (data) => api.post('/programs/generate-requirements', data),
  getMyRequirements: () => api.get('/programs/my-requirements'),
  getDualMajorPreview: (data) => api.post('/programs/dual-major-preview', data)
};

export default api;