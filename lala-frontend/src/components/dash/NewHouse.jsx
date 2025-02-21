import React, { useState } from 'react';
import axios from 'axios';

export default function NewHouse() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;

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
                setFormData(prevState => ({
                    ...prevState,
                    image_url: reader.result
                }));
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL}api/house`, formData, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` 
                }
            });
            alert('House added successfully!');
            setFormData({
                title: '', description: '', address: '', location: '', price: 0, bedrooms: 0, bathrooms: 0, size: 0, furnished: false, available: true, image_url: ''
            });
        } catch (error) {
            console.error('Error adding house:', error);
            alert('Failed to add house.');
        }
    };

    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-4">Add New House</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="House title" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Address" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Price per month</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Price" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" rows="4" placeholder="House description" required></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bedrooms</label>
                        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Number of bedrooms" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bathrooms</label>
                        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Number of bathrooms" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Size (sqft)</label>
                        <input type="number" name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Size in sqft" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Furnished</label>
                        <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleChange} className="ml-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Image</label>
                        <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-lg" accept="image/*" required />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Add House
                    </button>
                </form>
            </div>
        </>
    );
}
