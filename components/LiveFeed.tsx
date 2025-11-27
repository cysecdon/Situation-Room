import React from 'react';
import { LiveResult } from '../types';
import { Check, X, Clock } from 'lucide-react';

interface LiveFeedProps {
  results: LiveResult[];
}

export const LiveFeed: React.FC<LiveFeedProps> = ({ results }) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-2">
         <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">OCR Ingestion Stream</h3>
         <span className="text-[9px] font-mono text-gray-400">{results.length} processed</span>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
        {results.map((res) => (
            <div key={res.id} className="flex items-center justify-between py-1.5 px-2 bg-gray-50 rounded border border-gray-100">
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-700 font-mono leading-none">{res.ballotId}</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">{res.timestamp}</span>
                </div>
                <div className="flex items-center gap-1">
                    {res.status === 'Accepted' ? <Check size={10} className="text-green-600"/> :
                     res.status === 'Rejected' ? <X size={10} className="text-red-600"/> : <Clock size={10} className="text-yellow-600"/>}
                    <span className={`
                        text-[8px] font-black uppercase tracking-wide
                        ${res.status === 'Accepted' ? 'text-green-700' : 
                          res.status === 'Rejected' ? 'text-red-700' : 'text-yellow-700'}
                    `}>
                        {res.status}
                    </span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};