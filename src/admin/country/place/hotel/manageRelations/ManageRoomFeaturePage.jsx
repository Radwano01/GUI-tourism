import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../../../../components/BackButton";

const ManageRoomFeaturesPage = () => {
  const { countryId, placeId, hotelId } = useParams();
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [roomFeatures, setRoomFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/rooms/Features`, {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    const fetchRoomFeatures = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/rooms/features`, {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setRoomFeatures(response.data);
      } catch (error) {
        console.error("Error fetching room features:", error);
      }
    };

    fetchFeatures();
    fetchRoomFeatures();
  }, [hotelId]);

  const handleAddFeature = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/room/features/${selectedFeature}`, {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRoomFeatures([...roomFeatures, selectedFeature]);
      alert("Feature added successfully");
    } catch (error) {
      console.error("Error adding feature:", error);
    }
  };

  const handleRemoveFeature = async (featureId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/room/features/${featureId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRoomFeatures(roomFeatures.filter((feature) => feature.id !== featureId));
    } catch (error) {
      console.error("Error removing feature:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/hotels`} />
      <h1 className="text-3xl font-bold mb-4">Manage Room Features for Hotel {hotelId}</h1>

      {/* Add Feature */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Room Feature</h2>
        <select
          value={selectedFeature}
          onChange={(e) => setSelectedFeature(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select a room feature</option>
          {features.map((feature) => (
            <option key={feature.id} value={feature.id}>
              {feature.roomFeature}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddFeature}
          className="bg-green-500 text-white py-2 px-4 rounded-md ml-4"
        >
          Add Room Feature
        </button>
      </div>

      {/* List and Remove Features */}
      <h2 className="text-2xl font-semibold mb-4">Existing Room Features</h2>
      <ul>
        {roomFeatures.length === 0 ? (
          <p>No features found for rooms in this hotel.</p>
        ) : (
          roomFeatures.map((feature) => (
            <li key={feature.id} className="mb-2">
              {feature.featureName}
              <button
                onClick={() => handleRemoveFeature(feature.id)}
                className="ml-4 bg-red-500 text-white py-1 px-2 rounded-md"
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

export default ManageRoomFeaturesPage;