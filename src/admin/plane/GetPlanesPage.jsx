import React, { useEffect, useState } from "react";
import axios from "axios";

const GetPlanesPage = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/public/planes`)
      .then((response) => {
        setPlanes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching planes:", error);
      });
  }, []);

  const handleDelete = (planeId) => {
    if (window.confirm("Are you sure you want to delete this plane?")) {
      const token = localStorage.getItem("accessToken");
      axios
        .delete(`${process.env.REACT_APP_BASE_API}/admin/planes/${planeId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          setPlanes(planes.filter((plane) => plane.id !== planeId));
        })
        .catch((error) => {
          console.error("Error deleting plane:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Planes List</h2>
        <button
          onClick={() => (window.location.href = "/admin/plane")}
          className="inline-block mb-4 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Create New Plane
        </button>
        <button
          onClick={() => (window.location.href = "/admin/flights")}
          className="inline-block mb-4 py-2 px-4 bg-yellow-600 text-white rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 m-2"
        >
          View Flights
        </button>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Company Name</th>
              <th className="px-4 py-2 border-b">Number of Seats</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plane) => (
              <tr key={plane.id}>
                <td className="px-4 py-2 border-b">{plane.id}</td>
                <td className="px-4 py-2 border-b">{plane.planeCompanyName}</td>
                <td className="px-4 py-2 border-b">{plane.numSeats}</td>
                <td className="px-4 py-2 border-b">
                  {plane.status ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/admin/planes/${plane.id}`)
                    }
                    className="w-20 h-12 text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(plane.id)}
                    className="w-20 h-12 text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      (window.location.href = `/admin/planes/${plane.id}/flight/add`)
                    }
                    className="w-20 h-12 text-green-600 hover:underline"
                  >
                    Add Flight
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetPlanesPage;
