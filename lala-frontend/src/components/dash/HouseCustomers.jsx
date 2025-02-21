import React, { useState, useEffect } from 'react';
import { Home, Users, User, DollarSign, MapPin, Loader, Calendar, Clock, X, Check } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};
const userData = JSON.parse(localStorage.getItem('userData'));
const accessToken = userData?.access_token;


const HouseCustomers = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

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

      // Update local state
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map(({ house, bookings }) => (
          <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* House Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-600" />
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
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium">Bookings</h4>
                <span className="bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
                  {bookings.length}
                </span>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map(booking => (
                    <div
                      key={booking.booking_id}
                      className="p-3 bg-gray-50 rounded-lg space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{booking.user.name}</p>
                          <p className="text-sm text-gray-600 truncate">{booking.user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(booking.checkin)} - {formatDate(booking.checkout)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm px-2 py-1 rounded-full ${
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
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                          >
                            Manage Booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                  No bookings yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {houses.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No Houses Found</h3>
          <p className="text-gray-500">There are no houses available at the moment.</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Manage Booking</h3>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">{selectedBooking.user.name}</p>
                <p className="text-sm text-gray-600">{selectedBooking.user.email}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedBooking.checkin)} - {formatDate(selectedBooking.checkout)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => updateBookingStatus(selectedBooking.booking_id, 'cancelled')}
                  disabled={updateLoading}
                  className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={() => updateBookingStatus(selectedBooking.booking_id, 'Approved')}
                  disabled={updateLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          )}

          {updateLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HouseCustomers;