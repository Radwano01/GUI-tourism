import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const GetBenefitsPage = () => {
  const { countryId } = useParams();  
  const [benefits, setBenefits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/public/packages/benefits`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setBenefits(response.data);
      } catch (error) {
        console.error('Error fetching benefits:', error);
      }
    };

    fetchBenefits();
  }, []);

  const handleEdit = (benefitId) => {
    navigate(`/admin/countries/${countryId}/packages/benefits/${benefitId}/edit`);
  };

  const handleDelete = async (benefitId) => {
    const confirmed = window.confirm('Are you sure you want to delete this benefit?');
    if (confirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${process.env.REACT_APP_BASE_API}/admin/packages/benefits/${benefitId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setBenefits(benefits.filter(b => b.id !== benefitId));
      } catch (error) {
        console.error('Error deleting benefit:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Benefits</h1>
        <button
          onClick={() => navigate(`/admin/countries/${countryId}/packages/benefit`)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Create Benefit
        </button>
      </div>
      {benefits.length === 0 && (
        <p className="text-gray-700 mb-4">No benefits found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map(b => (
          <div key={b.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Benefit {b.id}</h2>
            <p className="text-gray-700 mb-4">{b.benefit}</p>
            <div className="flex">
              <button
                onClick={() => handleEdit(b.id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="bg-red-600 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-700 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetBenefitsPage;