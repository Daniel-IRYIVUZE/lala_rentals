import React, { useState } from 'react';
import axios from 'axios';

export default function NewHouse() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        location: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        furnished: false,
        available: true,
        image_url: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData(prevState => ({
                    ...prevState,
                    image_url: reader.result
                }));
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_LOCAL}api/house`, formData, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` 
                }
            });
            
            setFormData({
                title: '', description: '', address: '', location: '', price: 0,
                bedrooms: 0, bathrooms: 0, size: 0, furnished: false,
                available: true, image_url: ''
            });
            setPreviewImage(null);
            
            // Success notification
            const notification = document.getElementById('notification');
            notification.textContent = 'Property added successfully!';
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg transform transition-transform duration-300 translate-x-0';
            setTimeout(() => {
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg transform transition-transform duration-300 translate-x-full';
            }, 3000);
        } catch (error) {
            console.error('Error adding house:', error);
            const notification = document.getElementById('notification');
            notification.textContent = 'Failed to add property. Please try again.';
            notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg transform transition-transform duration-300 translate-x-0';
            setTimeout(() => {
                notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg transform transition-transform duration-300 translate-x-full';
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Add New Property</h2>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="md:col-span-2">
                        <div className="mb-6">
                            {previewImage && (
                                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Image
                            </label>
                            <input 
                                type="file" 
                                onChange={handleImageChange} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                accept="image/*" 
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Enter property title" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input 
                            type="text" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Enter location" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price per night</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Enter price" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Size (sqft)</label>
                        <input 
                            type="number" 
                            name="size" 
                            value={formData.size} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Enter size" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                        <input 
                            type="number" 
                            name="bedrooms" 
                            value={formData.bedrooms} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Number of bedrooms" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                        <input 
                            type="number" 
                            name="bathrooms" 
                            value={formData.bathrooms} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="Number of bathrooms" 
                            required 
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            rows="4" 
                            placeholder="Enter property description" 
                            required
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="furnished" 
                                checked={formData.furnished} 
                                onChange={handleChange} 
                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" 
                            />
                            <span className="text-sm font-medium text-gray-700">Furnished</span>
                        </label>
                    </div>

                    <div className="md:col-span-2">
                        <button 
                            type="submit" 
                            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Adding Property...
                                </span>
                            ) : 'Add Property'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Notification toast */}
            <div 
                id="notification" 
                className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg transform transition-transform duration-300 translate-x-full"
            ></div>
        </div>
    );
}