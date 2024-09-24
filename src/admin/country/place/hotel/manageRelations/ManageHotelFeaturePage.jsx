import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../../../../components/BackButton";

const ManageHotelFeaturesPage = () => {
  const { countryId, placeId, hotelId } = useParams();
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [hotelFeatures, setHotelFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/hotels/features`, {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log(response.data)
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    const fetchHotelFeatures = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/details/hotels/features`, {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setHotelFeatures(response.data);
      } catch (error) {
        console.error("Error fetching hotel features:", error);
      }
    };

    fetchFeatures();
    fetchHotelFeatures();
  }, [hotelId]);

  
  const handleAddFeature = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/hotel/features/${selectedFeature}`, 
        null, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const addedFeature = features.find(
        (feature) => feature.id.toString() === selectedFeature
      );
  
      if (addedFeature) {
        setHotelFeatures([...hotelFeatures, addedFeature]);
      } else {
        console.error("Selected feature not found in the available features.");
      }
  
      setSelectedFeature("");
      
      alert("Feature added successfully");
    } catch (error) {
      console.error("Error adding feature:", error);
    }
  };
  

  const handleRemoveFeature = async (featureId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/hotel/features/${featureId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setHotelFeatures(hotelFeatures.filter((feature) => feature.id !== featureId));
    } catch (error) {
      console.error("Error removing feature:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/hotels`} />
      <h1 className="text-3xl font-bold mb-4">Manage Features for Hotel {hotelId}</h1>

      {/* Add Feature */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Feature</h2>
        <select
          value={selectedFeature}
          onChange={(e) => setSelectedFeature(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select a feature</option>
          {features.map((feature) => (
            <option key={feature.id} value={feature.id}>
              {feature.hotelFeature}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddFeature}
          className="bg-green-500 text-white py-2 px-4 rounded-md ml-4"
        >
          Add Feature
        </button>
      </div>

      {/* List and Remove Features */}
      <h2 className="text-2xl font-semibold mb-4">Existing Features</h2>
      <ul>
        {hotelFeatures.length === 0 ? (
          <p>No features found for this hotel.</p>
        ) : (
          hotelFeatures.map((feature) => (
            <li key={`hotel-feature-${feature.id}`} className="mb-2">
              {feature.hotelFeature}
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

export default ManageHotelFeaturesPage;