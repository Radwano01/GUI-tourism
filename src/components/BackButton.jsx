import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'; // Ensure you have installed react-icons

const BackButton = ({direction}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(direction)}
      className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none mb-4"
    >
      <AiOutlineArrowLeft className="mr-2" />
      Back to Dashboard
    </button>
  );
};

export default BackButton;