
import React from 'react';
import { Wifi } from 'lucide-react';

export const TransmissionMonitor: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-3 bg-white overflow-hidden justify-center gap-4">
        <div className="text-center">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">Total Transmitted Ballots</h4>
            <div className="text-3xl font-black text-gray-900 leading-none">148,902</div>
            <div className="text-[9px] text-green-600 font-bold mt-1 flex items-center justify-center gap-1">
                <Wifi size={10} /> 84% of Expected
            </div>
        </div>

        <div className="space-y-3">
            <div>
                <div className="flex justify-between text-[9px] font-bold text-gray-600 mb-1">
                    <span>IRev Server Uploads</span>
                    <span>92%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
                </div>
            </div>
             <div>
                <div className="flex justify-between text-[9px] font-bold text-gray-600 mb-1">
                    <span>Pending Verification</span>
                    <span>15%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '15%' }}></div>
                </div>
            </div>
             <div>
                <div className="flex justify-between text-[9px] font-bold text-gray-600 mb-1">
                    <span>Failed / Retrying</span>
                    <span className="text-red-600">3%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '3%' }}></div>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
            <div className="bg-gray-50 p-2 rounded text-center border border-gray-100">
                <div className="text-lg font-bold text-gray-800">172</div>
                <div className="text-[8px] text-gray-500 uppercase">Offline PUs</div>
            </div>
             <div className="bg-gray-50 p-2 rounded text-center border border-gray-100">
                <div className="text-lg font-bold text-gray-800">1.2m</div>
                <div className="text-[8px] text-gray-500 uppercase">Bytes/Sec</div>
            </div>
        </div>
    </div>
  );
};
