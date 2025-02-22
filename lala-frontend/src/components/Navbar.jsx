import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Building, Phone, Users, LogIn, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/services', label: 'Services', icon: <BookOpen size={18} /> },
    { to: '/hosts', label: 'Hosts', icon: <Users size={18} /> },
    { to: '/properties', label: 'Property', icon: <Building size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={18} /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#E6E6E6] text-[#1B1B1B] shadow-lg' 
            : 'bg-transparent text-[#bb2a0d]'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 font-bold text-2xl"
            >
              <Heart 
                className={`${isScrolled ? 'text-[#1B1B1B]' : 'text-[#bb2a0d]'}`} 
                size={24} 
              />
              <span className="font-extrabold">Lala Rentals</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`flex items-center gap-2 font-medium hover:text-[#bb2a0d] transition-colors duration-300 relative group py-2`}
                >
                  {link.icon}
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#bb2a0d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
              
              {/* Login Button */}
              <Link
                to="/login"
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? 'bg-[#E6E6E6] text-[#1B1B1B] hover:bg-[#bb2a0d] hover:text-white'
                    : 'bg-white text-[#1B1B1B] hover:bg-[#bb2a0d] hover:text-white'
                }`}
              >
                <LogIn size={18} />
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${
                isScrolled ? 'bg-[#E6E6E6]' : 'bg-[#1B1B1B] text-white'
              }`}
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-opacity-10 hover:bg-white rounded-lg transition-colors duration-300"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg font-semibold ${
                    isScrolled
                      ? 'bg-[#1B1B1B] text-white hover:bg-[#bb2a0d]'
                      : 'bg-white text-[#1B1B1B] hover:bg-[#bb2a0d] hover:text-white'
                  }`}
                >
                  <LogIn size={18} />
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
