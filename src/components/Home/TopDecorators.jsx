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
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const TopDecorators = () => {
  const [favorites, setFavorites] = useState([1, 3]);

  const decorators = [
    {
      id: 1,
      name: "Emma Thompson",
      title: "Interior Designer",
      rating: 4.9,
      reviews: 142,
      rate: "$85/hr",
      available: "Next Week",
      location: "NYC",
      specialties: ["Modern", "Minimalist", "Office"],
      projects: 89,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      certified: true,
      badge: "Top Rated",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Event Specialist",
      rating: 4.8,
      reviews: 118,
      rate: "$75/hr",
      available: "This Week",
      location: "LA",
      specialties: ["Wedding", "Events", "Floral"],
      projects: 156,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      certified: true,
      badge: "Event Expert",
    },
    {
      id: 3,
      name: "Sophia Williams",
      title: "Luxury Decorator",
      rating: 5.0,
      reviews: 203,
      rate: "$120/hr",
      available: "2 Weeks",
      location: "Miami",
      specialties: ["Luxury", "Vintage", "Smart"],
      projects: 124,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      certified: true,
      badge: "Premium",
    },
    {
      id: 4,
      name: "James Chen",
      title: "Commercial Designer",
      rating: 4.7,
      reviews: 94,
      rate: "$95/hr",
      available: "Tomorrow",
      location: "Chicago",
      specialties: ["Office", "Retail", "Restaurant"],
      projects: 167,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      certified: false,
      badge: "Commercial",
    },
    {
      id: 5,
      name: "Olivia Parker",
      title: "Budget Specialist",
      rating: 4.6,
      reviews: 87,
      rate: "$65/hr",
      available: "Today",
      location: "Austin",
      specialties: ["Budget", "DIY", "Small Spaces"],
      projects: 203,
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
      certified: true,
      badge: "Budget",
    },
    {
      id: 6,
      name: "David Kim",
      title: "Eco Designer",
      rating: 4.8,
      reviews: 112,
      rate: "$110/hr",
      available: "Next Month",
      location: "Portland",
      specialties: ["Sustainable", "Eco", "Green"],
      projects: 98,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      certified: true,
      badge: "Eco",
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleBook = (name) => alert(`Booking ${name}`);
  const handleContact = (name) => alert(`Contacting ${name}`);

  return (
    <div className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="badge badge-primary badge-lg gap-2 mb-4">
            <FaStar /> Top Decorators
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Our Expert <span className="text-primary">Decorators</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Book appointments with top-rated decoration experts
          </p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="pb-12"
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {decorators.map((decorator) => (
            <SwiperSlide
              key={decorator.id}
              className="max-w-xs md:max-w-sm mx-auto"
            >
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body p-5">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-14 h-14 rounded-full ring-2 ring-primary relative">
                          <img src={decorator.image} alt={decorator.name} />
                          {decorator.certified && (
                            <FaCheckCircle className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{decorator.name}</h3>
                        <p className="text-sm text-gray-500">
                          {decorator.title}
                        </p>
                        <div className="flex items-center gap-1 text-xs">
                          <FaMapMarkerAlt /> {decorator.location}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(decorator.id)}
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      {favorites.includes(decorator.id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>

                  {/* Rating & Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) =>
                        i < Math.floor(decorator.rating) ? (
                          <FaStar key={i} className="text-yellow-400" />
                        ) : (
                          <FaRegStar key={i} className="text-gray-300" />
                        )
                      )}
                      <span className="font-bold ml-1">{decorator.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({decorator.reviews})
                      </span>
                    </div>
                    <span
                      className={`badge ${
                        decorator.badge === "Premium"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {decorator.badge}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {decorator.specialties.map((spec, i) => (
                        <span key={i} className="badge badge-outline badge-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-base-200 p-2 rounded">
                      <div className="text-sm text-gray-500">Exp</div>
                      <div className="font-bold">8+ yrs</div>
                    </div>
                    <div className="bg-base-200 p-2 rounded">
                      <div className="text-sm text-gray-500">Rate</div>
                      <div className="font-bold">{decorator.rate}</div>
                    </div>
                    <div className="bg-base-200 p-2 rounded">
                      <div className="text-sm text-gray-500">Projects</div>
                      <div className="font-bold">{decorator.projects}</div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex justify-between items-center bg-base-200 p-3 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" />
                      <span className="text-sm font-medium">Available:</span>
                    </div>
                    <span
                      className={`badge ${
                        decorator.available === "Today"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {decorator.available}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBook(decorator.name)}
                      className="btn btn-primary btn-sm flex-1 gap-2"
                    >
                      <FaCalendarAlt /> Book
                    </button>
                    <button
                      onClick={() => handleContact(decorator.name)}
                      className="btn btn-outline btn-sm flex-1"
                    >
                      Contact
                    </button>
                  </div>
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
