import React, { useState, useEffect } from 'react';
import { Home, Users, User, DollarSign, MapPin, Loader, Calendar, Clock, X, Check, AlertCircle, TrendingUp } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const HostOverview = () => {
  const [loading, setLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(1000);
  const [activeRentals, setActiveRentals] = useState(1);
  const [issuesRaised, setIssuesRaised] = useState(3);

  // Sample data for the income chart
  const incomeChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Income ($)',
        data: [2000, 3000, 2500, 4000, 3500, 5000, 4500],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const incomeChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income',
      },
    },
  };

  // Sample data for the issues chart
  const issuesChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Issues Raised',
        data: [2, 1, 3, 2, 4, 3, 5],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const issuesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Issues Raised',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Host Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <DollarSign className="w-8 h-8 text-green-500 mr-4" />
          <div>
            <p className="text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-gray-800">${totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <Home className="w-8 h-8 text-orange-500 mr-4" />
          <div>
            <p className="text-gray-600">Active Rentals</p>
            <p className="text-2xl font-bold text-gray-800">{activeRentals}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <AlertCircle className="w-8 h-8 text-red-500 mr-4" />
          <div>
            <p className="text-gray-600">Issues Raised</p>
            <p className="text-2xl font-bold text-gray-800">{issuesRaised}</p>
          </div>
        </div>
      </div>

      {/* Income Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <TrendingUp className="mr-2" /> Monthly Income
        </h2>
        <div className="h-64">
          <Bar data={incomeChartData} options={incomeChartOptions} />
        </div>
      </div>

      {/* Issues Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <AlertCircle className="mr-2" /> Monthly Issues Raised
        </h2>
        <div className="h-64">
          <Line data={issuesChartData} options={issuesChartOptions} />
        </div>
      </div>

      {/* Recent Issues Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Issues</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-gray-600">Date</th>
              <th className="p-3 text-left text-gray-600">Issue</th>
              <th className="p-3 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, date: '2023-10-01', issue: 'Leaky faucet', status: 'Pending' },
              { id: 2, date: '2023-10-05', issue: 'Broken heater', status: 'Resolved' },
              { id: 3, date: '2023-10-10', issue: 'Power outage', status: 'Pending' },
            ].map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 text-gray-700">{item.date}</td>
                <td className="p-3 text-gray-700">{item.issue}</td>
                <td className="p-3 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.status}
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

export default HostOverview;