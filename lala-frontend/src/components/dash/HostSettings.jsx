import React, { useState } from 'react';
import { Home, Users, User, DollarSign, MapPin, Loader, Calendar, Clock, X, Check, Bell, Mail, Lock } from 'lucide-react';

const HostSettings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Host Settings</h1>

      {/* Account Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <User className="mr-2" /> Account Management
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
              defaultValue="danieliryivuze4@gmail.com"
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-600">Phone:</label>
            <input
              type="tel"
              defaultValue="+250 780 162 164"
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <Bell className="mr-2" /> Notification Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-600">Enable Notifications:</label>
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
          <div className="flex items-center justify-between">
            <label className="text-gray-600">Email Notifications:</label>
            <button
              onClick={toggleEmailNotifications}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                emailNotifications ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Password Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <Lock className="mr-2" /> Password Management
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-600">Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-600">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-600">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
        >
          <Check className="mr-2" /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default HostSettings;