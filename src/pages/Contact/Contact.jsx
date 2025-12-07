import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["+880 1234 567890", "+880 9876 543210"],
      color: "bg-green-100 text-green-600",
      action: "tel:+8801234567890"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      details: ["+880 1234 567890"],
      color: "bg-green-100 text-green-600",
      action: "https://wa.me/8801234567890"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["info@styledecor.com", "support@styledecor.com"],
      color: "bg-blue-100 text-blue-600",
      action: "mailto:info@styledecor.com"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Studio",
      details: ["123 Design Street, Gulshan", "Dhaka 1212, Bangladesh"],
      color: "bg-red-100 text-red-600",
      action: "https://maps.google.com"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM", "Sun: Closed"],
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const serviceOptions = [
    "Home Decoration",
    "Wedding Decor",
    "Office Design",
    "Event Decor",
    "Consultation",
    "Other"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions? Need a quote? Contact us today for professional decoration services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Contact Information</h2>
                
                {/* Contact Cards */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-base-200 transition-colors">
                      <div className={`p-3 rounded-full ${info.color}`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="opacity-80">{detail}</p>
                        ))}
                        {info.action && (
                          <a 
                            href={info.action} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-link btn-sm p-0 mt-2"
                          >
                            Click to {info.title === 'Email' ? 'Send Email' : 'Open'}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="btn btn-circle btn-outline">
                      <FaFacebook />
                    </a>
                    <a href="#" className="btn btn-circle btn-outline">
                      <FaInstagram />
                    </a>
                    <a href="#" className="btn btn-circle btn-outline">
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">Our Location</h3>
                  <div className="bg-base-200 rounded-lg p-4">
                    <div className="aspect-video bg-primary/10 rounded flex items-center justify-center">
                      <FaMapMarkerAlt className="text-4xl text-primary opacity-50" />
                    </div>
                    <p className="text-sm mt-2 text-center">
                      Gulshan, Dhaka - Visit our studio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className="alert alert-success mb-6">
                    <div>
                      <span>✅ Thank you! We'll contact you within 24 hours.</span>
                    </div>
                  </div>
                )}

                <h2 className="card-title text-2xl mb-2">Send us a Message</h2>
                <p className="opacity-80 mb-8">
                  Fill out the form below and our team will get back to you promptly.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input input-bordered"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email Address *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="input input-bordered"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1234 567890"
                        className="input input-bordered"
                      />
                    </div>

                    {/* Service Type */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Service Needed *</span>
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-control mt-6">
                    <label className="label">
                      <span className="label-text">Message *</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your decoration needs..."
                      className="textarea textarea-bordered h-40"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="form-control mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary btn-lg ${isSubmitting ? 'loading' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* FAQ Section */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "What is your response time?",
                        a: "We respond to inquiries within 24 hours during business days."
                      },
                      {
                        q: "Do you offer free consultations?",
                        a: "Yes! We provide free initial consultations for all new clients."
                      },
                      {
                        q: "What areas do you serve?",
                        a: "We serve all major areas in Dhaka and surrounding regions."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="collapse collapse-arrow bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                          {faq.q}
                        </div>
                        <div className="collapse-content">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content mt-8">
              <div className="card-body text-center">
                <h3 className="card-title text-xl justify-center">Need Urgent Assistance?</h3>
                <p className="mb-4">For urgent decoration emergencies, call us directly</p>
                <a href="tel:+8801234567890" className="btn btn-accent btn-lg">
                  <FaPhone className="mr-2" />
                  Call Now: +880 1234 567890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <div className="text-4xl text-primary mb-4">📞</div>
              <h3 className="card-title">Call Us</h3>
              <p>Speak directly with our team</p>
              <a href="tel:+8801234567890" className="btn btn-link">+880 1234 567890</a>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <div className="text-4xl text-primary mb-4">📧</div>
              <h3 className="card-title">Email Us</h3>
              <p>Send detailed inquiries</p>
              <a href="mailto:info@styledecor.com" className="btn btn-link">info@styledecor.com</a>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <div className="text-4xl text-primary mb-4">🏢</div>
              <h3 className="card-title">Visit Us</h3>
              <p>Schedule a studio visit</p>
              <button className="btn btn-link">Book Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;