import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebook />, label: 'Facebook', url: 'https://facebook.com/styledecor' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com/styledecor' },
    { icon: <FaInstagram />, label: 'Instagram', url: 'https://instagram.com/styledecor' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com/company/styledecor' },
    { icon: <FaYoutube />, label: 'YouTube', url: 'https://youtube.com/styledecor' },
  ];

  const businessHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Contact', url: '/contact' },
    { name: 'Blog', url: '/blog' },
  ];

  const services = [
    { name: 'Interior Design', url: '/services/interior' },
    { name: 'Home Decor', url: '/services/decor' },
    { name: 'Furniture', url: '/services/furniture' },
    { name: 'Consultation', url: '/services/consultation' },
    { name: 'Renovation', url: '/services/renovation' },
  ];

  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary">StyleDecor</span>
            </div>
            <p className="mb-4">
              Transforming spaces with elegant designs and premium decor solutions. 
              Creating beautiful interiors that reflect your personality.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="link link-hover hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-title text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.url} 
                    className="link link-hover hover:text-primary"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Working Hours */}
          <div>
            <h3 className="footer-title text-lg font-semibold mb-4">Contact Info</h3>
            
            {/* Contact Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm">123 Design Street,</p>
                  <p className="text-sm">Creative City, DC 12345</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm">+1 (123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">info@styledecor.com</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FaClock className="text-primary" />
                Working Hours
              </h4>
              <ul className="space-y-1 text-sm">
                {businessHours.map((hour, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{hour.day}:</span>
                    <span className="font-medium">{hour.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>
              &copy; {currentYear} <span className="font-bold text-primary">StyleDecor</span>. 
              All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="/privacy-policy" className="link link-hover hover:text-primary text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="link link-hover hover:text-primary text-sm">
              Terms of Service
            </a>
            <a href="/cookies" className="link link-hover hover:text-primary text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;