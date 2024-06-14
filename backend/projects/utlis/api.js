import axios from 'axios';
import { getToken } from './tokenManager';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

api.interceptors.request.use((config) => {
  const token = getToken(); // Get JWT token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach JWT to Authorization header
  }
  return config;
});

export default api;
