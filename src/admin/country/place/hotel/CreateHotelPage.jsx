import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const CreateHotelPage = () => {
  const { countryId, placeId } = useParams();
  const navigate = useNavigate();

  const [hotelName, setHotelName] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [description, setDescription] = useState("");
  const [hotelRoomsCount, setHotelRoomsCount] = useState(0);
  const [address, setAddress] = useState("");
  const [rate, setRate] = useState(0);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);
  const [roomDescription, setRoomDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.length > 100) {
      alert('Hotel description must be 100 characters or less.');
      return;
    }

    if (roomDescription.length > 1000) {
      alert('Room description must be 1000 characters or less.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("mainImage", mainImage);
    formData.append("description", description);
    formData.append("hotelRoomsCount", hotelRoomsCount);
    formData.append("address", address);
    formData.append("rate", rate);
    formData.append("imageOne", imageOne);
    formData.append("imageTwo", imageTwo);
    formData.append("imageThree", imageThree);
    formData.append("imageFour", imageFour);
    formData.append("roomDescription", roomDescription);
    formData.append("price", price);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`${process.env.REACT_APP_BASE_API}/admin/places/${placeId}/hotel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      navigate(`/admin/countries/${countryId}/places/${placeId}/hotels`);
    } catch (error) {
      alert("Error creating hotel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen-max bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/hotels`} />
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create New Hotel</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Main Image</label>
            <input
              type="file"
              onChange={(e) => setMainImage(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="3"
              placeholder="Enter hotel description (maximum 100 characters)"
              required
            />
            <div className="mt-2 text-sm text-gray-600">
              <span className={description.length > 100 ? "text-red-600" : "text-green-600"}>
                {description.length} / 100 characters
              </span>
              {description.length > 100 && (
                <span className="ml-2 text-red-600">
                  ({description.length - 100} characters over limit)
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hotel Rooms Count</label>
            <input
              type="number"
              value={hotelRoomsCount}
              onChange={(e) => setHotelRoomsCount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rate</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image One</label>
            <input
              type="file"
              onChange={(e) => setImageOne(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Two</label>
            <input
              type="file"
              onChange={(e) => setImageTwo(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Three</label>
            <input
              type="file"
              onChange={(e) => setImageThree(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Four</label>
            <input
              type="file"
              onChange={(e) => setImageFour(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Room Description</label>
            <textarea
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              placeholder="Enter room description (maximum 1000 characters)"
              required
            />
            <div className="mt-2 text-sm text-gray-600">
              <span className={roomDescription.length > 1000 ? "text-red-600" : "text-green-600"}>
                {roomDescription.length} / 1000 characters
              </span>
              {roomDescription.length > 1000 && (
                <span className="ml-2 text-red-600">
                  ({roomDescription.length - 1000} characters over limit)
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            {isLoading ? 'Creating Hotel...' : 'Create Hotel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHotelPage;