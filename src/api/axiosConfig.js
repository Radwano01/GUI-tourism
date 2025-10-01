import axios from 'axios';

// Configure axios defaults globally
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

// Add request interceptor to include ngrok-skip-browser-warning header
axios.interceptors.request.use(
  (config) => {
    // Add ngrok-skip-browser-warning header to bypass ngrok browser warning
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

// Export the configured axios instance
export default axios;
