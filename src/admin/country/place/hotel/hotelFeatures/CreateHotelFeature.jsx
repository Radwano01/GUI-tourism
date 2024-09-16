// CreateHotelFeaturePage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../../../components/BackButton";

const CreateHotelFeaturePage = () => {
  const { countryId, placeId } = useParams();
  const [hotelFeature, setHotelFeature] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/feature`,
        { hotelFeature }
      );
      navigate(
        `/admin/countries/${countryId}/places/${placeId}/hotels/features`
      );
    } catch (error) {
      console.error("Error creating hotel feature:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton
          direction={`/admin/countries/${countryId}/places/${placeId}/hotels/features`}
        />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Hotel Feature
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hotel Feature
            </label>
            <input
              type="text"
              value={hotelFeature}
              onChange={(e) => setHotelFeature(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Create Feature
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHotelFeaturePage;
