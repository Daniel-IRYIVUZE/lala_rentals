import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AvailableHouse = () => {
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for fetching houses
    const [isBooking, setIsBooking] = useState(false); // Loading state for booking
    const [selectedHouseId, setSelectedHouseId] = useState(null); // Track which house is being booked
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const [checkin, setCheckin] = useState(''); // Check-in date
    const [checkout, setCheckout] = useState(''); // Check-out date

    // Retrieve userData from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;

    useEffect(() => {
        // Fetch available houses from the API
        const fetchHouses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL}api/house`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setHouses(response.data);
            } catch (error) {
                console.error('Error fetching houses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (accessToken) {
            fetchHouses();
        } else {
            console.error('Access token not found in localStorage');
        }
    }, [accessToken]);

    const handleBookClick = (houseId) => {
        setSelectedHouseId(houseId); // Set the house ID being booked
        setShowModal(true); // Open the modal
    };

    const handleBookingSubmit = async () => {
        if (!checkin || !checkout) {
            alert('Please select both check-in and check-out dates.');
            return;
        }

        setIsBooking(true);
        try {
            const bookingData = {
                house_id: selectedHouseId,
                checkin: new Date(checkin).toISOString(),
                checkout: new Date(checkout).toISOString(),
            };

            const response = await axios.post(`${import.meta.env.VITE_LOCAL}api/booking`, bookingData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Booking successful!');
                setShowModal(false); // Close the modal
                window.location.reload();
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error booking house:', error);
            alert('An error occurred while booking the house.');
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-4">Available Houses</h2>
                {isLoading ? (
                    <p>Loading houses...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {houses.map((house) => (
                            <div key={house.id} className="border rounded-lg p-4">
                                <div className="w-full h-48 bg-gray-200 rounded-lg mb-3">
                                    {house.image_url && (
                                        <img src={house.image_url} alt={house.title} className="w-full h-full object-cover rounded-lg" />
                                    )}
                                </div>
                                <h3 className="font-semibold">{house.title}</h3>
                                <p className="text-gray-600">{house.location}</p>
                                <p className="text-gray-600">{house.address}</p>
                                <p className="text-gray-600">{house.bedrooms} Bedrooms</p>
                                <p className="text-gray-600">{house.bathrooms} Bathrooms</p>
                                <p className="text-gray-600">{house.size} sqft</p>
                                <p className="text-gray-600">{house.furnished ? 'Furnished' : 'Not Furnished'}</p>
                                <p className="text-blue-600 font-semibold mt-2">${house.price}/month</p>
                                <button
                                    onClick={() => handleBookClick(house.id)}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Book
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for selecting dates */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Select Dates</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                                <input
                                    type="date"
                                    value={checkin}
                                    onChange={(e) => setCheckin(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                                <input
                                    type="date"
                                    value={checkout}
                                    onChange={(e) => setCheckout(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBookingSubmit}
                                disabled={isBooking}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {isBooking ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};