import React, { useState, useEffect } from 'react';
import { Home, Users, User, DollarSign, MapPin, Loader, Calendar, Clock, X, Check, Search } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {children}
      </div>
    </div>
  );
};

const HouseCustomers = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const accessToken = userData?.access_token;

  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL}api/house/customers`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}` 
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch houses');
      }
      
      const data = await response.json();
      setHouses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    setUpdateLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL}api/booking${bookingId}?status=${status}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}` 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      const updatedHouses = houses.map(house => ({
        ...house,
        bookings: house.bookings.map(booking => 
          booking.booking_id === bookingId 
            ? { ...booking, status: status }
            : booking
        )
      }));

      setHouses(updatedHouses);
      setIsModalOpen(false);
      setSelectedBooking(null);

      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg transform transition-all duration-300';
      notification.textContent = `Booking ${status.toLowerCase()} successfully`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredHouses = houses.map(house => ({
    ...house,
    bookings: house.bookings.filter(booking => {
      const matchesSearch = 
        booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        filterStatus === 'all' || 
        booking.status.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    })
  })).filter(house => house.bookings.length > 0 || searchTerm === '');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl shadow-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Property Bookings</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map(({ house, bookings }) => (
          <div key={house.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            {/* House Header */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
                    <Home className="w-5 h-5 text-orange-600" />
                    {house.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {house.location}
                  </div>
                </div>
                <div className="flex items-center text-green-600 font-semibold">
                  <DollarSign className="w-4 h-4" />
                  {house.price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Bookings Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-gray-900">Recent Bookings</h4>
                <span className="bg-orange-100 text-orange-600 text-sm px-2 py-0.5 rounded-full">
                  {bookings.length}
                </span>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div
                      key={booking.booking_id}
                      className="p-4 bg-gray-50 rounded-xl space-y-3 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{booking.user.name}</p>
                          <p className="text-sm text-gray-600 truncate">{booking.user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(booking.checkin)} - {formatDate(booking.checkout)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status}
                        </span>

                        {booking.status === 'pending' && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsModalOpen(true);
                            }}
                            className="text-sm bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                          >
                            Manage
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl">
                  No bookings found
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredHouses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Properties Found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Booking</h3>
          
          {selectedBooking && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedBooking.user.name}</p>
                    <p className="text-sm text-gray-600">{selectedBooking.user.email}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedBooking.checkin)} - {formatDate(selectedBooking.checkout)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => updateBookingStatus(selectedBooking.booking_id, 'cancelled')}
                  disabled={updateLoading}
                  className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Decline
                </button>
                <button
                  onClick={() => updateBookingStatus(selectedBooking.booking_id, 'Approved')}
                  disabled={updateLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          )}

          {updateLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <Loader className="w-8 h-8 animate-spin text-orange-600" />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HouseCustomers;