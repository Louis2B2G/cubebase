import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


const Integrations: React.FC = () => {
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);

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
      accounts: [
        { email: 'louis@trywave.co' },
        { email: 'louis@hirejune.com' },
        { email: 'louis.db@trywave.co' },
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
      accounts: [
        { email: 'https://www.linkedin.com/in/louisdebenoist' },
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
      accounts: [
        { email: 'louis@trywave.co' },
      ]
    },
    { 
      id: 'hubspot',
      name: 'HubSpot',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
          <path d="M22.5 9.5h-1.862v-2.25c0-4.306-3.582-7.5-7.888-7.5-4.306 0-7.888 3.194-7.888 7.5v2.25H1.5a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h21a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5zm-15.638-2.25c0-3.206 2.632-5.5 5.888-5.5s5.888 2.294 5.888 5.5v2.25H6.862v-2.25zm15.638 15.75H1.5v-12h21v12z"/>
        </svg>
      ),
      status: 'disconnected',
      details: []
    },
  ];

  const connectedIntegrations = connectedAccounts.filter(account => account.status === 'connected');
  const disconnectedIntegrations = connectedAccounts.filter(account => account.status === 'disconnected');

  const renderIntegrationGroup = (integrations: typeof connectedAccounts, isConnected: boolean) => (
    <div className="space-y-4">
      {integrations.map((account) => (
        <div key={account.id} className="bg-white rounded-lg shadow">
          <div 
            className="p-4 flex items-center cursor-pointer"
            onClick={() => isConnected && setExpandedAccount(expandedAccount === account.id ? null : account.id)}
          >
            <div className="flex items-center space-x-4 flex-grow">
              <div className="text-blue-600">{account.icon}</div>
              <div>
                <h4 className="font-semibold">{account.name}</h4>
                {account.connectedAddresses && (
                  <p className="text-sm text-gray-600">{account.connectedAddresses} addresses connected</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {isConnected ? (
                <>
                  <span className="px-2 py-1 rounded-full text-xs font-medium w-24 text-center bg-green-100 text-green-800">
                    Connected
                  </span>
                  {account.accounts && account.accounts.length > 0 && (
                    <div className="w-8 flex justify-center">
                      {expandedAccount === account.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  )}
                </>
              ) : (
                <button className="px-4 py-2 bg-[#fff4e4] hover:bg-[#fff4e4] text-[#fe5000] text-sm font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
                  Link your account
                </button>
              )}
            </div>
          </div>
          {expandedAccount === account.id && account.accounts && account.status === 'connected' && (
            <div className="p-4 bg-whiterounded-b-lg">
              <div className="space-y-2">
                {account.accounts.map((connectedAccount, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-xl shadow">
                    <span className="text-sm font-medium">{connectedAccount.email}</span>
                    <button 
                      className="text-xs font-medium text-red-600 hover:text-red-800"
                    >
                      Disconnect
                    </button>
                  </div>
                ))}
              </div>
              {account.id === 'gmail' && (
                <button className="w-full mt-4 bg-[#fff4e4] hover:bg-[#ffe8cc] text-[#fe5000] text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Add New Email Account
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Integrations</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Connected Integrations</h3>
          {renderIntegrationGroup(connectedIntegrations, true)}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Integrations</h3>
          {renderIntegrationGroup(disconnectedIntegrations, false)}
        </div>
      </div>
    </div>
  );
};

export default Integrations;