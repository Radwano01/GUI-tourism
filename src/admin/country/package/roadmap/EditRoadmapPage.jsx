import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const EditRoadmapPage = () => {
  const { countryId, roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/packages/roadmaps/${roadmapId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }, { roadmap });
      navigate(`/admin/countries/${countryId}/packages/roadmaps`);
    } catch (error) {
      console.error('Error updating roadmap:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages/roadmaps`} />
      <h1 className="text-3xl font-bold mb-4">Edit Roadmap</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Roadmap</label>
          <textarea
            value={roadmap}
            onChange={(e) => setRoadmap(e.target.value)}
            rows="6"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Update Roadmap
        </button>
      </form>
    </div>
  );
};

export default EditRoadmapPage;