import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton'; // Import the BackButton component

const GetCountryDetailsPage = () => {
  const { countryId } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/public/countries/${countryId}/details`,
          {headers:{
            Authorization: `Bearer ${token}`
          }}
        );
        setCountryDetails(response.data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [countryId]);

  if (!countryDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={"/admin"}/> {/* Add the BackButton here */}
      <h1 className="text-3xl font-bold mb-4">Country Details</h1>
      
      <div className="mb-6">
        {/* Display the main country image */}
        {countryDetails.countryMainImage && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${countryDetails.countryMainImage}`}
            alt={`${countryDetails.country} Main`}
            className="w-full h-81 object-cover rounded-lg mb-4"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Display additional images */}
        {countryDetails.imageOne && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${countryDetails.imageOne}`}
            alt="Image One"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        {countryDetails.imageTwo && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${countryDetails.imageTwo}`}
            alt="Image Two"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        {countryDetails.imageThree && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${countryDetails.imageThree}`}
            alt="Image Three"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        
        <div className="mb-6">
          <p><strong>Country:</strong> {countryDetails.country}</p>
          <p><strong>Description:</strong> {countryDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GetCountryDetailsPage;