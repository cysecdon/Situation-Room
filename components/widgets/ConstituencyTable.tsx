
import React from 'react';

// Define a local type for Polling Unit Data with hierarchical structure
interface PollingUnitStats {
    id: string;
    lga: string;
    constituency: string;
    puCode: string;
    registered: number;
    accredited: number;
}

const MOCK_PUS: PollingUnitStats[] = [
    // Lagos - Alimosho
    { id: '1', lga: 'Alimosho', constituency: 'Alimosho I', puCode: 'PU-024/08/01/004', registered: 850, accredited: 320 },
    { id: '2', lga: 'Alimosho', constituency: 'Alimosho I', puCode: 'PU-011/02/05/092', registered: 500, accredited: 450 },
    { id: '3', lga: 'Alimosho', constituency: 'Alimosho II', puCode: 'PU-009/14/03/022', registered: 1200, accredited: 550 },
    // Kano - Municipal
    { id: '4', lga: 'Kano Municipal', constituency: 'Kano Mun. Central', puCode: 'PU-004/12/06/001', registered: 900, accredited: 880 },
    { id: '5', lga: 'Kano Municipal', constituency: 'Kano Mun. Central', puCode: 'PU-044/08/02/104', registered: 650, accredited: 640 },
    { id: '6', lga: 'Kano Municipal', constituency: 'Zaitawa', puCode: 'PU-044/08/02/112', registered: 720, accredited: 690 },
    // Rivers - Obio/Akpor
    { id: '7', lga: 'Obio/Akpor', constituency: 'Rumuomasi', puCode: 'PU-032/11/04/008', registered: 750, accredited: 200 },
    { id: '8', lga: 'Obio/Akpor', constituency: 'Rumuomasi', puCode: 'PU-015/06/02/033', registered: 1100, accredited: 400 },
    // Enugu
    { id: '9', lga: 'Enugu North', constituency: 'Ogui', puCode: 'PU-012/04/07/005', registered: 450, accredited: 150 },
    { id: '10', lga: 'Enugu North', constituency: 'China Town', puCode: 'PU-012/04/07/021', registered: 800, accredited: 350 },
];

export const ConstituencyTable: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-0 bg-white overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-[9px]">
            <thead className="bg-gray-50 text-gray-500 font-semibold sticky top-0 z-10 border-b border-gray-200">
                <tr>
                    <th className="p-2 border-b w-[20%]">LGA</th>
                    <th className="p-2 border-b w-[25%]">Constituency</th>
                    <th className="p-2 border-b w-[25%]">Polling Unit</th>
                    <th className="p-2 border-b text-right w-[15%]">Reg. Voters</th>
                    <th className="p-2 border-b text-right w-[15%]">Acc. Voters</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {MOCK_PUS.map((pu) => (
                    <tr key={pu.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="p-2 font-bold text-gray-600 align-top">{pu.lga}</td>
                        <td className="p-2 text-gray-500 align-top">{pu.constituency}</td>
                        <td className="p-2 font-bold text-gray-800 font-mono align-top text-[9px] bg-gray-50/50 group-hover:bg-transparent rounded-sm">
                            {pu.puCode}
                        </td>
                        <td className="p-2 text-right font-mono text-gray-600 align-top">{pu.registered.toLocaleString()}</td>
                        <td className="p-2 text-right font-mono font-bold text-blue-600 align-top">{pu.accredited.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
