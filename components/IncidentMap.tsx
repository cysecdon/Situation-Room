import React from 'react';
import { Incident } from '../types';
import { MapPin, Search, Plus, Minus, Layers, Navigation } from 'lucide-react';

interface IncidentMapProps {
  incidents: Incident[];
}

export const IncidentMap: React.FC<IncidentMapProps> = ({ incidents }) => {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden relative group bg-white">
      {/* Map Viewport */}
      <div className="relative flex-1 w-full bg-[#AADAFF] overflow-hidden">
        
        {/* Map Background Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Nigeria_location_map.svg/1024px-Nigeria_location_map.svg.png" 
                alt="Nigeria Map"
                className="w-full h-full object-cover scale-125 opacity-90 mix-blend-multiply"
                style={{ 
                    filter: 'sepia(10%) brightness(105%) contrast(90%)',
                    backgroundColor: '#F4F4F4'
                }}
            />
        </div>
        
        {/* Grid/Road Simulation */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-5"
             style={{ backgroundImage: 'linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Pins Layer */}
        <div className="absolute inset-0">
            {incidents.map((incident) => (
            <div
                key={incident.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group/pin hover:z-50 transition-all duration-300"
                style={{ left: `${incident.location.x}%`, top: `${incident.location.y}%` }}
            >
                {/* Google Maps Style Pin - Larger */}
                <div className="relative flex flex-col items-center">
                    <div className={`
                        w-8 h-8 rounded-full rounded-bl-none transform -rotate-45 border-[2px] border-white shadow-xl flex items-center justify-center
                        ${incident.status === 'Resolved' ? 'bg-[#0F9D58]' : incident.status === 'Escalated' ? 'bg-[#DB4437]' : 'bg-[#EA4335]'}
                    `}>
                         <div className="transform rotate-45">
                            <MapPin className="text-white w-4 h-4" fill="currentColor" />
                         </div>
                    </div>
                </div>
                
                {/* Info Window (Tooltip) */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block min-w-[200px] bg-white text-gray-800 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.2)] z-50 overflow-hidden font-sans">
                    <div className="p-3">
                        <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{incident.pollingUnit}</h4>
                        <p className="text-gray-500 text-xs truncate">{incident.locationName}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>

         {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1">
            <button className="p-1.5 bg-white rounded shadow text-gray-600 hover:text-gray-900">
                <Plus size={16} />
            </button>
            <button className="p-1.5 bg-white rounded shadow text-gray-600 hover:text-gray-900">
                <Minus size={16} />
            </button>
        </div>
      </div>
      
      {/* Map Attribution */}
      <div className="absolute bottom-0 right-0 bg-white/80 px-2 py-0.5 text-[8px] text-gray-500 flex items-center gap-1 pointer-events-none">
        <span className="font-medium text-gray-600">Google</span>
        <span>Map data ©2024</span>
      </div>
    </div>
  );
};