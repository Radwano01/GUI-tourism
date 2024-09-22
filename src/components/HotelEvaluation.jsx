import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_API}/hotels`;

const HotelEvaluation = ({ hotelId, userId }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRate, setNewRate] = useState(5); // Default rate is 5
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [userHasCommented, setUserHasCommented] = useState(false);

  const addHotelEvaluation = async (hotelId, userId, comment, rate) => {
    try {
      await axios.post(`${BASE_URL}/public/hotels/${hotelId}/users/${userId}/comment`, { comment, rate });
      await fetchEvaluations(); // Fetch evaluations after adding a comment
      setNewComment("");
      setNewRate(5); // Reset the rate to the default value
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/public/hotels//${hotelId}/users/comments`);
      setEvaluations(response.data);

      // Check if the user has already commented
      const userComment = response.data.find(evaluation => evaluation.userId === userId);
      setUserHasCommented(!!userComment);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
    }
  };

  const editHotelEvaluation = async (commentId, updatedComment) => {
    try {
      const rate = 5; // Set rate to 5
      await axios.put(`${BASE_URL}/public/hotels/comments/${commentId}`, { comment: updatedComment, rate });
      await fetchEvaluations();
      setEditCommentId(null);
      setEditComment("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const removeHotelEvaluation = async (commentId) => {
    try {
      await axios.delete(`${BASE_URL}/public/hotels/comments/${commentId}`);
      await fetchEvaluations();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, [hotelId]);

  const handleLoginClick = () => {
    // Navigate to /login when the user clicks on the text
    window.location.href = "/login";
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Hotel Evaluations</h3>
      {!userId && (
        <p className="text-red-500">
          You have to <span onClick={handleLoginClick} className="cursor-pointer underline">login</span> first to add a comment.
        </p>
      )}
      {userId && !userHasCommented && (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment"
            className="w-full p-2 border rounded"
            required
          />
          <div className="mt-2">
            <label className="block mb-2 font-bold text-gray-700">Rate:</label>
            <select
              value={newRate}
              onChange={(e) => setNewRate(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => addHotelEvaluation(hotelId, userId, newComment, newRate)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            disabled={!newComment.trim()} // Disable button if newComment is empty
          >
            Add Comment
          </button>
        </div>
      )}
      {userId && userHasCommented && (
        <p className="text-red-500">You have already commented on this hotel.</p>
      )}
      <ul>
        {evaluations.map((evaluation) => (
          <li key={evaluation.id} className="mb-4 border rounded p-4">
            <div className="flex items-start">
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/${evaluation.userImage}`}
                alt="User Avatar"
                className="h-12 w-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{evaluation.username}</p>
                    <p>{evaluation.comment}</p>
                  </div>
                  {evaluation.userId === userId && (
                    <div className="flex">
                      <button
                        onClick={() => {
                          setEditCommentId(evaluation.id);
                          setEditComment(evaluation.comment);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeHotelEvaluation(evaluation.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                {editCommentId === evaluation.id && (
                  <div className="mt-4">
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <button
                      onClick={() => editHotelEvaluation(editCommentId, editComment)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditCommentId(null);
                        setEditComment("");
                      }}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="flex items-center mt-2">
                  <p className="mr-4">Rating: {evaluation.rate}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelEvaluation;