import React from 'react';
import { Prospect } from '@/types/types';
import LinkedInPosts from '@/components/LinkedInPosts';
import CompanyNews from '@/components/CompanyNews';
import { Mail, Phone } from 'lucide-react';

interface ProspectDetailsProps {
  prospect: Prospect;
}

const ProspectDetails: React.FC<ProspectDetailsProps> = ({ prospect }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full overflow-y-auto text-xs">
      <div className="flex items-center mb-4">
        <img src={prospect.avatar} alt={prospect.name} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h2 className="text-base font-bold">{prospect.name}</h2>
          <p className="text-gray-600 text-xs">{prospect.title} at {prospect.company}</p>
          <p className="text-gray-500 text-xs">{prospect.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
          <div className="flex items-center">
            <Mail className="w-3 h-3 text-gray-600 mr-1.5" />
            <a href={`mailto:${prospect.email}`} className="text-blue-600 hover:underline text-xs">{prospect.email}</a>
          </div>
          <div className="flex items-center">
            <Phone className="w-3 h-3 text-gray-600 mr-1.5" />
            <a href={`tel:${prospect.phone}`} className="text-xs">{prospect.phone}</a>
          </div>
          <div className="flex items-center">
            <svg className="h-3 w-3 text-gray-600 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <a href={prospect.linkedIn} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-1.5">{prospect.company}</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
            <div className="flex items-center">
              <span className="text-gray-600 w-20 text-xs">Industry:</span>
              <span className="text-xs">{prospect.industry}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-20 text-xs">Size:</span>
              <span className="text-xs">{prospect.companySize}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-20 text-xs">Revenue:</span>
              <span className="text-xs">{prospect.revenue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col h-56">
          <h3 className="text-sm font-semibold mb-1.5">Recent LinkedIn Posts</h3>
          <div className="bg-gray-50 rounded-lg p-3 flex-grow overflow-y-auto">
            <LinkedInPosts posts={prospect.linkedInPosts} />
          </div>
        </div>
        <div className="flex flex-col h-56">
          <h3 className="text-sm font-semibold mb-1.5">Company News</h3>
          <div className="bg-gray-50 rounded-lg p-3 flex-grow overflow-y-auto">
            <CompanyNews news={prospect.companyNews} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1.5">Notes</h3>
        <p className="bg-gray-50 rounded-lg p-3 text-xs">{prospect.notes}</p>
      </div>
    </div>
  );
};

export default ProspectDetails;