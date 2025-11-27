import React, { useState, useEffect } from 'react';
import { MetricCardConfig } from '../types';
import { X, TrendingUp, Activity, Calendar, Download, Share2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MetricDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MetricCardConfig;
  value: number;
  formattedValue: string | number;
}

export const MetricDetailsModal: React.FC<MetricDetailsModalProps> = ({ isOpen, onClose, config, value, formattedValue }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    
    // Generate mock historical data
    const history = [];
    const baseValue = value;
    const now = new Date();
    
    for (let i = 24; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000); 
        // Add pseudo-random variance based on the metric type logic
        let val = baseValue;
        if (config.metricKey === 'totalAgents' || config.metricKey === 'registeredVoters') {
             val = baseValue + (Math.random() * 20 - 10);
        } else {
             const volatility = baseValue * 0.15;
             val = Math.max(0, baseValue + (Math.random() * volatility * 2 - volatility));
        }
        
        history.push({
            time: time.getHours() + ':00',
            value: Number(val.toFixed(1))
        });
    }
    setData(history);
  }, [isOpen, config, value]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80 sticky top-0">
            <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-white border border-gray-200 shadow-sm ${config.color || 'text-blue-600'}`}>
                    <Activity size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-black text-gray-900 leading-none tracking-tight">{config.title}</h2>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">Live Metric Analytics</p>
                </div>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
                <X size={20} />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
            {/* KPI Section */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
                <div>
                    <div className={`text-6xl font-black tracking-tighter leading-none ${config.color || 'text-gray-900'}`}>
                        {formattedValue}
                    </div>
                    <div className="text-sm font-medium text-gray-400 mt-2 flex items-center gap-2">
                        Current Reading
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-green-100">
                            <TrendingUp size={10} /> Live
                        </span>
                    </div>
                </div>
                
                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 gap-3 ml-0 sm:ml-auto">
                     <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[9px] text-gray-400 uppercase font-black tracking-wider mb-1">Peak (24h)</div>
                        <div className="text-xl font-bold text-gray-900">
                            {(value * 1.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[9px] text-gray-400 uppercase font-black tracking-wider mb-1">Low (24h)</div>
                        <div className="text-xl font-bold text-gray-900">
                            {(value * 0.88).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="h-72 w-full mb-6 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                        <Calendar size={14} /> Trend Analysis
                    </h3>
                    <div className="flex gap-1">
                        {['1H', '24H', '7D'].map(t => (
                            <button key={t} className={`px-2 py-1 text-[9px] font-bold rounded ${t === '24H' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                 </div>
                 <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={data}>
                         <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis 
                            dataKey="time" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#9CA3AF'}} 
                            minTickGap={30}
                        />
                        <YAxis 
                            hide 
                            domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            labelStyle={{ color: '#6B7280', fontSize: '10px', marginBottom: '2px', fontWeight: 'bold' }}
                            itemStyle={{ color: '#111827', fontWeight: 'bold', fontSize: '12px' }}
                            formatter={(value: number) => [value.toLocaleString(), 'Value']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#6366f1" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                        />
                    </AreaChart>
                 </ResponsiveContainer>
            </div>

            {/* Action Bar */}
            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                    <Download size={16} /> Export Data (CSV)
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
