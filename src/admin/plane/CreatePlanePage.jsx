import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

const CreatePlanePage = () => {
  const [planeCompanyName, setPlaneCompanyName] = useState("");
  const [numSeats, setNumSeats] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlane = {
      planeCompanyName,
      numSeats: parseInt(numSeats),
    };
    const token = localStorage.getItem("accessToken");
    axios
      .post(`${process.env.REACT_APP_BASE_API}/admin/plane`, newPlane, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        navigate("/admin"); // Redirect to the planes list
      })
      .catch((error) => {
        console.error("Error creating plane:", error);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={"/admin"} />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Create New Plane</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Plane Company Name
            </label>
            <input
              type="text"
              value={planeCompanyName}
              onChange={(e) => setPlaneCompanyName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of Seats
            </label>
            <input
              type="number"
              value={numSeats}
              onChange={(e) => setNumSeats(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Create Plane
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanePage;