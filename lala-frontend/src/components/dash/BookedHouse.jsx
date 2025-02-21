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

    // Fetch booked houses
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

    // Fetch house details
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

    // Cancel booking
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

    // Delete canceled booking
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

    // Determine button styles based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-blue-500 hover:bg-blue-600'; // Blue
            case 'approved':
                return 'bg-green-500 hover:bg-green-600'; // Green
            case 'canceled':
                return 'bg-red-500 hover:bg-red-600'; // Red
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-4">Your Booked Houses</h2>
                {loading ? (
                    <p>Loading booked houses...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className={`border rounded-lg p-4 flex items-center justify-between ${
                                    booking.status === 'cancel' ? 'bg-red-100' : booking.status === 'approved' ? 'bg-green-100' : 'bg-blue-100'
                                }`}
                            >
                                <div>
                                    <h3 className="font-semibold">Booking #{booking.id}</h3>
                                    <p className="text-gray-600">Check-in: {new Date(booking.checkin).toLocaleDateString()}</p>
                                    <p className="text-gray-600">Check-out: {new Date(booking.checkout).toLocaleDateString()}</p>
                                    <p className="text-gray-600">Status: {booking.status}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => fetchHouseDetails(booking.house_id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        View Details
                                    </button>
                                    {booking.status === 'cancel' ? (
                                        <button
                                            onClick={() => deleteBooking(booking.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => cancelBooking(booking.id)}
                                            className={`text-white px-4 py-2 rounded-lg ${getStatusColor(booking.status)}`}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for displaying house details */}
            {showDetailsModal && houseDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">House Details</h3>
                        <div className="space-y-2">
                            <p><strong>Title:</strong> {houseDetails.title}</p>
                            <p><strong>Location:</strong> {houseDetails.location}</p>
                            <p><strong>Address:</strong> {houseDetails.address}</p>
                            <p><strong>Bedrooms:</strong> {houseDetails.bedrooms}</p>
                            <p><strong>Bathrooms:</strong> {houseDetails.bathrooms}</p>
                            <p><strong>Size:</strong> {houseDetails.size} sqft</p>
                            <p><strong>Price:</strong> ${houseDetails.price}/month</p>
                            <p><strong>Furnished:</strong> {houseDetails.furnished ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
