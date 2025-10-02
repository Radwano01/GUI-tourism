import axios from 'axios';

// Simple API Service class for direct API calls
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_BASE_API;
    this.imagesURL = process.env.REACT_APP_IMAGES_URL;
    
    // Configure axios defaults
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
  }

  // Generic method to make API requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...options.headers,
        },
        data: options.body,
        ...options
      });
      return response;
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
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
