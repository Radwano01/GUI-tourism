import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const CreateBenefitPage = () => {
  const { countryId } = useParams();
  const [benefit, setBenefit] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/packages/benefit`,
        { benefit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/admin/countries/${countryId}/packages/benefits`);
    } catch (error) {
      console.error("Error creating benefit:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton
        direction={`/admin/countries/${countryId}/packages/benefits`}
      />
      <h1 className="text-3xl font-bold mb-4">Create Benefit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="benefit" className="block text-lg font-medium mb-2">
            Benefit
          </label>

          <textarea
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
            rows="6"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBenefitPage;
