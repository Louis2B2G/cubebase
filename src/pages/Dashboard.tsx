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
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <TopBar />
        <div className="p-6 overflow-auto h-[calc(100vh-64px)]">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex items-center mb-6">
                <img src="/june.png" alt="June" className="h-20 mr-4" />
                <h2 className="text-2xl font-bold">Hi Louis, here are some updates!</h2>
              </div>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard title="Total Prospects" value={kpis.totalProspects} change="+5.2%" isPositive={true} />
                <KPICard title="Active Conversations" value={kpis.activeConversations} change="-2.1%" isPositive={false} />
                <KPICard title="Meetings Booked" value={kpis.meetingsBooked} change="+12.7%" isPositive={true} />
                <KPICard title="Conversion Rate" value={`${kpis.conversionRate}%`} change="+0.5%" isPositive={true} />
              </div>

              {/* Charts and Tables */}
              <div className="grid grid-cols-10 gap-6">
                <div className="col-span-4 bg-white p-6 rounded-lg shadow flex flex-col h-[400px]">
                  <h3 className="text-lg font-semibold mb-4">Outreach Performance</h3>
                  <div className="overflow-y-auto flex-grow">
                    <OutreachChart />
                  </div>
                </div>
                <div className="col-span-6 bg-white p-6 rounded-lg shadow">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;