import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const EditHotelPage = () => {
  const { countryId, placeId, hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    hotelName: "",
    mainImage: null,
    description: "",
    hotelRoomsCount: "",
    address: "",
    price: "",
    rate: "",
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/places/${placeId}/hotels/${hotelId}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    fetchHotel();
  }, [hotelId, placeId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setHotel((prevHotel) => ({
      ...prevHotel,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in hotel) {
      if (hotel[key] !== null) {
        formData.append(key, hotel[key]);
      }
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${process.env.REACT_APP_BASE_API}/places/${placeId}/hotels/${hotelId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        },
        formData
      );
      navigate(`/admin/countries/${countryId}/places/${placeId}/hotels`);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8 max-h-screen overflow-auto">
        <BackButton direction={`/admin/places/${placeId}/hotels`} />
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Hotel</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotelName"
              value={hotel.hotelName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Main Image
            </label>
            <input
              type="file"
              name="mainImage"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={hotel.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hotel Rooms Count
            </label>
            <input
              type="number"
              name="hotelRoomsCount"
              value={hotel.hotelRoomsCount}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={hotel.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={hotel.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rate
            </label>
            <input
              type="number"
              name="rate"
              value={hotel.rate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHotelPage;
