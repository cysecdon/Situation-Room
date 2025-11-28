
import React, { useState, useEffect } from 'react';
import { RoamingAgentProfile } from '../../types';
import { Radio, Battery, Wifi, WifiOff, MapPin, Signal, Gauge } from 'lucide-react';

export const RoamingAgentTelemetry: React.FC = () => {
  const [agents, setAgents] = useState<RoamingAgentProfile[]>([]);

  useEffect(() => {
    // Generate Initial Agents
    const MOCK_AGENTS: RoamingAgentProfile[] = [
        { id: 'RA-01', name: 'Agent Alpha', status: 'Investigating', velocity: 0, adherenceScore: 98, location: 'Lagos - Zone A', battery: 85, networkType: '5G', coordinates: '6.5244° N, 3.3792° E' },
        { id: 'RA-02', name: 'Agent Bravo', status: 'En Route', velocity: 45, adherenceScore: 92, location: 'Moving to PU-04', battery: 60, networkType: '4G', coordinates: '6.5000° N, 3.3500° E' },
        { id: 'RA-03', name: 'Agent Charlie', status: 'Idle', velocity: 0, adherenceScore: 78, location: 'HQ Staging', battery: 100, networkType: 'Wifi', coordinates: '9.0765° N, 7.3986° E' },
        { id: 'RA-04', name: 'Agent Delta', status: 'Reporting', velocity: 5, adherenceScore: 88, location: 'Kano - Municipal', battery: 30, networkType: '3G', coordinates: '12.0022° N, 8.5920° E' },
        { id: 'RA-05', name: 'Agent Echo', status: 'En Route', velocity: 62, adherenceScore: 95, location: 'Expressway N1', battery: 72, networkType: '4G', coordinates: '4.8156° N, 7.0498° E' },
    ];
    setAgents(MOCK_AGENTS);

    // Simulate Live Updates
    const interval = setInterval(() => {
        setAgents(prev => prev.map(agent => {
            if (agent.status === 'En Route') {
                const [lat, lng] = agent.coordinates.split(', ').map(c => parseFloat(c));
                return { 
                    ...agent, 
                    velocity: Math.max(0, Math.min(120, agent.velocity + (Math.random() * 20 - 10))),
                    battery: Math.max(0, agent.battery - 0.1),
                    coordinates: `${(lat + 0.0001).toFixed(4)}° N, ${(lng + 0.0001).toFixed(4)}° E`
                };
            }
            if (Math.random() > 0.95) {
                const nets = ['5G', '4G', '4G', '3G', 'Edge'] as const;
                return { ...agent, networkType: nets[Math.floor(Math.random() * nets.length)] };
            }
            return agent;
        }));
    }, 2000);

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

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        {/* Header Stats */}
        <div className="flex items-center justify-between p-2 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-1.5">
                <Radio size={14} className="text-blue-600 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-700 uppercase">Live Telemetry</span>
            </div>
            <div className="text-[9px] font-mono text-gray-400">
                {agents.length} Units Online
            </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-[10px]">
                <thead className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
                    <tr>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">Agent ID</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">Network</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider">GPS Location</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider text-right">Speed</th>
                        <th className="p-2 font-bold text-gray-400 uppercase tracking-wider text-right">Battery</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {agents.map(agent => (
                        <tr key={agent.id} className="hover:bg-slate-50 transition-colors group">
                            {/* Agent ID */}
                            <td className="p-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600 border border-slate-200">
                                        {agent.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{agent.id}</div>
                                        <div className="text-[8px] text-gray-400">{agent.name}</div>
                                    </div>
                                </div>
                            </td>

                            {/* Network Connectivity */}
                            <td className="p-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="p-1 rounded bg-slate-50 border border-slate-100">
                                        {getNetworkIcon(agent.networkType)}
                                    </div>
                                    <span className="font-mono font-bold text-gray-600">{agent.networkType}</span>
                                </div>
                            </td>

                            {/* GPS Location */}
                            <td className="p-2">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={10} className="text-gray-400" />
                                    <div>
                                        <div className="font-mono text-gray-700 tracking-tight">{agent.coordinates}</div>
                                        <div className="text-[8px] text-gray-400 truncate max-w-[100px]">{agent.location}</div>
                                    </div>
                                </div>
                            </td>

                            {/* Speed */}
                            <td className="p-2 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                    <span className={`font-mono font-bold ${agent.velocity > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {Math.round(agent.velocity)}
                                    </span>
                                    <span className="text-[8px] text-gray-400 uppercase">km/h</span>
                                    {agent.velocity > 0 && <Gauge size={12} className="text-blue-400" />}
                                </div>
                            </td>

                            {/* Battery Status */}
                            <td className="p-2 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                    <span className={`font-mono font-bold ${getBatteryColor(agent.battery)}`}>
                                        {Math.floor(agent.battery)}%
                                    </span>
                                    <Battery size={14} className={getBatteryColor(agent.battery)} />
                                </div>
                                <div className="w-full bg-gray-100 h-1 mt-1 rounded-full overflow-hidden ml-auto max-w-[40px]">
                                    <div 
                                        className={`h-full ${agent.battery > 30 ? (agent.battery > 70 ? 'bg-green-500' : 'bg-yellow-500') : 'bg-red-500'}`} 
                                        style={{ width: `${agent.battery}%` }}
                                    ></div>
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
