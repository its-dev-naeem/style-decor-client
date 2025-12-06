import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const TopDecorators = () => {
  const [favorites, setFavorites] = useState([1, 3]); // Example favorite IDs
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const decoratorsData = [
    {
      id: 1,
      name: "Emma Thompson",
      title: "Senior Interior Designer",
      experience: "8+ years",
      rating: 4.9,
      totalReviews: 142,
      hourlyRate: "$85/hr",
      availability: "Available Next Week",
      location: "New York, NY",
      specialties: ["Modern Luxury", "Minimalist", "Office Design"],
      completedProjects: 89,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      isCertified: true,
      badge: "Top Rated",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Wedding & Event Specialist",
      experience: "6+ years",
      rating: 4.8,
      totalReviews: 118,
      hourlyRate: "$75/hr",
      availability: "Available This Week",
      location: "Los Angeles, CA",
      specialties: ["Wedding Decor", "Event Planning", "Floral Design"],
      completedProjects: 156,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isCertified: true,
      badge: "Event Expert",
    },
    {
      id: 3,
      name: "Sophia Williams",
      title: "Luxury Home Decorator",
      experience: "10+ years",
      rating: 5.0,
      totalReviews: 203,
      hourlyRate: "$120/hr",
      availability: "Booked for 2 Weeks",
      location: "Miami, FL",
      specialties: ["Luxury Homes", "Vintage Style", "Smart Homes"],
      completedProjects: 124,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      isCertified: true,
      badge: "Premium",
    },
    {
      id: 4,
      name: "James Chen",
      title: "Commercial Space Designer",
      experience: "7+ years",
      rating: 4.7,
      totalReviews: 94,
      hourlyRate: "$95/hr",
      availability: "Available Tomorrow",
      location: "Chicago, IL",
      specialties: ["Office Design", "Retail Spaces", "Restaurant Decor"],
      completedProjects: 167,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isCertified: false,
      badge: "Commercial Pro",
    },
    {
      id: 5,
      name: "Olivia Parker",
      title: "Budget Decor Specialist",
      experience: "5+ years",
      rating: 4.6,
      totalReviews: 87,
      hourlyRate: "$65/hr",
      availability: "Available Today",
      location: "Austin, TX",
      specialties: ["Budget Makeovers", "DIY Consultation", "Small Spaces"],
      completedProjects: 203,
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
      isCertified: true,
      badge: "Budget Friendly",
    },
    {
      id: 6,
      name: "David Kim",
      title: "Eco-Friendly Designer",
      experience: "9+ years",
      rating: 4.8,
      totalReviews: 112,
      hourlyRate: "$110/hr",
      availability: "Available Next Month",
      location: "Portland, OR",
      specialties: ["Sustainable Design", "Eco Materials", "Green Living"],
      completedProjects: 98,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      isCertified: true,
      badge: "Eco Certified",
    },
  ];

  const allSpecialties = [
    "all",
    ...new Set(decoratorsData.flatMap((decorator) => decorator.specialties)),
  ];

  const filteredDecorators =
    selectedSpecialty === "all"
      ? decoratorsData
      : decoratorsData.filter((decorator) =>
          decorator.specialties.includes(selectedSpecialty)
        );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleBookAppointment = (decorator) => {
    alert(`Booking appointment with ${decorator.name} - ${decorator.title}`);
    // In real app: navigate to booking page
  };

  const handleContactDecorator = (decorator) => {
    alert(
      `Contacting ${decorator.name} at their hourly rate of ${decorator.hourlyRate}`
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) =>
          index < Math.floor(rating) ? (
            <FaStar key={index} className="text-yellow-400" />
          ) : (
            <FaRegStar key={index} className="text-gray-300" />
          )
        )}
        <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <FaStar className="mr-2" />
            Meet Our Experts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Top <span className="text-primary">Decorators</span> & Designers
          </h1>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Book appointments with our verified and top-rated decoration
            experts. Each decorator brings unique specialties and years of
            experience.
          </p>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper "
        >
          {filteredDecorators.map((decorator) => (
            <SwiperSlide
              key={decorator.id}
              className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition-all duration-300 "
            >
              <div className="card-body p-6">
                {/* Decorator Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full ring-2 ring-primary ring-offset-2">
                          <img src={decorator.image} alt={decorator.name} />
                        </div>
                      </div>
                      {decorator.isCertified && (
                        <FaCheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                      )}
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h3 className="text-xl font-bold">{decorator.name}</h3>
                      <p className="opacity-80">{decorator.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FaMapMarkerAlt className="opacity-60" size={14} />
                        <span className="text-sm">{decorator.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(decorator.id)}
                    className="btn btn-circle btn-ghost btn-sm"
                  >
                    {favorites.includes(decorator.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                {/* Rating & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {renderStars(decorator.rating)}
                    <span className="text-sm opacity-70">
                      {decorator.totalReviews} reviews
                    </span>
                  </div>
                  <div
                    className={`badge ${
                      decorator.badge === "Premium"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {decorator.badge}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {decorator.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="badge badge-outline hover:badge-primary cursor-pointer transition-colors"
                        onClick={() => setSelectedSpecialty(specialty)}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200 mb-6">
                  <div className="stat">
                    <div className="stat-title">Experience</div>
                    <div className="stat-value text-lg">
                      {decorator.experience}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Hourly Rate</div>
                    <div className="stat-value text-lg">
                      {decorator.hourlyRate}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Projects</div>
                    <div className="stat-value text-lg">
                      {decorator.completedProjects}
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between bg-base-200 p-3 rounded-lg mb-6">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    <span className="font-medium">Availability:</span>
                  </div>
                  <span
                    className={`badge ${
                      decorator.availability.includes("Available")
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {decorator.availability}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="card-actions">
                  <button
                    className="btn btn-primary flex-1 gap-2"
                    onClick={() => handleBookAppointment(decorator)}
                  >
                    <FaCalendarAlt />
                    Book Appointment
                  </button>
                  <button
                    className="btn btn-outline flex-1"
                    onClick={() => handleContactDecorator(decorator)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopDecorators;
