import React, { useRef, useEffect } from 'react';
import { Incident } from '../types';
import { Play, MessageCircle, Heart, MapPin } from 'lucide-react';

interface MediaFeedProps {
  incidents: Incident[];
}

export const MediaFeed: React.FC<MediaFeedProps> = ({ incidents }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [incidents]);

  return (
    <div className="bg-black h-full flex flex-col relative">
      <div className="absolute top-2 left-2 z-20 flex items-center gap-2">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
        <span className="text-white font-black text-[10px] tracking-widest drop-shadow-md">LIVE</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      >
        {incidents.filter(i => i.mediaUrl).map((incident) => (
          <div key={incident.id} className="relative w-full h-full min-h-[200px] snap-center bg-gray-900 border-b border-gray-800">
            {/* Media Background */}
            <img 
                src={incident.mediaUrl} 
                alt={incident.type}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10 bg-gradient-to-t from-black/90 to-transparent pt-8">
                <div className="flex items-start justify-between">
                    <div className="w-full pr-8">
                        <div className="inline-block px-1.5 py-0.5 bg-red-600 rounded text-[8px] font-black uppercase tracking-wider mb-1 shadow-sm">
                            {incident.type}
                        </div>
                        <h4 className="font-bold text-xs mb-1 leading-snug shadow-black drop-shadow-md truncate">{incident.description}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-gray-300 mb-2 font-medium">
                            <MapPin size={10} />
                            <span className="truncate">{incident.pollingUnit}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};