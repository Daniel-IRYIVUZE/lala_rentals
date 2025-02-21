import React from 'react';
import { motion } from 'framer-motion';
import { Home, Shield, Headphones, Calendar, Star, Users, Building, Key, Settings, MessageSquare, Clock, Heart } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Property Listings",
      description: "Browse through our extensive collection of verified properties, from cozy apartments to luxury villas.",
      icon: <Building size={24} />,
      features: ["Verified properties", "Detailed photos", "Virtual tours"]
    },
    {
      id: 2,
      title: "Secure Booking",
      description: "Book your stay with confidence using our secure and transparent payment system.",
      icon: <Shield size={24} />,
      features: ["Secure payments", "Instant confirmation", "Flexible cancellation"]
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Our dedicated support team is always available to assist you with any queries or concerns.",
      icon: <Headphones size={24} />,
      features: ["Round-the-clock assistance", "Multi-language support", "Quick response time"]
    },
    {
      id: 4,
      title: "Smart Scheduling",
      description: "Efficient booking management system to handle your reservations seamlessly.",
      icon: <Calendar size={24} />,
      features: ["Automated bookings", "Calendar sync", "Reminder system"]
    },
    {
      id: 5,
      title: "Quality Assurance",
      description: "Every property undergoes thorough verification to ensure the best experience for our users.",
      icon: <Star size={24} />,
      features: ["Property verification", "Regular inspections", "Quality standards"]
    },
    {
      id: 6,
      title: "Host Services",
      description: "Comprehensive tools and support for property hosts to manage their listings effectively.",
      icon: <Users size={24} />,
      features: ["Listing management", "Analytics dashboard", "Host support"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar/>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 bg-blue-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Discover how we make your rental journey smooth and memorable
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={item}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-900 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <Heart className="text-blue-900" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our services</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                q: "How do I book a property?",
                a: "Booking a property is simple. Browse our listings, select your desired dates, and follow the secure booking process."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for secure and convenient payments."
              },
              {
                q: "Can I cancel my booking?",
                a: "Yes, you can cancel your booking according to the property's cancellation policy, which is clearly displayed on each listing."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of satisfied users who have found their perfect rental match
          </p>
          <button className="bg-blue-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 mx-auto">
            <Building size={20} />
            Browse Properties
          </button>
        </div>
      </motion.section>
      <Footer/>
    </div>
  );
};

export default ServicesPage;