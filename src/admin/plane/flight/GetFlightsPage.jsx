import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton"; // Import your BackButton component

const GetFlightPage = () => {
  const [departurePlace, setDeparturePlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [departureAirports, setDepartureAirports] = useState([]);
  const [destinationAirports, setDestinationAirports] = useState([]);
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [planeCompanyName, setPlaneCompanyName] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(""); // State for error message
  const [page, setPage] = useState(0); // Page state
  const [totalPages, setTotalPages] = useState(0); // Total pages state
  const [debouncedDeparturePlace, setDebouncedDeparturePlace] = useState("");
  const [debouncedDestinationPlace, setDebouncedDestinationPlace] =
    useState("");
  const [hasMoreFlights, setHasMoreFlights] = useState(true); // Check if more flights are available
  const [placesAvailable, setPlacesAvailable] = useState({
    departure: false,
    destination: false,
  });

  const navigate = useNavigate();

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced API call function for airports
  const fetchAirports = async (place, isDeparture) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/places/${place}`
      );
      if (isDeparture) {
        setDepartureAirports(response.data);
        setPlacesAvailable((prev) => ({
          ...prev,
          departure: response.data.length > 0,
        }));
      } else {
        setDestinationAirports(response.data);
        setPlacesAvailable((prev) => ({
          ...prev,
          destination: response.data.length > 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  // Set up debounced fetch for departure place
  const debouncedFetchDepartureAirports = debounce((place) => {
    if (place) {
      fetchAirports(place, true); // true indicates departure
    }
  }, 3000); // 3 seconds debounce delay

  // Set up debounced fetch for destination place
  const debouncedFetchDestinationAirports = debounce((place) => {
    if (place) {
      fetchAirports(place, false); // false indicates destination
    }
  }, 3000); // 3 seconds debounce delay

  // Effect to handle departure place changes
  useEffect(() => {
    if (debouncedDeparturePlace) {
      debouncedFetchDepartureAirports(debouncedDeparturePlace);
    }
  }, [debouncedDeparturePlace]);

  // Effect to handle destination place changes
  useEffect(() => {
    if (debouncedDestinationPlace) {
      debouncedFetchDestinationAirports(debouncedDestinationPlace);
    }
  }, [debouncedDestinationPlace]);

  // Update debounced values
  useEffect(() => {
    setDebouncedDeparturePlace(departurePlace);
  }, [departurePlace]);

  useEffect(() => {
    setDebouncedDestinationPlace(destinationPlace);
  }, [destinationPlace]);

  const handleSearchFlights = (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors

    // API call to search flights
    axios
      .get(`${process.env.REACT_APP_BASE_API}/admin/flights`, {
        params: {
          page: page,
          size: 10, // Fixed size
          departureAirPortId: departureAirport || undefined,
          destinationAirPortId: destinationAirport || undefined,
          planeCompanyName: planeCompanyName || undefined,
        },
      })
      .then((response) => {
        const flightData = response.data || {};
        const totalPages = flightData.length || 0;

        setFlights(flightData);
        setTotalPages(totalPages);
        setHasMoreFlights(true);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  // Function to format the flight time
  const formatTime = (timeArray) => {
    const [year, month, day, hours, minutes] = timeArray;
    const date = new Date(year, month - 1, day, hours, minutes);
    return date.toISOString().replace("T", " ").slice(0, 19); // Format to YYYY-MM-DD HH:mm:ss
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl px-4 py-8">
        <BackButton direction="/admin" />
        <form
          onSubmit={handleSearchFlights}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Search Flights</h2>

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label
              htmlFor="departurePlace"
              className="block text-sm font-medium text-gray-700"
            >
              Departure Place
            </label>
            <input
              type="text"
              id="departurePlace"
              value={departurePlace}
              onChange={(e) => setDeparturePlace(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label
              htmlFor="departureAirport"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Departure Airport
            </label>
            <select
              id="departureAirport"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Departure Airport (Optional)</option>
              {departureAirports.map((airport) => (
                <option key={airport.airPortId} value={airport.airPortId}>
                  {airport.airPortName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="destinationPlace"
              className="block text-sm font-medium text-gray-700"
            >
              Destination Place
            </label>
            <input
              type="text"
              id="destinationPlace"
              value={destinationPlace}
              onChange={(e) => setDestinationPlace(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label
              htmlFor="destinationAirport"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Destination Airport
            </label>
            <select
              id="destinationAirport"
              value={destinationAirport}
              onChange={(e) => setDestinationAirport(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Destination Airport (Optional)</option>
              {destinationAirports.map((airport) => (
                <option key={airport.airPortId} value={airport.airPortId}>
                  {airport.airPortName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="planeCompanyName"
              className="block text-sm font-medium text-gray-700"
            >
              Plane Company Name
            </label>
            <input
              type="text"
              id="planeCompanyName"
              value={planeCompanyName}
              onChange={(e) => setPlaneCompanyName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search Flights
          </button>
        </form>

        <div className="mt-8">
          {flights.length > 0 ? (
            <div>
              <ul className="list-none p-0">
                {flights.map((flight) => (
                  <li
                    key={flight.id}
                    className="mb-4 border p-4 rounded-md bg-white shadow-sm"
                  >
                    <h3 className="text-lg font-semibold">
                      {flight.planeCompanyName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Flight ID: {flight.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${flight.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Departure Time: {formatTime(flight.departureTime)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Arrival Time: {formatTime(flight.arrivalTime)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Departure Airport: {flight.departureAirPort} (
                      {flight.departureAirPortCode})
                    </p>
                    <p className="text-sm text-gray-600">
                      Destination Airport: {flight.destinationAirPort} (
                      {flight.destinationAirPortCode})
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousPage}
                  className="bg-gray-300 py-2 px-4 rounded-md"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className="bg-gray-300 py-2 px-4 rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>No flights available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetFlightPage;
