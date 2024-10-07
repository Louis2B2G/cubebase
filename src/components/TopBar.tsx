import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Search className="text-gray-400 mr-2" />
        <input type="text" placeholder="Search..." className="bg-gray-100 px-4 py-2 rounded-lg" />
      </div>
      <div className="flex items-center">
        <Bell className="mr-4 text-gray-600 cursor-pointer" />
        <div className="flex items-center cursor-pointer">
          <img src="/louis.jpeg" alt="User avatar" className="w-8 h-8 rounded-full mr-2" />
          <span className="mr-2">Louis</span>
          <ChevronDown className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;