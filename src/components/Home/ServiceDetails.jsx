import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaStar, FaArrowLeft, FaUserCircle, FaComment, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdCategory } from "react-icons/md";

const ServiceDetails = () => {
  const [data, setData] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/services/${id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [id]);

  const handleShowMoreReviews = () => {
    if (data?.reviews) {
      setVisibleReviews(prev => prev + 4);
    }
  };

  const handleShowLessReviews = () => {
    setVisibleReviews(4);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex justify-center items-center">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="skeleton h-96 w-full rounded-2xl"></div>
              <div className="skeleton h-8 w-3/4"></div>
              <div className="skeleton h-6 w-1/2"></div>
            </div>
            <div className="space-y-6">
              <div className="skeleton h-12 w-full rounded-xl"></div>
              <div className="skeleton h-32 w-full rounded-xl"></div>
              <div className="skeleton h-24 w-full rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary gap-2 mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Service Details
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="btn btn-primary gap-2"
              >
                <FaArrowLeft /> Back to Home
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="btn btn-outline btn-secondary gap-2"
              >
                Bye Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Service Image */}
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <figure>
                <img
                  src={data.ServicImage}
                  alt={data.serviceName}
                  className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </figure>
            </div>

            {/* Service Description */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold flex items-center gap-2">
                  <FaComment /> Description
                </h2>
                <div className="divider my-2"></div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold flex items-center gap-2">
                  <FaStar className="text-yellow-500" /> Reviews
                  <span className="badge badge-primary">
                    {data.TotalRating || 0}
                  </span>
                </h2>
                <div className="divider my-2"></div>

                {data.reviews && data.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {data.reviews.slice(0, visibleReviews).map((review) => (
                      <div key={review.id} className="card bg-base-200">
                        <div className="card-body p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                  <img
                                    src={review.CommenterPhoto || "https://via.placeholder.com/100"}
                                    alt={review.CommenterName}
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {review.CommenterName || "Anonymous User"}
                                </h3>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, index) => (
                                    <FaStar
                                      key={index}
                                      className={`text-lg ${
                                        index < review.rating
                                          ? "text-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-gray-500">
                                    ({review.rating}.0)
                                  </span>
                                </div>
                              </div>
                            </div>
                            {review.date && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FaCalendarAlt />
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <p className="mt-3 text-gray-700 pl-16">{review.comment}</p>
                        </div>
                      </div>
                    ))}

                    {/* Show More/Less Buttons */}
                    {data.reviews.length > 4 && (
                      <div className="flex justify-center gap-4 mt-6">
                        {visibleReviews < data.reviews.length ? (
                          <button
                            onClick={handleShowMoreReviews}
                            className="btn btn-outline btn-primary"
                          >
                            Show More Reviews
                          </button>
                        ) : null}
                        {visibleReviews > 4 && (
                          <button
                            onClick={handleShowLessReviews}
                            className="btn btn-outline btn-secondary"
                          >
                            Show Less
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaComment className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 italic">No reviews available yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Be the first to review this service!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Service Info Card */}
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="card-title text-3xl font-bold text-gray-800">
                      {data.serviceName}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MdCategory className="text-primary" />
                      <span className="badge badge-primary badge-lg">
                        {data.serviceCategory}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      ${data.price}
                    </div>
                    <div className="text-sm text-gray-500">per {data.unit}</div>
                  </div>
                </div>

                <div className="divider my-4"></div>

                {/* Rating */}
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Overall Rating</h3>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-xl ${
                            index < Math.floor(data.AvgRating || 0)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="font-bold ml-2">
                        {data.AvgRating || "0.0"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{data.TotalRating || 0}</div>
                    <div className="text-sm text-gray-500">Total Ratings</div>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <FaUserCircle className="text-primary" />
                    Service Provider
                  </h3>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-2">
                            <img
                              src={data.providerPhoto || "https://via.placeholder.com/100"}
                              alt={data.providerName}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">{data.providerName}</h4>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MdEmail />
                            {data.providerEmail}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn btn-primary btn-block btn-lg"
                  >
                    Book This Service
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-outline btn-block"
                  >
                    Browse More Services
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn btn-secondary btn-block"
                  >
                    Contact Provider
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Service Unit</div>
                      <div className="stat-value text-lg">{data.unit}</div>
                    </div>
                  </div>
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Category</div>
                      <div className="stat-value text-lg">{data.serviceCategory}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;