import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DataPoint = {
  date: string;
  meetings: number;
  emails: number;
};

const generateData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 7 * 12); // Start 12 weeks ago

  for (let i = 0; i < 12; i++) {
    data.push({
      date: currentDate.toISOString().split('T')[0],
      meetings: Math.floor(Math.random() * (3 - 2 + 1)) + 2, // Random number between 2 and 3
      emails: Math.floor(Math.random() * (500 - 300 + 1)) + 300, // Random number between 300 and 500
    });
    currentDate.setDate(currentDate.getDate() + 7); // Move to next week
  }

  return data;
};

const OutreachChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meetings' | 'emails'>('meetings');
  const data = generateData();

  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  };

  return (
    <div className="h-full flex flex-col">
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            interval={3} // Show every 4th tick (monthly)
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => `Week of ${formatXAxis(value as string)}`}
          />
          <Legend />
          {activeTab === 'meetings' && (
            <Line type="monotone" dataKey="meetings" stroke="#8884d8" name="Meetings Booked" />
          )}
          {activeTab === 'emails' && (
            <Line type="monotone" dataKey="emails" stroke="#82ca9d" name="Emails Sent" />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'meetings' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('meetings')}
        >
          Meetings Booked
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'emails' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('emails')}
        >
          Emails Sent
        </button>
      </div>
    </div>
  );
};

export default OutreachChart;