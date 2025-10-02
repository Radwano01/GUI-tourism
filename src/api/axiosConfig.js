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

// Function to create API request with multiple CORS proxy fallbacks
export const createApiRequest = async (url, options = {}) => {
  try {
    // Try direct request first
    return await apiClient(url, options);
  } catch (error) {
    // If CORS error, try with multiple CORS proxies
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.log('Attempting request with CORS proxy...');
      
      // List of CORS proxy alternatives
      const corsProxies = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://thingproxy.freeboard.io/fetch/',
        'https://cors-anywhere.herokuapp.com/'
      ];
      
      for (const proxy of corsProxies) {
        try {
          console.log(`Trying proxy: ${proxy}`);
          const proxyUrl = proxy === 'https://api.allorigins.win/raw?url=' 
            ? `${proxy}${encodeURIComponent(url)}`
            : `${proxy}${url}`;
            
          const response = await apiClient(proxyUrl, {
            ...options,
            headers: {
              ...options.headers,
              'X-Requested-With': 'XMLHttpRequest',
            }
          });
          
          console.log(`Success with proxy: ${proxy}`);
          return response;
        } catch (proxyError) {
          console.warn(`Proxy ${proxy} failed:`, proxyError.message);
          continue;
        }
      }
      
      // If all proxies fail, throw the original error
      throw new Error('All CORS proxies failed. Please check your backend server CORS configuration.');
    }
    throw error;
  }
};

// Export the configured axios instance
export default apiClient;
