import React, { useState, useEffect } from 'react';
import { Prospect } from '@/types/types';
import { generateProspects } from '@/types/mockData';
import ProspectList from '@/components/ProspectList';
import SearchBar from '@/components/SearchBar';

const Prospects: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    status: '',
    reachedOn: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    setProspects(generateProspects());
  }, []);

  const handleUploadCSV = (file: File) => {
    // Implement CSV upload logic here
    console.log('Uploading file:', file.name);
  };

  const filteredProspects = prospects.filter(prospect =>
    (prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     prospect.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filters.status || prospect.status === filters.status) &&
    (!filters.reachedOn || prospect.reachedOn === filters.reachedOn) &&
    (!filters.dateFrom || (prospect.lastMessageSentAt && new Date(prospect.lastMessageSentAt) >= new Date(filters.dateFrom))) &&
    (!filters.dateTo || (prospect.lastMessageSentAt && new Date(prospect.lastMessageSentAt) <= new Date(filters.dateTo)))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Leads</h1>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        onUploadCSV={handleUploadCSV}
      />
      <div className="mt-4">
        <ProspectList 
          prospects={filteredProspects} 
          setSelectedProspect={setSelectedProspect}
          selectedProspect={selectedProspect}
        />
      </div>
    </div>
  );
};

export default Prospects;