import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import KPICard from '@/components/KPICard';
import Conversations from '@/pages/Conversations';
import { KPI, Activity, Conversation, Prospect } from '@/types/types';
import { generateKPIs, generateConversations, generateProspects } from '@/types/mockData';
import OutreachChart from '@/components/OutreachChart';
import Meetings from '@/components/Meetings';
import Prospects from '@/pages/Prospects';
import Settings from '@/pages/Settings';
import ChatJune from '@/pages/ChatJune';
import Integrations from '@/pages/Integrations';
import ActivityTable from '@/components/ActivityTable';
import Mailboxes from '@/pages/Mailboxes';
import { Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [kpis, setKPIs] = useState<KPI>(generateKPIs());
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(generateConversations());
  const [prospects, setProspects] = useState<Prospect[]>(generateProspects());

  useEffect(() => {
    // Fetch data once on component mount
    setKPIs(generateKPIs());
    setProspects(generateProspects());
  }, []);

  useEffect(() => {
    // Generate activities based on prospects data
    const generatedActivities = prospects.flatMap((prospect) => {
      const activities: Activity[] = [];

      activities.push({
        action: `Reached out via ${prospect.reachedOn}`,
        prospect: prospect.name,
        company: prospect.company, // Add company name
        date: new Date(prospect.lastMessageSentAt).toLocaleDateString(),
      });

      if (prospect.messagesSent > 1) {
        activities.push({
          action: `Sent ${prospect.messagesSent - 1} follow-up messages`,
          prospect: prospect.name,
          company: prospect.company, // Add company name
          date: new Date(prospect.lastMessageSentAt).toLocaleDateString(),
        });
      }

      activities.push({
        action: `Status changed to ${prospect.status}`,
        prospect: prospect.name,
        company: prospect.company, // Add company name
        date: new Date(prospect.lastMessageSentAt).toLocaleDateString(),
      });

      return activities;
    });

    // Sort activities by date (most recent first)
    const sortedActivities = generatedActivities.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setAllActivities(sortedActivities);
  }, [prospects]);

  return (
    <div className="flex h-screen bg-[#fcf9f8] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userProfilePic="/louis.jpeg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden p-4">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex gap-3 mb-4">
                <div 
                  className="bg-white rounded-2xl p-3 h-12 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 cursor-pointer w-1/2"
                  onClick={() => setActiveTab('chatJune')}
                >
                  <div className="flex items-center">
                    <img src="/june.png" alt="June" className="h-8 w-8 mr-2" />
                    <div>
                      <span className="text-sm font-semibold">Hi Louis 👋</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs text-gray-600 mr-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 inline" /> Ask me anything!
                    </p>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl h-12 p-3 flex items-center justify-between w-1/4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#fe5000] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <span className="text-xs font-semibold">Monthly Target</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs mr-2">2477/3000</span>
                    <div className="w-6 h-6 flex items-center justify-center relative">
                      <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#fe5000]">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="63 63" strokeDashoffset="0"></circle>
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="63 63" strokeDashoffset="15.75"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl h-12 p-3 flex items-center justify-between w-1/4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#fe5000] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="text-xs font-semibold">Emails in Queue</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold">42</span>
                </div>
              </div>
              
              {/* Messages Pending Approval Card */}
              <div 
                className="bg-white rounded-2xl p-3 h-12 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 cursor-pointer mb-4"
                onClick={() => setActiveTab('approveMessages')}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#fe5000] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold">Messages Pending Approval</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-bold text-xs ml-3">12</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KPICard title="Total Prospects" value={kpis.totalProspects} change="+5.2%" isPositive={true} />
                <KPICard title="Active Conversations" value={kpis.activeConversations} change="-2.1%" isPositive={false} />
                <KPICard title="Meetings Booked" value={kpis.meetingsBooked} change="+12.7%" isPositive={true} />
                <KPICard title="Lead Response Rate" value={`${kpis.conversionRate}%`} change="+0.5%" isPositive={true} />
              </div>

              {/* Charts and Tables */}
              <div className="flex w-full gap-4 h-[350px]">
                <div className="w-[60%] bg-white p-4 rounded-xl shadow flex flex-col">
                  <div className="overflow-y-auto flex-grow">
                    <OutreachChart />
                  </div>
                </div>
                <div className="w-[40%]">
                  <ActivityTable activities={allActivities} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'conversations' && (
            <Conversations 
              conversations={conversations} 
              setConversations={setConversations} 
              prospects={prospects} 
            />
          )}
          {activeTab === 'calendar' && (
            <div className="h-full">
              <Meetings />
            </div>
          )}
          {activeTab === 'leads' && (
            <Prospects />
          )}
          {activeTab === 'settings' && (
            <Settings />
          )}
         {activeTab === 'chatJune' && (
            <ChatJune />
          )}
          {activeTab === 'integrations' && (
            <Integrations />
          )}
          {activeTab === 'mailboxes' && (
            <Mailboxes />
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;