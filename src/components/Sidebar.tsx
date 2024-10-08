import React from 'react';
import { BarChart2, Users, MessageSquare, Calendar, Settings, Bot, Link, Inbox, Send, Clock, Mail, ChevronDown } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfilePic: string;
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
        ? 'bg-[#fcf9f8] text-[#fe5000]' 
        : 'hover:bg-[#fcf9f8] rounded-lg'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userProfilePic }) => {
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-screen">
      <div className="p-4 flex items-center justify-between">
        <img src="/wave_logo.png" alt="Logo" className="h-7" />
        <div className="flex items-center">
          <img src={userProfilePic} alt="User" className="h-10 w-10 rounded-full ml-2 mr-2" />
          <ChevronDown size={16} />
        </div>
      </div>
      <nav className="flex-grow overflow-y-auto">
        <SidebarItem icon={<BarChart2 />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <SidebarItem icon={<Bot />} label="Chat with June" isActive={activeTab === 'chatJune'} onClick={() => setActiveTab('chatJune')} />
        <SidebarItem icon={<Link />} label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
        <SidebarItem icon={<Users />} label="Leads" isActive={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
        
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase mt-6">Outbound</div>
        
        <SidebarItem icon={<Inbox />} label="Inbox" isActive={activeTab === 'conversations'} onClick={() => setActiveTab('conversations')} />
        <SidebarItem icon={<Send />} label="Campaigns" isActive={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
        <SidebarItem icon={<Clock />} label="Pending Approval" isActive={activeTab === 'pendingApproval'} onClick={() => setActiveTab('pendingApproval')} />
        <SidebarItem icon={<Mail />} label="Mailboxes" isActive={activeTab === 'mailboxes'} onClick={() => setActiveTab('mailboxes')} />
      </nav>
      <div className="p-4">
        <SidebarItem icon={<Settings />} label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </div>
  );
};

export default Sidebar;