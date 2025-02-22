import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Home, Key, Users, Star, Phone, Building, ArrowRight, Mail, Menu } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  // State for controlling visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);
  // State for controlling the mobile menu (if needed)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(currentScrollPos > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Color scheme for the app
  const colors = {
    primary: '#FF6B35', // vibrant orange
    secondary: '#2B2D42', // dark blue-gray
    accent: '#FF9F1C', // warm orange
    light: '#FFE0D4', // light orange
    background: '#FFFAF7', // off-white
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center justify-center bg-orange-800 overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-[url('https://wanbridge.com/wp-content/uploads/2022/07/how-to-set-up-utilities-renting-first-time-wanbridge.com_.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto text-center text-white relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            Find Your Dream Rental
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Discover perfect spaces with our smart matching technology
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="max-w-4xl mx-auto bg-white rounded-full p-2 mb-8 flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search className="text-orange-800" size={20} />
              <input
                type="text"
                placeholder="Search by location..."
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            <button className="bg-orange-800 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              Search Now
            </button>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/properties"
              className="bg-white text-orange-800 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Building size={20} />
              List Property
            </a>
            <a
              href="/properties"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Virtual Tours
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-orange-50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Why Choose Lala Rentals?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Home size={40} />, title: "Verified Properties", desc: "All properties undergo thorough verification for your security and peace of mind" },
              { icon: <Key size={40} />, title: "Instant Booking", desc: "Secure your dream property instantly with our safe payment system" },
              { icon: <Users size={40} />, title: "24/7 Support", desc: "Our dedicated team is always ready to assist you anytime, anywhere" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-orange-800 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mr. Loue Sauveur Christian", role: "Tenant", text: "Found my dream apartment through Lala Rentals. The process was smooth and transparent." },
              { name: "Mr. Daniel Iryivuze", role: "Property Owner", text: "As a host, I love how easy it is to manage my properties and communicate with tenants." },
              { name: "Mr. Alain Michael", role: "Tenant", text: "The virtual tours feature helped me make a confident decision without physical viewing." }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="text-orange-800" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-14 bg-orange-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-orange-800 text-white rounded-xl p-8 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied users who have found their perfect rental match</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-white text-orange-800 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight size={20} />
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links (Scroll-to-top and Call Buttons) */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          <a
            href="tel:+1234567890"
            className="w-12 h-12 bg-orange-800 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors duration-300 shadow-lg"
          >
            <Phone size={24} />
          </a>
          <button
            className="w-12 h-12 bg-orange-800 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors duration-300 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowRight className="transform rotate-270" size={24} />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;