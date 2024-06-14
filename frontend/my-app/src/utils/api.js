import axios from 'axios';
import { getToken } from './tokenManager'; // Function to get the JWT token from storage
import { API_URL } from '../API_URL_ROUTE/config';
// Create an Axios instance with a base URL (change to your backend's base URL)
const api = axios.create({
  baseURL: API_URL, // Modify to your backend's base URL
});

// Intercept requests to add the JWT token to the Authorization header
api.interceptors.request.use((config) => {
  const token = getToken(); // Get the JWT token from local storage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add the JWT token to request headers
  }
  return config;
});

export default api;
