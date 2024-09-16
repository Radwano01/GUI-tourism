import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const EditPlaceDetailsPage = () => {
  const { countryId, placeId } = useParams();
  const navigate = useNavigate();
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/places/${placeId}/details`);
        setImageOne(response.data.imageOne);
        setImageTwo(response.data.imageTwo);
        setImageThree(response.data.imageThree);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageOne', imageOne);
    formData.append('imageTwo', imageTwo);
    formData.append('imageThree', imageThree);
    formData.append('description', description);

    try {
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/places/${placeId}/details`, formData);
      navigate(`/admin/countries/${countryId}/places/${placeId}`);
    } catch (error) {
      console.error('Error updating place details:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto">
        <BackButton direction={`/admin/countries/${countryId}/places`} />
        <h2 className="text-2xl font-bold mb-6">Edit Place Details</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image One</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setImageOne)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Two</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setImageTwo)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Three</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setImageThree)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="3"
              placeholder="Enter description"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Place Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlaceDetailsPage;