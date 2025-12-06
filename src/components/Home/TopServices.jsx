import React from 'react';

const TopServices = () => {
  // Services data with images, provider names, ratings, etc.
  const servicesData = [
    {
      id: 1,
      name: "Complete Home Makeover",
      providerName: "Luxury Decor Studio",
      price: "$2,499",
      rating: 4.9,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "Full home transformation including living room, bedroom, and dining area."
    },
    {
      id: 2,
      name: "Wedding Venue Decor",
      providerName: "Elegant Events Co.",
      price: "$1,799",
      rating: 4.8,
      reviewCount: 94,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w-400&h=300&fit=crop",
      description: "Complete decoration for weddings with theme-based designs."
    },
    {
      id: 3,
      name: "Interior Consultation",
      providerName: "Design Pro Experts",
      price: "$299",
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
      description: "Professional consultation for your space planning."
    },
    {
      id: 4,
      name: "Office Design",
      providerName: "Workspace Solutions",
      price: "$3,499",
      rating: 4.6,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      description: "Workspace optimization with ergonomic furniture."
    },
    {
      id: 5,
      name: "Festival Decor",
      providerName: "Party Masters",
      price: "$999",
      rating: 4.9,
      reviewCount: 112,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      description: "Special decoration for festivals and events."
    },
    {
      id: 6,
      name: "Furniture Rental",
      providerName: "Home Comfort Rentals",
      price: "$199/week",
      rating: 4.5,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
      description: "Premium furniture rental for events."
    }
  ];

  // Handle details button click
  const handleDetailsClick = (service) => {
    alert(`Service Details:\n\nName: ${service.name}\nProvider: ${service.providerName}\nPrice: ${service.price}\nRating: ${service.rating}/5\n\n${service.description}`);
  };

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
          {servicesData.map(service => (
            <div 
              key={service.id} 
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Service Image */}
              <figure className="px-6 pt-6">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              
              <div className="card-body p-6">
                {/* Service Name & Provider */}
                <div className="mb-4">
                  <h3 className="card-title text-xl font-bold mb-1">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <span className="font-medium">By:</span>
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
                          name={`rating-${service.id}`}
                          className="mask mask-star-2 bg-yellow-400"
                          checked={star <= Math.round(service.rating)}
                          readOnly
                        />
                      ))}
                    </div>
                    
                    {/* Rating Number & Reviews */}
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{service.rating}</span>
                      <span className="opacity-70 text-sm">
                        ({service.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-primary">
                    {service.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm opacity-80 mb-6 line-clamp-2">
                  {service.description}
                </p>

                {/* Action Button */}
                <div className="card-actions">
                  <button 
                    className="btn btn-primary w-full gap-2"
                    onClick={() => handleDetailsClick(service)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="btn btn-outline btn-lg">
            View All Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopServices;