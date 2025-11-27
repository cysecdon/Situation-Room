
import React, { useState } from 'react';
import { Guideline } from '../../types';
import { Search, FileText, ChevronRight, BookOpen } from 'lucide-react';

const MOCK_GUIDELINES: Guideline[] = [
    { id: '1', title: 'Accreditation Procedure', category: 'Voting Process' },
    { id: '2', title: 'Voting Procedure for Blind Voters', category: 'Inclusivity' },
    { id: '3', title: 'Collation of Results at RA', category: 'Collation' },
    { id: '4', title: 'Use of BVAS for Accreditation', category: 'Technology' },
    { id: '5', title: 'Offences and Penalties', category: 'Legal' },
    { id: '6', title: 'Role of Party Agents', category: 'Observers' },
    { id: '7', title: 'Sorting and Counting of Ballots', category: 'Counting' },
];

export const GuidelineReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuidelines = MOCK_GUIDELINES.filter(g => 
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
                    placeholder="Search INEC Guidelines..." 
                    className="w-full pl-6 pr-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredGuidelines.map(g => (
                <button key={g.id} className="w-full text-left p-2 border-b border-gray-50 hover:bg-blue-50 flex items-center justify-between group transition-colors">
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5 text-blue-500">
                             <FileText size={12} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-800 group-hover:text-blue-700">{g.title}</div>
                            <div className="text-[8px] text-gray-400 uppercase font-medium">{g.category}</div>
                        </div>
                    </div>
                    <ChevronRight size={12} className="text-gray-300 group-hover:text-blue-400" />
                </button>
            ))}
            {filteredGuidelines.length === 0 && (
                <div className="p-4 text-center text-[10px] text-gray-400 italic">
                    No guidelines found.
                </div>
            )}
        </div>
        <div className="p-2 bg-blue-50 border-t border-blue-100 text-center">
            <a href="#" className="flex items-center justify-center gap-1 text-[9px] font-bold text-blue-700 hover:underline">
                <BookOpen size={10} /> View Full Electoral Act PDF
            </a>
        </div>
    </div>
  );
};
