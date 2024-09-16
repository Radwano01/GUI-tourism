import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

const DeletePackagePage = () => {
  const { countryId, packageId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/packages/${packageId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/admin/countries/${countryId}/packages`);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <h1 className="text-3xl font-bold mb-4">Delete Package</h1>
      <p>Are you sure you want to delete this package? This action cannot be undone.</p>
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="py-2 px-4 bg-red-600 text-white rounded-md"
        >
          Delete Package
        </button>
        <button
          onClick={() => navigate(`/admin/countries/${countryId}/packages`)}
          className="py-2 px-4 bg-gray-400 text-white rounded-md ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePackagePage;