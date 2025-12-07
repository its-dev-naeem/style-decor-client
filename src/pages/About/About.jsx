import React from 'react';
import { FaUsers, FaAward, FaCalendarAlt, FaCheckCircle, FaStar, FaHandshake } from 'react-icons/fa';

const About= () => {
  const teamMembers = [
    { name: "Alex Morgan", role: "Lead Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
    { name: "Sarah Chen", role: "Interior Expert", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" },
    { name: "David Park", role: "Client Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
    { name: "Maya Rodriguez", role: "Event Specialist", image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=face" }
  ];

  const stats = [
    { icon: <FaUsers />, value: "2,500+", label: "Happy Clients" },
    { icon: <FaAward />, value: "150+", label: "Projects Done" },
    { icon: <FaCalendarAlt />, value: "5+ Years", label: "Experience" },
    { icon: <FaStar />, value: "4.8/5", label: "Avg Rating" }
  ];

  const values = [
    { icon: "🎨", title: "Creative Excellence", desc: "Innovative designs that stand out" },
    { icon: "🤝", title: "Client Partnership", desc: "Working together for best results" },
    { icon: "⏰", title: "Timely Delivery", desc: "Respecting your time and schedule" },
    { icon: "💰", title: "Fair Pricing", desc: "Transparent costs, no hidden fees" }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-16">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About StyleDecor</h1>
            <p className="text-xl">
              Transforming spaces with modern decoration solutions since 2019. 
              We specialize in both in-studio consultations and on-site services.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                StyleDecor began with a simple vision: to make professional decoration 
                services accessible and convenient for everyone in Dhaka.
              </p>
              <p className="mb-6">
                What started as a small studio in Gulshan has grown into a trusted 
                platform connecting clients with top decorators across the city.
              </p>
              <div className="flex items-center gap-4">
                <FaHandshake className="text-3xl text-primary" />
                <div>
                  <p className="font-bold">Trusted by homeowners & businesses</p>
                  <p className="text-sm opacity-80">Since 2019</p>
                </div>
              </div>
            </div>
            <div className="bg-base-200 rounded-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop" 
                alt="Our Studio" 
                className="rounded-xl w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-base-100 rounded-2xl shadow">
                <div className="text-3xl text-primary mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl mb-6">
            To simplify decoration services through technology while maintaining 
            the personal touch that makes spaces feel like home.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="badge badge-primary badge-lg p-4">Easy Booking</div>
            <div className="badge badge-secondary badge-lg p-4">Quality Service</div>
            <div className="badge badge-accent badge-lg p-4">Fair Pricing</div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="card-title">{value.title}</h3>
                  <p>{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-2">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a consultation with our experts and get personalized decoration solutions.
          </p>
          <button className="btn btn-accent btn-lg">
            Book Your Consultation
          </button>
        </div>
      </div>

    </div>
  );
};

export default About;