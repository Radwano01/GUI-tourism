import React, { useState } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton"; // Ensure the path to BackButton is correct

const AddCountryPage = () => {
  const [country, setCountry] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("country", country);
    formData.append("mainImage", mainImage);
    formData.append("imageOne", imageOne);
    formData.append("imageTwo", imageTwo);
    formData.append("imageThree", imageThree);
    formData.append("description", description);

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/country`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      alert("Country added successfully!");
    } catch (error) {
      console.error("There was an error creating the country!", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton className="mb-4" direction={"/admin"}/>{" "}
        {/* Positioned above the form with margin bottom */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Add Country</h2>

          {/* Country Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Country Name
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter country name"
              required
            />
          </div>

          {/* Main Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Main Image
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setMainImage)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Image One */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image One
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setImageOne)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image Two */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image Two
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setImageTwo)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image Three */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image Three
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setImageThree)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="3"
              placeholder="Enter description"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountryPage;
