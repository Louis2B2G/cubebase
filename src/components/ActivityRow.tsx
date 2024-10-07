import React from 'react';

interface ActivityRowProps {
  action: string;
  prospect: string;
  company: string;
  date: string;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ action, prospect, company, date }) => {
  return (
    <tr className="border-b">
      <td className="py-2">{action}</td>
      <td>{prospect}</td>
      <td>{company}</td>
      <td>{date}</td>
    </tr>
  );
};

export default ActivityRow;