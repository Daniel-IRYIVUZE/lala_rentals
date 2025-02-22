import React, { useState, useEffect } from 'react';
import { Home, Users, User, DollarSign, MapPin, Loader, Calendar, Clock, X, Check } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RenterOverview = () => {
  const [loading, setLoading] = useState(false);
  const [housesRented, setHousesRented] = useState(2);
  const [totalSpent, setTotalSpent] = useState(400);
  const [upcomingPayments, setUpcomingPayments] = useState([
    { id: 1, date: '2023-10-15', amount: 200 },
    { id: 2, date: '2023-11-01', amount: 100 },
  ]);

  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Houses Rented',
        data: [3, 5, 2, 6, 4, 7, 8],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Houses Rented',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Renter Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <Home className="w-8 h-8 text-orange-500 mr-4" />
          <div>
            <p className="text-gray-600">Total Houses Rented</p>
            <p className="text-2xl font-bold text-gray-800">{housesRented}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <DollarSign className="w-8 h-8 text-green-500 mr-4" />
          <div>
            <p className="text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-800">${totalSpent.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <Calendar className="w-8 h-8 text-purple-500 mr-4" />
          <div>
            <p className="text-gray-600">Upcoming Payments</p>
            <p className="text-2xl font-bold text-gray-800">{upcomingPayments.length}</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Houses Rented</h2>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Upcoming Payments Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upcoming Payments</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-gray-600">Date</th>
              <th className="p-3 text-left text-gray-600">Amount</th>
              <th className="p-3 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 text-gray-700">{payment.date}</td>
                <td className="p-3 text-gray-700">${payment.amount}</td>
                <td className="p-3 text-gray-700">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Pending
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenterOverview;