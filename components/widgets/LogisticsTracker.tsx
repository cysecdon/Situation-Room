import React from 'react';
import { LogisticsItem } from '../../types';
import { Truck, MapPin, Clock, PackageCheck } from 'lucide-react';

const MOCK_LOGISTICS: LogisticsItem[] = [
    { id: 'TRK-001', item: 'EC8A Forms', location: 'Lagos Mainland RAC', status: 'In Transit', eta: '10 mins' },
    { id: 'TRK-004', item: 'BVAS Backup Units', location: 'Kano Central HQ', status: 'Delivered', eta: '-' },
    { id: 'TRK-009', item: 'Sensitive Materials', location: 'Rivers Ward 4', status: 'Delayed', eta: '2 hrs' },
    { id: 'TRK-012', item: 'Ad-hoc Staff Bus', location: 'Abuja Municipal', status: 'In Transit', eta: '15 mins' },
    { id: 'TRK-015', item: 'Generator Fuel', location: 'Ibadan North', status: 'Pending', eta: '45 mins' },
];

export const LogisticsTracker: React.FC = () => {
  return (
    <div className="p-3 h-full overflow-hidden flex flex-col">
       <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {MOCK_LOGISTICS.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-1
                    ${item.status === 'Delivered' ? 'bg-green-50 border-green-100 text-green-600' : 
                      item.status === 'Delayed' ? 'bg-red-50 border-red-100 text-red-600' : 
                      'bg-blue-50 border-blue-100 text-blue-600'}
                `}>
                    {item.status === 'Delivered' ? <PackageCheck size={14} /> : 
                     item.status === 'Delayed' ? <Clock size={14} /> : <Truck size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-xs truncate">{item.item}</h4>
                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            item.status === 'Delayed' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                            {item.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                        <MapPin size={10} />
                        <span className="truncate">{item.location}</span>
                    </div>
                    {item.status !== 'Delivered' && (
                        <div className="text-[9px] font-mono text-gray-400 mt-0.5">ETA: {item.eta}</div>
                    )}
                </div>
            </div>
        ))}
       </div>
    </div>
  );
};