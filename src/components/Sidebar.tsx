import React, { useState } from 'react';
import { BarChart2, Users, Sparkles, Calendar, Settings, Bot, Link, Inbox, Send, Clock, Mail, ChevronDown, Rocket, FileX } from 'lucide-react';

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

interface SidebarItemWithSubmenuProps extends SidebarItemProps {
  submenuItems?: { icon: React.ReactNode; label: string; onClick: () => void }[];
}

const SidebarItem: React.FC<SidebarItemWithSubmenuProps> = ({ icon, label, isActive, onClick, submenuItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMainItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Clicked on main item: ${label}`);
    onClick();
  };

  const handleSubmenuItemClick = (e: React.MouseEvent, itemLabel: string, itemOnClick: () => void) => {
    e.stopPropagation();
    console.log(`Clicked on submenu item: ${itemLabel}`);
    itemOnClick();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`flex items-center p-2 cursor-pointer text-sm ${
          isActive 
            ? 'bg-[#fcf9f8] text-[#fe5000] rounded-3xl mr-4' 
            : 'hover:bg-[#fcf9f8] rounded-3xl mr-4'
        }`}
        onClick={handleMainItemClick}
      >
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        <span className="ml-2">{label}</span>
      </div>
      {submenuItems && isHovered && (
        <div 
          className="fixed bg-white shadow-lg rounded-md py-2 z-50"
          style={{
            left: '240px', // Adjust this value as needed
            top: 'auto',
            marginTop: '-30px' // Adjust this value to align with the main item
          }}
        >
          <div
            className="flex items-center p-2 cursor-pointer text-sm hover:bg-[#fcf9f8] text-[#fe5000]"
            onClick={(e) => handleSubmenuItemClick(e, label, onClick)}
          >
            {React.cloneElement(icon as React.ReactElement, { size: 18 })}
            <span className="ml-2">{label}</span>
          </div>
          {submenuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-2 cursor-pointer text-sm hover:bg-[#fcf9f8] text-[#fe5000]"
              onClick={(e) => handleSubmenuItemClick(e, item.label, item.onClick)}
            >
              {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
              <span className="ml-2">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userProfilePic }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLeadsClick = () => {
    console.log('Setting active tab to leads');
    setActiveTab('leads');
  };

  const handleSuppressionListClick = () => {
    console.log('Setting active tab to suppressionList');
    setActiveTab('suppressionList');
  };

  return (
    <div className="w-60 bg-white shadow-lg flex flex-col h-screen">
      <div className="pl-10 pr-10 p-4  flex items-center justify-between">
        <img src="/june_new.png" alt="Logo" className="h-10" />
      </div>
      <nav className="flex-grow overflow-y-auto ml-2">
        <SidebarItem icon={<BarChart2 />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <SidebarItem icon={<Sparkles />} label="Chat with June" isActive={activeTab === 'chatJune'} onClick={() => setActiveTab('chatJune')} />
        <SidebarItem icon={<Link />} label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
        <SidebarItem
          icon={<Users />}
          label="Leads"
          isActive={activeTab === 'leads' || activeTab === 'suppressionList'}
          onClick={handleLeadsClick}
          submenuItems={[
            {
              icon: <FileX />,
              label: "Suppression List",
              onClick: handleSuppressionListClick
            }
          ]}
        />
        
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