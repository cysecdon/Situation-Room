import React, { useState } from 'react';
import { LayoutGrid, Box, Map, MessageCircle, Grid, Users, FileWarning, Scale, FileText, Newspaper, Video, MousePointer2, ChevronRight, Radio, Activity } from 'lucide-react';
import { WidgetDefinition } from '../types';
import { createPortal } from 'react-dom';

interface WidgetToolboxProps {
    onDragItemStart: (widget: WidgetDefinition) => void;
}

const AVAILABLE_WIDGETS: WidgetDefinition[] = [
    { type: 'breakingNews', title: 'Breaking News', defaultW: 4, defaultH: 3, category: 'Media', icon: <Newspaper size={20}/> },
    { type: 'eyewitnessVideo', title: 'Eyewitness Report', defaultW: 3, defaultH: 8, category: 'Media', icon: <Video size={20}/> },
    { type: 'socialMedia', title: 'Social Stream', defaultW: 3, defaultH: 6, category: 'Media', icon: <MessageCircle size={20}/> },
    { type: 'incidentMap', title: 'Incident Map', defaultW: 6, defaultH: 8, category: 'Data', icon: <Map size={20}/> },
    { type: 'resultMosaic', title: 'Incident Mosaic', defaultW: 6, defaultH: 7, category: 'Data', icon: <Grid size={20}/> },
    { type: 'candidates', title: 'Candidates', defaultW: 3, defaultH: 5, category: 'Data', icon: <Users size={20}/> },
    { type: 'constituency', title: 'Constituency Data', defaultW: 4, defaultH: 6, category: 'Data', icon: <Map size={20}/> },
    { type: 'provisional', title: 'Provisional Results', defaultW: 3, defaultH: 5, category: 'Data', icon: <FileWarning size={20}/> },
    { type: 'roamingAgent', title: 'Roaming Agent Ops', defaultW: 4, defaultH: 6, category: 'Operations', icon: <Activity size={20}/> },
    { type: 'roamingTelemetry', title: 'Agent Telemetry', defaultW: 3, defaultH: 5, category: 'Operations', icon: <Radio size={20}/> },
    { type: 'statutory', title: 'Statutory Guidelines', defaultW: 3, defaultH: 6, category: 'References', icon: <Scale size={20}/> },
    { type: 'regulatory', title: 'Regulatory Guidelines', defaultW: 3, defaultH: 6, category: 'References', icon: <FileText size={20}/> },
];

export const WidgetToolbox: React.FC<WidgetToolboxProps> = ({ onDragItemStart }) => {

  const onDragStart = (e: React.DragEvent, widget: WidgetDefinition) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(widget));
    onDragItemStart(widget);
  };

  return (
    <div className="fixed left-4 top-24 bottom-6 z-50 flex flex-col w-16 hover:w-64 bg-white/95 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden transition-all duration-300 group ease-out">
        
        {/* Header Icon */}
        <div className="shrink-0 h-16 flex items-center border-b border-slate-100 bg-slate-50/50 text-slate-400 relative overflow-hidden">
            <div className="w-16 flex justify-center items-center shrink-0 h-full">
                 <LayoutGrid size={22} />
            </div>
            <span className="font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden absolute left-16">
                Widget Library
            </span>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-3 flex flex-col gap-2 px-2">
            {AVAILABLE_WIDGETS.map((widget, index) => {
                const prev = AVAILABLE_WIDGETS[index - 1];
                const showSeparator = prev && prev.category !== widget.category;

                return (
                    <React.Fragment key={widget.type}>
                        {showSeparator && (
                            <div className="px-2 my-1 overflow-hidden">
                                <div className="h-px bg-slate-100 w-full mb-1"></div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-bold text-slate-400 uppercase px-1 truncate">
                                    {widget.category}
                                </div>
                            </div>
                        )}
                        
                        <div 
                            draggable={true}
                            onDragStart={(e) => onDragStart(e, widget)}
                            className="
                                flex items-center h-12 rounded-xl cursor-grab active:cursor-grabbing 
                                bg-transparent hover:bg-blue-50 text-slate-500 hover:text-blue-600
                                border border-transparent hover:border-blue-100
                                transition-all duration-200 relative overflow-hidden group/item
                                shrink-0
                            "
                        >
                            <div className="w-12 flex justify-center items-center shrink-0 h-full">
                                {widget.icon || <Box size={20}/>}
                            </div>
                            <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap delay-75 absolute left-12">
                                {widget.title}
                            </span>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>

        {/* Footer / Hint */}
        <div className="shrink-0 h-12 flex items-center border-t border-slate-100 bg-slate-50/50 text-slate-300 relative overflow-hidden">
             <div className="w-16 flex justify-center items-center shrink-0 h-full">
                <MousePointer2 size={16} />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-16">
                Drag to Dashboard
             </span>
        </div>
    </div>
  );
};