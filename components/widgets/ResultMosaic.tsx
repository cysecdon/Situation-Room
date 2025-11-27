
import React from 'react';
import { Image, Video, Mic, FileText, Play, Film } from 'lucide-react';

interface MosaicItem {
    id: string;
    type: 'image' | 'video' | 'audio' | 'text';
    content: string; // url or text content
    pu: string;
    timestamp: string;
}

const MOCK_DATA: MosaicItem[] = [
    { id: '1', type: 'image', content: 'https://images.unsplash.com/photo-1541872703-74c596649ede?auto=format&fit=crop&q=60&w=200', pu: 'PU-001', timestamp: '10:00' },
    { id: '2', type: 'text', content: 'Party agents reported arguing near the main gate. Police intervention requested.', pu: 'PU-023', timestamp: '10:05' },
    { id: '3', type: 'video', content: 'https://images.unsplash.com/photo-1616423640778-2cfd1e25016f?auto=format&fit=crop&q=60&w=200', pu: 'PU-112', timestamp: '10:12' },
    { id: '4', type: 'audio', content: 'Audio Report #442', pu: 'PU-009', timestamp: '10:15' },
    { id: '5', type: 'image', content: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=60&w=200', pu: 'PU-088', timestamp: '10:20' },
    { id: '6', type: 'text', content: 'BVAS battery is critically low. PO requesting power bank backup immediately.', pu: 'PU-004', timestamp: '10:22' },
    { id: '7', type: 'video', content: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=60&w=200', pu: 'PU-056', timestamp: '10:30' },
    { id: '8', type: 'audio', content: 'Audio Report #445', pu: 'PU-099', timestamp: '10:35' },
    { id: '9', type: 'image', content: 'https://images.unsplash.com/photo-1544928147-79a2af1f9867?auto=format&fit=crop&q=60&w=200', pu: 'PU-102', timestamp: '10:40' },
    { id: '10', type: 'text', content: 'Voting materials arrived late. Crowd is agitated but peaceful.', pu: 'PU-LAG-05', timestamp: '10:45' },
    { id: '11', type: 'image', content: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=60&w=200', pu: 'PU-KAN-22', timestamp: '10:50' },
    { id: '12', type: 'video', content: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=60&w=200', pu: 'PU-ABJ-01', timestamp: '10:55' },
];

export const ResultMosaic: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        <div className="p-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
             <h4 className="text-[10px] font-bold text-gray-500 uppercase">Incoming Evidence</h4>
             <span className="text-[9px] font-mono text-gray-400">Mixed Media Stream</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
            <div className="grid grid-cols-3 gap-1 auto-rows-[80px]">
                {MOCK_DATA.map((item) => (
                    <div key={item.id} className={`relative group cursor-pointer overflow-hidden rounded border border-gray-100 transition-transform hover:z-10 hover:scale-105 ${item.type === 'text' ? 'bg-yellow-50' : item.type === 'audio' ? 'bg-purple-50' : 'bg-gray-200'}`}>
                        {item.type === 'image' && (
                            <img src={item.content} alt="" className="w-full h-full object-cover" />
                        )}
                        {item.type === 'video' && (
                            <>
                                <img src={item.content} alt="" className="w-full h-full object-cover opacity-90" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center">
                                        <Play size={10} className="ml-0.5 text-white fill-white"/>
                                    </div>
                                </div>
                            </>
                        )}
                        {item.type === 'text' && (
                            <div className="p-1.5 h-full flex flex-col justify-between">
                                <FileText size={12} className="text-yellow-600 mb-1 opacity-50" />
                                <p className="text-[8px] leading-tight text-gray-800 line-clamp-3 font-medium">{item.content}</p>
                            </div>
                        )}
                        {item.type === 'audio' && (
                             <div className="h-full flex flex-col items-center justify-center text-purple-600 gap-1">
                                <Mic size={16} className="opacity-80" />
                                <div className="flex gap-0.5 items-end h-3">
                                    <div className="w-0.5 bg-purple-400 h-1 animate-pulse"></div>
                                    <div className="w-0.5 bg-purple-400 h-2 animate-pulse delay-75"></div>
                                    <div className="w-0.5 bg-purple-400 h-3 animate-pulse delay-150"></div>
                                    <div className="w-0.5 bg-purple-400 h-1 animate-pulse"></div>
                                </div>
                             </div>
                        )}
                        
                        {/* Overlay Info */}
                        <div className="absolute top-0 right-0 bg-black/60 text-white text-[7px] px-1 rounded-bl font-bold backdrop-blur-sm shadow-sm">
                            {item.timestamp}
                        </div>
                         <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[7px] px-1 rounded-tr font-bold backdrop-blur-sm shadow-sm">
                            {item.pu}
                        </div>
                        
                        {/* Hover Type Icon for img/video */}
                        {(item.type === 'image' || item.type === 'video') && (
                            <div className="absolute top-0 left-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.type === 'image' ? <Image size={10} className="text-white drop-shadow-md"/> : <Film size={10} className="text-white drop-shadow-md"/>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
