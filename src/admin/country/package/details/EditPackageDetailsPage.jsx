import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const EditPackageDetailsPage = () => {
  const { countryId, packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [formData, setFormData] = useState({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/public/packages/${packageId}/details`);
        setPackageDetails(response.data);
        setFormData({
          imageOne: null,
          imageTwo: null,
          imageThree: null,
          description: response.data.description,
        });
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

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
    if (formData.imageOne) form.append('imageOne', formData.imageOne);
    if (formData.imageTwo) form.append('imageTwo', formData.imageTwo);
    if (formData.imageThree) form.append('imageThree', formData.imageThree);
    form.append('description', formData.description);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/details`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      navigate(`/admin/countries/${countryId}/packages/${packageId}/details`);
    } catch (error) {
      console.error('Error updating package details:', error);
    }
  };

  if (!packageDetails) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={`/admin/countries/${countryId}/packages`} />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Edit Package Details</h2>

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

export default EditPackageDetailsPage;