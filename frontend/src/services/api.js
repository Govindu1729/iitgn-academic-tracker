// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
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
  delete: (id) => api.delete(`/courses/${id}`)
};

export const analyticsAPI = {
  getGPA: () => api.get('/analytics/gpa'),
  getBasketSummary: () => api.get('/analytics/basket-summary'),
  getProgressAnalysis: () => api.get('/analytics/progress-analysis')
};

export const programAPI = {
  getRequirements: (programCode) => api.get(`/programs/requirements/${programCode}`),
  getPrograms: () => api.get('/programs/list')
};

export default api;
