import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../../../components/BackButton";

const GetRoomDetailsPage = () => {
  const { countryId, placeId, hotelId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API}/public/hotels/${hotelId}/rooms/details`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setRoomDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  }, [hotelId]);

  if (!roomDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton direction={`/admin/countries/${countryId}/places/${placeId}/hotels`} />
      <h1 className="text-3xl font-bold mb-4">Room Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">{roomDetails.hotelName}</h2>
        <p className="text-gray-600">{roomDetails.address}</p>
        <p className="text-yellow-500">Rating: {roomDetails.rate}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {roomDetails.imageOne && (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${roomDetails.imageOne}`}
              alt="Room Image 1"
              className="w-full h-64 object-cover rounded-md"
            />
          )}
          {roomDetails.imageTwo && (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${roomDetails.imageTwo}`}
              alt="Room Image 2"
              className="w-full h-64 object-cover rounded-md"
            />
          )}
          {roomDetails.imageThree && (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${roomDetails.imageThree}`}
              alt="Room Image 3"
              className="w-full h-64 object-cover rounded-md"
            />
          )}
          {roomDetails.imageFour && (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${roomDetails.imageFour}`}
              alt="Room Image 4"
              className="w-full h-64 object-cover rounded-md"
            />
          )}
        </div>

        <p className="text-gray-800 mt-4">{roomDetails.description}</p>
        <p className="text-lg font-bold mt-4">${roomDetails.price}/night</p>

        <h3 className="text-xl font-bold mt-4">Hotel Features</h3>
        <ul>
          {roomDetails.hotelFeatures.map((feature) => (
            <li key={feature.id}>{feature.name}</li>
          ))}
        </ul>

        <h3 className="text-xl font-bold mt-4">Room Features</h3>
        <ul>
          {roomDetails.roomFeatures.map((feature) => (
            <li key={feature.id}>{feature.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetRoomDetailsPage;
