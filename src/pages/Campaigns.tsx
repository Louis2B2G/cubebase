import React, { useState, useRef, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Prospect } from '@/types/types';
import { generateCampaignProspects } from '@/types/mockData';
import ProspectList from '@/components/ProspectList';
import SearchBar from '@/components/SearchBar';

interface BubbleInputProps {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

const BubbleInput: React.FC<BubbleInputProps> = ({ items, onAdd, onRemove, placeholder }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="flex flex-wrap items-center gap-3 p-3 border rounded-md min-h-[38px] cursor-text focus-within:border-[#fe5000]"
      onClick={handleContainerClick}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center shadow text-black text-sm font-medium px-2 py-1 rounded-full">
          {item}
          <button onClick={() => onRemove(index)} className="ml-1 focus:outline-none">
            <X size={14} />
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={items.length === 0 ? placeholder : ''}
        className="flex-grow outline-none bg-transparent text-sm focus:outline-none"
      />
    </div>
  );
};

interface SupportingDocument {
  name: string;
  url: string;
}

interface CampaignData {
  targetCountries: string[];
  jobTitles: string[];
  sectors: string[];
  employeeCountMin: string;
  employeeCountMax: string;
  product: string;
  painPoints: string[];
  features: string[];
  meetingUrl: string;
  senderName: string;
  toneOfVoice: string;
  autopilot: boolean;
  revenueMin: string;
  revenueMax: string;
  technologies: string[];
  fundingStatus: string;
  companyAgeMin: string;
  companyAgeMax: string;
  keywords: string[];
  companyWebsite: string;
  supportingDocuments: SupportingDocument[];
  customSignature?: string;
}

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"persona" | "pitch" | "outreach">("persona");
  const [campaignData, setCampaignData] = useState<CampaignData>({
    targetCountries: ["France"],
    jobTitles: ["VP of sales", "head of sales", "head of growth marketing", "CEO", "chief revenue officer", "CRO", "growth marketing lead"],
    sectors: ["Tech"],
    employeeCountMin: "50",
    employeeCountMax: "500",
    product: "June, an AI SDR that automates the entire outbound sales process.",
    painPoints: [
      "High cost of SDR teams",
      "Inefficiency of traditional SDR teams",
      "Time-consuming lead research",
      "Need for specialized skills"
    ],
    features: [
      "Huge lead database (200M leads)",
      "Advanced research capabilities",
      "Personalized outreach",
      "Automated email sending",
      "AI powered automation"
    ],
    meetingUrl: "https://calendly.com/louis-cube/30min",
    senderName: "Louis",
    toneOfVoice: "Friendly and approachable",
    autopilot: true,
    revenueMin: "",
    revenueMax: "",
    technologies: [],
    fundingStatus: "",
    companyAgeMin: "",
    companyAgeMax: "",
    keywords: [],
    companyWebsite: "",
    supportingDocuments: [],
    customSignature: '',
  });
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    status: '',
    reachedOn: '',
    dateFrom: '',
    dateTo: '',
  });
  const [campaignProspects, setCampaignProspects] = useState<Prospect[]>([]);

  useEffect(() => {
    setCampaignProspects(generateCampaignProspects());
  }, []);

  const handleInputChange = (field: keyof CampaignData, value: string | boolean) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (field: keyof CampaignData, item: string) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), item]
    }));
  };

  const handleRemoveItem = (field: keyof CampaignData, index: number) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server here
      // and get back a URL. For this example, we'll create a fake URL.
      const fakeUrl = URL.createObjectURL(file);
      const newDocument: SupportingDocument = {
        name: file.name,
        url: fakeUrl,
      };
      setCampaignData(prev => ({
        ...prev,
        supportingDocuments: [...prev.supportingDocuments, newDocument],
      }));
    }
  };

  const removeDocument = (index: number) => {
    setCampaignData(prev => ({
      ...prev,
      supportingDocuments: prev.supportingDocuments.filter((_, i) => i !== index),
    }));
  };

  const renderPersonaTab = () => (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Target Countries</label>
            <BubbleInput
              items={campaignData.targetCountries}
              onAdd={(item) => handleAddItem('targetCountries', item)}
              onRemove={(index) => handleRemoveItem('targetCountries', index)}
              placeholder="Add target countries..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Job Titles</label>
            <BubbleInput
              items={campaignData.jobTitles}
              onAdd={(item) => handleAddItem('jobTitles', item)}
              onRemove={(index) => handleRemoveItem('jobTitles', index)}
              placeholder="Add job titles..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Sectors</label>
            <BubbleInput
              items={campaignData.sectors}
              onAdd={(item) => handleAddItem('sectors', item)}
              onRemove={(index) => handleRemoveItem('sectors', index)}
              placeholder="Add sectors..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Employee Count Range</label>
            <div className="flex items-center space-x-2">
              <input 
                type="number"
                value={campaignData.employeeCountMin} 
                onChange={(e) => handleInputChange('employeeCountMin', e.target.value)}
                placeholder="Min"
                className="w-24 p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
              />
              <span>to</span>
              <input 
                type="number"
                value={campaignData.employeeCountMax} 
                onChange={(e) => handleInputChange('employeeCountMax', e.target.value)}
                placeholder="Max"
                className="w-24 p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Company Revenue Range</label>
            <div className="flex items-center space-x-2">
              <input 
                type="number"
                value={campaignData.revenueMin} 
                onChange={(e) => handleInputChange('revenueMin', e.target.value)}
                placeholder="Min"
                className="w-24 p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
              />
              <span>to</span>
              <input 
                type="number"
                value={campaignData.revenueMax} 
                onChange={(e) => handleInputChange('revenueMax', e.target.value)}
                placeholder="Max"
                className="w-24 p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Technologies Used</label>
            <BubbleInput
              items={campaignData.technologies}
              onAdd={(item) => handleAddItem('technologies', item)}
              onRemove={(index) => handleRemoveItem('technologies', index)}
              placeholder="Add technologies..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Funding Status</label>
            <select
              value={campaignData.fundingStatus}
              onChange={(e) => handleInputChange('fundingStatus', e.target.value)}
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
            >
              <option value="">Any</option>
              <option value="seed">Seed</option>
              <option value="seriesA">Series A</option>
              <option value="seriesB">Series B</option>
              <option value="seriesC">Series C+</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Company Age</label>
            <div className="flex items-center space-x-2">
              <input 
                type="number"
                value={campaignData.companyAgeMin} 
                onChange={(e) => handleInputChange('companyAgeMin', e.target.value)}
                placeholder="Min"
                className="w-24 p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
              />
              <span>to</span>
              <input 
                type="number"
                value={campaignData.companyAgeMax} 
                onChange={(e) => handleInputChange('companyAgeMax', e.target.value)}
                placeholder="Max"
                className="w-24 p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Keywords</label>
            <BubbleInput
              items={campaignData.keywords}
              onAdd={(item) => handleAddItem('keywords', item)}
              onRemove={(index) => handleRemoveItem('keywords', index)}
              placeholder="Add keywords..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPitchTab = () => (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Company Website</label>
            <input 
              type="url"
              value={campaignData.companyWebsite} 
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              placeholder="https://www.example.com"
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product Description</label>
            <input 
              type="text"
              value={campaignData.product} 
              onChange={(e) => handleInputChange('product', e.target.value)}
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Pain Points</label>
            <BubbleInput
              items={campaignData.painPoints}
              onAdd={(item) => handleAddItem('painPoints', item)}
              onRemove={(index) => handleRemoveItem('painPoints', index)}
              placeholder="Add pain points..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Key Features</label>
            <BubbleInput
              items={campaignData.features}
              onAdd={(item) => handleAddItem('features', item)}
              onRemove={(index) => handleRemoveItem('features', index)}
              placeholder="Add key features..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Supporting Documents</label>
            <div className="border rounded-md p-4 space-y-2">
              {campaignData.supportingDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {doc.name}
                  </a>
                  <button onClick={() => removeDocument(index)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="mt-2">
                <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#fe5000]">
                  <Upload size={16} className="mr-2 text-[#fe5000]" />
                  Upload Document
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOutreachTab = () => (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Meeting Booking URL</label>
            <input 
              type="text"
              value={campaignData.meetingUrl} 
              onChange={(e) => handleInputChange('meetingUrl', e.target.value)}
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Sender Name</label>
            <input 
              type="text"
              value={campaignData.senderName} 
              onChange={(e) => handleInputChange('senderName', e.target.value)}
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Tone of Voice</label>
            <input 
              type="text"
              value={campaignData.toneOfVoice} 
              onChange={(e) => handleInputChange('toneOfVoice', e.target.value)}
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Custom Signature (Optional)</label>
            <textarea
              value={campaignData.customSignature || ''}
              onChange={(e) => handleInputChange('customSignature', e.target.value)}
              placeholder="Enter your custom signature here..."
              className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none min-h-[100px] resize-y"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={campaignData.autopilot} 
              onChange={(e) => handleInputChange('autopilot', e.target.checked)}
              id="autopilot"
              className="w-4 h-4 appearance-none border border-gray-300 rounded bg-white checked:bg-[#fe5000] checked:border-[#fe5000] focus:outline-none focus:ring-2 focus:ring-[#fe5000] focus:ring-offset-2"
            />
            <label htmlFor="autopilot" className="text-sm font-medium">Enable Autopilot</label>
          </div>
        </div>
      </div>
    </div>
  );

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
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto pt-10 flex space-x-8 p-10">
          <div className="w-1/2 flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4">Campaign Settings</h1>
            <div className="mb-4 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>
              <div className="flex justify-between relative z-10">
                <button 
                  onClick={() => setActiveTab("persona")} 
                  className={`px-4 py-2 rounded-xl border ${
                    activeTab === "persona"
                      ? "bg-[#fff4e4] text-[#fe5000] border-[#fe5000]"
                      : "bg-white text-gray-400 border-gray-300"
                  }`}
                >
                  1. Ideal Customer Profile
                </button>
                <button 
                  onClick={() => setActiveTab("pitch")} 
                  className={`px-4 py-2 rounded-xl border ${
                    activeTab === "pitch"
                      ? "bg-[#fff4e4] text-[#fe5000] border-[#fe5000]"
                      : "bg-white text-gray-400 border-gray-300"
                  }`}
                >
                  2. Your Pitch
                </button>
                <button 
                  onClick={() => setActiveTab("outreach")} 
                  className={`px-4 py-2 rounded-xl border ${
                    activeTab === "outreach"
                      ? "bg-[#fff4e4] text-[#fe5000] border-[#fe5000]"
                      : "bg-white text-gray-400 border-gray-300"
                  }`}
                >
                  3. Outreach Settings
                </button>
              </div>
            </div>
            <div className="flex-grow overflow-auto">
              {activeTab === "persona" && renderPersonaTab()}
              {activeTab === "pitch" && renderPitchTab()}
              {activeTab === "outreach" && renderOutreachTab()}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-[#fe5000] text-white p-3 rounded-lg">Apply Changes</button>
            </div>
          </div>
          <div className="w-1/2 pl-10 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4">
              Found {campaignProspects.length} leads
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
              <p className="text-sm text-blue-800">
                Please review the following sample leads to ensure they align with your Ideal Customer Profile. 
                June will use similar profiles for outreach in this campaign.
              </p>
            </div>
            <div className="flex-grow overflow-auto">
              <ProspectList 
                prospects={campaignProspects} 
                setSelectedProspect={setSelectedProspect}
                selectedProspect={selectedProspect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;