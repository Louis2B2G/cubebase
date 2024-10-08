import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DataPoint = {
  date: string;
  meetings: number;
  emails: number;
};

// Move generateData outside the component
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

// Generate data once outside the component
const initialData = generateData();

const OutreachChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'meetings' | 'emails'>('meetings');
  
  // Use useMemo to memoize the data
  const data = useMemo(() => initialData, []);

  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  };

  const metrics = [
    { 
      key: 'meetings', 
      label: 'Meetings Booked', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ), 
      color: '#fe5000' 
    },
    { 
      key: 'emails', 
      label: 'Emails Sent', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      color: '#82ca9d' 
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">Outreach Metrics</h2>
        <div className="flex space-x-2 p-1 rounded-full">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              className={`flex items-center px-3 py-1 rounded-full text-xs transition-colors duration-150 ${
                activeMetric === metric.key
                  ? 'bg-[#fff4e4] text-gray-800'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveMetric(metric.key as 'meetings' | 'emails')}
            >
              <span className="mr-2">{metric.icon}</span>
              {metric.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%" >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            interval={3}
            tick={{ fontSize: '0.75rem' }} // Add this line to make X-axis labels smaller
          />
          <YAxis 
            tick={{ fontSize: '0.75rem' }} // Add this line to make Y-axis labels smaller
          />
          <Tooltip 
            labelFormatter={(value) => `Week of ${formatXAxis(value as string)}`}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '0.75rem', // Adjust this value to make the text smaller
            }}
          />
          {metrics.map((metric) => (
            <Line
              key={metric.key}
              type="monotone"
              dataKey={metric.key}
              stroke={metric.color}
              name={metric.label}
              dot={false}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              hide={activeMetric !== metric.key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OutreachChart;