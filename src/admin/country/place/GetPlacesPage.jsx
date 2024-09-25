import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const GetPlacesPage = () => {
  const { countryId } = useParams();
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/countries/${countryId}/places`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [countryId]);

  const handleEdit = (placeId) => {
    navigate(`/admin/countries/${countryId}/places/${placeId}/edit`);
  };

  const handleDelete = async (placeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(
          `${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/places/${placeId}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPlaces(places.filter((place) => place.id !== placeId));
      } catch (error) {
        console.error("Error deleting place:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={"/admin"} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Places</h2>
        <button
          onClick={() => navigate(`/admin/countries/${countryId}/place`)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Add New Place
        </button>
      </div>

      {places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.id} className="bg-white p-4 rounded-lg shadow-md">
              {/* Place Image */}
              {place.mainImage && (
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${place.mainImage}`}
                  alt={`${place.place} Main`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{place.place}</h3>

              <div className="flex flex-wrap gap-2">
                {/* View Details Button */}
                <button
                  onClick={() =>
                    navigate(`/admin/places/${place.id}/details`)
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 min-w-[150px]"
                >
                  View Details
                </button>

                {/* Edit Details Button */}
                <button
                  onClick={() =>
                    navigate(`/admin/places/${place.id}/details/edit`)
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 min-w-[150px]"
                >
                  Edit Details
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(place.id)}
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-md hover:bg-yellow-600 min-w-[150px]"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(place.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 min-w-[150px]"
                >
                  Delete
                </button>

                {/* View Airports Button */}
                <button
                  onClick={() => navigate(`/admin/countries/${countryId}/places/${place.id}/airports`)}
                  className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-md hover:bg-purple-600 min-w-[150px]"
                >
                  View Airports
                </button>

                <button
                  onClick={() => navigate(`/admin/countries/${countryId}/places/${place.id}/hotels`)}
                  className="flex-1 bg-pink-500 text-white py-2 px-3 rounded-md hover:bg-pink-600 min-w-[150px]"
                >
                  View Hotel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No places available.</p>
      )}
    </div>
  );
};

export default GetPlacesPage;