import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function VerificationSuccess() {
  const navigate = useNavigate();
  const { email, token } = useParams();

  useEffect(() => {
    if (email && token) {
      const verificationUrl = `${process.env.REACT_APP_BASE_API}/verification/users/${email}/${token}`;

      axios.post(verificationUrl)
        .then(response => {
          updateLocalStorage(response.data);
        })
        .catch(error => {
          console.error('Error verifying user:', error);
        });
    } else {
      console.error('Email or token not found for verification.');

    }
  }, [email, token, navigate]);

  const updateLocalStorage = (userData) => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    const updatedUser = {
      ...storedUser,
      status: true,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <p className="text-3xl font-semibold mb-4 text-green-600">Email Verified Successfully!</p>
        <p className="text-gray-600 mb-4">Your email has been verified.</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('/profile')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default VerificationSuccess;