import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteCountryPage = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${process.env.REACT_APP_BASE_API}admin/countries/${countryId}`,
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      alert('Country deleted successfully!');
      navigate('/admin/countries');  // Redirect to countries list after deletion
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Delete Country</h2>
        <p className="mb-4">Are you sure you want to delete this country?</p>

        <div className="flex justify-between">
          {/* Cancel Button */}
          <button
            onClick={() => navigate('/admin/countries')}
            className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mr-2"
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete Country
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCountryPage;