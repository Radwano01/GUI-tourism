import React, { useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NPMKjDoJcfQrFNDa0nSh1XHq66SoSFbO6JzmieD33rNXT5X7bESDbFZJPgakqbNYlMUkmEAgzeJVeV8zku6DZQY00J7RPIKNG"
);

const CheckoutForm = ({ hotelId, userId, startTime, endTime, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate - startDate);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const numberOfNights = calculateNights(startTime, endTime);
  const totalPrice = price * numberOfNights;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      setErrorMessage(null);
      handlePayment(paymentMethod.id);
    }
  };

  const handlePayment = async (paymentMethodId) => {
    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/payment/hotels/${hotelId}/users/${userId}`,
        {
          reservationName: name,
          paymentIntent: paymentMethodId,
          startTime,
          endTime,
          price:totalPrice
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/payment-success")
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage("Error processing payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">
          Reservation Name and Surname
        </label>
        <input type="text" required placeholder="Enter your Name and Surname" onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">
          Card Number
        </label>
        <CardNumberElement
          className="border p-2 w-full rounded-lg"
          options={{}}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">
          Expiration Date
        </label>
        <CardExpiryElement
          className="border p-2 w-full rounded-lg"
          options={{}}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">CVC</label>
        <CardCvcElement className="border p-2 w-full rounded-lg" options={{}} />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        disabled={!stripe}
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const HotelPaymentPage = () => {
  const { hotelId, userId } = useParams();
  const location = useLocation();
  const { startTime, endTime, price } = location.state;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl">Payment Page</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              hotelId={hotelId}
              userId={userId}
              startTime={startTime}
              endTime={endTime}
              price={price}
            />
          </Elements>
        </div>
      </main>
    </div>
  );
};

export default HotelPaymentPage;
