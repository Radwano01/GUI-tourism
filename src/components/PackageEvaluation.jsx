import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PackageEvaluation = ({ packageId, userId }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [userHasCommented, setUserHasCommented] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRate, setNewRate] = useState(1);
  const [commentError, setCommentError] = useState("");

  const fetchEvaluations = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/public/packages/${packageId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvaluations(response.data);

      const userComment = response.data.find(
        (evaluation) => evaluation.userId === userId
      );
      setUserHasCommented(!!userComment);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
    }
  }, [packageId, userId]);

  const handleCommentChange = (e) => {
    const comment = e.target.value;
    if (comment.length <= 255) {
      setNewComment(comment);
      setCommentError("");
    } else {
      setCommentError("Comment cannot exceed 255 characters.");
    }
  };

  const addOrUpdateEvaluation = async (commentId, comment, rate) => {
    const token = localStorage.getItem("accessToken");
    try {
      const url = commentId
        ? `${process.env.REACT_APP_BASE_API}/public/packages/${packageId}/comments/${commentId}`
        : `${process.env.REACT_APP_BASE_API}/public/packages/${packageId}/users/${userId}/comment`;

      const method = commentId ? "put" : "post";

      await axios({
        method,
        url,
        data: { comment, rate },
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchEvaluations();
      setNewComment("");
      setNewRate(1);
      setEditCommentId(null);
      setEditComment("");
    } catch (error) {
      console.error("Error handling comment:", error);
    }
  };

  const removePackageEvaluation = async (commentId) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/public/packages/${packageId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchEvaluations();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEvaluations();
    }
  }, [fetchEvaluations, packageId, userId]); // Add fetchEvaluations to the dependency array

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Package Evaluations</h3>
      {!userId && (
        <p className="text-red-500">
          You have to{" "}
          <span
            onClick={handleLoginClick}
            className="cursor-pointer underline"
          >
            login
          </span>{" "}
          first to add a comment.
        </p>
      )}
      {userId && !userHasCommented && (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add your comment"
            className="w-full p-2 border rounded"
            required
          />
          {commentError && (
            <p className="text-red-500 text-sm">{commentError}</p>
          )}
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
            onClick={() => addOrUpdateEvaluation(null, newComment, newRate)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            disabled={!newComment.trim() || commentError}
          >
            Add Comment
          </button>
        </div>
      )}
      {userId && userHasCommented && (
        <p className="text-red-500">You have already commented on this package.</p>
      )}
      <ul>
        {evaluations.map((evaluation) => (
          <li key={evaluation.id} className="mb-4 border rounded p-4">
            <div className="flex items-start">
              <img
                src={
                  evaluation.userImage != null
                    ? `${process.env.REACT_APP_IMAGES_URL}/${evaluation.userImage}`
                    : process.env.REACT_APP_DEFAULT_USER_IMAGE
                }
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
                        onClick={() => removePackageEvaluation(evaluation.id)}
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
                    <div className="mt-2">
                      <label className="block mb-2 font-bold text-gray-700">
                        Rate:
                      </label>
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
                      onClick={() => addOrUpdateEvaluation(editCommentId, editComment, newRate)}
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

export default PackageEvaluation;