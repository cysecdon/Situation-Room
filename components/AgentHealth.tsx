import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { AgentHealthData } from '../types';

interface AgentHealthProps {
  data: AgentHealthData[];
  total: number;
  risky: number;
  off: number;
}

export const AgentHealth: React.FC<AgentHealthProps> = ({ data, total, risky, off }) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 h-full flex flex-col overflow-hidden">
      <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Agent Connectivity Trend</h3>
      
      <div className="flex justify-between mb-2 px-1">
        <div>
            <div className="text-xl font-bold text-gray-900 leading-none">{total.toLocaleString()}</div>
            <div className="text-[9px] text-gray-500 uppercase font-bold mt-0.5">Active</div>
        </div>
        <div>
            <div className="text-xl font-bold text-gray-900 leading-none">{risky}</div>
            <div className="text-[9px] text-gray-500 uppercase font-bold mt-0.5">Risky</div>
        </div>
        <div>
            <div className="text-xl font-bold text-gray-900 leading-none">{off}</div>
            <div className="text-[9px] text-gray-500 uppercase font-bold mt-0.5">Offline</div>
        </div>
      </div>

      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
                contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', fontSize: '10px', padding: '4px' }}
                itemStyle={{ fontSize: '10px' }}
            />
            <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
            <Area 
                type="monotone" 
                dataKey="active" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorActive)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};