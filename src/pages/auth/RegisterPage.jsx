import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fullName: '',
    country: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: ''
  });

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const DEFAULT_USER_IMAGE = `${process.env.REACT_APP_DEFAULT_USER_IMAGE}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
    setIsVerificationSent(false);
    setIsVerified(false);
  };

  const handleVerification = () => {
    if (formData.phoneNumber) {
      axios
        .post(`${process.env.REACT_APP_BASE_API}/verify/phoneNumber/${`+${formData.phoneNumber}`}`)
        .then(() => {
          setIsVerificationSent(true);
          alert("Verification code sent to your phone.");
        })
        .catch((error) => {
          console.error("Error sending verification code:", error);
          alert("Failed to send verification code. Please try again later.");
        });
    }
  };

  const handleVerifyCode = () => {
    const verifyPhoneNumberDto = {
      phoneNumber: "+" + formData.phoneNumber,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image ? '' : DEFAULT_USER_IMAGE;

    if (formData.image) {
      const imageData = new FormData();
      imageData.append('file', formData.image);

      try {
        const uploadResponse = await axios.post(`${process.env.REACT_APP_BASE_API}/image`, imageData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = uploadResponse.data;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const userFormData = {
      ...formData,
      image: imageUrl
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API}/users/register`, userFormData);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert("Failed to register user. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700">Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Country"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number (optional):</label>
            <PhoneInput
              country={'us'}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              containerClass="w-full"
              inputStyle={{width:"100%"}}
            />
            {formData.phoneNumber && !isVerificationSent && (
              <button type="button" onClick={handleVerification} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Verify Phone Number
              </button>
            )}
            {isVerificationSent && !isVerified && (
              <div className="mt-2">
                <label htmlFor="verificationCode" className="block text-gray-700">Verification Code:</label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter verification code"
                />
                <button type="button" onClick={handleVerifyCode} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Verify Code
                </button>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Address"
              required
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;