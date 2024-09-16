import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const SECTIONS = {
  BENEFIT: "BENEFIT",
  ROADMAP: "ROADMAP",
};

const GetPackagesPage = () => {
  const { countryId } = useParams();
  const [packages, setPackages] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // State to track the active section
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/countries/${countryId}/packages`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [countryId]);

  const handleEdit = (packageId) => {
    navigate(`/admin/countries/${countryId}/packages/${packageId}/edit`);
  };

  const handleEditDetails = (packageId) => {
    navigate(
      `/admin/countries/${countryId}/packages/${packageId}/details/edit`
    );
  };

  const handleDelete = async (packageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(
          `${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}/packages/${packageId}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPackages(packages.filter((pkg) => pkg.id !== packageId));
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const handleCreatePackage = () => {
    navigate(`/admin/countries/${countryId}/package`);
  };

  if (packages.length === 0) return <p>No packages found.</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar with Benefits and Roadmap Sections */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-semibold border-b border-gray-600">
          Package Dashboard
        </div>
        <div className="flex-1">
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === SECTIONS.BENEFIT ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              setActiveSection(SECTIONS.BENEFIT);
              navigate(`/admin/countries/${countryId}/packages/benefits`);
            }}
          >
            Manage Benefits
          </button>
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === SECTIONS.ROADMAP ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              setActiveSection(SECTIONS.ROADMAP);
              navigate(`/admin/countries/${countryId}/packages/roadmaps`);
            }}
          >
            Manage Roadmaps
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 p-4 overflow-auto">
        <BackButton direction={`/admin`} />
        <h1 className="text-3xl font-bold mb-4">Packages</h1>
        <button
          onClick={handleCreatePackage}
          className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Create Package
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white p-4 rounded-lg shadow-md">
              {pkg.mainImage && (
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${pkg.mainImage}`}
                  alt={pkg.packageName}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-bold">{pkg.packageName}</h2>
              <p className="text-gray-700">${pkg.price}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {/* View Details Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/countries/${countryId}/packages/${pkg.id}/details`
                    )
                  }
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 min-w-[150px]"
                >
                  View Details
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(pkg.id)}
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-md hover:bg-yellow-600 min-w-[150px]"
                >
                  Edit
                </button>

                {/* Edit Details Button */}
                <button
                  onClick={() => handleEditDetails(pkg.id)}
                  className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-md hover:bg-purple-600 min-w-[150px]"
                >
                  Edit Details
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 min-w-[150px]"
                >
                  Delete
                </button>

                {/* Add Roadmap Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/countries/${countryId}/packages/${pkg.id}/roadmaps`
                    )
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 min-w-[150px]"
                >
                  Add Roadmap
                </button>

                {/* Add Benefit Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/countries/${countryId}/packages/${pkg.id}/benefits`
                    )
                  }
                  className="flex-1 bg-teal-500 text-white py-2 px-3 rounded-md hover:bg-teal-600 min-w-[150px]"
                >
                  Add Benefit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetPackagesPage;