import React from 'react';
import { MismatchData } from '../types';
import { Pause, FileSearch, Copy, AlertOctagon } from 'lucide-react';

interface IntegrityPanelProps {
  data: MismatchData[];
  ocrMismatch: number;
  duplicates: number;
}

export const IntegrityPanel: React.FC<IntegrityPanelProps> = ({ data, ocrMismatch, duplicates }) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 h-full flex flex-col overflow-hidden">
      <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-1.5">
        <ShieldCheckIcon /> Submission Integrity
      </h3>

      {/* Top Metrics */}
      <div className="flex gap-4 mb-3 border-b border-gray-50 pb-2">
        <div>
            <div className="flex items-baseline">
                <span className="text-xl xl:text-2xl font-black text-gray-900 tracking-tight">{ocrMismatch}</span>
                <span className="text-xs font-bold text-gray-400 ml-0.5">%</span>
            </div>
            <div className="text-[9px] text-gray-500 uppercase font-bold mt-0.5 tracking-wide">OCR Mismatch</div>
        </div>
        <div>
            <div className="text-xl xl:text-2xl font-black text-red-600 tracking-tight">{duplicates}</div>
            <div className="text-[9px] text-gray-500 uppercase font-bold mt-0.5 tracking-wide">Duplicates</div>
        </div>
      </div>

      {/* Duplicate Clusters Visualization */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-bold text-gray-800 uppercase flex items-center gap-1">
                <Copy size={10} className="text-orange-500"/> Duplicate Clusters
            </span>
            <span className="text-[9px] text-orange-600 bg-orange-50 px-1 rounded font-bold">3 Active</span>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
            {[1, 2, 3].map((cluster) => (
                <div key={cluster} className="min-w-[60px] h-12 bg-gray-100 rounded border border-gray-200 relative group cursor-pointer hover:border-orange-300">
                    <div className="absolute top-1 left-1 w-6 h-8 bg-gray-300 rounded-sm border border-white shadow-sm"></div>
                    <div className="absolute top-1 left-3 w-6 h-8 bg-gray-400 rounded-sm border border-white shadow-sm transform rotate-6"></div>
                    <div className="absolute bottom-1 right-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded-full shadow-md">
                        x{Math.floor(Math.random() * 5) + 2}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Top Flagged List */}
      <div className="flex-1 min-h-0 overflow-y-auto mb-2">
        <h4 className="text-[9px] font-bold text-gray-500 uppercase mb-1">Top Flagged Submissions</h4>
        <div className="space-y-1.5">
            {[
                {id: 'PU-LAG-004', reason: 'Blurry Image', score: 92},
                {id: 'PU-KAN-112', reason: 'Metadata Mismatch', score: 88},
                {id: 'PU-ABJ-099', reason: 'Pre-filled Form', score: 85},
            ].map((flag, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 bg-red-50/50 border border-red-100 rounded hover:bg-red-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <AlertOctagon size={12} className="text-red-500" />
                        <div>
                            <div className="text-[9px] font-bold text-gray-800">{flag.id}</div>
                            <div className="text-[8px] text-red-600 font-medium">{flag.reason}</div>
                        </div>
                    </div>
                    <div className="text-[9px] font-black text-red-700">{flag.score}</div>
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-gray-100">
        <button className="flex items-center justify-center gap-1.5 px-2 py-1.5 border border-gray-200 rounded text-[9px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-wide">
            <Pause size={10} />
            Pause Ingestion
        </button>
        <button className="flex items-center justify-center gap-1.5 px-2 py-1.5 border border-gray-200 rounded text-[9px] font-bold text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors shadow-sm uppercase tracking-wide">
            <FileSearch size={10} />
            Deep Audit
        </button>
      </div>
    </div>
  );
};

// Helper Icon
const ShieldCheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);