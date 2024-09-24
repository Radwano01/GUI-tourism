// src/pages/packages/ManagePackageBenefitsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const ManagePackageBenefitsPage = () => {
  const { countryId, packageId } = useParams();
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [packageBenefits, setPackageBenefits] = useState([]); // Benefits already in the package

  useEffect(() => {
    // Fetch all available benefits
    const fetchBenefits = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/packages/benefits`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBenefits(response.data);
      } catch (error) {
        console.error("Error fetching benefits:", error);
      }
    };

    // Fetch benefits associated with the package
    const fetchPackageBenefits = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/details/benefits`, {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPackageBenefits(response.data);
      } catch (error) {
        alert("Already valid benefit");
      }
    };

    fetchBenefits();
    fetchPackageBenefits();
  }, [packageId]);

  const handleAddBenefit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/benefits/${selectedBenefit}`, 
        null, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Benefit added successfully");

      const addedBenefit = benefits.find(
        (benefit) => benefit.id.toString() === selectedBenefit
      );
  
      if (addedBenefit) {
        setPackageBenefits([...packageBenefits, addedBenefit]);
      } else {
        console.error("Selected benefit not found in the available benefits.");
      }
  
      setSelectedBenefit("");
    } catch (error) {
      console.error("Error adding benefit:", error);
    }
  };
  

  // Remove a benefit from the package
  const handleRemoveBenefit = async (benefitId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/packages/${packageId}/benefits/${benefitId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Benefit removed successfully");
      setPackageBenefits(
        packageBenefits.filter((benefit) => benefit.id !== benefitId)
      );
    } catch (error) {
      console.error("Error removing benefit:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <h1 className="text-3xl font-bold mb-4">
        Manage Benefits for Package {packageId}
      </h1>

      {/* Add Benefit */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Benefit to Package</h2>
        <select
          value={selectedBenefit}
          onChange={(e) => setSelectedBenefit(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select a benefit</option>
          {benefits.map((benefit) => (
            <option key={benefit.id} value={benefit.id}>
              {benefit.benefit}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddBenefit}
          className="bg-green-500 text-white py-2 px-4 rounded-md ml-4"
        >
          Add Benefit
        </button>
      </div>

      {/* List and Remove Benefits */}
      <h2 className="text-2xl font-semibold mb-4">Existing Benefits</h2>
      <ul>
        {packageBenefits.length === 0 ? (
          <p>No benefits found for this package.</p>
        ) : (
          packageBenefits.map((benefit) => (
            <li key={benefit.id} className="mb-2">
              {benefit.benefit}
              <button
                onClick={() => handleRemoveBenefit(benefit.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-md ml-4"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManagePackageBenefitsPage;
