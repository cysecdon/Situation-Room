
import React, { useState } from 'react';
import { ChevronDown, Calendar, Globe, Filter, X, MapPin } from 'lucide-react';

// --- MOCK DATA ---
const ELECTION_TYPES = [
  'Presidential',
  'Gubernatorial',
  'Senatorial',
  'House of Reps',
  'State Assembly'
];

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

// Simplified LGA map for demo purposes
const LGAS_MOCK: Record<string, string[]> = {
    "Lagos": ["Alimosho", "Ikeja", "Epe", "Badagry", "Ikorodu", "Surulere", "Eti-Osa", "Lagos Mainland", "Lagos Island"],
    "FCT - Abuja": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal (AMAC)"],
    "Kano": ["Fagge", "Dala", "Gwale", "Kano Municipal", "Tarauni", "Nassarawa", "Bichi"],
    "Rivers": ["Port Harcourt", "Obio/Akpor", "Eleme", "Ikwerre", "Khana", "Gokana"],
    "Enugu": ["Enugu North", "Enugu South", "Nsukka", "Udi", "Ezeagu"]
};

// Helper to get LGAs
const getLgas = (state: string) => {
    if (!state) return [];
    return LGAS_MOCK[state] || [
        `${state} North`, `${state} South`, `${state} Central`
    ];
};

// Helper to get Wards (Generic)
const getWards = (lga: string) => {
    if (!lga) return [];
    return Array.from({length: 8}, (_, i) => `${lga} Ward ${i + 1}`);
};

// Helper to get Polling Units (Generic)
const getPus = (ward: string) => {
    if (!ward) return [];
    return Array.from({length: 12}, (_, i) => `PU-${ward.split(' ')[0].substring(0,3).toUpperCase()}-0${i + 1}`);
};

export const FilterBar: React.FC = () => {
  // State
  const [electionType, setElectionType] = useState('Presidential');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedPu, setSelectedPu] = useState('');

  // Lists
  const currentLgas = getLgas(selectedState);
  const currentWards = getWards(selectedLga);
  const currentPus = getPus(selectedWard);

  // Handlers
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedState(e.target.value);
      setSelectedLga('');
      setSelectedWard('');
      setSelectedPu('');
  };

  const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLga(e.target.value);
      setSelectedWard('');
      setSelectedPu('');
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedWard(e.target.value);
      setSelectedPu('');
  };

  return (
    <div className="inline-flex items-center gap-2 bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 ring-4 ring-white backdrop-blur-xl max-w-[95vw] overflow-x-auto custom-scrollbar">
       
       {/* 1. Election Context */}
       <div className="relative group shrink-0">
           <select 
                value={electionType}
                onChange={(e) => setElectionType(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           >
               {ELECTION_TYPES.map(t => <option key={t} value={t} className="bg-white text-slate-900">{t}</option>)}
           </select>
           <button className="flex items-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 rounded-xl transition-all duration-200 text-xs font-bold text-slate-700 border border-slate-200 hover:border-blue-400 hover:shadow-md shadow-sm min-w-[150px]">
              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-all shrink-0">
                <Globe size={12} />
              </div>
              <span className="truncate">{electionType}</span>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-500 ml-auto" />
           </button>
       </div>

       <div className="h-8 w-px bg-slate-100 shrink-0"></div>

       {/* 2. State Filter */}
       <div className="relative group shrink-0">
           <select 
                value={selectedState}
                onChange={handleStateChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           >
               <option value="" className="bg-white">All States</option>
               {STATES.map(s => <option key={s} value={s} className="bg-white text-slate-900">{s}</option>)}
           </select>
           <button className={`
                flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 text-xs font-medium border min-w-[130px] shadow-sm
                ${selectedState 
                    ? 'bg-white border-blue-500 text-blue-700 shadow-blue-100 ring-2 ring-blue-50' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-800 hover:shadow-md'}
           `}>
              <span className="opacity-50 text-[10px] uppercase font-bold tracking-wider">State</span>
              <span className="font-bold truncate flex-1 text-left">{selectedState || 'All Nigeria'}</span>
              <ChevronDown size={12} className={`ml-auto ${selectedState ? 'text-blue-500' : 'opacity-40'}`} />
           </button>
       </div>

       <span className="text-slate-200 text-[10px] shrink-0 font-light">/</span>

       {/* 3. LGA Filter */}
       <div className="relative group shrink-0">
            <select 
                value={selectedLga}
                onChange={handleLgaChange}
                disabled={!selectedState}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
           >
               <option value="" className="bg-white">All LGAs</option>
               {currentLgas.map(l => <option key={l} value={l} className="bg-white text-slate-900">{l}</option>)}
           </select>
           <button 
                disabled={!selectedState}
                className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 text-xs font-medium border min-w-[130px] shadow-sm
                    ${selectedLga 
                        ? 'bg-white border-blue-500 text-blue-700 shadow-blue-100 ring-2 ring-blue-50' 
                        : !selectedState 
                            ? 'bg-white border-transparent text-slate-300 cursor-not-allowed shadow-none' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-800 hover:shadow-md'}
                `}
            >
              <span className="opacity-50 text-[10px] uppercase font-bold tracking-wider">LGA</span>
              <span className="font-bold truncate flex-1 text-left">{selectedLga || 'All LGAs'}</span>
              <ChevronDown size={12} className={`ml-auto ${selectedLga ? 'text-blue-500' : 'opacity-40'}`} />
           </button>
       </div>

       <span className="text-slate-200 text-[10px] shrink-0 font-light">/</span>

       {/* 4. Ward Filter */}
       <div className="relative group shrink-0">
            <select 
                value={selectedWard}
                onChange={handleWardChange}
                disabled={!selectedLga}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
           >
               <option value="" className="bg-white">All Wards</option>
               {currentWards.map(c => <option key={c} value={c} className="bg-white text-slate-900">{c}</option>)}
           </select>
           <button 
                disabled={!selectedLga}
                className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 text-xs font-medium border min-w-[130px] shadow-sm
                    ${selectedWard 
                        ? 'bg-white border-blue-500 text-blue-700 shadow-blue-100 ring-2 ring-blue-50' 
                        : !selectedLga 
                            ? 'bg-white border-transparent text-slate-300 cursor-not-allowed shadow-none' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-800 hover:shadow-md'}
                `}
            >
              <span className="opacity-50 text-[10px] uppercase font-bold tracking-wider">Ward</span>
              <span className="font-bold truncate flex-1 text-left">{selectedWard || 'All Wards'}</span>
              <ChevronDown size={12} className={`ml-auto ${selectedWard ? 'text-blue-500' : 'opacity-40'}`} />
           </button>
       </div>

       <span className="text-slate-200 text-[10px] shrink-0 font-light">/</span>

       {/* 5. Polling Unit Filter */}
       <div className="relative group shrink-0">
            <select 
                value={selectedPu}
                onChange={(e) => setSelectedPu(e.target.value)}
                disabled={!selectedWard}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
           >
               <option value="" className="bg-white">All PUs</option>
               {currentPus.map(p => <option key={p} value={p} className="bg-white text-slate-900">{p}</option>)}
           </select>
           <button 
                disabled={!selectedWard}
                className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 text-xs font-medium border min-w-[130px] shadow-sm
                    ${selectedPu
                        ? 'bg-white border-blue-500 text-blue-700 shadow-blue-100 ring-2 ring-blue-50' 
                        : !selectedWard 
                            ? 'bg-white border-transparent text-slate-300 cursor-not-allowed shadow-none' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-800 hover:shadow-md'}
                `}
            >
              <span className="opacity-50 text-[10px] uppercase font-bold tracking-wider">PU</span>
              <span className="font-bold truncate flex-1 text-left">{selectedPu || 'All PUs'}</span>
              <ChevronDown size={12} className={`ml-auto ${selectedPu ? 'text-blue-500' : 'opacity-40'}`} />
           </button>
       </div>

       <div className="h-8 w-px bg-slate-100 shrink-0 mx-1"></div>

        {/* Clear / Advanced */}
        <div className="pl-1 flex items-center gap-1 shrink-0">
            {(selectedState || selectedLga) && (
                <button 
                    onClick={() => {
                        setSelectedState('');
                        setSelectedLga('');
                        setSelectedWard('');
                        setSelectedPu('');
                    }}
                    title="Clear Filters"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 border border-red-100 transition-all shadow-sm"
                >
                    <X size={14} strokeWidth={2.5} />
                </button>
            )}
             <button 
                title="Advanced Filters"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
            >
                <Filter size={14} />
             </button>
        </div>
    </div>
  );
};
