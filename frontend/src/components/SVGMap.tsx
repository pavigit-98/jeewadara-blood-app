import React from 'react';
import { Map, Building2 } from 'lucide-react';

export const SVGMap: React.FC = () => {
  return (
    <div className="flex-1 min-h-[300px] border border-slate-100 bg-slate-50 rounded-xl relative overflow-hidden flex items-center justify-center">
      {/* Grid overlay */}
      <svg className="w-full h-full max-h-[350px] opacity-25 absolute" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M10,0 L10,100 M20,0 L20,100 M30,0 L30,100 M40,0 L40,100 M50,0 L50,100 M60,0 L60,100 M70,0 L70,100 M80,0 L80,100 M90,0 L90,100" stroke="#cbd5e1" strokeWidth="0.2" />
        <path d="M0,10 L100,10 0,20 L100,20 0,30 L100,30 0,40 L100,40 0,50 L100,50 0,60 L100,60 0,70 L100,70 0,80 L100,80 0,90 L100,90" stroke="#cbd5e1" strokeWidth="0.2" />
      </svg>

      {/* Geolocation Nodes network overlays */}
      <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between items-center text-center">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Jeevadhara Regional Coordinates Grid (Colombo District Hub)</span>
        
        {/* Interactive Visual Network points */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-72 h-72">
            {/* Center Hospital */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-jeeva-red/20 border border-jeeva-red flex items-center justify-center animate-pulse">
              <Building2 className="w-4 h-4 text-jeeva-red" />
            </div>
            
            {/* Live donor nodes scattered */}
            <div className="absolute top-10 left-12 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-md animate-pulse"></div>
              <span className="bg-jeeva-navy text-white text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">O- (Sarah)</span>
            </div>
            <div className="absolute top-24 right-14 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white shadow-md"></div>
              <span className="bg-jeeva-navy text-white text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">A+ (Arjun)</span>
            </div>
            <div className="absolute bottom-12 left-20 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-md animate-pulse"></div>
              <span className="bg-jeeva-navy text-white text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">B+ (Malani)</span>
            </div>
            <div className="absolute bottom-28 right-8 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
              <span className="bg-jeeva-navy text-white text-[8px] font-bold px-1 py-0.5 rounded mt-0.5">O+ (Samanthi)</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/85 backdrop-blur px-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 font-semibold shadow-sm max-w-xs self-start">
          🚨 <span className="text-jeeva-red font-bold">Urgent demand</span> detected at Colombo 07. Proximity scanner matching active.
        </div>
      </div>
    </div>
  );
};
