import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookedHouse() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [houseDetails, setHouseDetails] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL}api/booking`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setBookings(response.data);
            } catch (error) {
                setError('Error fetching booked houses');
                console.error('Error fetching booked houses:', error);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            fetchBookings();
        } else {
            setError('Access token not found in localStorage');
        }
    }, [accessToken]);

    const fetchHouseDetails = async (houseId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL}api/house${houseId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setHouseDetails(response.data);
            setShowDetailsModal(true);
        } catch (error) {
            console.error('Error fetching house details:', error);
            alert('Failed to fetch house details.');
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_LOCAL}api/booking${bookingId}?status=cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                alert('Booking canceled successfully!');
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.id === bookingId ? { ...booking, status: 'canceled' } : booking
                    )
                );
            } else {
                alert('Failed to cancel booking.');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            alert('An error occurred while canceling the booking.');
        }
    };

    const deleteBooking = async (houseId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_LOCAL}api/booking${houseId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                alert('Booking deleted successfully!');
                setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== houseId));
            } else {
                alert('Failed to delete booking.');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('An error occurred while deleting the booking.');
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-indigo-500 hover:bg-indigo-600';
            case 'approved':
                return 'bg-emerald-500 hover:bg-emerald-600';
            case 'canceled':
                return 'bg-rose-500 hover:bg-rose-600';
            default:
                return 'bg-slate-500 hover:bg-slate-600';
        }
    };

    const getStatusBg = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-indigo-50';
            case 'approved':
                return 'bg-emerald-50';
            case 'canceled':
                return 'bg-rose-50';
            default:
                return 'bg-slate-50';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Your Booked Houses</h2>
            
            {loading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            ) : error ? (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                    <p className="text-rose-600">{error}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.length === 0 ? (
                        <div className="text-center p-8 bg-slate-50 rounded-lg">
                            <p className="text-slate-600">No bookings found</p>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className={`border rounded-lg shadow-sm transition-all duration-200 ${getStatusBg(booking.status)}`}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold text-slate-800">
                                                Booking #{booking.id}
                                            </h3>
                                            <div className="space-y-1 text-sm">
                                                <p className="text-slate-600">
                                                    Check-in: {new Date(booking.checkin).toLocaleDateString()}
                                                </p>
                                                <p className="text-slate-600">
                                                    Check-out: {new Date(booking.checkout).toLocaleDateString()}
                                                </p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)} text-white`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => fetchHouseDetails(booking.house_id)}
                                                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                                            >
                                                View Details
                                            </button>
                                            
                                            {booking.status.toLowerCase() === 'canceled' ? (
                                                <button
                                                    onClick={() => deleteBooking(booking.id)}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors duration-200"
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => cancelBooking(booking.id)}
                                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${getStatusColor(booking.status)}`}
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {showDetailsModal && houseDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">
                                House Details
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Title</p>
                                        <p className="font-medium text-slate-800">{houseDetails.title}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Location</p>
                                        <p className="font-medium text-slate-800">{houseDetails.location}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Address</p>
                                        <p className="font-medium text-slate-800">{houseDetails.address}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Price</p>
                                        <p className="font-medium text-slate-800">${houseDetails.price}/month</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Size</p>
                                        <p className="font-medium text-slate-800">{houseDetails.size} sqft</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Furnished</p>
                                        <p className="font-medium text-slate-800">{houseDetails.furnished ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Bedrooms</p>
                                        <p className="font-medium text-slate-800">{houseDetails.bedrooms}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">Bathrooms</p>
                                        <p className="font-medium text-slate-800">{houseDetails.bathrooms}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-slate-500 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}