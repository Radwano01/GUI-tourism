import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const GetHotelsPage = () => {
  const { countryId, placeId } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/places/${placeId}/hotels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { page, size },
          }
        );
        setHotels(response.data || []);
        setTotalPages(response.data.length || 0);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [placeId, page, size]);

  const handleDelete = async (hotelId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hotel?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(
          `${process.env.REACT_APP_BASE_API}/admin/places/${placeId}/hotels/${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
    }
  };

  const handleEditHotel = (hotelId) => {
    navigate(
      `/admin/countries/${countryId}/places/${placeId}/hotels/${hotelId}/edit`
    );
  };

  const handleEditRoomDetails = (hotelId) => {
    navigate(
      `/admin/countries/${countryId}/places/${placeId}/hotels/${hotelId}/rooms/details/edit`
    );
  };

  const handleDetails = (hotelId) => {
    navigate(
      `/admin/countries/${countryId}/places/${placeId}/hotels/${hotelId}/details`
    );
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleCreateHotel = () => {
    navigate(`/admin/places/${placeId}/hotels/create`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <a
              href={`/admin/countries/${countryId}/places/${placeId}/hotels/features`}
              className="hover:bg-gray-700 p-2 rounded block"
            >
              Manage Hotel Features
            </a>
          </li>
          <li className="mb-2">
            <a
              href={`/admin/countries/${countryId}/places/${placeId}/rooms/features`}
              className="hover:bg-gray-700 p-2 rounded block"
            >
              Manage Room Features
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 ml-50">
        <BackButton direction={`/admin/countries/${countryId}/places`} />
        <h2 className="text-2xl font-bold mb-4">Hotels List</h2>
        <button
          onClick={handleCreateHotel}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Hotel
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-4 bg-white rounded-lg shadow-md flex flex-col"
              >
                <h3 className="text-lg font-semibold">{hotel.hotelName}</h3>
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${hotel.mainImage}`}
                  alt={hotel.hotelName}
                  className="w-full h-32 object-cover mb-2"
                />
                <div className="flex-grow">
                  <div className="min-h-[60px]">
                    <p className="font-semibold">Description:</p>
                    <p>{hotel.description}</p>
                  </div>
                  <div className="min-h-[60px]">
                    <p className="font-semibold">Address:</p>
                    <p>{hotel.address}</p>
                  </div>
                  <div className="min-h-[60px]">
                    <p className="font-semibold">Rate:</p>
                    <p>{hotel.rate}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 py-2">
                  <button
                    onClick={() => handleDetails(hotel.id)}
                    className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-md hover:bg-purple-600 min-w-[150px]"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEditHotel(hotel.id)}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 min-w-[150px]"
                  >
                    Edit Hotel
                  </button>
                  <button
                    onClick={() => handleEditRoomDetails(hotel.id)}
                    className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-md hover:bg-yellow-600 min-w-[150px]"
                  >
                    Edit Room Details
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 min-w-[150px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels available</p>
          )}
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="w-24 px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
              className="w-24 px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetHotelsPage;
