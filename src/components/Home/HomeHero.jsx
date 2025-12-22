import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight, FaStar, FaCheckCircle, FaUsers, FaAward } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const HomeHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate()

  const heroImages = [
    "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&q=80"
  ];

  const stats = [
    { icon: <FaUsers />, value: "2,500+", label: "Happy Clients" },
    { icon: <FaAward />, value: "4.8/5", label: "Avg Rating" },
    { icon: <FaCheckCircle />, value: "98%", label: "Satisfaction" }
  ];

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  const handleBookService = () => {
    navigate('/services')
  };

  return (
    <div className=" container mx-auto relative  overflow-hidden bg-gradient-to-br from-base-100 via-base-100 to-primary/10">
      
      {/* Background Images with Fade Animation */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.1 
            }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(0,0,0,0.4)'
            }}
          />
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-base-100/90 via-base-100/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="flex flex-col items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <FaStar className="animate-pulse" />
                <span className="font-medium">Premium Decoration Services</span>
              </div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                Transform Your Space with{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  StyleDecor
                </span>
              </motion.h1>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-xl opacity-90 max-w-2xl"
            >
              Modern appointment management for in-studio consultations and on-site 
              decoration services for homes and ceremonies. Book your dream space today.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 py-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-base-100/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                >
                  <div className="text-2xl text-primary">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookService}
                className="btn btn-primary btn-lg group px-8 py-4 text-lg"
              >
                <FaCalendarAlt className="mr-3" />
                Book Decoration Service
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.p 
                variants={itemVariants}
                className="text-sm opacity-80 flex items-center gap-2"
              >
                <FaCheckCircle className="text-green-500" />
                <span>Trusted by 500+ homeowners and event planners</span>
              </motion.p>
            </motion.div>
          </motion.div>


        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm opacity-70">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
      />
    </div>
  );
};

export default HomeHero;