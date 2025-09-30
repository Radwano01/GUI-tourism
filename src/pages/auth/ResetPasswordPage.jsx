import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Check if user is already logged in and redirect to main page
  useEffect(() => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    
    if (user && accessToken) {
      navigate('/'); // Redirect to main page (HeroPage)
    }
  }, [navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate length of inputs
    if (email.length > 255) {
      setError("Email cannot exceed 255 characters.");
      return;
    }

    if (newPassword.length > 255) {
      setError("Password cannot exceed 255 characters.");
      return;
    }

    if (confirmPassword.length > 255) {
      setError("Confirm password cannot exceed 255 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const userIdResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API}/public/users`
      );

      const userId = userIdResponse.data.userId;

      // Reset password using the userId
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/public/users/${userId}`,
        {
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        setSuccess("Password reset successfully!");
        setError("");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      setError("Password reset failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h1>
        <p className="text-center mb-6">
          Enter your email and new password below
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              maxLength={255}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength={255}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mt-4 text-center text-green-500">{success}</p>
        )}
        <button
          className="mt-4 text-blue-500 hover:underline flex items-center"
          onClick={() => handleNavigate("/profile")}
        >
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;