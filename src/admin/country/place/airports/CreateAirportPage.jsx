import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../../components/BackButton";

const CreateAirportPage = () => {
  const { countryId, placeId } = useParams();
  const [airPortName, setAirPortName] = useState("");
  const [airPortCode, setAirPortCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAirport = {
      airPortName,
      airPortCode,
    };

    // Send request to create the new airport
    axios
      .post(`${process.env.REACT_APP_BASE_API}/admin/places/${placeId}/airport`, newAirport)
      .then(() => {
        navigate(`/admin/countries/${countryId}/places/${placeId}/airports`); // Redirect to the airport list
      })
      .catch((error) => {
        console.error("Error creating airport:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto">
        <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/airports`} />
        <h2 className="text-2xl font-bold mb-6">Create New Airport</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Airport Name</label>
            <input
              type="text"
              value={airPortName}
              onChange={(e) => setAirPortName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter airport name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Airport Code</label>
            <input
              type="text"
              value={airPortCode}
              onChange={(e) => setAirPortCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter airport code"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Create Airport
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAirportPage;