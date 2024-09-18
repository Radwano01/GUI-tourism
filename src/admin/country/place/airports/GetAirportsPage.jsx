import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../../components/BackButton";

const GetAirportsPage = () => {
  const { countryId, placeId } = useParams();
  const [airports, setAirports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API}/public/places/${placeId}/airports`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setAirports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, [placeId]);

  const handleDelete = (airPortId) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      const token = localStorage.getItem("accessToken");
      axios
        .delete(
          `${process.env.REACT_APP_BASE_API}/admin/places/${placeId}/airports/${airPortId}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          // After successful deletion, refetch the list of airports
          setAirports(
            airports.filter((airport) => airport.airPortId !== airPortId)
          );
          alert("Airport deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting airport:", error);
          alert("Failed to delete airport");
        });
    }
  };

  const handleCreateAirport = () => {
    navigate(`/admin/countries/${countryId}/places/${placeId}/airport`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places`} />
      <h2 className="text-2xl font-bold mb-4">Airports</h2>
      <button
        onClick={handleCreateAirport}
        className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Create Airport
      </button>
      {airports.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {airports.map((airport) => (
            <div
              key={airport.airPortId}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold">{airport.airPortName}</h3>
              <p className="text-gray-700">Code: {airport.airPortCode}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {/* Edit Airport Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/countries/${countryId}/places/${placeId}/airports/${airport.airPortId}/edit`
                    )
                  }
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-md hover:bg-yellow-600"
                >
                  Edit Airport
                </button>

                {/* Delete Airport Button */}
                <button
                  onClick={() => handleDelete(airport.airPortId)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700"
                >
                  Delete Airport
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No airports available for this place.</p>
      )}
    </div>
  );
};

export default GetAirportsPage;