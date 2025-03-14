import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar/>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] flex items-center justify-center bg-orange-700 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We're here to help with all your rental needs
          </p>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-orange-700" size={28} />
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    rows="5"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-orange-700 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>Sending...</>
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="text-orange-700 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Visit Our Office</h3>
                    <p className="text-gray-700">KG 125 St, Kigali, Rwanda</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@lalarentals.com"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="text-orange-700 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-700">info@lalarentals.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+250780162164"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="text-orange-700 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-700">+250 780 162 164</p>
                  </div>
                </motion.a>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.567122928704!2d30.128671674967038!3d-1.9248118480577001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca700083d0b83%3A0xc16a220809d8b906!2scyamurunguje%20center%20(ingenzi%20village)!5e0!3m2!1sen!2srw!4v1740178135971!5m2!1sen!2srw"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default ContactPage;