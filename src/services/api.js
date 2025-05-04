import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API methods
export const itemService = {
  getAll: () => apiClient.get('items/'),
  getById: (id) => apiClient.get(`items/${id}/`),
  create: (data) => apiClient.post('items/', data),
  update: (id, data) => apiClient.put(`items/${id}/`, data),
  delete: (id) => apiClient.delete(`items/${id}/`),
};

export const authService = {
  login: (credentials) => apiClient.post('token/', credentials),
  register: (userData) => apiClient.post('register/', userData),
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default apiClient;