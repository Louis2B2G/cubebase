import React from 'react';

interface KPICardProps {
  title: string;
  value: number | string;
  change: string;
  isPositive: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-sm font-semibold text-gray-500 mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-2">{value}</p>
    <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {change} {isPositive ? '↑' : '↓'}
    </p>
  </div>
);

export default KPICard;