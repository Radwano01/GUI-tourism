import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import PackageEvaluation from "../../components/PackageEvaluation";

const PackageDetailsPage = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserId(user.userId);
      setUserAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/packages/${id}/details`
        );
        setPackageDetails(response.data);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Error fetching package details:", error);
        alert("Error fetching package details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      if (!userId) {
        alert("You need to sign in to add a comment.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/packages/${id}/comments`,
        {
          userId: userId,
          comment: comment,
        }
      );

      const newComment = response.data; // Assuming response.data contains the newly added comment
      setComments([...comments, newComment]); // Update comments state with new comment
      setComment(""); // Clear comment input after submission
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Error submitting comment. Please try again later.");
    }
  };

  const handlePayNow = async () => {
    try {
      if (!userId) {
        alert("You need to sign in to make a payment.");
        return;
      }

      navigate(`/payment/packages/${id}/users/${userId}`);
    } catch (error) {
      console.error("Error navigating to payment:", error);
      alert("Error navigating to payment. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!packageDetails) {
    return <div>Error loading package details</div>;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-3xl">Package Details Page</h1>
        <Header />
      </header>

      <main className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-2/3">
            <section className="hero relative mb-8">
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails.mainImage}`}
                alt={packageDetails.packageName}
                className="w-full h-auto rounded-md shadow-lg"
              />
              <h2 className="text-5xl font-bold absolute inset-0 flex items-center justify-center text-white p-2">
                {packageDetails.packageName}
              </h2>
            </section>

            <div className="flex gap-4">
              <div className="w-2/3">
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails?.imageOne}`}
                  alt="Package Image One"
                  className="w-full rounded-md shadow-lg"
                  style={{ height: 400 }}
                />
              </div>
              <div className="flex flex-col w-1/3 gap-4">
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails?.imageTwo}`}
                  alt="Package Image Two"
                  className="w-full rounded-md shadow-lg"
                  style={{ height: 192 }}
                />
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${packageDetails?.imageThree}`}
                  alt="Package Image Three"
                  className="w-full rounded-md shadow-lg"
                  style={{ height: 192 }}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-5">
              {packageDetails.packageName}
            </h2>
            <p className="mt-3">{packageDetails?.description}</p>

            <PackageEvaluation packageId={id} userId={userId} />

            {comments.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Comments</h3>
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index} className="mb-2">
                      <p>{comment.content}</p>
                      <p className="text-gray-500">Posted by: {comment.user}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="md:w-1/3">
            <div className="p-5 rounded-lg bg-gray-100">
              <h4 className="text-xl font-bold mb-3">EACH PERSON:</h4>
              <p className="text-gray-600 mb-3">{packageDetails.price}$</p>
              <h4 className="text-xl font-bold mb-3">RATE:</h4>
              <p className="text-gray-600 mb-3">{packageDetails.rate} Stars</p>
              {!userAuthenticated && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2 text-red-500">
                    You need to login first to make a booking.
                    <span
                      className="cursor-pointer ml-2 underline"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </span>
                  </h3>
                </div>
              )}

              {userAuthenticated && (
                <button
                  onClick={handlePayNow}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Pay Now!
                </button>
              )}

              <div className="mt-5">
                <h4 className="text-xl font-bold mb-3">Benefits:</h4>
                <ul className="list-disc mt-3 pl-5">
                  {packageDetails.benefits &&
                    packageDetails.benefits.length > 0 &&
                    packageDetails.benefits.map((benefit, index) => (
                      <li key={index} className="mb-2">
                        {benefit.benefit}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-5">
                <h4 className="text-xl font-bold mb-3">Roadmap:</h4>
                <ul className="list-disc mt-3 pl-5">
                  {packageDetails.roadmaps &&
                    packageDetails.roadmaps.length > 0 &&
                    packageDetails.roadmaps.map((roadmap, index) => (
                      <li key={index} className="mb-2">
                        {roadmap.roadmap}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PackageDetailsPage;