import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const GetPlaceDetailsPage = () => {
  const { countryId, placeId } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/places/${placeId}/details`);
        setPlaceDetails(response.data);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  if (!placeDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places`}/>
      <h1 className="text-3xl font-bold mb-4">Place Details</h1>

      <div className="mb-6">
        {placeDetails.mainImage && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${placeDetails.mainImage}`}
            alt={`${placeDetails.place} Main`}
            className="w-full h-81 object-cover rounded-lg mb-4"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {placeDetails.imageOne && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${placeDetails.imageOne}`}
            alt="Image One"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        {placeDetails.imageTwo && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${placeDetails.imageTwo}`}
            alt="Image Two"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        {placeDetails.imageThree && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${placeDetails.imageThree}`}
            alt="Image Three"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        <div className="mb-6">
          <p><strong>Place:</strong> {placeDetails.place}</p>
          <p><strong>Description:</strong> {placeDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GetPlaceDetailsPage;
