import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

// Add request interceptor to include necessary headers
apiClient.interceptors.request.use(
  (config) => {
    // Add ngrok-skip-browser-warning header to bypass ngrok browser warning
    config.headers['ngrok-skip-browser-warning'] = 'true';
    
    // Add CORS headers for preflight requests
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, ngrok-skip-browser-warning';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle CORS errors specifically
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.warn('CORS error detected. Consider using a CORS proxy or configuring your backend server.');
    }
    
    return Promise.reject(error);
  }
);

// Function to create API request with CORS proxy fallback
export const createApiRequest = async (url, options = {}) => {
  try {
    // Try direct request first
    return await apiClient(url, options);
  } catch (error) {
    // If CORS error, try with CORS proxy
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.log('Attempting request with CORS proxy...');
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
      return await apiClient(proxyUrl, {
        ...options,
        headers: {
          ...options.headers,
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
    }
    throw error;
  }
};

// Export the configured axios instance
export default apiClient;
