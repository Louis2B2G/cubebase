import React, { useState } from 'react';

interface Activity {
  action: string;
  prospect: string;
  company: string;
  date: string;
}

interface ActivityRowProps extends Activity {}

const ActivityRow: React.FC<ActivityRowProps> = ({ action, prospect, company, date }) => {
  return (
    <tr className="border-b">
      <td className="py-2 text-xs">{action}</td>
      <td className="py-2 text-xs">{prospect}</td>
      <td className="py-2 text-xs">{company}</td>
      <td className="py-2 text-xs">{date}</td>
    </tr>
  );
};

interface ActivityTableProps {
  activities: Activity[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col h-full">
      <h2 className="text-base font-semibold mb-3">Recent Activities</h2>
      <div className="overflow-y-auto flex-grow">
        <table className="w-full">
          <thead className="bg-white sticky top-0">
            <tr className="border-b">
              <th className="text-left pb-2 text-xs">Action</th>
              <th className="text-left pb-2 text-xs">Prospect</th>
              <th className="text-left pb-2 text-xs">Company</th>
              <th className="text-left pb-2 text-xs">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <ActivityRow 
                key={index} 
                action={activity.action}
                prospect={activity.prospect}
                company={activity.company}
                date={activity.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;