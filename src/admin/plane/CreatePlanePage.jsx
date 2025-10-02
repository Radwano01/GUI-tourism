import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

const CreatePlanePage = () => {
  const [planeCompanyName, setPlaneCompanyName] = useState("");
  const [numSeats, setNumSeats] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const newPlane = {
      planeCompanyName,
      numSeats: parseInt(numSeats),
    };
    const token = localStorage.getItem("accessToken");
    
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/admin/plane`, newPlane, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/admin?section=PLANE"); // Redirect to the planes list
    } catch (error) {
      alert("Error creating plane. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={"/admin?section=PLANE"} />
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
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isLoading ? 'Creating Plane...' : 'Create Plane'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanePage;