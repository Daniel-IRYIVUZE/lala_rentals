import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Search, Calendar, Users, Filter, Heart, Share, Wifi, Car, Coffee,  } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PropertyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    roomType: "",
    location: "",
    priceRange: "",
    amenities: [],
  });
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const properties = [
    {
      id: 1,
      title: "Luxurious Beachfront Villa",
      description: "Experience luxury living with this stunning beachfront villa featuring panoramic ocean views.",
      price: 250,
      location: "Gold Coast, Australia",
      image: "/assets/hero-image.jpg",
      roomType: "private",
      rating: 4.8,
      reviews: 124,
      amenities: ["wifi", "parking", "coffee"],
      host: {
        name: "Sarah Johnson",
        image: "/api/placeholder/50/50",
        rating: 4.9
      }
    },
    {
      id: 2,
      title: "Modern City Apartment",
      description: "Stylish downtown apartment with city views and modern amenities.",
      price: 175,
      location: "Melbourne, Australia",
      image: "/assets/hero-image.jpg",
      roomType: "double",
      rating: 4.6,
      reviews: 89,
      amenities: ["wifi", "parking", "coffee"],
      host: {
        name: "Michael Chen",
        image: "/api/placeholder/50/50",
        rating: 4.7
      }
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filters.roomType || property.roomType === filters.roomType;
    const matchesLocation = !filters.location || property.location.includes(filters.location);
    const matchesPrice = !filters.priceRange || 
      (filters.priceRange === "low" && property.price < 100) ||
      (filters.priceRange === "medium" && property.price >= 100 && property.price < 200) ||
      (filters.priceRange === "high" && property.price >= 200);

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const amenityIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    coffee: <Coffee className="w-5 h-5" />,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <motion.div {...fadeInUp} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition duration-200"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                value={filters.roomType}
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
              >
                <option value="">All Room Types</option>
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
                <option value="private">Private Room</option>
                <option value="shared">Shared Room</option>
              </select>

              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="">All Prices</option>
                <option value="low">Under $100</option>
                <option value="medium">$100 - $200</option>
                <option value="high">$200+</option>
              </select>

              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="">All Locations</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Gold Coast">Gold Coast</option>
                <option value="Sydney">Sydney</option>
              </select>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              {...fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition duration-200"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(property.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{property.title}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-700">{property.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{property.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{property.location}</span>
                </div>

                <div className="flex gap-3 mb-4">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="tooltip"
                      data-tip={amenity}
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {amenityIcons[amenity]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={property.host.image}
                      alt={property.host.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{property.host.name}</span>
                  </div>
                  <span className="text-md font-bold text-gray-600">${property.price} / Night</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Now
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                    <Share className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PropertyPage;