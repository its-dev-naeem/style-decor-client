import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaEye } from "react-icons/fa";
import { Link } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";
const API_URL = import.meta.env.VITE_API_URL;

const TopServices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        setData(res.data.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Popular <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Most booked services with excellent ratings
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={service.ServicImage}
                  alt={service.serviceName}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  BDT{service.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & Provider */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {service.serviceName}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  By:{" "}
                  <span className="font-medium">{service.providerName}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(service.AvgRating)
                              ? "fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="font-bold">{service.AvgRating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({service.TotalRating} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-2 text-sm">
                  {service.description}
                </p>

                {/* Button */}
                <Link
                  to={`/services/${service._id}`}
                  className="btn btn-primary w-full gap-2 hover:gap-3 transition-all"
                >
                  <FaEye /> View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="btn btn-outline btn-primary px-8 hover:btn-primary transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopServices;
