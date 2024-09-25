import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';

const GetPackageDetailsPage = () => {
  const { countryId, packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/public/packages/${packageId}/details`);
        setPackageDetails(response.data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  if (!packageDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/packages`} />
      <h1 className="text-3xl font-bold mb-4">Package Details</h1>
      <div className="mb-6">
        {packageDetails.mainImage && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails.mainImage}`}
            alt={`${packageDetails.packageName} Main`}
            className="w-full h-81 object-cover rounded-lg mb-4"
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packageDetails.imageOne && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails.imageOne}`}
            alt="Image One"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        {packageDetails.imageTwo && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails.imageTwo}`}
            alt="Image Two"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        {packageDetails.imageThree && (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails.imageThree}`}
            alt="Image Three"
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
        <div className="mb-6">
          <p><strong>Package Name:</strong> {packageDetails.packageName}</p>
          <p><strong>Price:</strong> ${packageDetails.price}</p>
          <p><strong>Rate:</strong> {packageDetails.rate}</p>
          <p><strong>Description:</strong> {packageDetails.description}</p>
        </div>
      </div>

      {/* Roadmap */}
      {packageDetails.roadmaps && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
          <ul className="list-disc pl-5">
            {packageDetails.roadmaps.map((roadmap) => (
              <li key={roadmap.id}>{roadmap.roadmap}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {packageDetails.benefits && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Benefits</h2>
          <ul className="list-disc pl-5">
            {packageDetails.benefits.map((benefit) => (
              <li key={benefit.id}>{benefit.benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetPackageDetailsPage;