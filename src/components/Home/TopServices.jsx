import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaInfo, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";

const TopServices = () => {

  const [ data, setData ] = useState([]);

  // Services data with images, provider names, ratings, etc.
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/services");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);
  console.log(data);
  // Handle details button click
  // const handleDetailsClick = (service) => {
  //   alert(
  //     `Service Details:\n\nName: ${service.name}\nProvider: ${service.providerName}\nPrice: ${service.price}\nRating: ${service.rating}/5\n\n${service.description}`
  //   );
  // };

  return (
    <div className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Top Services</span>
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Explore our most popular decoration services from trusted providers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service) => (
            <div
              key={service._id}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Service Image */}
              <figure className="px-6 pt-6">
                <img
                  src={service.ServicImage}
                  alt={service.serviceName}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body p-6">
                {/* Service Name & Provider */}
                <div className="mb-4">
                  <h3 className="card-title text-xl font-bold mb-1">
                    {service.serviceName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <span className="font-medium">Provider:</span>
                    <span>{service.providerName}</span>
                  </div>
                </div>

                {/* Rating Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {/* Star Rating */}
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={service.AvgRating}
                          className="mask mask-star-2 bg-yellow-400"
                          checked={star <= Math.round(service.AvgRating)}
                          readOnly
                        />
                      ))}
                    </div>

                    {/* Rating Number & Reviews */}
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{service.TotalRating}</span>
                      <span className="opacity-70 text-sm">
                        ({service.reviews.length})
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-xl font-bold text-primary">
                    {service.price} BDT
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm opacity-80 mb-6 line-clamp-2">
                  {service.description}
                </p>

                {/* Action Button */}
                <div className="card-actions">
                  <Link
                    className="btn btn-primary w-full gap-2"
                    to={`/services/${service._id}`}
                  >
                    <FaInfoCircle className="text-base mb-0.5"/>
                    <span>View Details</span>
                    
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to='/services' className="btn btn-outline btn-lg">View All Services</Link>
        </div>
      </div>
    </div>
  );
};

export default TopServices;
