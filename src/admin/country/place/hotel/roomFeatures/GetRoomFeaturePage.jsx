import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../../../components/BackButton';

const RoomFeaturesListPage = () => {
    const { countryId, placeId } = useParams();
  const [roomFeatures, setRoomFeatures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomFeatures = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/rooms/features`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setRoomFeatures(response.data);
      } catch (error) {
        console.error('Error fetching room features:', error);
      }
    };
    fetchRoomFeatures();
  }, []);

  const handleCreateFeature = () => {
    navigate(`/admin/countries/${countryId}/places/${placeId}/rooms/features/create`);
  };

  const handleEdit = (featureId) => {
    navigate(`/admin/rooms/features/edit/${featureId}`);
  };

  const handleDelete = async (featureId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/rooms/features/${featureId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setRoomFeatures(roomFeatures.filter((feature) => feature.id !== featureId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting room feature:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/hotels`}/>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Room Features</h1>
        <button
          onClick={handleCreateFeature}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Create Feature
        </button>
      </div>
      {roomFeatures.length === 0 && (
        <p className="text-gray-700 mb-4">No room features found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomFeatures.map((feature) => (
          <div key={feature.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Feature {feature.id}</h2>
            <p className="text-gray-700 mb-4">{feature.roomFeature}</p>
            <div className="flex">
              <button
                onClick={() => handleEdit(feature.id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(feature.id)}
                className="bg-red-600 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-700 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomFeaturesListPage;
