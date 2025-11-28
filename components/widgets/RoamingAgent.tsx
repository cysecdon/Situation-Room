
import React, { useState } from 'react';
import { InvestigationTask } from '../../types';
import { Radio, AlertTriangle, FileText, Map, Activity, CheckCircle, Clock, User, MapPin } from 'lucide-react';

const MOCK_TASKS: InvestigationTask[] = [
    { id: 'INV-001', title: 'BVAS Bypass Reported', status: 'In Progress', priority: 'High', location: 'Lagos - Alimosho PU-04', timeCreated: '10:12', agentId: 'RA-Alpha' },
    { id: 'INV-002', title: 'Agent Intimidation', status: 'Pending', priority: 'Critical', location: 'Rivers - Obio/Akpor', timeCreated: '10:15' },
    { id: 'INV-003', title: 'Logistics Delay Verification', status: 'Resolved', priority: 'Medium', location: 'Kano - Municipal', timeCreated: '09:45', agentId: 'RA-Bravo' },
    { id: 'INV-004', title: 'Suspicious Crowd Gathering', status: 'Pending', priority: 'High', location: 'Abuja - Garki', timeCreated: '10:30' },
];

const PROXIMITY_ALERTS = [
    { id: 1, text: 'Agent RA-Alpha entered High Risk Zone (Alimosho)', time: '2m ago', type: 'risk' },
    { id: 2, text: 'Agent RA-Alpha is 250m from assigned incident INV-001', time: '3m ago', type: 'assignment' },
    { id: 3, text: 'Agent RA-Charlie is 500m from reported violence', time: '5m ago', type: 'risk' },
    { id: 4, text: 'Agent RA-Bravo approaching assigned incident INV-003 (Dist: 0.8km)', time: '8m ago', type: 'assignment' },
    { id: 5, text: 'Multiple Agents congregating in unauthorized sector', time: '12m ago', type: 'risk' },
];

export const RoamingAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'investigations' | 'reports' | 'heatmap'>('investigations');

  const getPriorityColor = (p: string) => {
    switch(p) {
        case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
        case 'High': return 'text-orange-600 bg-orange-50 border-orange-100';
        case 'Medium': return 'text-blue-600 bg-blue-50 border-blue-100';
        default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        {/* Queue Status Header */}
        <div className="flex divide-x divide-gray-100 border-b border-gray-100 bg-gray-50/50">
            <div className="flex-1 p-2 text-center">
                <div className="text-xl font-black text-orange-600 leading-none">4</div>
                <div className="text-[8px] font-bold text-gray-400 uppercase">Pending</div>
            </div>
            <div className="flex-1 p-2 text-center">
                <div className="text-xl font-black text-blue-600 leading-none">12</div>
                <div className="text-[8px] font-bold text-gray-400 uppercase">Active</div>
            </div>
            <div className="flex-1 p-2 text-center">
                <div className="text-xl font-black text-green-600 leading-none">28</div>
                <div className="text-[8px] font-bold text-gray-400 uppercase">Closed</div>
            </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-gray-100 px-2 pt-2 gap-2 overflow-x-auto custom-scrollbar">
            <button 
                onClick={() => setActiveTab('investigations')}
                className={`pb-2 px-2 text-[10px] font-bold uppercase whitespace-nowrap border-b-2 transition-colors ${activeTab === 'investigations' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                Investigations
            </button>
            <button 
                onClick={() => setActiveTab('alerts')}
                className={`pb-2 px-2 text-[10px] font-bold uppercase whitespace-nowrap border-b-2 transition-colors ${activeTab === 'alerts' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                Proximity Alerts
            </button>
            <button 
                onClick={() => setActiveTab('reports')}
                className={`pb-2 px-2 text-[10px] font-bold uppercase whitespace-nowrap border-b-2 transition-colors ${activeTab === 'reports' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                Live Reports
            </button>
            <button 
                onClick={() => setActiveTab('heatmap')}
                className={`pb-2 px-2 text-[10px] font-bold uppercase whitespace-nowrap border-b-2 transition-colors ${activeTab === 'heatmap' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                Heatmap
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            
            {activeTab === 'investigations' && (
                <div className="space-y-2">
                    {MOCK_TASKS.map(task => (
                        <div key={task.id} className="border border-gray-100 rounded-lg p-2 hover:bg-slate-50 transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase border ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <span className="text-[9px] font-mono text-gray-400">{task.timeCreated}</span>
                            </div>
                            <h4 className="font-bold text-gray-800 text-xs leading-tight mb-1">{task.title}</h4>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-2">
                                <Map size={10} /> {task.location}
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-1.5">
                                <div className="flex items-center gap-1 text-[9px] font-bold text-gray-600">
                                    <User size={10} /> {task.agentId || <span className="text-gray-400 italic font-normal">Unassigned</span>}
                                </div>
                                <div className={`text-[9px] font-bold uppercase ${task.status === 'In Progress' ? 'text-blue-600' : task.status === 'Pending' ? 'text-orange-500' : 'text-green-600'}`}>
                                    {task.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'alerts' && (
                <div className="space-y-2">
                    {PROXIMITY_ALERTS.map(alert => (
                        <div key={alert.id} className={`flex gap-2 items-start p-2 rounded border ${
                            alert.type === 'assignment' ? 'bg-blue-50/50 border-blue-100' : 'bg-red-50/50 border-red-100'
                        }`}>
                            {alert.type === 'assignment' ? 
                                <MapPin size={14} className="text-blue-500 mt-0.5 shrink-0" /> : 
                                <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                            }
                            <div>
                                <p className="text-[10px] font-bold text-gray-800 leading-snug">{alert.text}</p>
                                <p className={`text-[9px] font-mono mt-0.5 ${alert.type === 'assignment' ? 'text-blue-400' : 'text-red-400'}`}>{alert.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'reports' && (
                <div className="text-center py-6">
                    <FileText size={24} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Awaiting incoming field reports...</p>
                    <button className="mt-2 text-[9px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">Refresh Feed</button>
                </div>
            )}

            {activeTab === 'heatmap' && (
                <div className="h-full min-h-[150px] bg-slate-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                    {/* Simulated Heatmap Grid */}
                    <div className="grid grid-cols-4 grid-rows-4 gap-0.5 w-full h-full absolute inset-0 opacity-50">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={`
                                ${Math.random() > 0.7 ? 'bg-red-500' : Math.random() > 0.4 ? 'bg-orange-400' : 'bg-green-300'}
                                opacity-${Math.floor(Math.random() * 80 + 20)}
                            `}></div>
                        ))}
                    </div>
                    <div className="relative z-10 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg text-center shadow-sm">
                        <Activity size={20} className="mx-auto text-orange-600 mb-1" />
                        <div className="text-[10px] font-bold text-gray-800">High Activity: Zone 4</div>
                        <div className="text-[9px] text-gray-500">3 Agents Deployed</div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
