
import React from 'react';
import { Heart, MessageCircle, Share2, MapPin, Music2, User, Plus, Search, MoreHorizontal } from 'lucide-react';

const VIDEOS = [
    { 
        id: '1', 
        loc: 'Lagos - Surulere', 
        desc: 'The energy at PU 004 is unmatched! Voters waiting patiently despite the rain. 🌧️✊🏾 #NigeriaDecides2023 #LagosVotes', 
        img: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=600',
        user: 'Chioma_V',
        likes: '12.4K',
        comments: '842',
        music: 'Original Sound - Chioma_V'
    },
    { 
        id: '2', 
        loc: 'Kano - Municipal', 
        desc: 'Voting process is smooth here. BVAS working perfectly. kudos to the officials! 👏🏾 #Kano #ElectionDay', 
        img: 'https://images.unsplash.com/photo-1541872703-74c596649ede?auto=format&fit=crop&q=80&w=600',
        user: 'Musa_Ali_Official',
        likes: '8.9K',
        comments: '230',
        music: 'Afrobeats Chill Mix'
    },
    { 
        id: '3', 
        loc: 'Abuja - Garki', 
        desc: 'Security briefing underway. Everything seems calm so far. Observers are present. 🛡️🇳🇬', 
        img: 'https://images.unsplash.com/photo-1461301214746-1e790926d323?auto=format&fit=crop&q=80&w=600',
        user: 'Situation_Room_Abj',
        likes: '3.1K',
        comments: '115',
        music: 'Democracy (Instrumental)'
    },
    { 
        id: '4', 
        loc: 'Rivers - PH', 
        desc: 'Materials just arrived! We are starting late but we move! 🚚📦 #RiversDecides', 
        img: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&q=80&w=600',
        user: 'PH_City_Boy',
        likes: '15.2K',
        comments: '1.2K',
        music: 'High Tension - SoundEffect'
    },
];

export const EyewitnessVideo: React.FC = () => {
  return (
    <div className="h-full bg-black text-white relative flex flex-col overflow-hidden">
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-3 pb-6 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start px-3 pointer-events-none">
            <div className="flex gap-4 text-xs font-bold pointer-events-auto">
                <span className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity">Following</span>
                <span className="opacity-100 border-b-2 border-white pb-0.5 cursor-pointer">For You</span>
            </div>
            <Search className="w-5 h-5 opacity-80 pointer-events-auto cursor-pointer" />
        </div>

        {/* Scroll Container */}
        <div className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide">
            {VIDEOS.map((vid) => (
                <div key={vid.id} className="relative w-full h-full snap-center bg-gray-900 flex items-center justify-center shrink-0">
                    {/* Video/Image Background */}
                    <img 
                        src={vid.img} 
                        alt={vid.desc}
                        className="absolute inset-0 w-full h-full object-cover opacity-80" 
                    />
                    
                    {/* Shadow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>

                    {/* Right Interaction Sidebar */}
                    <div className="absolute right-2 bottom-16 flex flex-col items-center gap-4 z-20">
                        {/* Avatar */}
                        <div className="relative mb-2 cursor-pointer group">
                            <div className="w-10 h-10 rounded-full border border-white p-0.5 overflow-hidden bg-gray-800">
                                <div className="w-full h-full bg-gray-500 flex items-center justify-center text-[10px] font-bold">
                                    {vid.user[0]}
                                </div>
                            </div>
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white border border-gray-900 group-hover:scale-110 transition-transform">
                                <Plus size={10} strokeWidth={4} />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full transition-transform group-active:scale-90">
                                <Heart size={24} className="text-white drop-shadow-lg group-hover:fill-white/20" />
                            </div>
                            <span className="text-[10px] font-bold drop-shadow-md">{vid.likes}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full transition-transform group-active:scale-90">
                                <MessageCircle size={24} className="text-white drop-shadow-lg group-hover:fill-white/20" />
                            </div>
                            <span className="text-[10px] font-bold drop-shadow-md">{vid.comments}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full transition-transform group-active:scale-90">
                                <Share2 size={24} className="text-white drop-shadow-lg group-hover:fill-white/20" />
                            </div>
                            <span className="text-[10px] font-bold drop-shadow-md">Share</span>
                        </div>
                        
                         <div className="flex flex-col items-center gap-1 cursor-pointer mt-2">
                            <MoreHorizontal size={24} className="text-white/80 drop-shadow-lg" />
                        </div>
                    </div>

                    {/* Bottom Info Section */}
                    <div className="absolute bottom-0 left-0 right-14 z-20 p-3 pb-4 flex flex-col gap-2">
                        <div>
                            <h3 className="font-bold text-sm shadow-black drop-shadow-md mb-1 cursor-pointer hover:underline">@{vid.user}</h3>
                            <p className="text-xs leading-snug shadow-black drop-shadow-md line-clamp-3">
                                {vid.desc}
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] font-bold cursor-pointer hover:bg-white/30 transition-colors">
                                <MapPin size={10} className="text-red-400" />
                                {vid.loc}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-1 opacity-90">
                             <div className="flex items-center gap-2 text-[10px] font-medium overflow-hidden">
                                <Music2 size={12} />
                                <div className="truncate w-32">
                                    {vid.music}
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Spinning Disc Animation */}
                    <div className="absolute bottom-4 right-2 z-20">
                         <div className="w-10 h-10 bg-gray-800 rounded-full border-[3px] border-gray-900 flex items-center justify-center animate-spin-slow overflow-hidden">
                            <img src={vid.img} className="w-full h-full object-cover opacity-70" alt="Album Art" />
                         </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Custom Styles for this component only */}
        <style>{`
            .animate-spin-slow {
                animation: spin 4s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
  );
};
