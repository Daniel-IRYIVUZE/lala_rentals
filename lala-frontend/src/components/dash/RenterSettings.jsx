import React, { useState, useEffect } from 'react';
import { Home, Users, User, DollarSign, MapPin, Loader, Calendar, Clock, X, Check } from 'lucide-react';

const RenterSettings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [location, setLocation] = useState('KG 125 St, Kigali, Rwanda');
  const [budget, setBudget] = useState(1500);
  const [loading, setLoading] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate an API call or save operation
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Renter Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <User className="mr-2" /> Profile Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-600">Name:</label>
            <input
              type="text"
              defaultValue="Daniel Iryivuze"
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-600">Email:</label>
            <input
              type="email"
              defaultValue="d.iryivuze@alustudent.com"
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <MapPin className="mr-2" /> Location
        </h2>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Current Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <DollarSign className="mr-2" /> Budget
        </h2>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Monthly Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <Clock className="mr-2" /> Notifications
        </h2>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Enable Notifications:</label>
          <button
            onClick={toggleNotification}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              notificationEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                notificationEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
        >
          {loading ? <Loader className="animate-spin mr-2" /> : <Check className="mr-2" />}
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default RenterSettings;