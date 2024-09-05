import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function EditDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    country: "",
    address: "",
    dateOfBirth: "",
    phoneNumber: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/users/${userId}/details`)
      .then((response) => {
        setUser(response.data);
        setOriginalPhoneNumber(response.data.phoneNumber); // Store original phone number
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePhoneChange = (value) => {
    setUser({ ...user, phoneNumber: value });
    setIsVerificationSent(false);
    setIsVerified(false);
  };

  const handleSendVerification = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_API}/verify/phone_number`, {
        phoneNumber: "+" + user.phoneNumber,
      })
      .then(() => {
        setIsVerificationSent(true);
        alert("Verification code sent to your phone.");
      })
      .catch((error) => {
        console.error("Error sending verification code:", error);
        alert("Failed to send verification code. Please try again later.");
      });
  };

  const handleVerifyCode = () => {
    const verifyPhoneNumberDto = {
      phoneNumber: "+" + user.phoneNumber,
      code: verificationCode,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_API}/verifyCode`, verifyPhoneNumberDto)
      .then((response) => {
        if (response.data) {
          setIsVerified(true);
          alert("Phone number verified successfully!");
        } else {
          alert("Verification failed. Please check the code and try again.");
        }
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
        alert("Failed to verify code. Please try again.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isVerified && user.phoneNumber !== originalPhoneNumber) {
      alert("Please verify the new phone number before updating details.");
      return;
    }

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      axios
        .post(`${process.env.REACT_APP_BASE_API}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const imageName = response.data; // Assuming backend returns the filename
          const updatedUser = { ...user, image: imageName };

          return axios.put(
            `${process.env.REACT_APP_BASE_API}/users/${userId}/details`,
            updatedUser
          );
        })
        .then(() => {
          alert("User details updated successfully!");
          navigate(`/profile`);
        })
        .catch((error) => {
          console.error("Error updating user details:", error);
          alert("Failed to update user details. Please try again later.");
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BASE_API}/users/${userId}/details`,
          user
        )
        .then(() => {
          alert("User details updated successfully!");
          navigate(`/profile`);
        })
        .catch((error) => {
          console.error("Error updating user details:", error);
          alert("Failed to update user details. Please try again later.");
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Country:</label>
            <input
              type="text"
              name="country"
              value={user.country}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number:</label>
            <PhoneInput
              country={"us"}
              value={user.phoneNumber}
              onChange={handlePhoneChange}
              inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              containerClass="w-full"
              inputStyle={{ width: "100%" }}
            />
            {!isVerificationSent && (
              <button
                type="button"
                onClick={handleSendVerification}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send Verification Code
              </button>
            )}
            {isVerificationSent && !isVerified && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Verify
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1">Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDetailsPage;