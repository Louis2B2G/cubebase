import React, { useState } from 'react';
import { User, Mail, Bell, Shield, Link, Sliders, LogOut, ChevronDown, ChevronUp } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'email', label: 'Email Management', icon: Mail },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
  ];

  const emailAccounts = [
    { email: 'louis@trywave.co', inboxHealth: 98, dailySendLimit: 200, sentToday: 75 },
    { email: 'louis@hirejune.com', inboxHealth: 85, dailySendLimit: 150, sentToday: 120 },
    { email: 'louis.db@trywave.co', inboxHealth: 92, dailySendLimit: 180, sentToday: 50 },
  ];

  const connectedAccounts = [
    { 
      id: 'gmail',
      name: 'Gmail',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        </svg>
      ),
      connectedAddresses: 3,
      status: 'connected',
      details: [
        { label: 'Primary Email', value: 'louis@trywave.co' },
        { label: 'Last Synced', value: '2 hours ago' },
        { label: 'Total Emails Sent', value: '1,234' },
      ]
    },
    { 
      id: 'slack',
      name: 'Slack',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      ),
      status: 'disconnected',
      details: []
    },
    { 
      id: 'linkedin',
      name: 'LinkedIn',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      status: 'connected',
      details: [
        { label: 'Name', value: 'Louis de Benoist' },
        { label: 'Profile', value: 'https://www.linkedin.com/in/louisdebenoist' },
      ]
    },
    { 
      id: 'google-calendar',
      name: 'Google Calendar',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
          <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V7.5h15v12zM6 9h12v2H6V9zm0 3h12v2H6v-2zm0 3h6v2H6v-2z"/>
        </svg>
      ),
      status: 'connected',
      details: [
        { label: 'Primary Calendar', value: 'louis@trywave.co' },
        { label: 'Last Synced', value: '30 minutes ago' },
        { label: 'Events Synced', value: '42' },
      ]
    },
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Save Changes</button>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Connected Accounts</h3>
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedAccount(expandedAccount === account.id ? null : account.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-blue-600">{account.icon}</div>
                      <div>
                        <h4 className="font-semibold">{account.name}</h4>
                        {account.connectedAddresses && (
                          <p className="text-sm text-gray-600">{account.connectedAddresses} addresses connected</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        account.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {account.status === 'connected' ? 'Connected' : 'Disconnected'}
                      </span>
                      <button 
                        className={`text-sm font-medium ${
                          account.status === 'connected' ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        {account.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </button>
                      {account.details.length > 0 && (
                        expandedAccount === account.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                      )}
                    </div>
                  </div>
                  {expandedAccount === account.id && account.details.length > 0 && (
                    <div className="px-4 pb-4 space-y-2">
                      {account.details.map((detail, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{detail.label}:</span>
                          <span className="font-medium">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Email Accounts</h3>
            <div className="space-y-4">
              {emailAccounts.map((account, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-lg">{account.email}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      account.inboxHealth > 90 ? 'bg-green-100 text-green-800' :
                      account.inboxHealth > 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Inbox Health: {account.inboxHealth}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Daily Send Limit:</span>
                      <span className="ml-2">{account.dailySendLimit}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Sent Today:</span>
                      <span className="ml-2">{account.sentToday}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Remaining:</span>
                      <span className="ml-2">{account.dailySendLimit - account.sentToday}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out">
              Add New Email Account
            </button>
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