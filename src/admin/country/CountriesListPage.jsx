import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CountriesListPage = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/countries`,
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleDelete = async (countryId) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/countries/${countryId}`,
          {headers:{
            Authorization:`Bearer ${token}`
          }}
        );
        setCountries(countries.filter((country) => country.id !== id));
        alert("Country deleted successfully!");
      } catch (error) {
        console.error("Error deleting country:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Countries</h2>
        <button
          onClick={() => navigate("/admin/country")}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Add New Country
        </button>
      </div>

      {countries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {countries.map((country) => (
            <div key={country.id} className="bg-white p-4 rounded-lg shadow-md">
              {/* Country Image */}
              {country.mainImage && (
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${country.mainImage}`}
                  alt={country.country}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{country.country}</h3>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    navigate(`/admin/countries/${country.id}/details`)
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 min-w-[150px]"
                >
                  View Details
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/countries/${country.id}/details/edit`)
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 min-w-[150px]"
                >
                  Edit Details
                </button>

                <button
                  onClick={() => navigate(`/admin/countries/${country.id}`)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 min-w-[150px]"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(country.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 min-w-[150px]"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/countries/${country.id}/places`)
                  }
                  className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-md hover:bg-purple-600 min-w-[150px]"
                >
                  View Places
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/countries/${country.id}/packages`)
                  }
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-md hover:bg-yellow-600 min-w-[150px]"
                >
                  View Packages
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No countries available.</p>
      )}
    </div>
  );
};

export default CountriesListPage;