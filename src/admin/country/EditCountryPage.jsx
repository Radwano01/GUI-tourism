import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../components/BackButton'; // Ensure correct import path

const EditCountryPage = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  
  const [country, setCountry] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch country details by ID
    const fetchCountryDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        const { country, description } = response.data;
        setCountry(country);
        setDescription(description);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [countryId]);

  const handleFileChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('country', country);
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }
    formData.append('description', description);

    try {
      await axios.put(`/admin/countries/${countryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Country updated successfully!');
      navigate('/admin/countries');  // Redirect to countries list after edit
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={"/admin"}/>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Edit Country</h2>

          {/* Country Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Country Name</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter country name"
              required
            />
          </div>

          {/* Main Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Main Image (optional)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCountryPage;