
import React from 'react';
import { ProvisionalStat } from '../../types';
import { FileWarning, AlertTriangle } from 'lucide-react';

const MOCK_PROVISIONAL: ProvisionalStat[] = [
    { id: '1', pu: 'PU-LAG-004', reason: 'BVAS Fail', count: 12, status: 'Under Review' },
    { id: '2', pu: 'PU-ABJ-021', reason: 'Name Missing', count: 5, status: 'Accepted' },
    { id: '3', pu: 'PU-KAN-108', reason: 'Age Dispute', count: 2, status: 'Rejected' },
    { id: '4', pu: 'PU-RIV-099', reason: 'BVAS Fail', count: 24, status: 'Under Review' },
    { id: '5', pu: 'PU-ENU-012', reason: 'Fingerprint Fail', count: 8, status: 'Accepted' },
];

export const ProvisionalData: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-3 bg-white overflow-hidden">
        <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
            <div>
                 <h4 className="text-[10px] font-bold text-gray-500 uppercase">Provisional Results</h4>
                 <div className="text-xl font-black text-gray-800 leading-none">1,204</div>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                <FileWarning size={16} />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
            {MOCK_PROVISIONAL.map(p => (
                <div key={p.id} className="flex items-center justify-between p-1.5 bg-gray-50 rounded border border-gray-100">
                    <div>
                        <div className="text-[9px] font-bold text-gray-800">{p.pu}</div>
                        <div className="text-[8px] text-gray-500">{p.reason}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-900">{p.count}</div>
                        <div className={`text-[7px] uppercase font-bold px-1 rounded ${
                            p.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                            p.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {p.status}
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-1 p-1.5 bg-red-50 border border-red-100 rounded text-red-800 mt-2">
                <AlertTriangle size={10} />
                <span className="text-[9px] font-bold">Cluster Warning: PU-RIV-099</span>
            </div>
        </div>
    </div>
  );
};
