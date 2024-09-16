import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../../../components/BackButton";

const GetHotelFeaturesPage = () => {
  const { countryId, placeId } = useParams();
  const navigate = useNavigate();
  const [hotelFeatures, setHotelFeatures] = useState([]);

  useEffect(() => {
    const fetchHotelFeatures = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/hotels/features`
        );
        setHotelFeatures(response.data || []);
      } catch (error) {
        console.error("Error fetching hotel features:", error);
      }
    };

    fetchHotelFeatures();
  }, [placeId]);

  const handleEdit = (featureId) => {
    navigate(`/admin/countries/${countryId}/places/${placeId}/hotels/features/${featureId}/edit`);
  };

  const handleDelete = async (featureId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feature?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_API}/admin/hotels/features/${featureId}`
        );
        setHotelFeatures(hotelFeatures.filter((feature) => feature.featureId !== featureId));
        window.location.reload();
      } catch (error) {
        console.error("Error deleting feature:", error);
      }
    }
  };

  const handleCreateFeature = () => {
    navigate(`/admin/countries/${countryId}/places/${placeId}/hotels/features/create`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/hotels`} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Hotel Features</h1>
        <button
          onClick={handleCreateFeature}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Create Feature
        </button>
      </div>
      {hotelFeatures.length === 0 && (
        <p className="text-gray-700 mb-4">No hotel features found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelFeatures.map((feature) => (
          <div key={feature.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Feature {feature.featureId}</h2>
            <p className="text-gray-700 mb-4">{feature.hotelFeature}</p>
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

export default GetHotelFeaturesPage;