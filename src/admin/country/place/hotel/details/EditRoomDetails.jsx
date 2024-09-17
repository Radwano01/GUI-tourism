import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../../../components/BackButton";

const EditRoomDetailsPage = () => {
  const { placeId, hotelId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    imageFour: null,
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("imageOne", formData.imageOne);
    form.append("imageTwo", formData.imageTwo);
    form.append("imageThree", formData.imageThree);
    form.append("imageFour", formData.imageFour);
    form.append("description", formData.description);
    form.append("price", formData.price);

    const token = localStorage.getItem("accessToken");
    axios
      .put(
        `${process.env.REACT_APP_BASE_API}/admin/hotels/${hotelId}/rooms/details`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        },
        form
      )
      .then(() => {
        alert("Room details updated successfully");
        navigate(`/hotels/${hotelId}/rooms/details`);
      })
      .catch((error) => {
        console.error("Error updating room details:", error);
        alert("Failed to update room details");
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8 max-h-screen overflow-auto">
        <BackButton direction={`/admin/places/${placeId}/hotels`} />

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Edit Room Details
          </h1>
          {/* Image Inputs */}
          <div className="mb-4">
            <label
              htmlFor="imageOne"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image One
            </label>
            <input
              type="file"
              id="imageOne"
              name="imageOne"
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageTwo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Two
            </label>
            <input
              type="file"
              id="imageTwo"
              name="imageTwo"
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageThree"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Three
            </label>
            <input
              type="file"
              id="imageThree"
              name="imageThree"
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageFour"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Four
            </label>
            <input
              type="file"
              id="imageFour"
              name="imageFour"
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoomDetailsPage;
