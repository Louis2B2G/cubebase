import React from 'react';
import { Prospect } from '@/types/types';
import ProspectDetails from '@/components/ProspectDetails';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface ProspectListProps {
  prospects: Prospect[];
  setSelectedProspect: (prospect: Prospect | null) => void;
  selectedProspect: Prospect | null;
}

const ProspectList: React.FC<ProspectListProps> = ({ 
  prospects, 
  setSelectedProspect, 
  selectedProspect
}) => {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-6">
        <ul className="space-y-4">
          {prospects.map((prospect) => (
            <li key={prospect.id}>
              <div
                className="py-4 px-6 cursor-pointer hover:bg-gray-100 transition-colors duration-150 bg-white rounded-lg shadow"
                onClick={() => setSelectedProspect(selectedProspect?.id === prospect.id ? null : prospect)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src={prospect.avatar} alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium text-gray-900 truncate">
                        {prospect.name}
                      </p>
                      {prospect.status && (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          prospect.status === 'hot' ? 'bg-red-100 text-red-800' :
                          prospect.status === 'warm' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {prospect.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{prospect.title} at {prospect.company}</p>
                    {(prospect.reachedOn || prospect.messagesSent || prospect.lastMessageSentAt) && (
                      <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                        {prospect.reachedOn && (
                          <span className="flex items-center">
                            Reached on
                            {prospect.reachedOn === 'linkedin' ? (
                              <FaLinkedin className="h-4 w-4 ml-1 mr-1" />
                            ) : (
                              <MdEmail className="h-4 w-4 ml-1 mr-1" />
                            )}
                          </span>
                        )}
                        {prospect.messagesSent !== undefined && (
                          <span>Messages: {prospect.messagesSent}</span>
                        )}
                        {prospect.lastMessageSentAt && (
                          <span>Last message: {new Date(prospect.lastMessageSentAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {selectedProspect?.id === prospect.id && (
                <div className="mt-4">
                  <ProspectDetails prospect={selectedProspect} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProspectList;