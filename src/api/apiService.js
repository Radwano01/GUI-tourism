import { createApiRequest } from './axiosConfig';

// API Service class to handle all API calls with CORS fallback
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_BASE_API;
    this.imagesURL = process.env.REACT_APP_IMAGES_URL;
  }

  // Generic method to make API requests with CORS handling
  async makeRequest(endpoint, options = {}) {
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
