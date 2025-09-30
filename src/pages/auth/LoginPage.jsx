import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/UserContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  // Check if user is already logged in and redirect to main page
  useEffect(() => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    
    if (user && accessToken) {
      try {
        const userData = JSON.parse(user);
        setUser(userData);
        navigate('/'); // Redirect to main page (HeroPage)
      } catch (error) {
        // If there's an error parsing user data, clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        console.error('Error parsing user data:', error);
      }
    }
  }, [setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length > 255) {
      alert('Username cannot exceed 255 characters.');
      return;
    }

    if (password.length > 255) {
      alert('Password cannot exceed 255 characters.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API}/public/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { accessToken, essentialUserDto } = response.data;
        const { id, username, image, verificationStatus, role } = essentialUserDto;

        const user = {
          userId: id,
          username: username,
          userImage: image,
          accessToken: accessToken,
          status: verificationStatus,
          role: role,
        };

        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);

        setUser(user);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <p className="text-center mb-6">Enter your username and password to sign in</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={255}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={255}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
        </p>
        <p className="mt-4 text-center text-gray-600">
          Forgot the password? <a href="/reset-password" className="text-blue-500 hover:underline">Reset Password</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;