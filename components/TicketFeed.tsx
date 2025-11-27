import React, { useState } from 'react';
import { Incident } from '../types';
import { Filter, Eye, ShieldAlert, ArrowUpDown, User } from 'lucide-react';

interface TicketFeedProps {
  incidents: Incident[];
}

type SortField = 'time' | 'severity' | 'type';

export const TicketFeed: React.FC<TicketFeedProps> = ({ incidents }) => {
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
        setSortField(field);
        setSortDir('desc');
    }
  };

  const getSeverityWeight = (s: string) => {
    switch(s) {
        case 'Critical': return 4;
        case 'High': return 3;
        case 'Medium': return 2;
        case 'Low': return 1;
        default: return 0;
    }
  };

  const sortedIncidents = [...incidents].sort((a, b) => {
    let res = 0;
    if (sortField === 'time') res = a.time.localeCompare(b.time);
    if (sortField === 'type') res = a.type.localeCompare(b.type);
    if (sortField === 'severity') res = getSeverityWeight(a.severity) - getSeverityWeight(b.severity);
    return sortDir === 'asc' ? res : -res;
  });

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-3 py-2 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
        <div className="flex items-center gap-2">
            <div className="flex gap-1 ml-2">
                 <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded text-[9px] font-black border border-red-200">
                    {incidents.filter(i => i.severity === 'Critical').length} CRIT
                 </span>
            </div>
        </div>
        <button className="p-1 hover:bg-gray-50 rounded text-gray-400 hover:text-gray-600 transition-colors">
            <Filter size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left table-fixed">
            <thead className="bg-gray-50 text-gray-500 font-semibold sticky top-0 z-10 shadow-sm">
                <tr>
                    <th className="px-2 py-1.5 text-[9px] uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('severity')}>
                        <div className="flex items-center gap-1">SEV <ArrowUpDown size={8}/></div>
                    </th>
                    <th className="px-2 py-1.5 text-[9px] uppercase tracking-wider w-[25%] cursor-pointer hover:bg-gray-100" onClick={() => handleSort('type')}>
                         <div className="flex items-center gap-1">Type <ArrowUpDown size={8}/></div>
                    </th>
                    <th className="px-2 py-1.5 text-[9px] uppercase tracking-wider w-[25%]">Location / Reporter</th>
                    <th className="px-2 py-1.5 text-[9px] uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('time')}>
                        <div className="flex items-center gap-1">Time <ArrowUpDown size={8}/></div>
                    </th>
                    <th className="px-2 py-1.5 text-[9px] uppercase tracking-wider w-16 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[10px]">
                {sortedIncidents.map((inc) => (
                    <tr key={inc.id} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="px-2 py-1.5 align-top">
                            <span className={`
                                inline-block px-1.5 py-0.5 rounded-[2px] text-[8px] font-black uppercase tracking-wider w-full text-center
                                ${inc.severity === 'Critical' ? 'bg-red-600 text-white' : 
                                  inc.severity === 'High' ? 'bg-orange-500 text-white' : 
                                  inc.severity === 'Medium' ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'}
                            `}>
                                {inc.severity}
                            </span>
                        </td>
                        <td className="px-2 py-1.5 font-bold text-gray-900 align-top leading-tight">
                            {inc.type}
                            <div className="text-[8px] text-gray-400 font-normal mt-0.5 truncate">#{inc.id}</div>
                        </td>
                        <td className="px-2 py-1.5 align-top">
                            <div className="font-bold text-gray-800 text-[9px] truncate">{inc.pollingUnit}</div>
                            <div className="text-[8px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                                <User size={8} /> {inc.reporter?.name}
                            </div>
                        </td>
                        <td className="px-2 py-1.5 text-gray-500 font-mono text-[9px] font-medium align-top">
                            {inc.time}
                        </td>
                        <td className="px-2 py-1.5 align-top text-right">
                            <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                <button title="View Evidence" className="p-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded border border-gray-200">
                                    <Eye size={10} />
                                </button>
                                <button title="Escalate" className="p-1 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded border border-gray-200">
                                    <ShieldAlert size={10} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};