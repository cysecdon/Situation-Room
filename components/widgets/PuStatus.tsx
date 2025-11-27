
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Voting', value: 450, color: '#3B82F6' },
  { name: 'Sorting', value: 300, color: '#F59E0B' },
  { name: 'Counting', value: 200, color: '#8B5CF6' },
  { name: 'Transmitting', value: 150, color: '#10B981' },
  { name: 'Closed', value: 50, color: '#6B7280' },
  { name: 'Delayed', value: 20, color: '#EF4444' },
];

export const PuStatus: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-2 bg-white overflow-hidden">
       <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-1 text-center">Polling Unit Lifecycle</h4>
       <div className="flex-1 min-h-0">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '9px' }} layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};
