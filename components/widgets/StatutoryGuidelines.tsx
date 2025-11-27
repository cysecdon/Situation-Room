
import React, { useState } from 'react';
import { Guideline } from '../../types';
import { Search, Scale, ChevronRight, BookOpen } from 'lucide-react';

const MOCK_STATUTORY: Guideline[] = [
    { id: '1', title: 'Sec 47: Accreditation & Voting', category: 'Electoral Act 2022' },
    { id: '2', title: 'Sec 60: Transmission of Results', category: 'Electoral Act 2022' },
    { id: '3', title: 'Sec 134: Presidential Threshold', category: 'Constitution 1999' },
    { id: '4', title: 'Sec 64: Disputed Results', category: 'Electoral Act 2022' },
    { id: '5', title: 'Sec 25: Election Dates', category: 'Electoral Act 2022' },
    { id: '6', title: 'Sec 33: Substitution of Candidate', category: 'Electoral Act 2022' },
];

export const StatutoryGuidelines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_STATUTORY.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        <div className="p-2 border-b border-gray-100 bg-gray-50">
            <div className="relative">
                <Search size={12} className="absolute left-2 top-1.5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search Acts & Laws..." 
                    className="w-full pl-6 pr-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-blue-400 text-gray-700 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filtered.map(g => (
                <button key={g.id} className="w-full text-left p-2 border-b border-gray-50 hover:bg-slate-50 flex items-center justify-between group transition-colors">
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5 text-slate-700">
                             <Scale size={12} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-900 group-hover:text-blue-700">{g.title}</div>
                            <div className="text-[8px] text-gray-400 uppercase font-medium">{g.category}</div>
                        </div>
                    </div>
                    <ChevronRight size={12} className="text-gray-300 group-hover:text-blue-400" />
                </button>
            ))}
            {filtered.length === 0 && (
                <div className="p-4 text-center text-[10px] text-gray-400 italic">
                    No statutory provisions found.
                </div>
            )}
        </div>
        <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
            <a href="#" className="flex items-center justify-center gap-1 text-[9px] font-bold text-slate-700 hover:text-blue-700 hover:underline">
                <BookOpen size={10} /> View Electoral Act 2022
            </a>
        </div>
    </div>
  );
};
