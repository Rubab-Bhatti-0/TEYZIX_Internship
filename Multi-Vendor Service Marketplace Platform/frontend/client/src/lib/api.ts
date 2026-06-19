import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API Service Methods
export const authService = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

export const serviceService = {
  getAllServices: () => api.get('/service'),
  getServiceById: (id: string) => api.get(`/service/${id}`),
  createService: (data: any) => api.post('/service', data),
  updateService: (id: string, data: any) => api.put(`/service/${id}`, data),
  deleteService: (id: string) => api.delete(`/service/${id}`),
};

export const projectService = {
  createProject: (data: any) => api.post('/project', data),
  getMyRequests: () => api.get('/project/myRequests'),
  getProviderRequests: () => api.get('/project/provider'),
  updateStatus: (id: string, status: string) =>
    api.put(`/project/${id}/status`, { status }),
  addReview: (id: string, data: any) =>
    api.put(`/project/${id}/review`, data),
  getAdminStats: () => api.get('/project/admin/stats'),
};
