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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <img src={prospect.avatar} alt={prospect.name} className="w-24 h-24 rounded-full mr-6" />
        <div>
          <h2 className="text-2xl font-bold">{prospect.name}</h2>
          <p className="text-lg text-gray-600">{prospect.title} at {prospect.company}</p>
          <p className="text-gray-500">{prospect.location}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-gray-600 mr-4" />
              <a href={`mailto:${prospect.email}`} className="font-medium text-blue-600 hover:underline">{prospect.email}</a>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-gray-600 mr-4" />
              <a href={`tel:${prospect.phone}`} className="font-medium">{prospect.phone}</a>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 text-gray-600 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a href={prospect.linkedIn} className="font-medium text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <div className="flex items-center">
              <span className="text-gray-600 w-32">Industry:</span>
              <span className="font-medium">{prospect.industry}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-32">Company Size:</span>
              <span className="font-medium">{prospect.companySize}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-32">Revenue:</span>
              <span className="font-medium">{prospect.revenue}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="flex flex-col h-[400px]">
          <h3 className="text-lg font-semibold mb-2">Recent LinkedIn Posts</h3>
          <div className="bg-gray-50 rounded-md p-4 flex-grow overflow-y-auto">
            <LinkedInPosts posts={prospect.linkedInPosts} />
          </div>
        </div>
        <div className="flex flex-col h-[400px]">
          <h3 className="text-lg font-semibold mb-2">Company News</h3>
          <div className="bg-gray-50 rounded-md p-4 flex-grow overflow-y-auto">
            <CompanyNews news={prospect.companyNews} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p>{prospect.notes}</p>
      </div>
    </div>
  );
};

export default ProspectDetails;