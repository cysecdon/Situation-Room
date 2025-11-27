import React, { useState, useEffect } from 'react';
import { BvasData } from '../../types';
import { Battery, Signal, Wifi, Smartphone, AlertTriangle } from 'lucide-react';

export const BvasTelemetry: React.FC = () => {
  const [devices, setDevices] = useState<BvasData[]>([]);

  useEffect(() => {
    // Generate mock BVAS data
    const generate = () => Array.from({ length: 8 }).map((_, i) => ({
        id: `BVAS-${1000 + i}`,
        pu: `PU-0${i + 1}/12/04`,
        batteryLevel: Math.floor(Math.random() * 100),
        connectivity: Math.random() > 0.8 ? 'Offline' : Math.random() > 0.6 ? '2G' : '4G',
        accreditationCount: Math.floor(Math.random() * 500),
        lastSeen: new Date().toLocaleTimeString(),
        status: Math.random() > 0.9 ? 'Offline' : Math.random() > 0.8 ? 'Warning' : 'Online'
    }));
    setDevices(generate());
    const interval = setInterval(() => setDevices(generate()), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 h-full overflow-hidden flex flex-col">
       <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="bg-blue-50 p-2 rounded border border-blue-100 text-center">
                <div className="text-xl font-black text-blue-700">92%</div>
                <div className="text-[8px] font-bold text-blue-400 uppercase">Avg Battery</div>
            </div>
             <div className="bg-green-50 p-2 rounded border border-green-100 text-center">
                <div className="text-xl font-black text-green-700">14ms</div>
                <div className="text-[8px] font-bold text-green-400 uppercase">Avg Latency</div>
            </div>
             <div className="bg-purple-50 p-2 rounded border border-purple-100 text-center">
                <div className="text-xl font-black text-purple-700">2.1s</div>
                <div className="text-[8px] font-bold text-purple-400 uppercase">Accr. Speed</div>
            </div>
             <div className="bg-red-50 p-2 rounded border border-red-100 text-center">
                <div className="text-xl font-black text-red-700">42</div>
                <div className="text-[8px] font-bold text-red-400 uppercase">Offline</div>
            </div>
       </div>

       <div className="flex-1 overflow-auto custom-scrollbar">
         <table className="w-full text-left text-[10px]">
            <thead className="bg-gray-50 text-gray-500 font-semibold sticky top-0">
                <tr>
                    <th className="p-1.5">Device ID</th>
                    <th className="p-1.5">Bat</th>
                    <th className="p-1.5">Net</th>
                    <th className="p-1.5 text-right">Count</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {devices.map(d => (
                    <tr key={d.id}>
                        <td className="p-1.5 font-bold text-gray-700">
                            <div className="flex items-center gap-1.5">
                                <Smartphone size={10} className={d.status === 'Online' ? 'text-green-500' : 'text-red-500'} />
                                <div>
                                    <div>{d.id}</div>
                                    <div className="text-[8px] text-gray-400 font-normal">{d.pu}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-1.5">
                            <div className="flex items-center gap-1">
                                <div className={`w-6 h-2 rounded-sm border ${d.batteryLevel < 20 ? 'border-red-300 bg-red-100' : 'border-gray-300 bg-gray-100'} relative`}>
                                    <div className={`h-full ${d.batteryLevel < 20 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${d.batteryLevel}%`}}></div>
                                </div>
                                <span className="text-[8px] font-mono">{d.batteryLevel}%</span>
                            </div>
                        </td>
                        <td className="p-1.5">
                            <span className={`px-1 rounded text-[8px] font-bold ${
                                d.connectivity === '4G' ? 'bg-green-100 text-green-700' : 
                                d.connectivity === 'Offline' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {d.connectivity}
                            </span>
                        </td>
                        <td className="p-1.5 text-right font-mono font-bold text-gray-800">
                            {d.accreditationCount}
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
       </div>
    </div>
  );
};