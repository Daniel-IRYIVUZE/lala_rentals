import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart className="text-blue-500" size={24} />
              Lala Rentals
            </h3>
            <p className="text-gray-400 mb-4">Making your rental journey smooth and memorable. Find your perfect space or list your property with confidence.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Services', 'Property', 'Contact', 'Become a Host'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="h-px w-4 bg-blue-500 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
            <div className="space-y-4">
              {[
                { icon: <Facebook size={20} />, label: 'Facebook', color: 'hover:text-blue-500' },
                { icon: <Twitter size={20} />, label: 'Twitter', color: 'hover:text-blue-400' },
                { icon: <Instagram size={20} />, label: 'Instagram', color: 'hover:text-pink-500' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className={`flex items-center gap-3 text-gray-400 ${social.color} transition-colors duration-300 group`}
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="mt-1 flex-shrink-0" size={20} />
                <p>123 Lala Street, Melbourne, VIC 3000</p>
              </div>
              <a 
                href="mailto:info@lalarentals.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <Mail size={20} />
                info@lalarentals.com
              </a>
              <a 
                href="tel:+61123456789" 
                className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <Phone size={20} />
                +61 123 456 789
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {currentYear} Lala Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;