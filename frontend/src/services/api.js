// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Send cookies (refresh token) with requests
api.defaults.withCredentials = true;

// Attach token from localStorage for each request
// Note: Authorization header is set by AuthContext when access token is available.

// Global response handler: on 401, clear local auth and reload to force login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
      } catch (e) {
        // ignore
      }
      // Reloading is a simple way to reset app state and redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

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
  getProgressAnalysis: () => api.get('/analytics/progress-analysis')
};

export const programAPI = {
  getRequirements: (programCode) => api.get(`/programs/requirements/${programCode}`),
  getPrograms: () => api.get('/programs/list')
};

export default api;
