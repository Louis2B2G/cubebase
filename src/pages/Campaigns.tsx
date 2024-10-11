import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { Prospect } from '@/types/types';
import { generateCampaignProspects } from '@/types/mockData';
import ProspectList from '@/components/ProspectList';
import SearchBar from '@/components/SearchBar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

type BuildingBlockType = 
  | 'add_on_linkedin'
  | 'send_linkedin_message'
  | 'linkedin_invite_accepted'
  | 'send_personalized_observation_email'
  | 'send_personalized_sales_email';

interface BuildingBlock {
  id: string;
  type: BuildingBlockType;
  label: string;
}

interface Playbook {
  id: string;
  droppableId: string;  // Add this line
  name: string;
  steps: BuildingBlock[];
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
  customSignature: string;
  campaignName: string;
  industries: string[];
  exclusions: string[];
  currentCustomers: string[];
  idealCustomerWebsites: string[];
  hiringIntent: boolean;
  jobPostings: string[];
  latestJobPostingPeriod: string;
  monthlyEmployeeGrowth: string;
  latestFundingRound: string;
  latestFundingDate: string;
  newsKeywords: string[];
  earliestNewsDate: string;
  playbooks: Playbook[];
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
    companyWebsite: "www.hirejune.com",
    supportingDocuments: [],
    customSignature: '',
    campaignName: '',
    industries: [],
    exclusions: [],
    currentCustomers: [],
    idealCustomerWebsites: [],
    hiringIntent: false,
    jobPostings: [],
    latestJobPostingPeriod: '',
    monthlyEmployeeGrowth: '',
    latestFundingRound: '',
    latestFundingDate: '',
    newsKeywords: [],
    earliestNewsDate: '',
    playbooks: [],
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
    setCampaignData(prev => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [field]: [...currentValue, item]
        };
      } else {
        // If the field is not an array, initialize it as an array with the new item
        return {
          ...prev,
          [field]: [item]
        };
      }
    });
  };

  function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
  }

  const handleRemoveItem = (field: keyof CampaignData, index: number) => {
    setCampaignData(prev => {
      const currentValue = prev[field];
      if (isStringArray(currentValue)) {
        return {
          ...prev,
          [field]: currentValue.filter((_, i) => i !== index)
        };
      } else {
        // If the field is not a string array, return the previous state unchanged
        return prev;
      }
    });
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

  const addPlaybook = () => {
    const newPlaybook: Playbook = {
      id: `playbook-${Date.now()}`,
      droppableId: `droppable-${Date.now()}`,  // Add this line
      name: `New Playbook ${campaignData.playbooks.length + 1}`,
      steps: [],
    };
    setCampaignData(prev => ({
      ...prev,
      playbooks: [...prev.playbooks, newPlaybook],
    }));
  };

  const updatePlaybookName = (playbookId: string, newName: string) => {
    setCampaignData(prev => ({
      ...prev,
      playbooks: prev.playbooks.map(playbook =>
        playbook.id === playbookId ? { ...playbook, name: newName } : playbook
      ),
    }));
  };

  const deletePlaybook = (playbookId: string) => {
    setCampaignData(prev => ({
      ...prev,
      playbooks: prev.playbooks.filter(playbook => playbook.id !== playbookId),
    }));
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If there's no destination, we don't need to do anything
    if (!destination) return;

    // If the item is dropped in the same position, we don't need to do anything
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setCampaignData(prev => {
      const updatedPlaybooks = [...prev.playbooks];

      // Find the source and destination playbooks
      const sourcePlaybookIndex = updatedPlaybooks.findIndex(p => p.droppableId === source.droppableId);
      const destPlaybookIndex = updatedPlaybooks.findIndex(p => p.droppableId === destination.droppableId);

      // Get the item that was dragged
      const [movedItem] = updatedPlaybooks[sourcePlaybookIndex].steps.splice(source.index, 1);

      // Insert the item in its new position
      updatedPlaybooks[destPlaybookIndex].steps.splice(destination.index, 0, movedItem);

      return { ...prev, playbooks: updatedPlaybooks };
    });
  };

  const addBuildingBlock = (playbookId: string, blockType: BuildingBlockType) => {
    const newBlock: BuildingBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      label: blockType.split('_').join(' '),
    };

    setCampaignData(prev => ({
      ...prev,
      playbooks: prev.playbooks.map(playbook =>
        playbook.id === playbookId
          ? { ...playbook, steps: [...playbook.steps, newBlock] }
          : playbook
      ),
    }));
  };

  const removeBuildingBlock = (playbookId: string, blockId: string) => {
    setCampaignData(prev => ({
      ...prev,
      playbooks: prev.playbooks.map(playbook =>
        playbook.id === playbookId
          ? { ...playbook, steps: playbook.steps.filter(step => step.id !== blockId) }
          : playbook
      ),
    }));
  };

  const renderPersonaTab = () => (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Countries</label>
            <BubbleInput
              items={campaignData.targetCountries}
              onAdd={(item) => handleAddItem('targetCountries', item)}
              onRemove={(index) => handleRemoveItem('targetCountries', index)}
              placeholder="Add target countries..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Industries</label>
            <BubbleInput
              items={campaignData.industries || []}
              onAdd={(item) => handleAddItem('industries', item)}
              onRemove={(index) => handleRemoveItem('industries', index)}
              placeholder="Add target industries..."
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
            <label className="block mb-2 text-sm font-medium">Target Customer Examples</label>
            <div className="space-y-2">
              <BubbleInput
                items={campaignData.currentCustomers || []}
                onAdd={(item) => handleAddItem('currentCustomers', item)}
                onRemove={(index) => handleRemoveItem('currentCustomers', index)}
                placeholder="Add current customer names..."
              />
              <BubbleInput
                items={campaignData.idealCustomerWebsites || []}
                onAdd={(item) => handleAddItem('idealCustomerWebsites', item)}
                onRemove={(index) => handleRemoveItem('idealCustomerWebsites', index)}
                placeholder="Add websites of ideal customers..."
              />
            </div>
          </div>
        </div>
      </div>

      <Collapsible title="Advanced Filters">
        <div className="space-y-6 mt-4">
          <Collapsible title="Company Information">
            <div className="space-y-4 mt-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Exclusions</label>
                <BubbleInput
                  items={campaignData.exclusions || []}
                  onAdd={(item) => handleAddItem('exclusions', item)}
                  onRemove={(index) => handleRemoveItem('exclusions', index)}
                  placeholder="Add exclusions (e.g., industries, company types)..."
                />
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
          </Collapsible>

          <Collapsible title="Funding Information">
            <div className="space-y-4 mt-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Funding Status</label>
                <select
                  value={campaignData.fundingStatus}
                  onChange={(e) => handleInputChange('fundingStatus', e.target.value)}
                  className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
                >
                  <option value="">Any</option>
                  <option value="seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="seriesA">Series A</option>
                  <option value="seriesB">Series B</option>
                  <option value="seriesC">Series C+</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Latest Funding Round</label>
                <select
                  value={campaignData.latestFundingRound}
                  onChange={(e) => handleInputChange('latestFundingRound', e.target.value)}
                  className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
                >
                  <option value="">Any</option>
                  <option value="seed">Seed</option>
                  <option value="seriesA">Series A</option>
                  <option value="seriesB">Series B</option>
                  <option value="seriesC">Series C+</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Latest Funding Date</label>
                <input 
                  type="date"
                  value={campaignData.latestFundingDate} 
                  onChange={(e) => handleInputChange('latestFundingDate', e.target.value)}
                  className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
                />
              </div>
            </div>
          </Collapsible>

          <Collapsible title="Hiring and Growth">
            <div className="space-y-4 mt-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={campaignData.hiringIntent} 
                    onChange={(e) => handleInputChange('hiringIntent', e.target.checked)}
                    className="w-4 h-4 text-[#fe5000] focus:ring-[#fe5000] border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium">Hiring Intent</span>
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Job Postings</label>
                <BubbleInput
                  items={campaignData.jobPostings}
                  onAdd={(item) => handleAddItem('jobPostings', item)}
                  onRemove={(index) => handleRemoveItem('jobPostings', index)}
                  placeholder="Add job titles..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Latest Job Posting Period</label>
                <select
                  value={campaignData.latestJobPostingPeriod}
                  onChange={(e) => handleInputChange('latestJobPostingPeriod', e.target.value)}
                  className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
                >
                  <option value="">Any</option>
                  <option value="1w">Last week</option>
                  <option value="1m">Last month</option>
                  <option value="3m">Last 3 months</option>
                  <option value="6m">Last 6 months</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Monthly Employee Growth</label>
                <input 
                  type="text"
                  value={campaignData.monthlyEmployeeGrowth} 
                  onChange={(e) => handleInputChange('monthlyEmployeeGrowth', e.target.value)}
                  placeholder="e.g., >5%"
                  className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
                />
              </div>
            </div>
          </Collapsible>

          <Collapsible title="News and Events">
            <div className="space-y-4 mt-4">
              <div>
                <label className="block mb-2 text-sm font-medium">News Keywords</label>
                <BubbleInput
                  items={campaignData.newsKeywords}
                  onAdd={(item) => handleAddItem('newsKeywords', item)}
                  onRemove={(index) => handleRemoveItem('newsKeywords', index)}
                  placeholder="Add news keywords..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Earliest News Date</label>
                <input 
                  type="date"
                  value={campaignData.earliestNewsDate} 
                  onChange={(e) => handleInputChange('earliestNewsDate', e.target.value)}
                  className="w-full p-3 border rounded-md bg-[#fcf9f8] focus:border-[#fe5000] focus:outline-none"
                />
              </div>
            </div>
          </Collapsible>
        </div>
      </Collapsible>
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

      <div className="border rounded-md p-4">
        <h3 className="text-lg font-semibold mb-4">Playbooks</h3>
        
        {/* Updated information section */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold text-gray-900">What are Playbooks?</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Playbooks are sequences of actions that June can follow for outreach. They help structure and automate your prospecting process.
          </p>
          <h4 className="font-bold mb-2 text-sm text-gray-900">Key Points:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fe5000] flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                <strong className="text-gray-900">Multiple Strategies:</strong> Create various playbooks for different scenarios or prospect types.
              </span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fe5000] flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                <strong className="text-gray-900">AI Selection:</strong> June can automatically choose the optimal playbook based on the prospect and campaign context.
              </span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fe5000] flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                <strong className="text-gray-900">Manual Assignment:</strong> You can also specify which playbooks to use and in what order.
              </span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 mb-6">
            Create your playbooks below by adding and arranging building blocks. June will use these to guide her outreach efforts, ensuring a consistent and effective approach to each prospect.
          </p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          {campaignData.playbooks.map(playbook => (
            <div key={playbook.id} className="mb-6 p-4 border rounded-md">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={playbook.name}
                  onChange={(e) => updatePlaybookName(playbook.id, e.target.value)}
                  className="text-lg font-medium bg-transparent border-b border-gray-300 focus:border-[#fe5000] focus:outline-none"
                />
                <button
                  onClick={() => deletePlaybook(playbook.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <Droppable droppableId={playbook.droppableId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {playbook.steps.map((step, index) => (
                      <Draggable key={step.id} draggableId={step.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 p-2 rounded-md flex justify-between items-center"
                          >
                            <span>{step.label}</span>
                            <button
                              onClick={() => removeBuildingBlock(playbook.id, step.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className="mt-4">
                <select
                  onChange={(e) => addBuildingBlock(playbook.id, e.target.value as BuildingBlockType)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Add a building block</option>
                  <option value="add_on_linkedin">Add on LinkedIn</option>
                  <option value="send_linkedin_message">Send LinkedIn Message</option>
                  <option value="linkedin_invite_accepted">LinkedIn Invite Accepted</option>
                  <option value="send_personalized_observation_email">Send Personalized Observation Email</option>
                  <option value="send_personalized_sales_email">Send Personalized Sales Email</option>
                </select>
              </div>
            </div>
          ))}
        </DragDropContext>
        <button
          onClick={addPlaybook}
          className="mt-4 flex items-center text-[#fe5000] hover:text-[#ff7f3f]"
        >
          <Plus size={20} className="mr-2" />
          Add New Playbook
        </button>
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
              Found 12.7K leads
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

const Collapsible: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

export default Campaigns;