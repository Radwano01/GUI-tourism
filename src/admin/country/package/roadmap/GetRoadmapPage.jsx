import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const GetRoadmapsPage = () => {
  const { countryId } = useParams();
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/public/packages/roadmaps`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setRoadmaps(response.data);
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
      }
    };

    fetchRoadmaps();
  }, []);

  const handleEdit = (roadmapId) => {
    navigate(`/admin/countries/${countryId}/packages/roadmaps/${roadmapId}/edit`);
  };

  const handleDelete = async (roadmapId) => {
    const confirmed = window.confirm('Are you sure you want to delete this roadmap?');
    if (confirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/packages/roadmaps/${roadmapId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setRoadmaps(roadmaps.filter(r => r.id !== roadmapId));
      } catch (error) {
        console.error('Error deleting roadmap:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Roadmaps</h1>
        <button
          onClick={() => navigate(`/admin/countries/${countryId}/packages/roadmap`)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Create Roadmap
        </button>
      </div>
      {roadmaps.length === 0 && (
        <p className="text-gray-700 mb-4">No roadmaps found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map(r => (
          <div key={r.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Roadmap {r.id}</h2>
            <p className="text-gray-700 mb-4">{r.roadmap}</p>
            <div className="flex">
              <button
                onClick={() => handleEdit(r.id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.id)}
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

export default GetRoadmapsPage;
