import React from 'react';
import { Incident } from '../types';
import { Activity, CheckCircle, ArrowUpRight } from 'lucide-react';

interface StatusFeedProps {
  incidents: Incident[];
}

export const StatusFeed: React.FC<StatusFeedProps> = ({ incidents }) => {
  const activities = incidents.map(inc => ({
    id: inc.id,
    type: inc.status === 'Escalated' ? 'escalation' : inc.status === 'Resolved' ? 'resolution' : 'creation',
    message: inc.status === 'Escalated' ? `Ticket #${inc.id} escalated to HQ` : 
             inc.status === 'Resolved' ? `Ticket #${inc.id} marked as resolved` : 
             `New ticket #${inc.id} created: ${inc.type}`,
    time: inc.time,
    status: inc.status
  })).sort((a, b) => b.time.localeCompare(a.time));

  return (
    <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h3 className="text-sm font-bold text-gray-900">Real-time Ticket Feed</h3>
        <div className="flex items-center gap-1.5 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[9px] text-green-700 font-bold uppercase tracking-wide">Live</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {activities.map((activity, idx) => (
            <div key={`${activity.id}-${idx}`} className="flex gap-2 group">
                <div className="flex flex-col items-center mt-0.5">
                    <div className={`
                        w-4 h-4 rounded-full flex items-center justify-center shrink-0 border
                        ${activity.status === 'Escalated' ? 'bg-red-50 border-red-100 text-red-600' : 
                          activity.status === 'Resolved' ? 'bg-green-50 border-green-100 text-green-600' : 
                          'bg-blue-50 border-blue-100 text-blue-600'}
                    `}>
                        {activity.status === 'Escalated' ? <ArrowUpRight size={8} /> :
                         activity.status === 'Resolved' ? <CheckCircle size={8} /> :
                         <Activity size={8} />}
                    </div>
                    {idx !== activities.length - 1 && (
                        <div className="w-px h-full bg-gray-100 my-0.5 group-hover:bg-gray-200 transition-colors"></div>
                    )}
                </div>
                <div className="pb-0.5 min-w-0">
                    <p className="text-xs font-bold text-gray-900 leading-tight truncate">{activity.message}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] font-mono text-gray-500 font-medium bg-gray-100 px-1 rounded-sm">{activity.time}</span>
                        <span className={`
                            text-[9px] px-1 rounded-sm font-bold uppercase tracking-wide
                            ${activity.status === 'Escalated' ? 'bg-red-100 text-red-700' : 
                              activity.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                              'bg-blue-100 text-blue-700'}
                        `}>
                            {activity.status}
                        </span>
                    </div>
                </div>
            </div>
        ))}
        {activities.length === 0 && (
            <div className="text-center py-4 text-gray-400 text-xs">No recent ticket activity</div>
        )}
      </div>
    </div>
  );
};