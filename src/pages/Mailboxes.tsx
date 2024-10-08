import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, AlertCircle, CheckCircle, PlusCircle, Info, Zap, Trash2 } from 'lucide-react';

interface EmailAccount {
  email: string;
  inboxHealth: number;
  dailySendLimit: number;
  sentToday: number;
  provider: string;
  totalEmailsSent: number;
  isWarmingUp: boolean;
  warmupProgress?: number;
}

const Mailboxes: React.FC = () => {
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const emailAccounts: EmailAccount[] = [
    { email: 'louis@trywave.co', inboxHealth: 98, dailySendLimit: 200, sentToday: 75, provider: 'Gmail', totalEmailsSent: 1234, isWarmingUp: false },
    { email: 'louis@hirejune.com', inboxHealth: 85, dailySendLimit: 150, sentToday: 120, provider: 'Gmail', totalEmailsSent: 5678, isWarmingUp: false },
    { email: 'louis.db@trywave.co', inboxHealth: 92, dailySendLimit: 180, sentToday: 50, provider: 'Gmail', totalEmailsSent: 3456, isWarmingUp: false },
    { email: 'new@trywave.co', inboxHealth: 60, dailySendLimit: 50, sentToday: 10, provider: 'Gmail', totalEmailsSent: 100, isWarmingUp: true, warmupProgress: 40 },
  ];

  const getHealthColor = (health: number) => {
    if (health > 90) return 'bg-green-500';
    if (health > 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getHealthIcon = (health: number) => {
    if (health > 90) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (health > 80) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mailboxes</h2>
        <button 
          className="flex items-center space-x-2 text-[#fe5000] hover:text-[#e64600] text-sm"
          onClick={() => setShowInfoModal(true)}
        >
          <Info className="w-4 h-4" />
          <span>Why is this important?</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {emailAccounts.map((account, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#fe5000]" />
                  <h4 className="font-semibold text-sm">{account.email}</h4>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-600 mb-2">{account.provider}</p>
              <div className="flex items-center space-x-2 mb-2">
                {getHealthIcon(account.inboxHealth)}
                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getHealthColor(account.inboxHealth)}`} 
                    style={{width: `${account.inboxHealth}%`}}
                  ></div>
                </div>
                <span className="text-xs font-medium">{account.inboxHealth}%</span>
              </div>
              {account.isWarmingUp && (
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center mb-2">
                  <Zap className="w-3 h-3 mr-1" /> Warming Up: {account.warmupProgress}%
                </div>
              )}
              <div className="text-xs text-gray-600 mb-2">
                Sent today: {account.sentToday} / {account.dailySendLimit}
              </div>
              <div className="text-xs text-gray-600">
                Total sent: {account.totalEmailsSent.toLocaleString()}
              </div>
            </div>
            
          </div>
        ))}
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center justify-center p-8">
          <button className="flex items-center space-x-2 text-[#fe5000] hover:text-[#e64600] transition duration-150 ease-in-out">
            <PlusCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Add New Mailbox</span>
          </button>
        </div>
      </div>

      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Why Mailbox Health Matters</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowInfoModal(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Mailbox health is crucial for successful automated prospecting. It affects your email deliverability, 
              which determines whether your messages reach your prospects' inboxes or get flagged as spam.
            </p>
            <h4 className="font-bold mb-2 text-sm text-gray-900">Key Factors:</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fe5000] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  <strong className="text-gray-900">Inbox Health:</strong> Higher health means better deliverability.
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fe5000] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  <strong className="text-gray-900">Daily Send Limits:</strong> Prevents account flagging for suspicious activity.
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fe5000] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  <strong className="text-gray-900">Warmup Process:</strong> Gradually increases email volume to establish a good reputation.
                </span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mb-6">
              June manages these factors to maintain your mailboxes' health and effectiveness, ensuring campaign success without risking your email reputation.
            </p>
            <button 
              className="w-full bg-[#fe5000] hover:bg-[#e64600] text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-150 ease-in-out"
              onClick={() => setShowInfoModal(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mailboxes;