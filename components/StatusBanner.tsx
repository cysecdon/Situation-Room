
import React, { useState, useEffect } from 'react';
import { CircleDot, Clock, Calendar, History, ShieldCheck, Wifi, Activity } from 'lucide-react';

export const StatusBanner: React.FC = () => {
  const [timeDisplay, setTimeDisplay] = useState('');
  const [phase, setPhase] = useState<'pre' | 'active' | 'post'>('active');

  useEffect(() => {
    // --- MOCK CONFIGURATION FOR DEMO ---
    const now = new Date().getTime();
    const POLL_DURATION = 24 * 60 * 60 * 1000; // 24 Hours
    const POLLS_START = now - (4 * 60 * 60 * 1000); 
    const POLLS_END = POLLS_START + POLL_DURATION;

    const interval = setInterval(() => {
      const current = new Date().getTime();
      let diff = 0;
      let currentPhase: 'pre' | 'active' | 'post' = 'active';

      if (current < POLLS_START) {
        currentPhase = 'pre';
        diff = POLLS_START - current;
      } else if (current < POLLS_END) {
        currentPhase = 'active';
        diff = POLLS_END - current;
      } else {
        currentPhase = 'post';
        diff = current - POLLS_END;
      }

      setPhase(currentPhase);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const h = hours.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      const s = seconds.toString().padStart(2, '0');

      if (days > 0) {
        setTimeDisplay(`${days}d ${h}:${m}:${s}`);
      } else {
        setTimeDisplay(`${h}:${m}:${s}`);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getPhaseColor = () => {
      if (phase === 'active') return 'text-red-500';
      if (phase === 'pre') return 'text-amber-500';
      return 'text-blue-500';
  };

  const getLabel = () => {
      if (phase === 'active') return 'POLLS CLOSING IN';
      if (phase === 'pre') return 'POLLS OPENING IN';
      return 'TIME POST-ELECTION';
  };

  return (
    <div className="flex flex-col justify-center h-full gap-2">
        {/* System Pill */}
        <div className="flex items-center gap-2 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-100 w-max backdrop-blur-sm">
             <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">System Optimal</span>
        </div>

        {/* Timer Block */}
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-4 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${phase === 'active' ? 'bg-red-500' : phase === 'pre' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
            <div className={`p-2 rounded-xl ${phase === 'active' ? 'bg-red-50 text-red-500' : phase === 'pre' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                <Clock size={18} strokeWidth={2.5} />
            </div>
            <div>
                <div className={`text-[9px] font-black uppercase tracking-widest mb-0.5 ${getPhaseColor()}`}>
                    {getLabel()}
                </div>
                <div className="text-xl font-mono font-bold text-slate-800 leading-none tracking-tight">
                    {timeDisplay || "--:--:--"}
                </div>
            </div>
        </div>
    </div>
  );
};
