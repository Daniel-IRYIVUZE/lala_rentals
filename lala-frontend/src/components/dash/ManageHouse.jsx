import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageHouse() {
    const [houses, setHouses] = useState([]);
    const [editingHouse, setEditingHouse] = useState(null);
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
        image_url: '',
        user_id: ''
    });
    const [showPopup, setShowPopup] = useState(false);

    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;
    const userId = userData?.user?.id;

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL}api/house/me`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setHouses(response.data);
        } catch (error) {
            console.error('Error fetching houses:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_LOCAL}api/house${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setHouses(houses.filter(house => house.id !== id));
        } catch (error) {
            console.error('Error deleting house:', error);
        }
    };

    const handleEdit = (house) => {
        setEditingHouse(house);
        setFormData(house);
        setShowPopup(true);
    };

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
            reader.onloadend = (n) => {
                setFormData(prevState => ({
                    ...prevState,
                    image_url: reader.result
                }));
            };
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = { ...formData, user_id: userId };
            await axios.put(`${import.meta.env.VITE_LOCAL}api/house${editingHouse.id}`, updatedFormData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('House updated successfully!');
            setShowPopup(false);
            fetchHouses();
        } catch (error) {
            console.error('Error updating house:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Houses</h2>
            <div className="space-y-4">
                {houses.map((house) => (
                    <div key={house.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img src={house.image_url} alt={house.title} className="w-24 h-24 object-cover rounded-lg" />
                            <div>
                                <h3 className="font-semibold">{house.title}</h3>
                                <p className="text-gray-600">{house.location}</p>
                                <p className="text-blue-600">${house.price}/night</p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(house)} className="px-3 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Edit</button>
                            <button onClick={() => handleDelete(house.id)} className="px-3 py-1 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit House</h2>
                        <form className="space-y-4" onSubmit={handleUpdate}>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="House title" required />
                            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Address" required />
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Price" required />
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" rows="4" placeholder="House description" required></textarea>
                            <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-lg" accept="image/*" />
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Update House</button>
                            <button onClick={() => setShowPopup(false)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
