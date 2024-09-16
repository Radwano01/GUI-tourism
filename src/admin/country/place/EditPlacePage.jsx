import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

const EditPlacePage = () => {
  const { countryId, placeId } = useParams(); // Ensure you have countryId and placeId
  const navigate = useNavigate();
  const [place, setPlace] = useState('');
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/countries/${countryId}/places/${placeId}`);
        setPlace(response.data.place);
        setMainImage(response.data.mainImage);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [countryId, placeId]); // Add countryId in dependencies

  const handleFileChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('place', place);
    formData.append('mainImage', mainImage);

    try {
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/places/${placeId}`, formData);
      navigate(`/admin/countries/${countryId}/places`); // Redirect after success
    } catch (error) {
      console.error('Error updating place:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto">
        <BackButton direction={`/admin/countries/${countryId}/places`} />
        <h2 className="text-2xl font-bold mb-6">Edit Place</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Place Name</label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter place name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Main Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Place
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlacePage;