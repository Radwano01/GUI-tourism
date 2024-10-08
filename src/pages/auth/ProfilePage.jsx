import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      axios
        .get(
          `${process.env.REACT_APP_BASE_API}/public/users/${parsedUser.userId}/details`
        )
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleVerifyEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      axios
        .post(
          `${process.env.REACT_APP_BASE_API}/public/users/verification/users/${parsedUser.userId}/${parsedUser.accessToken}`
        )
        .then(() => {
          const updatedUser = { ...parsedUser, verificationStatus: true };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Email verified successfully!");
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          alert("Failed to verify email. Please try again later.");
        });
    }
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        axios
          .delete(
            `${process.env.REACT_APP_BASE_API}/public/users/${parsedUser.userId}`
          )
          .then(() => {
            localStorage.removeItem("user");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("Failed to delete profile. Please try again later.");
          });
      }
    }
  };

  const handleEditDetails = () => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    navigate(`/edit-user-details/${parsedUser.userId}`, {
      state: { user: parsedUser },
    });
  };

  const handleResetPassword = () => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    navigate(`/reset-password/${parsedUser.userId}`);
  };

  const handleNavigateAddPhoneNumber = () => {
    navigate("/add-phone-number");
  };

  const handleAddPhoneNumber = () => {
    if (newPhoneNumber) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        axios
          .put(
            `${process.env.REACT_APP_BASE_API}/public/users/${parsedUser.userId}/phone`,
            { phoneNumber: newPhoneNumber }
          )
          .then((response) => {
            setUser({ ...user, phoneNumber: newPhoneNumber });
            setIsAddingPhone(false);
            alert("Phone number added successfully!");
          })
          .catch((error) => {
            console.error("Error adding phone number:", error);
            alert("Failed to add phone number. Please try again later.");
          });
      }
    } else {
      alert("Please enter a phone number.");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="text-xl font-semibold mb-4">
            Error loading user details
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="text-xl font-semibold mb-4">User not found</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center mb-4">
        <div className="flex items-center justify-start mb-4">
          <button
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {"<"} Back
          </button>
        </div>
        <div className="mb-4">
          <img
            src={
              user.image != null
                ? `${process.env.REACT_APP_IMAGES_URL}/${user.image}`
                : `${process.env.REACT_APP_DEFAULT_USER_IMAGE}`
            }
            alt={user.username}
            className="w-24 h-24 bg-gray-300 rounded-full mx-auto"
          />
        </div>
        <p className="text-2xl font-semibold mb-2">{user.username}</p>
        <p className="text-gray-600 mb-4">{user.fullName}</p>
        <div className="text-left mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Country:</span> {user.country}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone Number:</span>{" "}
            {user.phoneNumber ? `${user.phoneNumber}` : "Not Provided"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Address:</span> {user.address}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Date of Birth:</span>{" "}
            {formatDate(user.dateOfBirth)}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email Verification Status:</span>{" "}
            {user.verificationStatus ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {!user.verificationStatus && (
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200 w-full max-w-[300px]"
            onClick={handleVerifyEmail}
          >
            Verify Email
          </button>
        )}
        {!user.phoneNumber && (
          <>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full max-w-[300px]"
              onClick={handleNavigateAddPhoneNumber}
            >
              Add Phone Number
            </button>
            {isAddingPhone && (
              <div className="mt-4 w-full max-w-[300px]">
                <input
                  type="text"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
                <button
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={handleAddPhoneNumber}
                >
                  Save
                </button>
                <button
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => setIsAddingPhone(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 w-full max-w-[300px]"
          onClick={handleEditDetails}
        >
          Edit Details
        </button>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 w-full max-w-[300px]"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 w-full max-w-[300px]"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
