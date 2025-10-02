import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';

function HeroPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchCountries = async () => {
      try {
        const response = await apiService.getCountries();
        console.log('API Response:', response.data); // Debug log
        
        // Check if response.data is an array
        const data = Array.isArray(response.data) ? response.data : response.data.content || response.data.data || [];
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected array');
        }
        
        const formattedData = data.map(country => ({
          id: country.id,
          country: country.country,
          url: country.mainImage
        }));
        setImages(formattedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load countries. Please try again.');
        setImages([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/country/details/${id}`);
  }

  // Show loading state
  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading countries...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 py-2 px-4 rounded-lg text-white hover:bg-blue-600 transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (images.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">No countries available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={apiService.getImageUrl(image.url)} alt={`Slide ${image.id}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-8xl font-bold mb-8">{images[currentIndex].country}</h1>
        <button
          className="bg-blue-500 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
          onClick={() => handleNavigate(images[currentIndex].id)}
        >
          View Details
        </button>
      </div>
      <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ul className="flex space-x-4">
          {images.map((image, index) => (
            <li key={image.id}>
              <button
                className={`py-2 px-4 rounded-md ${currentIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setCurrentIndex(index)}
              >
                {`Tab ${index + 1}`}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HeroPage;
