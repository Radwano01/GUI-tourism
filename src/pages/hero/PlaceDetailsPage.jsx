import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../../components/Header";

const PlaceDetailsPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/places/${id}/details`
        );
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  const handleNavigateToFlights = () => {
    navigate(`/flights/${id}`, {
      state: { placeId: id, placeName: place.place },
    });
  };

  const handleNavigateToHotels = () => {
    navigate(`/hotels/${id}`, {
      state: { placeId: id, placeName: place.place },
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!place) {
    return <ErrorScreen />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Header with color */}
      <Header />

      <div className="bg-gray-800 text-white py-4 shadow-md">
        <nav className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <ul className="flex justify-start space-x-4">
            {/* Your other list items can go here */}
          </ul>

          {/* Aligning buttons horizontally and ensuring consistent size */}
          <ul className="flex justify-end space-x-4 items-center">
            <li>
              <button
                onClick={handleNavigateToFlights}
                className="bg-orange-500 hover:bg-blue-600 text-white w-44 h-12 rounded-md transition-all duration-200 ease-in-out text-center"
              >
                Book a Visa
              </button>
            </li>
            <li>
              <button
                onClick={handleNavigateToHotels}
                className="bg-purple-500 hover:bg-green-600 text-white w-44 h-12 rounded-md transition-all duration-200 ease-in-out text-center"
              >
                Book a Room
              </button>
            </li>
          </ul>
        </nav>
      </div>




      <main className="container mx-auto p-4">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-4">
            <PlaceImage place={place} />
            <PlaceDescription place={place} />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[place.imageOne, place.imageTwo, place.imageThree].map((image, index) => (
            <GalleryItem key={index} image={image} />
          ))}
        </section>
      </main>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">Loading...</div>
);

const ErrorScreen = () => (
  <div className="flex items-center justify-center h-screen text-red-500">
    Error loading place details
  </div>
);

const PlaceImage = ({ place }) => (
  <img
    src={`${process.env.REACT_APP_IMAGES_URL}/${place.mainImage}`}
    alt={place.place}
    className="w-full md:w-2/3 h-auto rounded-lg shadow-lg"
    style={{ maxWidth: "1000px", maxHeight: "600px" }}
  />
);

const PlaceDescription = ({ place }) => (
  <div className="md:w-1/3">
    <h2 className="text-4xl font-bold mb-2">{place.place}</h2>
    <p className="text-gray-700">{place.description}</p>
  </div>
);

const GalleryItem = ({ image }) => (
  <div className="relative">
    <img
      src={`${process.env.REACT_APP_IMAGES_URL}/${image}`}
      alt="Gallery"
      className="w-full h-48 rounded-md shadow-lg object-cover"
    />
  </div>
);

export default PlaceDetailsPage;
