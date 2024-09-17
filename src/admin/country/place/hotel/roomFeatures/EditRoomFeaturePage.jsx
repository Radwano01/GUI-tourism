import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRoomFeaturePage = () => {
  const { featureId } = useParams();
  const [roomFeature, setRoomFeature] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomFeature = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/rooms/features/${featureId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setRoomFeature(response.data.roomFeature);
      } catch (error) {
        console.error('Error fetching room feature:', error);
      }
    };
    fetchRoomFeature();
  }, [featureId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/rooms/features/${featureId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }, {
        roomFeature,
      });
      navigate(`/admin/countries/${countryId}/places/${placeId}/rooms/features`); // Redirect to the room features list
    } catch (error) {
      console.error('Error updating room feature:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Edit Room Feature</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Room Feature</label>
            <input
              type="text"
              value={roomFeature}
              onChange={(e) => setRoomFeature(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoomFeaturePage;