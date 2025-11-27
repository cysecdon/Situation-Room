
import React, { useState } from 'react';
import { Guideline } from '../../types';
import { Search, FileText, ChevronRight, Book } from 'lucide-react';

const MOCK_REGULATORY: Guideline[] = [
    { id: '1', title: 'Clause 30: Opening of Polls', category: 'INEC Guidelines 2022' },
    { id: '2', title: 'BVAS Authentication Failures', category: 'Manual for Officials' },
    { id: '3', title: 'Procedure for Over-voting', category: 'INEC Guidelines 2022' },
    { id: '4', title: 'Role of Collation Officers', category: 'Manual for Officials' },
    { id: '5', title: 'Form EC8A Completion', category: 'INEC Guidelines 2022' },
    { id: '6', title: 'Priority Voting Rules', category: 'Inclusivity Policy' },
];

export const RegulatoryGuidelines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_REGULATORY.filter(g => 
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
                    placeholder="Search Regulations..." 
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
                        <div className="mt-0.5 text-indigo-600">
                             <FileText size={12} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-900 group-hover:text-indigo-700">{g.title}</div>
                            <div className="text-[8px] text-gray-400 uppercase font-medium">{g.category}</div>
                        </div>
                    </div>
                    <ChevronRight size={12} className="text-gray-300 group-hover:text-indigo-400" />
                </button>
            ))}
            {filtered.length === 0 && (
                <div className="p-4 text-center text-[10px] text-gray-400 italic">
                    No regulations found.
                </div>
            )}
        </div>
        <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
            <a href="#" className="flex items-center justify-center gap-1 text-[9px] font-bold text-slate-700 hover:text-indigo-700 hover:underline">
                <Book size={10} /> View INEC Manual 2023
            </a>
        </div>
    </div>
  );
};
