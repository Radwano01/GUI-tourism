import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

const CreatePackagePage = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    packageName: '',
    price: '',
    rate: '',
    description: '',
    mainImage: null,
    imageOne: null,
    imageTwo: null,
    imageThree: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length > 2000) {
      alert('Package description must be 2000 characters or less.');
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    const packageData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) packageData.append(key, formData[key]);
    });

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/package`,
        packageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/admin/countries/${countryId}/packages`);
    } catch (error) {
      alert("Error creating package. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen-max bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={`/admin/countries/${countryId}/packages`} />
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create New Package</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Package Name</label>
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rate</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {['mainImage', 'imageOne', 'imageTwo', 'imageThree'].map((imageField) => (
            <div key={imageField} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{`${imageField.replace(/([A-Z])/g, ' $1').toUpperCase()}`}</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, imageField)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required={imageField === 'mainImage'}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="6"
              placeholder="Enter package description (maximum 2000 characters)"
              required
            />
            <div className="mt-2 text-sm text-gray-600">
              <span className={formData.description.length > 2000 ? "text-red-600" : "text-green-600"}>
                {formData.description.length} / 2000 characters
              </span>
              {formData.description.length > 2000 && (
                <span className="ml-2 text-red-600">
                  ({formData.description.length - 2000} characters over limit)
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isLoading ? 'Creating Package...' : 'Create Package'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePackagePage;