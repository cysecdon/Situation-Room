import React from 'react';
import { Phone, Users, Clock, AlertCircle } from 'lucide-react';

export const CallCenterStats: React.FC = () => {
  return (
    <div className="p-3 h-full overflow-hidden flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                    <Phone size={16} />
                </div>
                <div>
                    <div className="text-xl font-black text-gray-900 leading-none">428</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase">Calls Waiting</div>
                </div>
            </div>
            <span className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={10} /> +12%
            </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md">
                    <Clock size={16} />
                </div>
                <div>
                    <div className="text-xl font-black text-gray-900 leading-none">4m 12s</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase">Avg Wait Time</div>
                </div>
            </div>
             <span className="text-green-500 text-[10px] font-bold flex items-center gap-1">
                -5%
            </span>
        </div>

        <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 text-orange-600 rounded-md">
                    <Users size={16} />
                </div>
                <div>
                    <div className="text-xl font-black text-gray-900 leading-none">85</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase">Agents Online</div>
                </div>
            </div>
        </div>
    </div>
  );
};