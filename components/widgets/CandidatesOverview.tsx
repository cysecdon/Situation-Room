
import React from 'react';
import { Candidate } from '../../types';

const MOCK_CANDIDATES: Candidate[] = [
    { id: '1', name: 'Bola Ahmed Tinubu', party: 'APC', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bola_Tinubu_portrait.jpg/220px-Bola_Tinubu_portrait.jpg', voteCount: 8794726, percentage: 36.6 },
    { id: '2', name: 'Atiku Abubakar', party: 'PDP', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Atiku_Abubakar_portrait.jpg/220px-Atiku_Abubakar_portrait.jpg', voteCount: 6984520, percentage: 29.1 },
    { id: '3', name: 'Peter Obi', party: 'LP', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Peter_Obi_portrait.jpg/220px-Peter_Obi_portrait.jpg', voteCount: 6101533, percentage: 25.4 },
    { id: '4', name: 'Rabiu Kwankwaso', party: 'NNPP', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rabiu_Kwankwaso.jpg/220px-Rabiu_Kwankwaso.jpg', voteCount: 1496687, percentage: 6.2 },
];

export const CandidatesOverview: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-2 bg-white overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
            {MOCK_CANDIDATES.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded border border-gray-100">
                    <img src={c.image} alt={c.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h4 className="text-[10px] font-bold text-gray-900 truncate">{c.name}</h4>
                            <span className={`text-[9px] font-black px-1 rounded border ${
                                c.party === 'APC' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                c.party === 'PDP' ? 'bg-green-100 text-green-700 border-green-200' :
                                c.party === 'LP' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-orange-100 text-orange-700 border-orange-200'
                            }`}>{c.party}</span>
                        </div>
                        <div className="mt-1">
                            <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                                <span>{c.voteCount.toLocaleString()} votes</span>
                                <span className="font-bold">{c.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${c.party === 'APC' ? 'bg-blue-500' : c.party === 'PDP' ? 'bg-green-500' : c.party === 'LP' ? 'bg-red-500' : 'bg-orange-500'}`} 
                                    style={{ width: `${c.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
