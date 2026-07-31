// frontend/src/services/api.js
import axios from 'axios';

// ==================== DYNAMIC API URL ====================
const getBaseUrl = () => {
  // 1. Priority: Use the environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. Production: If on Vercel, use Render backend
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://iitgn-academic-tracker.onrender.com/api';
  }
  
  // 3. Local development
  return 'http://localhost:5001/api';
};

const API_URL = getBaseUrl();
console.log(`[API] Using base URL: ${API_URL}`);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
  timeout: 30000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 - try refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true
        });
        
        const { accessToken } = response.data;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Only redirect if not already on login page
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      }
    }
    
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