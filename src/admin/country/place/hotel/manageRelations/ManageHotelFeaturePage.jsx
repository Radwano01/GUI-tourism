import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../../../../components/BackButton";

const ManageHotelFeaturesPage = () => {
  const { countryId, placeId, hotelId } = useParams();
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [hotelFeatures, setHotelFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturesData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const [featuresResponse, hotelFeaturesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_API}/public/hotels/features`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/details/hotels/features`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setFeatures(featuresResponse.data);
        setHotelFeatures(hotelFeaturesResponse.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeaturesData();
  }, [hotelId]);

  const handleAddFeature = async () => {
    if (!selectedFeature) {
      alert("Please select a feature.");
      return;
    }

    const featureExists = hotelFeatures.some(
      (feature) => feature.id.toString() === selectedFeature
    );

    if (featureExists) {
      alert("Feature already added.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/hotel/features/${selectedFeature}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const addedFeature = features.find(
        (feature) => feature.id.toString() === selectedFeature
      );

      if (addedFeature) {
        setHotelFeatures([...hotelFeatures, addedFeature]);
        setSelectedFeature("");
        alert("Feature added successfully.");
      } else {
        console.error("Feature not found in the available features.");
      }
    } catch (error) {
      console.error("Error adding feature:", error);
      alert("Error adding feature. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFeature = async (featureId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/hotel/features/${featureId}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
          disabled={isLoading || !selectedFeature}
          className={`py-2 px-4 rounded-md ml-4 ${
            isLoading || !selectedFeature
              ? 'bg-gray-400 cursor-not-allowed text-gray-200'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isLoading ? 'Adding Feature...' : 'Add Feature'}
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