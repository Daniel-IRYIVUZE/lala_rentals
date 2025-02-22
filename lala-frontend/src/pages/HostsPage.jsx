import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Star, 
  Award, 
  MessageSquare, 
  Home,
  ChevronRight,
  Search,
  CheckCircle
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HostsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const hosts = [
    {
      id: 1,
      name: "Daniel Iryivuze",
      bio: "Dedicated host with over 4 years of experience in providing comfortable and modern apartments in Kigali.",
      contact: "danieliryivuze4@example.com",
      location: "Kigali, Rwanda",
      image: "https://cdn-icons-png.flaticon.com/512/3/3729.png",
      rating: 4.8,
      properties: 10,
      reviews: 120,
      badges: ["Superhost", "Local Expert"],
      languages: ["English", "Kinyarwanda", "French"],
      responseTime: "within an hour",
      verifiedStatus: true
    },
    {
      id: 2,
      name: "Aline Mukamana",
      bio: "Passionate about hospitality, specializing in guest houses with beautiful lake views and serene surroundings.",
      contact: "aline.m@example.com",
      location: "Rubavu, Rwanda",
       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPRQ6LprnPzvvP-_vVO_nhSokwda8CMsnwQ&s",
      rating: 4.7,
      properties: 6,
      reviews: 3,
      badges: ["Superhost", "Quick Responder"],
      languages: ["English", "Kinyarwanda"],
      responseTime: "within 2 hours",
      verifiedStatus: true
    },
    {
      id: 3,
      name: "Blessing Keza",
      bio: "Former travel guide turned luxury villa host, ensuring top-tier experiences in Rwanda's scenic regions.",
      contact: "blessing.k@gmail.com",
      location: "Musanze, Rwanda",
       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPRQ6LprnPzvvP-_vVO_nhSokwda8CMsnwQ&s",
      rating: 4.9,
      properties: 2,
      reviews: 8,
      badges: ["Superhost", "Luxury Stays Expert"],
      languages: ["English", "French", "Swahili"],
      responseTime: "within an hour",
      verifiedStatus: true
    }
  ];

  const locations = [...new Set(hosts.map(host => host.location))];
  
  const filteredHosts = hosts.filter(host => {
    const matchesSearch = host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         host.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || host.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar/>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Meet Our Outstanding Hosts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our carefully vetted hosts who are passionate about providing exceptional stays
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search hosts..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-800 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full md:w-1/4 px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-800 focus:border-transparent transition-all"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Hosts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHosts.map((host) => (
            <div
              key={host.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative bg-orange-50 p-6 flex flex-col items-center">
                <img
                  src={host.image}
                  alt={host.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
                />
                <div className="flex gap-2 flex-wrap justify-center">
                  {host.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-800 text-white text-xs rounded-full font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">{host.name}</h2>
                    {host.verifiedStatus && (
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-5 h-5 mr-1" />
                    <span className="font-semibold">{host.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{host.bio}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-orange-800" />
                    {host.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2 text-orange-800" />
                    {host.contact}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home className="w-5 h-5 mr-2 text-orange-800" />
                    {host.properties} Properties
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageSquare className="w-5 h-5 mr-2 text-orange-800" />
                    Responds {host.responseTime}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {host.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-50 text-orange-800 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>

                <a href="/login" className="mt-6 w-full bg-orange-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all flex items-center justify-center group">
                  View Properties
                  <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Host CTA */}
        <div className="mt-16 text-center bg-orange-800 rounded-2xl p-8 text-white">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Become a Host?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our community of exceptional hosts and start earning by sharing your property with travelers from around the world.
          </p>
          <div className="flex gap-4 justify-center">
            <a href='/signup' className="bg-white text-orange-800 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all">
              Register as a Host
            </a>
            <a href='/services' className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HostsPage;