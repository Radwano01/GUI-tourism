import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePlacePage = () => {
  const { countryId, placeId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this place?');
    if (confirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/places/${placeId}`);
        navigate('/places');
      } catch (error) {
        console.error('Error deleting place:', error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="w-full py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Delete Place
    </button>
  );
};

export default DeletePlacePage;
