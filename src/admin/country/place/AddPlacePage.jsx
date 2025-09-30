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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.length > 2000) {
      alert('Place description must be 2000 characters or less.');
      return;
    }
    
    setIsLoading(true);
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
      alert("Error creating place. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 items-center">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={`/admin/countries/${countryId}/places`}/>
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
                rows="6"
                placeholder="Enter place description (maximum 2000 characters)"
                maxLength={2000}
              />
              <div className="mt-2 text-sm text-gray-600">
                <span className={description.length > 2000 ? "text-red-600" : "text-green-600"}>
                  {description.length} / 2000 characters
                </span>
                {description.length > 2000 && (
                  <span className="ml-2 text-red-600">
                    ({description.length - 2000} characters over limit)
                  </span>
                )}
              </div>
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
              {isLoading ? 'Creating Place...' : 'Add Place'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlacePage;
