import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';  // Import your BackButton component

const AddFlightPage = () => {
  const { planeId } = useParams(); // Get planeId from URL parameters
  const [departurePlace, setDeparturePlace] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');
  const [departureAirports, setDepartureAirports] = useState([]);
  const [destinationAirports, setDestinationAirports] = useState([]);
  const [departureAirport, setDepartureAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [price, setPrice] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [debouncedDeparturePlace, setDebouncedDeparturePlace] = useState('');
  const [debouncedDestinationPlace, setDebouncedDestinationPlace] = useState('');
  const [error, setError] = useState(''); // State for error message

  const navigate = useNavigate();

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced API call function
  const fetchAirports = async (place, isDeparture) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API}/places/${place}`);
      if (isDeparture) {
        setDepartureAirports(response.data);
      } else {
        setDestinationAirports(response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if departure and destination airports are the same
    if (departureAirport === destinationAirport) {
      setError('Departure and destination airports cannot be the same.');
      return;
    }

    setError(''); // Clear any existing errors

    const flightData = {
      price,
      departureTime,
      arrivalTime,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_API}/admin/flights/flight/planes/${planeId}/departures/${departureAirport}/destinations/${destinationAirport}`, flightData)
      .then(() => {
        navigate('/admin'); // Redirect after successful submission
      })
      .catch((error) => {
        console.error("Error creating flight:", error);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl px-4 py-8">
        <BackButton direction="/admin" />
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Flight</h2>

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label htmlFor="departurePlace" className="block text-sm font-medium text-gray-700">Departure Place</label>
            <input
              type="text"
              id="departurePlace"
              value={departurePlace}
              onChange={(e) => setDeparturePlace(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-700 mt-4">Departure Airport</label>
            <select
              id="departureAirport"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Departure Airport</option>
              {departureAirports.map((airport) => (
                <option key={airport.airPortId} value={airport.airPortId}>
                  {airport.airPortName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="destinationPlace" className="block text-sm font-medium text-gray-700">Destination Place</label>
            <input
              type="text"
              id="destinationPlace"
              value={destinationPlace}
              onChange={(e) => setDestinationPlace(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <label htmlFor="destinationAirport" className="block text-sm font-medium text-gray-700 mt-4">Destination Airport</label>
            <select
              id="destinationAirport"
              value={destinationAirport}
              onChange={(e) => setDestinationAirport(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Destination Airport</option>
              {destinationAirports.map((airport) => (
                <option key={airport.airPortId} value={airport.airPortId}>
                  {airport.airPortName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">Departure Time</label>
            <input
              type="datetime-local"
              id="departureTime"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">Arrival Time</label>
            <input
              type="datetime-local"
              id="arrivalTime"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlightPage;