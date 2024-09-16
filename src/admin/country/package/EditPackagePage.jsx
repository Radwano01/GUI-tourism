import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../components/BackButton";

const EditPackagePage = () => {
  const { countryId, packageId } = useParams();
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API}/public/packages/${packageId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { packageName, price, rate } = response.data;
        setPackageName(packageName);
        setPrice(price);
        setRate(rate);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
      });
  }, [packageId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("packageName", packageName);
    formData.append("price", price);
    formData.append("rate", rate);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    axios
      .put(
        `${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      )
      .then((response) => {
        navigate(`/admin/countries/${countryId}/packages`); // Redirect to the package list after editing
      })
      .catch((error) => {
        console.error("Error updating package:", error);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8">
        <BackButton direction={`/admin/countries/${countryId}/packages`} />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Edit Package Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Package Name
            </label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={rate}
              onChange={(e) => setRate(e.target.value)}
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
              onChange={(e) => setMainImage(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

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

export default EditPackagePage;