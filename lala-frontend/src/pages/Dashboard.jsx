import React, { useState, useEffect } from 'react';
import { Menu, X, Book, Settings, LogOut, Home,Search,BookOpen,Plus,CheckCircle,LayoutGrid,User,ClipboardList} from 'lucide-react';
import BookHouse from '../components/dash/BookHouse';
import ManageHouse from '../components/dash/ManageHouse';
import BookedHouse from '../components/dash/BookedHouse';
import { AvailableHouse } from '../components/dash/AvalibaleHouse';
import NewHouse from '../components/dash/NewHouse';
import HouseCustomers from '../components/dash/HouseCustomers';
import HostSettings from '../components/dash/HostSettings';
import HostOverview from '../components/dash/HostOverview';
import RenterOverview from '../components/dash/RenterOverview';
import RenterSettings from '../components/dash/RenterSettings';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedData);
    // Set default active view based on role
    if (storedData?.data?.UserInfo?.role === 'renter') {
      setActiveView('renter-overview');
    } else {
      setActiveView('host-overview');
    }
  }, []);

  const isRenter = userData?.data?.UserInfo?.role === 'renter';

  const navigation = isRenter
      ? [
        // Renter-specific menu items
        { name: 'Overview', icon: Home, id: 'renter-overview' },
        { name: 'Available Houses', icon: Search, id: 'available-houses' },
        { name: 'Booked Houses', icon: BookOpen, id: 'booked-houses' },
        { name: 'Settings', icon: Settings, id: 'renter-settings' },
      ]
    : [
        // Host-specific menu items
        { name: 'Overview', icon: Home, id: 'host-overview' },
        { name: 'Manage Houses', icon: LayoutGrid, id: 'manage-houses' },
        { name: 'New House', icon: Plus, id: 'new-house' },
        { name: 'Approve House', icon: CheckCircle, id: 'approve-house' },
        { name: 'Settings', icon: Settings, id: 'host-settings' },
      ];
      //logout remove userData localStorage
      const logout = () => {
        localStorage.removeItem('userData');
        // setUserData(null);
        window.location.href = '/login';
      }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile header */}
      <div className="lg:hidden bg-white p-4 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="font-semibold">Dashboard</div>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img 
            src={userData?.data?.UserInfo?.profile || '/api/placeholder/32/32'} 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[300px] bg-white transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:w-[300px] shadow-lg
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* User Profile Section */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={userData?.data?.UserInfo?.profile || '/api/placeholder/40/40'} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">{userData?.data?.UserInfo?.full_name}</div>
                <div className="text-sm text-gray-500 capitalize">{userData?.data?.UserInfo?.role}</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
                  ${activeView === item.id 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t space-y-1">
            <button onClick={()=> logout()} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" w-full">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Content based on active view */}
            {activeView === 'available-houses' && (
              <AvailableHouse/>
            )}
            {activeView === 'book-house' && (
              <BookHouse/>
            )}
            {activeView === 'booked-houses' && (
            <BookedHouse/>
            )}
            {activeView === 'manage-houses' && (
            <ManageHouse/>
             
            )}
            {activeView === 'new-house' && (
             <NewHouse/>
            )}
            {activeView === 'customer' && (
              <HouseCustomers/>
            )}
            {activeView === 'renter-settings' && (
              <RenterSettings/>
            )}
            {activeView === 'renter-overview' && (
              <RenterOverview/>
            )}
            {activeView === 'host-overview' && (
              <HostOverview/>
            )}
            {activeView === 'host-settings' && (
              <HostSettings/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;