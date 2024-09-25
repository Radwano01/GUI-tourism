import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const CreateRoadmapPage = () => {
  const { countryId } = useParams();
  const [roadmap, setRoadmap] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/admin/packages/roadmap`, { roadmap }, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/admin/countries/${countryId}/packages/roadmaps`);
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages/roadmaps`} />
      <h1 className="text-3xl font-bold mb-4">Create Roadmap</h1>
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
          Create Roadmap
        </button>
      </form>
    </div>
  );
};

export default CreateRoadmapPage;