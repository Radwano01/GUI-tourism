import { createApiRequest } from './axiosConfig';

// API Service class to handle all API calls with CORS fallback
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_BASE_API;
    this.imagesURL = process.env.REACT_APP_IMAGES_URL;
    this.isProduction = process.env.NODE_ENV === 'production';
    this.useNetlifyFunction = process.env.REACT_APP_USE_NETLIFY_FUNCTION === 'true';
    this.netlifyFunctionURL = '/.netlify/functions/api-proxy';
    
    // Debug logging
    console.log('API Service initialized:', {
      isProduction: this.isProduction,
      useNetlifyFunction: this.useNetlifyFunction,
      baseURL: this.baseURL,
      netlifyFunctionURL: this.netlifyFunctionURL
    });
  }

  // Generic method to make API requests with CORS handling
  async makeRequest(endpoint, options = {}) {
    // Always use Netlify function in production, or if explicitly enabled
    if (this.isProduction || this.useNetlifyFunction) {
      console.log('Using Netlify function for API request:', endpoint);
      return this.makeRequestViaNetlifyFunction(endpoint, options);
    }
    
    // In development, try direct request with CORS proxy fallback
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await createApiRequest(url, {
        method: 'GET',
        ...options,
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Make request via Netlify function (production)
  async makeRequestViaNetlifyFunction(endpoint, options = {}) {
    try {
      const url = `${this.netlifyFunctionURL}?path=${endpoint.replace(/^\//, '')}`;
      
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`Netlify function request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Public API methods
  async getCountries() {
    return this.makeRequest('/public/countries');
  }

  async getCountryDetails(countryId) {
    return this.makeRequest(`/public/countries/${countryId}`);
  }

  async getPlaces(countryId) {
    return this.makeRequest(`/public/countries/${countryId}/places`);
  }

  async getPlaceDetails(placeId) {
    return this.makeRequest(`/public/places/${placeId}`);
  }

  async getPackages(countryId) {
    return this.makeRequest(`/public/countries/${countryId}/packages`);
  }

  async getPackageDetails(packageId) {
    return this.makeRequest(`/public/packages/${packageId}`);
  }

  async getHotels(placeId) {
    return this.makeRequest(`/public/places/${placeId}/hotels`);
  }

  async getHotelDetails(hotelId) {
    return this.makeRequest(`/public/hotels/${hotelId}`);
  }

  async getFlights(searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/public/flights?${queryString}`);
  }

  // User-related API methods
  async getUserDetails(userId) {
    return this.makeRequest(`/public/users/${userId}/details`);
  }

  async verifyUserEmail(userId, accessToken) {
    return this.makeRequest(`/public/users/verification/users/${userId}/${accessToken}`, {
      method: 'POST'
    });
  }

  async addPhoneNumber(userId, phoneNumber) {
    return this.makeRequest(`/public/users/${userId}/phone`, {
      method: 'POST',
      body: { phoneNumber }
    });
  }

  async updateUserDetails(userId, userData) {
    return this.makeRequest(`/public/users/${userId}`, {
      method: 'PUT',
      body: userData
    });
  }

  async deleteUser(userId) {
    return this.makeRequest(`/public/users/${userId}`, {
      method: 'DELETE'
    });
  }

  async updateUserPhone(userId, phoneNumber) {
    return this.makeRequest(`/public/users/${userId}/phone`, {
      method: 'PUT',
      body: { phoneNumber }
    });
  }

  // Helper method to get full image URL
  getImageUrl(imagePath) {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${this.imagesURL}/${imagePath}`;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
