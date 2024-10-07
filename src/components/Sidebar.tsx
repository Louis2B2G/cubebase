import React from 'react';
import { BarChart2, Users, MessageSquare, Calendar, Settings, Bot } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick }) => (
  <div 
    className={`flex items-center p-3 cursor-pointer ${
      isActive 
        ? 'bg-blue-100 text-blue-600' 
        : 'hover:bg-gray-100 rounded-lg'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <img src="/logo.png" alt="Logo" className="h-10 mx-auto mt-5" />
      <div className="p-4">
        {/* User info or other content can go here */}
      </div>
      <nav className="mt-6">
        <SidebarItem icon={<BarChart2 />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <SidebarItem icon={<Users />} label="Prospects" isActive={activeTab === 'prospects'} onClick={() => setActiveTab('prospects')} />
        <SidebarItem icon={<MessageSquare />} label="Conversations" isActive={activeTab === 'conversations'} onClick={() => setActiveTab('conversations')} />
        <SidebarItem icon={<Calendar />} label="Meetings" isActive={activeTab === 'meetings'} onClick={() => setActiveTab('meetings')} />
        <SidebarItem icon={<Bot />} label="Chat with June" isActive={activeTab === 'chatJune'} onClick={() => setActiveTab('chatJune')} />
        <SidebarItem icon={<Settings />} label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </nav>
    </div>
  );
};

export default Sidebar;