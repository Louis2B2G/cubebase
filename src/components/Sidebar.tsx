import React, { useState } from 'react';
import { BarChart2, Users, Sparkles, Calendar, Settings, Bot, Link, Inbox, Send, Clock, Mail, ChevronDown, Rocket } from 'lucide-react';

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
      className={`flex items-center p-2 cursor-pointer text-sm ${
        isActive 
          ? 'bg-[#fcf9f8] text-[#fe5000] rounded-3xl mr-4' 
          : 'hover:bg-[#fcf9f8] rounded-3xl mr-4'
      }`}
      onClick={onClick}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      <span className="ml-2">{label}</span>
    </div>
  );
  
  const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userProfilePic }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
      <div className="w-60 bg-white shadow-lg flex flex-col h-screen">
        <div className="pl-10 pr-10 pt-4 pb-4 flex items-center justify-between">
          <img src="/june_new.png" alt="Logo" className="h-14" />
        </div>
        <nav className="flex-grow overflow-y-auto ml-2">
          <SidebarItem icon={<BarChart2 />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<Sparkles />} label="Chat with June" isActive={activeTab === 'chatJune'} onClick={() => setActiveTab('chatJune')} />
          <SidebarItem icon={<Link />} label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
          <SidebarItem icon={<Users />} label="Leads" isActive={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">Outbound</div>
          
          <SidebarItem icon={<Inbox />} label="Inbox" isActive={activeTab === 'conversations'} onClick={() => setActiveTab('conversations')} />
          <SidebarItem icon={<Rocket />} label="Campaign Setup" isActive={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
          <SidebarItem icon={<Clock />} label="Pending Approval" isActive={activeTab === 'pendingApproval'} onClick={() => setActiveTab('pendingApproval')} />
          <SidebarItem icon={<Mail />} label="Mailboxes" isActive={activeTab === 'mailboxes'} onClick={() => setActiveTab('mailboxes')} />
          <SidebarItem icon={<Calendar />} label="Calendar" isActive={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
        </nav>
        <div className="p-3">
          <SidebarItem icon={<Settings />} label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </div>
    );
  };

export default Sidebar;