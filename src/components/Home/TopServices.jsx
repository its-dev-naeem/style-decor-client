import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const TopServices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/services");
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
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 bg-gray-200 h-10 w-64 mx-auto rounded animate-pulse"></h2>
            <p className="bg-gray-200 h-6 w-96 mx-auto rounded animate-pulse"></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-white shadow-lg">
                <div className="skeleton h-48 w-full rounded-t-lg"></div>
                <div className="card-body p-6 space-y-4">
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-12 w-full rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
