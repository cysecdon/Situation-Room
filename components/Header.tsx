
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Radio, UserCircle, ChevronDown, Bell, Search, Menu } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user?: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 sticky top-0 z-40 flex justify-between items-center transition-all">
      {/* Left: Branding */}
      <div className="flex items-center gap-4">
        <div className="md:hidden text-slate-500 p-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
            <Menu size={24} />
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg shadow-slate-900/20">
                <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
                <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">Situation Room</h1>
                <p className="text-[10px] text-slate-500 font-bold tracking-[0.25em] uppercase mt-1">Election Monitoring Portal</p>
            </div>
        </div>
      </div>
      
      {/* Center: Search */}
      <div className="hidden md:block flex-1 max-w-lg mx-12">
         <div className="relative group">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                <Search size={16} />
             </div>
             <input 
                type="text" 
                placeholder="Search polling units, incidents, or staff..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-200 rounded-full text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 text-slate-700"
             />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <kbd className="hidden lg:inline-flex items-center h-5 px-1.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded shadow-sm">⌘K</kbd>
             </div>
         </div>
      </div>

      {/* Right: Controls & User */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* System Status */}
        <div className="hidden xl:flex items-center gap-3 text-slate-500 font-mono text-xs bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60">
            <span className="font-bold text-slate-600">{time.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute:'2-digit' })}</span>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-2">
             <button className="relative p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-1 ring-white"></span>
             </button>

             {user && (
                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">{user.name}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 p-0.5 border border-slate-200 group-hover:border-blue-300 group-hover:shadow-md transition-all overflow-hidden relative">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
                                <UserCircle size={24} />
                            </div>
                        )}
                    </div>
                </div>
             )}
        </div>
      </div>
    </header>
  );
};
