import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Star, 
  Award, 
  MessageSquare, 
  Home,
  ChevronRight,
  Search
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HostsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const hosts = [
    {
      id: 1,
      name: "John Doe",
      bio: "Experienced host with over 5 years of renting properties. Specializes in luxury apartments and vacation homes.",
      contact: "john.doe@example.com",
      location: "Melbourne, Australia",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      properties: 12,
      reviews: 156,
      badges: ["Superhost", "Quick Responder", "Local Expert"],
      languages: ["English", "Spanish"],
      responseTime: "within an hour"
    },
    {
      id: 2,
      name: "Jane Smith",
      bio: "Passionate about creating memorable stays. Expert in boutique properties and unique experiences.",
      contact: "jane.smith@example.com",
      location: "Sydney, Australia",
      image: "/api/placeholder/400/300",
      rating: 4.8,
      properties: 8,
      reviews: 92,
      badges: ["Superhost", "Experienced"],
      languages: ["English", "French"],
      responseTime: "within 2 hours"
    },
    {
      id: 3,
      name: "Mike Johnson",
      bio: "Former hotel manager turned property host. Brings professional hospitality experience to every rental.",
      contact: "mike.j@example.com",
      location: "Brisbane, Australia",
      image: "/api/placeholder/400/300",
      rating: 4.7,
      properties: 5,
      reviews: 64,
      badges: ["Rising Star"],
      languages: ["English", "German"],
      responseTime: "within 3 hours"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar/>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-purple-600">
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
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full md:w-1/4 px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
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
              <div className="relative">
                <img
                  src={host.image}
                  alt={host.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {host.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-900 text-white text-xs rounded-full font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{host.name}</h2>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-5 h-5 mr-1" />
                    <span className="font-semibold">{host.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{host.bio}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-blue-900" />
                    {host.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2 text-blue-900" />
                    {host.contact}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home className="w-5 h-5 mr-2 text-blue-900" />
                    {host.properties} Properties
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-900" />
                    Responds {host.responseTime}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {host.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-blue-900 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center group">
                  View Properties
                  <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Host CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900 to-purple-600 rounded-2xl p-8 text-white">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Become a Host?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our community of exceptional hosts and start earning by sharing your property with travelers from around the world.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Register as a Host
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HostsPage;