import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton'; // Import the BackButton component

const EditCountryDetailsPage = () => {
  const { countryId } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [formData, setFormData] = useState({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    description: '',
  });

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/public/countries/${countryId}/details`,
          {headers:{
            Authorization: `Bearer ${token}`
          }}
        );
        setCountryDetails(response.data);
        setFormData({
          imageOne: null,
          imageTwo: null,
          imageThree: null,
          description: response.data.description,
        });
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [countryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('imageOne', formData.imageOne);
    form.append('imageTwo', formData.imageTwo);
    form.append('imageThree', formData.imageThree);
    form.append('description', formData.description);

    try {
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/details`, form);
      alert('Country details updated successfully!');
    } catch (error) {
      console.error('Error updating country details:', error);
    }
  };

  if (!countryDetails) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={"/admin"}/>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Edit Country Details</h2>

          {/* Image One */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image One</label>
            <input
              type="file"
              name="imageOne"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image Two */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Two</label>
            <input
              type="file"
              name="imageTwo"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image Three */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Three</label>
            <input
              type="file"
              name="imageThree"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCountryDetailsPage;