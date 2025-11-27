import React, { useState } from 'react';
import { AdminAction, OfflineAgent, SystemHealth } from '../types';
import { Activity, Shield, Server, WifiOff, AlertTriangle } from 'lucide-react';

interface MissionLogProps {
  logs: AdminAction[];
  offlineAgents: OfflineAgent[];
  systemHealth: SystemHealth;
}

export const MissionLog: React.FC<MissionLogProps> = ({ logs, offlineAgents, systemHealth }) => {
  const [activeTab, setActiveTab] = useState<'log' | 'agents' | 'system'>('log');

  return (
    <div className="h-full flex flex-col overflow-hidden text-[10px] bg-white">
      <div className="flex items-center border-b border-gray-100 bg-gray-50/50 shrink-0">
        <button 
            onClick={() => setActiveTab('log')}
            className={`flex-1 py-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${activeTab === 'log' ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
            <Activity size={10} /> Log
        </button>
        <button 
            onClick={() => setActiveTab('agents')}
            className={`flex-1 py-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${activeTab === 'agents' ? 'text-orange-600 bg-white border-b-2 border-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
            <WifiOff size={10} /> Agents
        </button>
        <button 
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${activeTab === 'system' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
            <Server size={10} /> System
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        
        {activeTab === 'log' && (
            <div className="space-y-2">
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-2 items-start border-l-2 border-gray-100 pl-2 py-0.5">
                        <div className="min-w-[35px] text-gray-400 font-mono text-[9px]">{log.time}</div>
                        <div>
                            <div className="font-bold text-gray-800 leading-tight">{log.action}</div>
                            <div className="text-[9px] text-gray-500 flex items-center gap-1 mt-0.5">
                                <Shield size={8} /> {log.user}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'agents' && (
            <div className="space-y-2">
                <div className="flex justify-between text-gray-400 text-[9px] font-bold uppercase pb-1 border-b border-gray-100">
                    <span>Agent</span>
                    <span>Offline For</span>
                </div>
                {offlineAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between">
                        <div>
                            <div className="font-bold text-gray-800">{agent.name}</div>
                            <div className="text-[9px] text-gray-500">{agent.location}</div>
                        </div>
                        <span className="text-red-600 font-mono font-bold bg-red-50 px-1 rounded">{agent.offlineDuration}</span>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'system' && (
            <div className="space-y-3 pt-1">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-500 font-bold uppercase">OTP Failure Rate</span>
                        <span className={`font-mono font-bold ${systemHealth.otpFailureRate > 5 ? 'text-red-600' : 'text-green-600'}`}>{systemHealth.otpFailureRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${systemHealth.otpFailureRate > 5 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${systemHealth.otpFailureRate * 5}%` }}></div>
                    </div>
                    {systemHealth.otpFailureRate > 5 && <div className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1"><AlertTriangle size={8}/> Alert: High Failure</div>}
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-500 font-bold uppercase">RDS CPU Load</span>
                        <span className={`font-mono font-bold ${systemHealth.rdsCpuLoad > 80 ? 'text-red-600' : 'text-blue-600'}`}>{systemHealth.rdsCpuLoad}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${systemHealth.rdsCpuLoad > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${systemHealth.rdsCpuLoad}%` }}></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-green-50 border border-green-100 p-1.5 rounded text-center">
                        <div className="text-xl font-bold text-green-700 leading-none">{systemHealth.activeInstances}</div>
                        <div className="text-[8px] text-green-600 uppercase font-bold">Active Nodes</div>
                    </div>
                    <div className="bg-red-50 border border-red-100 p-1.5 rounded text-center">
                        <div className="text-xl font-bold text-red-700 leading-none">{systemHealth.failedInstances}</div>
                        <div className="text-[8px] text-red-600 uppercase font-bold">Failed Nodes</div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};