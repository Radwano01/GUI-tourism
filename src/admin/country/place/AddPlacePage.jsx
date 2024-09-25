import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const AddPlacePage = () => {
  const { countryId } = useParams(); 
  const [place, setPlace] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("place", place);
    formData.append("mainImage", mainImage);
    formData.append("imageOne", imageOne);
    formData.append("imageTwo", imageTwo);
    formData.append("imageThree", imageThree);
    formData.append("description", description);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/place`, formData, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate(`/admin/countries/${countryId}/places`);
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 items-center">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={`/admin`}/>
        <div className="w-full max-w-lg mx-auto items-center">
          <h2 className="text-2xl font-bold mb-6">Add Place</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Place Name
              </label>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place name"
                required
              />
            </div>

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

            {/* Other images */}
            {[setImageOne, setImageTwo, setImageThree].map((setter, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-sm font-medium text-gray-700">{`Image ${
                  index + 1
                }`}</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setter)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}

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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Add Place
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlacePage;
