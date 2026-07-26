// frontend/src/services/api.js
import axios from 'axios';

// Replace the hardcoded URL with conditional logic
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com/api'  // ✅ Replace with your Render URL
  : 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const courseAPI = {
  getAll: () => api.get('/courses'),
  getBySemester: () => api.get('/courses/by-semester'),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  exportCourses: () => api.get('/courses/export', { responseType: 'blob' })
};

// frontend/src/services/api.js - Add to existing file

export const programAPI = {
  getRequirements: (programCode) => api.get(`/programs/requirements/${programCode}`),
  getPrograms: () => api.get('/programs/list'),
  // ✅ New methods
  getDisciplines: () => api.get('/programs/disciplines'),
  getProgramTypes: () => api.get('/programs/program-types'),
  getApplicablePrograms: () => api.get('/programs/applicable-programs'),
  generateRequirements: (data) => api.post('/programs/generate-requirements', data),
  getMyRequirements: () => api.get('/programs/my-requirements'),
  getDualMajorPreview: (data) => api.post('/programs/dual-major-preview', data)
};

export const analyticsAPI = {
  getGPA: () => api.get('/analytics/gpa'),
  getBasketSummary: () => api.get('/analytics/basket-summary'),
  getProgressAnalysis: () => api.get('/analytics/progress-analysis')
};


export default api;