import axios from 'axios';

// Simple axios configuration
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

// Add request interceptor for ngrok header
axios.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axios;
