
import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const NEWS_ITEMS = [
    { id: 1, text: "INEC extends voting time in selected polling units in Lagos and Delta states due to logistical delays.", type: "urgent" },
    { id: 2, text: "Security reinforcement deployed to Rivers State following reported disruptions in Ward 4.", type: "critical" },
    { id: 3, text: "INEC Chairman to address the press at 14:00 GMT regarding BVAS functionality.", type: "info" },
    { id: 4, text: "EU Observer mission releases preliminary statement on voting commencement.", type: "info" },
    { id: 5, text: "Collation center in Abuja now open and receiving first batch of results.", type: "update" }
];

export const BreakingNews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length);

  const item = NEWS_ITEMS[currentIndex];

  return (
    <div className="h-full flex flex-col bg-red-600 text-white overflow-hidden relative rounded-xl">
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-800/50"></div>
      
      <div className="flex items-center justify-between px-3 py-2 bg-red-700/80 backdrop-blur-sm border-b border-red-500/30">
         <div className="flex items-center gap-2">
            <AlertCircle size={16} className="animate-pulse text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Breaking News</span>
         </div>
         <div className="flex gap-1">
            <button onClick={prev} className="hover:bg-red-500/50 rounded p-0.5 transition-colors"><ChevronLeft size={12}/></button>
            <button onClick={next} className="hover:bg-red-500/50 rounded p-0.5 transition-colors"><ChevronRight size={12}/></button>
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 text-center bg-gradient-to-br from-red-600 to-red-700">
         <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 key={currentIndex} w-full">
            <p className="text-xs sm:text-sm font-bold leading-snug drop-shadow-sm">{item.text}</p>
            <span className="inline-block mt-3 text-[9px] bg-black/20 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold border border-white/10">
                {item.type}
            </span>
         </div>
      </div>
    </div>
  );
};
