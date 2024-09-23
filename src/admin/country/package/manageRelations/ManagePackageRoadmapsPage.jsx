// src/pages/packages/ManagePackageRoadmapsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const ManagePackageRoadmapsPage = () => {
  const { countryId, packageId } = useParams();
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState('');
  const [packageRoadmaps, setPackageRoadmaps] = useState([]); // Roadmaps already in the package

  useEffect(() => {
    // Fetch all available roadmaps
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/admin/packages/roadmaps`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setRoadmaps(response.data);
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
      }
    };

    // Fetch roadmaps associated with the package
    const fetchPackageRoadmaps = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/details/roadmaps`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setPackageRoadmaps(response.data);
      } catch (error) {
        console.error('Error fetching package roadmaps:', error);
      }
    };

    fetchRoadmaps();
    fetchPackageRoadmaps();
  }, [packageId]);

  // Add a roadmap to the package
  const handleAddRoadmap = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/roadmaps/${selectedRoadmap}`, {
        headers:{
            Authorization: `Bearer ${token}`
          }
      });
      alert('Roadmap added successfully');
      setPackageRoadmaps([...packageRoadmaps, selectedRoadmap]);
    } catch (error) {
      alert("Already valid roadmap");
    }
  };

  // Remove a roadmap from the package
  const handleRemoveRoadmap = async (roadmapId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/roadmaps/${roadmapId}`, {
        headers:{
            Authorization: `Bearer ${token}`
          }
      });
      alert('Roadmap removed successfully');
      setPackageRoadmaps(packageRoadmaps.filter(rm => rm.id !== roadmapId));
    } catch (error) {
      console.error('Error removing roadmap:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <h1 className="text-3xl font-bold mb-4">Manage Roadmaps for Package {packageId}</h1>

      {/* Add Roadmap */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Roadmap to Package</h2>
        <select
          value={selectedRoadmap}
          onChange={(e) => setSelectedRoadmap(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select a roadmap</option>
          {roadmaps.map((roadmap) => (
            <option key={roadmap.id} value={roadmap.id}>
              {roadmap.roadmap}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddRoadmap}
          className="bg-green-500 text-white py-2 px-4 rounded-md ml-4"
        >
          Add Roadmap
        </button>
      </div>

      {/* List and Remove Roadmaps */}
      <h2 className="text-2xl font-semibold mb-4">Existing Roadmaps</h2>
      <ul>
        {packageRoadmaps.length === 0 ? (
          <p>No roadmaps found for this package.</p>
        ) : (
          packageRoadmaps.map(roadmap => (
            <li key={roadmap.id} className="mb-2">
              {roadmap.roadmap}
              <button
                onClick={() => handleRemoveRoadmap(roadmap.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-md ml-4"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManagePackageRoadmapsPage;