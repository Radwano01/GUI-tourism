import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddPhoneNumberPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Define isVerified state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddPhoneNumber = () => {
    if (phoneNumber) {
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_BASE_API}/verify/phoneNumber/+${phoneNumber}`
        )
        .then(() => {
          setLoading(false);
          setShowVerification(true); // Show verification code input
          alert(
            "Phone number added successfully! Please enter the verification code."
          );
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error adding phone number:", error);
          setError("Failed to add phone number. Please try again later.");
        });
    } else {
      alert("Please enter a phone number.");
    }
  };

  const handleVerifyCode = () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const verifyPhoneNumberDto = {
      phoneNumber: "+" + phoneNumber,
      code: verificationCode,
    };

    setIsVerifying(true); // Start verifying
    axios
      .post(
        `${process.env.REACT_APP_BASE_API}/users/${parsedUser.userId}/verifyCode`,
        verifyPhoneNumberDto
      )
      .then((response) => {
        if (response.data) {
          setIsVerified(true);
          alert("Phone number verified successfully!");
          navigate("/profile", { replace: true });
        } else {
          alert("Verification failed. Please check the code and try again.");
        }
      })
      .catch((error) => {
        setIsVerifying(false);
        console.error("Error verifying code:", error);
        alert("Failed to verify code. Please try again.");
      })
      .finally(() => {
        setIsVerifying(false); // Stop verifying after completion
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Add Phone Number</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <PhoneInput
          country={"us"}
          value={phoneNumber}
          onChange={setPhoneNumber}
          inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          containerClass="w-full"
          inputStyle={{ width: "100%" }}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={handleAddPhoneNumber}
          disabled={loading}
          style={{ margin: "10px" }}
        >
          {loading ? "Adding..." : "Add Phone Number"}
        </button>
        {showVerification && (
          <div className="mt-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              onClick={handleVerifyCode}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPhoneNumberPage;
