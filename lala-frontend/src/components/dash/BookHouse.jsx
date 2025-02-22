import React, { useState } from 'react';

export default function BookHouse() {
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        propertyType: 'apartment'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Booking request submitted!');
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-orange-50 to-orange-50 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-orange-900 text-center">
                Book Your Dream Stay
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-2">
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-2">
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-2">
                            Number of Guests
                        </label>
                        <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white"
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-2">
                            Property Type
                        </label>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white"
                        >
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="cottage">Cottage</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium
                        ${isSubmitting 
                            ? 'bg-orange-400 cursor-not-allowed' 
                            : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800'
                        } 
                        transition duration-200 transform hover:scale-[1.02]
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                >
                    {isSubmitting ? (
                        <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : 'Book Now'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-orange-600">
                <a href="#terms" className="hover:text-orange-800 underline">
                    Terms & Conditions
                </a>
                <span className="mx-2">•</span>
                <a href="#support" className="hover:text-orange-800 underline">
                    Need Help?
                </a>
            </div>
        </div>
    );
}