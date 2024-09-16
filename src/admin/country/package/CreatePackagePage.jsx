import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

const CreatePackagePage = () => {
  const { countryId } = useParams();
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append('packageName', packageName);
    formData.append('price', price);
    formData.append('rate', rate);
    formData.append('mainImage', mainImage);
    formData.append('imageOne', imageOne);
    formData.append('imageTwo', imageTwo);
    formData.append('imageThree', imageThree);
    formData.append('description', description);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/package`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }, formData);
      navigate(`/admin/countries/${countryId}/packages`);
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <h1 className="text-3xl font-bold mb-4">Create Package</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
        {/* Form fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rate</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Main Image</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setMainImage)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image One</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImageOne)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image Two</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImageTwo)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image Three</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImageThree)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
        >
          Create Package
        </button>
      </form>
    </div>
  );
};

export default CreatePackagePage;