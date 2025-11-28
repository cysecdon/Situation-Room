import React, { useState, useEffect } from 'react';
import { CandidateAgentProfile } from '../../types';
import { Radio, Battery, Wifi, WifiOff, MapPin, Signal, Shield, CheckCircle, AlertOctagon } from 'lucide-react';

export const CandidateAgentTelemetry: React.FC = () => {
  const [agents, setAgents] = useState<CandidateAgentProfile[]>([]);

  useEffect(() => {
    // Generate Initial Candidate Agents
    const MOCK_AGENTS: CandidateAgentProfile[] = [
        { id: 'APC-LAG-01', name: 'Tunde Bakare', party: 'APC', assignedPu: 'PU-LAG-004', opStatus: 'Monitoring', networkType: '4G', coordinates: '6.5244° N, 3.3792° E', locationStatus: 'On Site', battery: 92 },
        { id: 'PDP-RIV-09', name: 'Chisom Nweke', party: 'PDP', assignedPu: 'PU-RIV-099', opStatus: 'Away', networkType: '3G', coordinates: '4.8156° N, 7.0498° E', locationStatus: 'Off Site', battery: 45 },
        { id: 'LP-ENU-22', name: 'Emeka Okonkwo', party: 'LP', assignedPu: 'PU-ENU-012', opStatus: 'Monitoring', networkType: '5G', coordinates: '6.4584° N, 7.5464° E', locationStatus: 'On Site', battery: 78 },
        { id: 'NNPP-KAN-05', name: 'Aminu Yusuf', party: 'NNPP', assignedPu: 'PU-KAN-108', opStatus: 'Reporting', networkType: 'Wifi', coordinates: '12.0022° N, 8.5920° E', locationStatus: 'Proximity Warning', battery: 60 },
        { id: 'APC-ABJ-11', name: 'Sarah Dauda', party: 'APC', assignedPu: 'PU-ABJ-021', opStatus: 'Offline', networkType: 'Offline', coordinates: 'Last: 9.0765° N, 7.3986° E', locationStatus: 'Off Site', battery: 12 },
    ];
    setAgents(MOCK_AGENTS);

    // Simulate Live Updates
    const interval = setInterval(() => {
        setAgents(prev => prev.map(agent => {
            if (agent.networkType === 'Offline') return agent;

            // Random battery drain
            let newBattery = Math.max(0, agent.battery - (Math.random() * 0.2));
            
            // Sync OpStatus with location
            let newStatus = agent.opStatus;
            
            // Logic: 
            // - If locationStatus is Off Site or Warning -> Away
            // - If locationStatus is On Site -> Monitoring or Reporting
            
            if (agent.locationStatus === 'Off Site' || agent.locationStatus === 'Proximity Warning') {
                newStatus = 'Away';
            } else {
                // On Site: Mostly Monitoring, sometimes Reporting
                if (Math.random() > 0.9) {
                    newStatus = 'Reporting';
                } else {
                    newStatus = 'Monitoring';
                }
            }
            
            // Occasional random location switch for demo purposes
            let newLocationStatus = agent.locationStatus;
            if (Math.random() > 0.98) {
                const locs: any[] = ['On Site', 'Off Site', 'Proximity Warning'];
                newLocationStatus = locs[Math.floor(Math.random() * locs.length)];
            }

            return { 
                ...agent, 
                battery: newBattery,
                opStatus: newStatus,
                locationStatus: newLocationStatus
            };
        }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getNetworkIcon = (type?: string) => {
      switch(type) {
          case '5G': return <Wifi size={12} className="text-green-600" />;
          case '4G': return <Signal size={12} className="text-green-500" />;
          case '3G': return <Signal size={12} className="text-yellow-500" />;
          case 'Edge': return <Signal size={12} className="text-orange-500" />;
          case 'Wifi': return <Wifi size={12} className="text-blue-500" />;
          default: return <WifiOff size={12} className="text-gray-400" />;
      }
  };

  const getBatteryColor = (level: number) => {
      if (level > 70) return 'text-green-500';
      if (level > 30) return 'text-yellow-500';
      return 'text-red-500';
  };

  const getPartyColor = (party: string) => {
      switch(party) {
          case 'APC': return 'bg-blue-100 text-blue-700 border-blue-200';
          case 'PDP': return 'bg-green-100 text-green-700 border-green-200';
          case 'LP': return 'bg-red-100 text-red-700 border-red-200';
          default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        {/* Header Stats */}
        <div className="flex items-center justify-between p-2 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-indigo-600" />
                <span className="text-[10px] font-bold text-gray-700 uppercase">Candidate Agents</span>
            </div>
            <div className="text-[9px] font-mono text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                Live Feed
            </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-[10px]">
                <thead className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
                    <tr>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">Agent ID</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">OP Status</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">Connectivity</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">GPS / Assigned PU</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider text-right">Battery</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {agents.map(agent => (
                        <tr key={agent.id} className="hover:bg-slate-50 transition-colors group">
                            {/* Agent ID & Party */}
                            <td className="p-2">
                                <div className="flex items-center gap-2">
                                    <div className={`px-1.5 py-0.5 rounded text-[8px] font-black border ${getPartyColor(agent.party)}`}>
                                        {agent.party}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 leading-tight">{agent.id}</div>
                                        <div className="text-[8px] text-gray-400 truncate">{agent.name}</div>
                                    </div>
                                </div>
                            </td>

                            {/* Operational Status */}
                            <td className="p-2">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${
                                    agent.opStatus === 'Away' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                    agent.opStatus === 'Reporting' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                    agent.opStatus === 'Offline' ? 'bg-gray-100 text-gray-400 border-gray-200' :
                                    'bg-green-50 text-green-600 border-green-100'
                                }`}>
                                    {agent.opStatus}
                                </span>
                            </td>

                            {/* Network */}
                            <td className="p-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="p-1 rounded bg-slate-50 border border-slate-100">
                                        {getNetworkIcon(agent.networkType)}
                                    </div>
                                    <span className="font-mono font-bold text-gray-600">{agent.networkType}</span>
                                </div>
                            </td>

                            {/* GPS & PU Match */}
                            <td className="p-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <MapPin size={10} className="text-gray-400" />
                                        <span className="font-bold text-gray-800">{agent.assignedPu}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-mono text-[8px] text-gray-500 tracking-tight">{agent.coordinates}</span>
                                        {agent.locationStatus === 'On Site' && <CheckCircle size={8} className="text-green-500" />}
                                        {agent.locationStatus === 'Proximity Warning' && <AlertOctagon size={8} className="text-orange-500" />}
                                        {agent.locationStatus === 'Off Site' && <AlertOctagon size={8} className="text-red-500" />}
                                    </div>
                                </div>
                            </td>

                            {/* Battery */}
                            <td className="p-2 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                    <span className={`font-mono font-bold ${getBatteryColor(agent.battery)}`}>
                                        {Math.floor(agent.battery)}%
                                    </span>
                                    <Battery size={14} className={getBatteryColor(agent.battery)} />
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