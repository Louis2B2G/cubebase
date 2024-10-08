import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import KPICard from '@/components/KPICard';
import ActivityRow from '@/components/ActivityRow';
import Conversations from '@/pages/Conversations';
import { KPI, Activity, Conversation, Prospect } from '@/types/types';
import { generateKPIs, generateConversations, generateProspects } from '@/types/mockData';
import OutreachChart from '@/components/OutreachChart';
import Meetings from '@/components/Meetings';
import Prospects from '@/pages/Prospects';
import Settings from '@/pages/Settings';
import ChatJune from '@/pages/ChatJune';
import Integrations from '@/pages/Integrations';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [kpis, setKPIs] = useState<KPI>(generateKPIs());
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(generateConversations());
  const [prospects, setProspects] = useState<Prospect[]>(generateProspects());
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 5;

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

  useEffect(() => {
    // Update displayed activities when page changes
    const startIndex = (currentPage - 1) * activitiesPerPage;
    const endIndex = startIndex + activitiesPerPage;
    setDisplayedActivities(allActivities.slice(startIndex, endIndex));
  }, [currentPage, allActivities]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(allActivities.length / activitiesPerPage)));
  };

  return (
    <div className="flex h-screen bg-[#fcf9f8]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userProfilePic="/louis.jpeg" />
      <div className="flex-1 overflow-hidden">
        <div className="p-6 overflow-auto h-[calc(100vh-64px)]">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex gap-4 mb-6">
                <div 
                  className="bg-white rounded-3xl p-4 h-14 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 cursor-pointer w-1/2"
                  onClick={() => setActiveTab('chatJune')}
                >
                  <div className="flex items-center">
                    <img src="/june.png" alt="June" className="h-8 w-8 mr-3" />
                    <div>
                      <span className="text-base font-semibold">Hi Louis 👋</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600 mr-2">✨ Ask me anything!</p>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl h-14 p-4 flex items-center justify-between w-1/4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-[#fe5000] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <span className="text-sm font-semibold">Monthly Target</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">2477/3000</span>
                    <div className="w-8 h-8 flex items-center justify-center relative">
                      <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#fe5000]">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="63 63" strokeDashoffset="0"></circle>
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="63 63" strokeDashoffset="15.75"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl h-14 p-4 flex items-center justify-between w-1/4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-[#fe5000] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="text-sm font-semibold">Emails in Queue</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">42</span>
                </div>
              </div>
              
              {/* Messages Pending Approval Card */}
              <div 
                className="bg-white rounded-3xl p-4 h-14 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 cursor-pointer mb-6"
                onClick={() => setActiveTab('approveMessages')}
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#fe5000] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-md font-semibold">Messages Pending Approval</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-bold text-sm ml-4">12</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard title="Total Prospects" value={kpis.totalProspects} change="+5.2%" isPositive={true} />
                <KPICard title="Active Conversations" value={kpis.activeConversations} change="-2.1%" isPositive={false} />
                <KPICard title="Meetings Booked" value={kpis.meetingsBooked} change="+12.7%" isPositive={true} />
                <KPICard title="Lead Response Rate" value={`${kpis.conversionRate}%`} change="+0.5%" isPositive={true} />
              </div>

              {/* Charts and Tables */}
              <div className="grid grid-cols-10 gap-6">
                <div className="col-span-4 bg-white p-6 rounded-xl shadow flex flex-col h-[400px]">
                  <div className="overflow-y-auto flex-grow">
                    <OutreachChart />
                  </div>
                </div>
                <div className="col-span-6 bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                  <div className="overflow-y-auto flex-grow">
                    <table className="w-full">
                      <thead className="bg-white sticky top-0">
                        <tr className="border-b">
                          <th className="text-left pb-2">Action</th>
                          <th className="text-left pb-2">Prospect</th>
                          <th className="text-left pb-2">Company</th>
                          <th className="text-left pb-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedActivities.map((activity, index) => (
                          <ActivityRow 
                            key={index} 
                            action={activity.action}
                            prospect={activity.prospect}
                            company={activity.company}  // Change this line
                            date={activity.date}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="p-2 hover:text-blue-600 transition-colors duration-150 disabled:text-gray-400"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span>
                      Page {currentPage} of {Math.ceil(allActivities.length / activitiesPerPage)}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === Math.ceil(allActivities.length / activitiesPerPage)}
                      className="p-2 hover:text-blue-600 transition-colors duration-150 disabled:text-gray-400"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
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
          {activeTab === 'meetings' && (
            <Meetings />
          )}
          {activeTab === 'prospects' && (
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;