
import React from 'react';
import { MetricCardConfig } from '../types';
import { X, Plus, Check, TrendingUp, AlertTriangle, Users, FileText, Smartphone, Ban, Clock, CheckCircle, UploadCloud, UserCheck, UserPlus } from 'lucide-react';

interface CardConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeCards: MetricCardConfig[];
  onToggleCard: (card: MetricCardConfig) => void;
}

const AVAILABLE_CARDS: MetricCardConfig[] = [
    { id: 'turnout', title: 'Turnout Rate', metricKey: 'turnoutPercentage', format: 'percentage', color: 'text-gray-900' },
    { id: 'reg_voters', title: 'Registered Voters', metricKey: 'registeredVoters', format: 'number', color: 'text-gray-600' },
    { id: 'acc_voters', title: 'Accredited Voters', metricKey: 'accreditedVoters', format: 'number', color: 'text-blue-600' },
    { id: 'active_agents', title: 'Active Agents', metricKey: 'totalAgents', format: 'number', color: 'text-blue-600' },
    { id: 'total_votes', title: 'Total Votes', metricKey: 'totalBallots', format: 'number', color: 'text-gray-900' },
    { id: 'valid_votes', title: 'Total Valid Votes', metricKey: 'votesReceived', format: 'number', color: 'text-green-600' },
    { id: 'rejected', title: 'Rejected Ballots', metricKey: 'spoiledBallots', threshold: 1000, inverseThreshold: true, format: 'number', color: 'text-red-600' },
    { id: 'transmitted', title: 'Transmitted Results', metricKey: 'transmittedCount', format: 'number', color: 'text-blue-600' },
    { id: 'pending', title: 'Pending Results', metricKey: 'pendingResults', format: 'number', color: 'text-yellow-600' },
    { id: 'provisional', title: 'Provisional Results', metricKey: 'pendingResults', format: 'number', color: 'text-orange-600' },
];

export const CardConfigPanel: React.FC<CardConfigPanelProps> = ({ isOpen, onClose, activeCards, onToggleCard }) => {
  if (!isOpen) return null;

  const isActive = (id: string) => activeCards.some(c => c.id === id);

  const getIcon = (id: string) => {
    switch(id) {
        case 'turnout': return <TrendingUp size={14} />;
        case 'active_agents': return <Users size={14} />;
        case 'reg_voters': return <UserPlus size={14} />;
        case 'acc_voters': return <UserCheck size={14} />;
        case 'total_votes': return <FileText size={14} />;
        case 'valid_votes': return <CheckCircle size={14} />;
        case 'rejected': return <Ban size={14} />;
        case 'transmitted': return <UploadCloud size={14} />;
        case 'pending': return <Clock size={14} />;
        default: return <FileText size={14} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Configure Dashboard Metrics</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X size={16} className="text-gray-500" />
            </button>
        </div>
        
        <div className="p-4 grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
            {AVAILABLE_CARDS.map((card) => {
                const active = isActive(card.id);
                return (
                    <div 
                        key={card.id}
                        onClick={() => onToggleCard(card)}
                        className={`
                            p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 relative group
                            ${active ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-blue-200 bg-white'}
                        `}
                    >
                        <div className={`p-2 rounded-md ${active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                            {getIcon(card.id)}
                        </div>
                        <div>
                            <h4 className={`font-bold text-xs ${active ? 'text-blue-900' : 'text-gray-700'}`}>{card.title}</h4>
                            <p className="text-[9px] text-gray-500 mt-1">
                                {card.id === 'reg_voters' ? 'Total registered' : 
                                 card.id === 'acc_voters' ? 'Biometrically verified' : 
                                 'Live data metric'}
                            </p>
                        </div>
                        {active && (
                            <div className="absolute top-2 right-2 text-blue-600">
                                <Check size={14} strokeWidth={3} />
                            </div>
                        )}
                        {!active && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-300">
                                <Plus size={14} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-right">
            <span className="text-[10px] text-gray-400 mr-2">{activeCards.length} cards selected</span>
            <button 
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded shadow-sm transition-colors"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};
