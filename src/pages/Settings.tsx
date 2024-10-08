import React, { useState } from 'react';
import { User, Mail, Bell, Shield, Link, Sliders, LogOut, ChevronDown, ChevronUp } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img src="/louis.jpeg" alt="Profile" className="w-20 h-20 rounded-full" />
              <div>
                <h3 className="text-xl font-semibold">Louis de Benoist</h3>
                <p className="text-gray-600">louis@trywave.co</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" defaultValue="Louis de Benoist" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" defaultValue="Co-Founder" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" defaultValue="Wave AI" />
              </div>
            </div>
            <button className="bg-[#fe5000] hover:bg-[#fe5000] text-white px-4 py-2 rounded-md">Save Changes</button>
          </div>
        );
      // Add other cases for notifications, security, and preferences
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-900">
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </nav>
        </div>
        <div className="w-3/4 bg-white rounded-lg shadow p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;