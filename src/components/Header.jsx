import React from 'react';
import { useUser } from '../components/UserContext';

export const Header = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          <span className="text-blue-400">Tourism</span>Site
        </a>

        <nav>
          <ul className="flex space-x-6">
            {/* Home Button */}
            <li>
              <a
                href="/"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-all duration-200 ease-in-out shadow-md transform hover:scale-105 flex items-center"
              >
                Home
              </a>
            </li>

            {/* Conditional Buttons for Profile and Logout */}
            {user ? (
              <>
                <li>
                  <a
                    href="/profile"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md transition-all duration-200 ease-in-out shadow-md transform hover:scale-105 flex items-center"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 transition-colors duration-200 flex items-center"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/register" className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                    Register
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
