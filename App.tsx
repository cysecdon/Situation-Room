import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { StatusBanner } from './components/StatusBanner';
import { IncidentMap } from './components/IncidentMap';
import { FilterBar } from './components/FilterBar';
import { ResultMosaic } from './components/widgets/ResultMosaic';
import { CandidatesOverview } from './components/widgets/CandidatesOverview';
import { ConstituencyTable } from './components/widgets/ConstituencyTable';
import { ProvisionalData } from './components/widgets/ProvisionalData';
import { StatutoryGuidelines } from './components/widgets/StatutoryGuidelines';
import { RegulatoryGuidelines } from './components/widgets/RegulatoryGuidelines';
import { SocialMediaFeed } from './components/widgets/SocialMediaFeed';
import { EyewitnessVideo } from './components/widgets/EyewitnessVideo';
import { BreakingNews } from './components/widgets/BreakingNews';
import { RoamingAgent } from './components/widgets/RoamingAgent';
import { RoamingAgentTelemetry } from './components/widgets/RoamingAgentTelemetry';
import { CardConfigPanel } from './components/CardConfigPanel';
import { WidgetToolbox } from './components/WidgetToolbox';
import { WidgetWrapper } from './components/WidgetWrapper';
import { MetricDetailsModal } from './components/MetricDetailsModal';
import { DashboardMetrics, Incident, WidgetConfig, User, MetricCardConfig, WidgetDefinition } from './types';
import { analyzeSituation } from './services/geminiService';
import { AlertTriangle, Brain, RefreshCw, TrendingUp, Settings, MoreHorizontal, ArrowUpRight, ArrowDownRight, GripVertical, Plus, Undo2, Redo2 } from 'lucide-react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

// Wrap ResponsiveGridLayout with WidthProvider to automatically handle width changes
const ResponsiveGridLayout = WidthProvider(Responsive);

// --- MOCK DATA GENERATORS ---
const NIGERIA_LOCATIONS = [
  { name: 'Lagos', x: 15, y: 85, pus: ['PU 024/08/01/004', 'PU 011/02/05/092', 'PU 009/14/03/022'] },
  { name: 'Abuja', x: 50, y: 50, pus: ['PU 004/12/06/001', 'PU 018/03/01/055'] },
  { name: 'Kano', x: 50, y: 15, pus: ['PU 044/08/02/104', 'PU 021/05/09/012'] },
  { name: 'Rivers', x: 55, y: 90, pus: ['PU 032/11/04/008', 'PU 015/06/02/033'] },
  { name: 'Borno', x: 85, y: 20, pus: ['PU 012/04/07/005', 'PU 008/02/01/019'] },
];
const REPORTERS = ['John Doe (Observer)', 'Fatima Ali (Agent)', 'Ibrahim K. (PO)', 'Anonymous Citizen', 'Security Team A'];

const generateRandomIncident = (): Incident => {
  const types = ['Voter Miscount', 'Agent Offline', 'Suspicious Device', 'Violence', 'Logistics Delay', 'BVAS Bypass'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const severity = Math.random() > 0.9 ? 'Critical' : Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low';
  const loc = NIGERIA_LOCATIONS[Math.floor(Math.random() * NIGERIA_LOCATIONS.length)];
  const pu = loc.pus[Math.floor(Math.random() * loc.pus.length)];

  // Random offset for map
  const xOffset = (Math.random() - 0.5) * 5;
  const yOffset = (Math.random() - 0.5) * 5;

  return {
    id: Math.random().toString(36).substr(2, 6).toUpperCase(),
    type,
    time: new Date().toLocaleTimeString(),
    status: 'Open',
    severity,
    location: { x: loc.x + xOffset, y: loc.y + yOffset },
    locationName: loc.name,
    pollingUnit: pu,
    description: `Reported ${type} issue at ${pu}. Investigation required.`,
    reporter: {
        name: REPORTERS[Math.floor(Math.random() * REPORTERS.length)],
        role: 'Observer'
    },
    mediaUrl: Math.random() > 0.7 ? `https://source.unsplash.com/random/800x600/?election,nigeria,crowd&sig=${Math.random()}` : undefined
  };
};

// Initial Layout
const INITIAL_LAYOUT = [
    { i: 'map', x: 0, y: 0, w: 9, h: 9 },
    { i: 'video', x: 9, y: 0, w: 3, h: 9 },
];

interface HistoryState {
    layout: any[];
    widgets: string[];
}

export default function App() {
  // --- STATE ---
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    pollingUnitsReporting: 88.4,
    totalAgents: 14502,
    riskyAgents: 124,
    votesReceived: 8940211,
    registeredVoters: 24000000, 
    accreditedVoters: 9200000,
    anomalyScore: 12,
    ocrMismatchRate: 1.4,
    duplicateCount: 42,
    spoiledBallots: 1520,
    bvasUptime: 98.2,
    incidentRate: 4.5,
    pendingResults: 350,
    transmittedCount: 154890
  });
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Layout & Widgets
  const [layout, setLayout] = useState(INITIAL_LAYOUT);
  const [widgets, setWidgets] = useState<string[]>(['map', 'video']);
  const [droppingItem, setDroppingItem] = useState<any>(null); // For Drag & Drop from toolbox

  // Metric Cards Configuration
  const [showCardConfig, setShowCardConfig] = useState(false);
  const [activeCards, setActiveCards] = useState<MetricCardConfig[]>([
    { id: 'turnout', title: 'Turnout Rate', metricKey: 'turnoutPercentage', format: 'percentage', color: 'text-gray-900' },
    { id: 'reg_voters', title: 'Registered Voters', metricKey: 'registeredVoters', format: 'number', color: 'text-gray-600' },
    { id: 'acc_voters', title: 'Accredited Voters', metricKey: 'accreditedVoters', format: 'number', color: 'text-blue-600' },
    { id: 'total_votes', title: 'Total Votes', metricKey: 'totalBallots', format: 'number', color: 'text-gray-900' },
    { id: 'valid_votes', title: 'Total Valid Votes', metricKey: 'votesReceived', format: 'number', color: 'text-green-600' },
    { id: 'rejected', title: 'Rejected Ballots', metricKey: 'spoiledBallots', threshold: 5000, inverseThreshold: true, format: 'number', color: 'text-red-600' },
    { id: 'transmitted', title: 'Transmitted Results', metricKey: 'transmittedCount', format: 'number', color: 'text-blue-600' },
  ]);
  const [selectedMetric, setSelectedMetric] = useState<{config: MetricCardConfig, value: number, formatted: string | number} | null>(null);

  // Drag State for Cards
  const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);

  // --- UNDO / HISTORY STATE ---
  // We initialize history with the initial state
  const [history, setHistory] = useState<HistoryState[]>([{ layout: INITIAL_LAYOUT, widgets: ['map', 'video'] }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // --- EFFECTS ---
  useEffect(() => {
    // Initial Seed
    const initialIncidents = Array.from({ length: 8 }).map(generateRandomIncident);
    setIncidents(initialIncidents);

    // Simulation Loop
    const interval = setInterval(() => {
      // 1. New Incident (occasionally)
      if (Math.random() > 0.7) {
        const newInc = generateRandomIncident();
        setIncidents(prev => [newInc, ...prev].slice(0, 50));
      }

      // 2. Update Metrics
      setMetrics(prev => ({
        ...prev,
        pollingUnitsReporting: Math.min(100, prev.pollingUnitsReporting + (Math.random() * 0.1)),
        votesReceived: prev.votesReceived + Math.floor(Math.random() * 500),
        ocrMismatchRate: Math.max(0, prev.ocrMismatchRate + (Math.random() - 0.5) * 0.1),
        spoiledBallots: prev.spoiledBallots + (Math.random() > 0.8 ? 1 : 0),
        transmittedCount: prev.transmittedCount + Math.floor(Math.random() * 50)
      }));

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // --- UNDO / HISTORY LOGIC ---
  const saveToHistory = useCallback((newLayout: any[], newWidgets: string[]) => {
      // Prevent saving duplicates
      const current = history[historyIndex];
      if (_.isEqual(current.layout, newLayout) && _.isEqual(current.widgets, newWidgets)) {
          return;
      }

      const nextHistory = history.slice(0, historyIndex + 1);
      nextHistory.push({ layout: newLayout, widgets: newWidgets });
      
      // Limit history size to 50 steps
      if (nextHistory.length > 50) {
          nextHistory.shift();
      } else {
          setHistoryIndex(prev => prev + 1);
      }
      setHistory(nextHistory);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
      if (historyIndex > 0) {
          const prevIndex = historyIndex - 1;
          const prevState = history[prevIndex];
          setLayout(prevState.layout);
          setWidgets(prevState.widgets);
          setHistoryIndex(prevIndex);
      }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
      if (historyIndex < history.length - 1) {
          const nextIndex = historyIndex + 1;
          const nextState = history[nextIndex];
          setLayout(nextState.layout);
          setWidgets(nextState.widgets);
          setHistoryIndex(nextIndex);
      }
  }, [history, historyIndex]);

  // Keyboard Listener for Ctrl+Z
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
              if (e.shiftKey) {
                  redo();
              } else {
                  undo();
              }
              e.preventDefault();
          } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
              redo();
              e.preventDefault();
          }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // --- HANDLERS ---
  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeSituation(metrics, incidents);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleDragStart = (widgetDef: WidgetDefinition) => {
     setDroppingItem({
        i: widgetDef.type,
        w: widgetDef.defaultW,
        h: widgetDef.defaultH
     });
  };

  const onDrop = (newLayout: any[], layoutItem: any, _event: any) => {
      const widgetType = droppingItem?.i; 
      if (widgetType) {
          let updatedWidgets = [...widgets];
          if (!updatedWidgets.includes(widgetType)) {
              updatedWidgets.push(widgetType);
          }
          setWidgets(updatedWidgets);
          setLayout(newLayout);
          saveToHistory(newLayout, updatedWidgets);
      }
  };

  // Called when RGL internal layout changes (e.g. while dragging)
  // We only update local state here to keep UI fluid. 
  // History is saved on DragStop/ResizeStop.
  const onLayoutChange = (currentLayout: any[]) => {
      setLayout(currentLayout);
  };

  const onDragStop = (newLayout: any[]) => {
      saveToHistory(newLayout, widgets);
  };

  const onResizeStop = (newLayout: any[]) => {
      saveToHistory(newLayout, widgets);
  };

  const removeWidget = (id: string) => {
      const newWidgets = widgets.filter(w => w !== id);
      const newLayout = layout.filter(l => l.i !== id);
      setWidgets(newWidgets);
      setLayout(newLayout);
      saveToHistory(newLayout, newWidgets);
  };

  const toggleCard = (card: MetricCardConfig) => {
      if (activeCards.find(c => c.id === card.id)) {
          setActiveCards(prev => prev.filter(c => c.id !== card.id));
      } else {
          setActiveCards(prev => [...prev, card]);
      }
  };

  const openMetricDetails = (card: MetricCardConfig) => {
      const val = getMetricValue(card.metricKey);
      const fmt = formatMetric(val, card);
      setSelectedMetric({ config: card, value: val, formatted: fmt });
  };

  // Card Reordering Handlers
  const handleCardDragStart = (e: React.DragEvent, index: number) => {
      setDraggedCardIndex(index);
      e.dataTransfer.effectAllowed = "move";
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
      e.preventDefault(); 
      if (draggedCardIndex === null || draggedCardIndex === index) return;
      const newCards = [...activeCards];
      const draggedCard = newCards[draggedCardIndex];
      newCards.splice(draggedCardIndex, 1);
      newCards.splice(index, 0, draggedCard);
      setActiveCards(newCards);
      setDraggedCardIndex(index);
  };

  const handleCardDragEnd = () => {
      setDraggedCardIndex(null);
  };


  // --- RENDER HELPERS ---
  const getMetricValue = (key: string) => {
      if (key === 'turnoutPercentage') {
          return (metrics.accreditedVoters / metrics.registeredVoters) * 100;
      }
      if (key === 'totalBallots') {
          return metrics.votesReceived + metrics.spoiledBallots;
      }
      return (metrics as any)[key];
  };

  const formatMetric = (val: number, config: MetricCardConfig) => {
      if (config.format === 'percentage') return `${val.toFixed(1)}%`;
      if (config.format === 'decimal') return val.toFixed(1);
      return val.toLocaleString();
  };

  const renderWidget = (id: string) => {
      switch(id) {
          case 'map': return <IncidentMap incidents={incidents} />;
          case 'incidentMap': return <IncidentMap incidents={incidents} />;
          case 'video': return <EyewitnessVideo />;
          case 'resultMosaic': return <ResultMosaic />;
          case 'candidates': return <CandidatesOverview />;
          case 'constituency': return <ConstituencyTable />;
          case 'provisional': return <ProvisionalData />;
          case 'statutory': return <StatutoryGuidelines />;
          case 'regulatory': return <RegulatoryGuidelines />;
          case 'socialMedia': return <SocialMediaFeed />;
          case 'eyewitnessVideo': return <EyewitnessVideo />;
          case 'breakingNews': return <BreakingNews />;
          case 'roamingAgent': return <RoamingAgent />;
          case 'roamingTelemetry': return <RoamingAgentTelemetry />;
          default: return <div className="p-8 text-gray-300 flex items-center justify-center font-bold">Widget Ready</div>;
      }
  };

  const getWidgetTitle = (id: string) => {
      const titles: Record<string, string> = {
          map: 'Incident Map',
          incidentMap: 'Incident Map',
          video: 'Eyewitness Report',
          resultMosaic: 'Incident Mosaic',
          candidates: 'Candidates',
          constituency: 'Constituency Data',
          provisional: 'Provisional Results',
          statutory: 'Statutory Guidelines',
          regulatory: 'Regulatory Guidelines',
          socialMedia: 'Social Stream',
          eyewitnessVideo: 'Eyewitness Report',
          breakingNews: 'Breaking News',
          roamingAgent: 'Roaming Agent Ops',
          roamingTelemetry: 'Roaming Agent Telemetry'
      };
      return titles[id] || 'Widget';
  };

  return (
    <div className="flex flex-col h-screen bg-[#F6F8FC] overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
      <Header user={{ name: "Dr. Ngozi A.", role: "Chief Observer", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" }} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar Toolbox - Permanent */}
        <WidgetToolbox onDragItemStart={handleDragStart} />

        {/* Main Canvas - Adjusted margin for sidebar */}
        <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden ml-20 transition-all">
            
            {/* 1. FILTER BAR - Floating Island */}
            <div className="px-6 pt-6 pb-2 z-30 flex justify-center items-center relative">
               <div className="absolute left-6 flex gap-2">
                   <button 
                        onClick={undo} 
                        disabled={historyIndex <= 0}
                        className={`p-2 rounded-lg border transition-all ${historyIndex > 0 ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50' : 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed'}`}
                        title="Undo (Ctrl+Z)"
                   >
                       <Undo2 size={16} />
                   </button>
                   <button 
                        onClick={redo} 
                        disabled={historyIndex >= history.length - 1}
                        className={`p-2 rounded-lg border transition-all ${historyIndex < history.length - 1 ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50' : 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed'}`}
                        title="Redo (Ctrl+Shift+Z)"
                   >
                       <Redo2 size={16} />
                   </button>
               </div>
               <FilterBar />
            </div>

            {/* 2. HUD - Metric Cards */}
            <div className="flex-none px-8 py-6 overflow-x-auto scrollbar-hide z-20 flex items-center gap-4 snap-x">
               {/* Status Banner */}
               <div className="shrink-0 h-full snap-start">
                   <StatusBanner />
               </div>

               {/* Separator */}
               <div className="w-px bg-slate-300/50 h-16 self-center mx-2 rounded-full"></div>

               {/* Dynamic Cards */}
               {activeCards.map((card, index) => {
                   const val = getMetricValue(card.metricKey);
                   const isAlert = card.threshold && (card.inverseThreshold ? val > card.threshold : val < card.threshold);
                   const formatted = formatMetric(val, card);
                   const isDragging = draggedCardIndex === index;

                   return (
                       <div
                           key={card.id}
                           draggable
                           onDragStart={(e) => handleCardDragStart(e, index)}
                           onDragOver={(e) => handleCardDragOver(e, index)}
                           onDragEnd={handleCardDragEnd}
                           className={`
                                shrink-0 w-44 h-26 rounded-2xl relative transition-all duration-300 snap-center
                                ${isDragging ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}
                           `}
                       >
                           <button 
                               onClick={() => openMetricDetails(card)}
                               className={`
                                    w-full h-full bg-white rounded-3xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white
                                    flex flex-col justify-between text-left relative overflow-hidden group
                                    hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-blue-100 transition-all duration-300
                                    ring-1 ring-slate-100
                                    ${isAlert ? 'ring-2 ring-red-500/50 bg-red-50/10' : ''}
                               `}
                           >
                               {/* Hover Gradient Overlay */}
                               <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                               
                               <div className="flex justify-between items-start relative z-10">
                                   <div className="flex items-center gap-2 w-full overflow-hidden">
                                       <span className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors truncate`}>
                                           {card.title}
                                       </span>
                                   </div>
                                   {isAlert && <AlertTriangle size={12} className="text-red-500 animate-pulse shrink-0" />}
                               </div>
                               
                               <div className="relative z-10">
                                   <div className={`text-2xl font-black tracking-tight ${card.color || 'text-slate-800'}`}>
                                       {formatted}
                                   </div>
                                   {/* Mini Sparkline/Progress */}
                                   <div className="flex items-center gap-2 mt-2">
                                       <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${card.color?.replace('text-', 'bg-') || 'bg-slate-800'} transition-all duration-1000 ease-out`}
                                                style={{ width: `${Math.random() * 40 + 40}%` }}
                                            ></div>
                                       </div>
                                       <ArrowUpRight size={10} className="text-green-500" />
                                   </div>
                               </div>
                           </button>
                       </div>
                   );
               })}

               {/* Add Card Button */}
               <button 
                  onClick={() => setShowCardConfig(true)}
                  className="shrink-0 w-12 h-24 rounded-3xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all group"
               >
                   <Settings size={20} className="group-hover:rotate-90 transition-transform"/>
               </button>

               {/* AI Analysis Button - Floated Right or End of List */}
                <button 
                    onClick={handleAiAnalysis}
                    className="shrink-0 h-24 w-60 bg-slate-900 rounded-3xl p-4 shadow-xl shadow-slate-900/10 text-left group relative overflow-hidden ml-4 hover:scale-[1.02] transition-transform"
                >
                    <div className="absolute -top-6 -right-6 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain size={80} className="text-white rotate-12" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-widest">
                            <Brain size={14} /> AI Analysis
                        </div>
                        <div className="text-white text-xs leading-snug line-clamp-2 font-medium pr-4 opacity-90">
                            {isAnalyzing ? (
                                <span className="flex items-center gap-2">
                                    <RefreshCw size={12} className="animate-spin" /> Generating insight...
                                </span>
                            ) : aiAnalysis ? (
                                aiAnalysis
                            ) : (
                                "Generate security & integrity report..."
                            )}
                        </div>
                    </div>
                </button>
            </div>

            {/* 3. Grid Canvas */}
            <div className="flex-1 overflow-y-auto px-6 pb-32 custom-scrollbar">
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{ lg: layout }}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={60}
                    isDraggable={true}
                    isResizable={true}
                    margin={[20, 20]}
                    onLayoutChange={onLayoutChange}
                    onDragStop={onDragStop}
                    onResizeStop={onResizeStop}
                    onDrop={onDrop}
                    isDroppable={true}
                    droppingItem={droppingItem}
                    draggableHandle=".widget-drag-handle"
                >
                    {widgets.map(key => (
                        <div key={key}>
                            <WidgetWrapper 
                                title={getWidgetTitle(key)} 
                                onRemove={() => removeWidget(key)}
                                className="h-full"
                            >
                                {renderWidget(key)}
                            </WidgetWrapper>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </main>
      </div>

      {/* Modals & Panels */}
      <CardConfigPanel 
          isOpen={showCardConfig} 
          onClose={() => setShowCardConfig(false)} 
          activeCards={activeCards}
          onToggleCard={toggleCard}
      />

      {selectedMetric && (
          <MetricDetailsModal 
             isOpen={!!selectedMetric}
             onClose={() => setSelectedMetric(null)}
             config={selectedMetric.config}
             value={selectedMetric.value}
             formattedValue={selectedMetric.formatted}
          />
      )}
    </div>
  );
}