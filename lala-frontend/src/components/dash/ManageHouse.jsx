import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageHouse() {
    const [houses, setHouses] = useState([]);
    const [editingHouse, setEditingHouse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL}api/house/me`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setHouses(response.data);
        } catch (error) {
            console.error('Error fetching houses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_LOCAL}api/house${id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setHouses(houses.filter(house => house.id !== id));
            } catch (error) {
                console.error('Error deleting house:', error);
            }
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
            reader.onloadend = () => {
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
            setShowPopup(false);
            fetchHouses();
        } catch (error) {
            console.error('Error updating house:', error);
        }
    };

    const filteredHouses = houses.filter(house =>
        house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Manage Properties</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHouses.map((house) => (
                        <div key={house.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="relative h-48">
                                <img 
                                    src={house.image_url} 
                                    alt={house.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-0 right-0 m-4">
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                        ${house.price}/night
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{house.title}</h3>
                                <p className="text-gray-600 mb-4">{house.location}</p>
                                <div className="flex justify-between items-center">
                                    <button 
                                        onClick={() => handleEdit(house)} 
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(house.id)} 
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Property</h2>
                        <form className="space-y-6" onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                    placeholder="Property title" 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="location" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                    placeholder="Location" 
                                    required 
                                />
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={formData.price} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                    placeholder="Price per night" 
                                    required 
                                />
                                <input 
                                    type="file" 
                                    onChange={handleImageChange} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                    accept="image/*" 
                                />
                            </div>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                rows="4" 
                                placeholder="Property description" 
                                required
                            ></textarea>
                            <div className="flex justify-end space-x-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowPopup(false)} 
                                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300"
                                >
                                    Update Property
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}