
import React, { useState, useEffect } from 'react';
import { WitnessReport } from '../../types';
import { Eye, MapPin, CheckCircle, Clock } from 'lucide-react';

export const WitnessReports: React.FC = () => {
  const [reports, setReports] = useState<WitnessReport[]>([]);

  useEffect(() => {
    const MOCK_REPORTS: WitnessReport[] = [
        { id: '1', reporter: 'Observer Team Alpha', location: 'Lagos - Surulere', content: 'Polling unit opened 30 minutes late due to logistics.', time: '08:45 AM', verified: true },
        { id: '2', reporter: 'Citizen Journalist', location: 'Kano - Municipal', content: 'Peaceful voting ongoing. High turnout observed.', time: '09:15 AM', verified: false },
        { id: '3', reporter: 'Agent 009', location: 'Rivers - PH', content: 'BVAS device glitch reported. Tech support on site.', time: '10:02 AM', verified: true },
        { id: '4', reporter: 'SecureMonitor', location: 'Abuja - Garki', content: 'Crowd control needed at PU 012. Police notified.', time: '10:30 AM', verified: true },
    ];
    setReports(MOCK_REPORTS);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        <div className="p-2 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <Eye size={12} /> Field Reports
            </h4>
            <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                {reports.length} New
            </span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {reports.map((report) => (
                <div key={report.id} className="border-l-2 border-blue-500 pl-2 py-1 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold text-gray-900">{report.reporter}</span>
                        <div className="flex items-center gap-1 text-[9px] text-gray-400 font-mono">
                            <Clock size={8} /> {report.time}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-gray-500 mb-1">
                        <MapPin size={8} /> {report.location}
                    </div>
                    <p className="text-[10px] text-gray-700 leading-snug">{report.content}</p>
                    {report.verified && (
                        <div className="flex items-center gap-1 mt-1 text-[8px] text-green-600 font-bold uppercase">
                            <CheckCircle size={8} /> Verified
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};
