
import React from 'react';
import { X, GripHorizontal, Maximize2, MoreHorizontal } from 'lucide-react';

interface WidgetWrapperProps {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
  // injected by react-grid-layout
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  classNameFromLayout?: string; 
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ 
    title, 
    onRemove, 
    children, 
    style, 
    className, 
    onMouseDown, 
    onMouseUp, 
    onTouchEnd,
    classNameFromLayout,
    ...props
}) => {
  return (
    <div 
        style={style} 
        className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-slate-900/5 flex flex-col overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ${classNameFromLayout} ${className}`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
    >
      {/* Integrated Header - Minimalist */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-5 z-20 pointer-events-none">
        {/* Title floats over content or sits in padding area depending on design. 
            Here we ensure the widget content has top padding to accommodate this. */}
         <div className="flex items-center gap-3 pt-4">
             <div className="cursor-move widget-drag-handle pointer-events-auto opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-100">
                <GripHorizontal size={18} className="text-slate-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-slate-100">{title}</span>
         </div>
         
         <div className="flex items-center gap-1 pt-4 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-2 group-hover:translate-y-0 duration-200">
             <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-700 transition-colors">
                <Maximize2 size={14} />
            </button>
            {onRemove && (
                <button onClick={onRemove} className="p-2 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                    <X size={14} />
                </button>
            )}
         </div>
      </div>
      
      {/* Widget Content - Added padding top to clear the floating header */}
      <div className="flex-1 min-h-0 relative overflow-hidden pt-12">
        {children}
      </div>
    </div>
  );
};
