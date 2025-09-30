import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";

const HotelPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/public/places/${id}/hotels?page=0&size=1000`
        );
        const hotelData = response.data;
        setHotels(hotelData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, [id]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-4 max-w-4xl mx-auto items-center">
        <section className="results mt-8 mb-8">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hotel-listing mt-8 flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${hotel.mainImage}`}
                  alt={hotel.hotelName}
                  className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-lg mb-4 md:mb-0"
                  style={{ width: "270px", height: "170px" }}
                />
                <div className="text-center md:text-left md:w-2/3 md:pl-4">
                  <h3 className="text-xl font-bold">{hotel.hotelName}</h3>
                  <p className="text-gray-600 mb-4">Address: {hotel.address}</p>
                  <p className="text-gray-600 mb-4">Description: {hotel.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{hotel.rate} Stars</span>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleNavigate(`/room/details/${hotel.id}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-xl mt-8">
              No hotels available.
            </div>
          )}
        </section>

      </main>

    </div>
  );
};

export default HotelPage;