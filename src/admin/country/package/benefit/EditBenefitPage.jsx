import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const EditBenefitPage = () => {
  const { countryId, benefitId } = useParams();
  const [benefit, setBenefit] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(`${process.env.REACT_APP_BASE_API}/admin/packages/benefits/${benefitId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }, { benefit });
      navigate(`/admin/countries/${countryId}/packages/benefits`);
    } catch (error) {
      console.error('Error updating benefit:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages/benefits`} />
      <h1 className="text-3xl font-bold mb-4">Edit Benefit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="benefit" className="block text-lg font-medium mb-2">Benefit</label>
          <input
            type="text"
            id="benefit"
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBenefitPage;