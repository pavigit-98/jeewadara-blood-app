import React from 'react';
import { ShieldAlert, CheckCircle2, Sparkles, Navigation, Users } from 'lucide-react';
import { IBloodRequest } from '../types';

interface MatchingEngineProps {
  activeMatchRequest: IBloodRequest | null;
  isScanning: boolean;
  scanProgress: number;
  matches: any[];
  onDispatchNotification: (requestId: string, donorIds: string[]) => void;
}

export const MatchingEngine: React.FC<MatchingEngineProps> = ({
  activeMatchRequest,
  isScanning,
  scanProgress,
  matches,
  onDispatchNotification
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Smart Matching Engine</h2>

      {activeMatchRequest ? (
        <div className="space-y-6">
          
          {/* Flashing Urgency Alert Header */}
          <div className="p-4 bg-jeeva-red text-white rounded-xl shadow-lg border border-jeeva-red/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-lg shrink-0" aria-hidden="true">
                <ShieldAlert className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-wide">Critical Request: {activeMatchRequest.bloodGroup} Negative Required</h3>
                <p className="text-white/80 text-xs">Emergency Trauma Center • Case #{activeMatchRequest.id} • Required within 45 mins</p>
              </div>
            </div>
            <span className="bg-white/10 px-3 py-1 rounded text-xs font-bold font-mono">ID: BLOOD-TX-901</span>
          </div>

          {/* Scanning progress indicators */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{isScanning ? 'Match Searching...' : 'Scan Complete'}</span>
              <span>{scanProgress}% Scan Complete</span>
            </div>
            
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden" aria-hidden="true">
              <div 
                className="bg-jeeva-navy h-full rounded-full transition-all duration-300" 
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-4 h-4" /> Local Database Scanned</span>
              <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-4 h-4" /> Satellite Networks Integrated</span>
              <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-4 h-4" /> Optimizing Transit Routes</span>
            </div>
          </div>

          {/* Matching Results Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Target patient data */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Patient</span>
                <h3 className="text-xl font-extrabold text-slate-800 mt-1">{activeMatchRequest.patientName || 'Aditiya Varma'}</h3>
                
                <div className="mt-3 flex gap-2" aria-hidden="true">
                  <span className="px-2.5 py-1 bg-red-50 text-jeeva-red text-xs font-bold rounded-lg uppercase">{activeMatchRequest.bloodGroup} Negative</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-lg">Universal Recipient Match</span>
                </div>

                <div className="space-y-3 mt-6 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Hospital:</span>
                    <span className="font-bold text-slate-800">{activeMatchRequest.hospitalName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Distance:</span>
                    <span className="font-bold text-slate-800">4.2 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Units Required:</span>
                    <span className="font-bold text-jeeva-red">{activeMatchRequest.unitsRequired} Units</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-500 italic font-medium">
                "{activeMatchRequest.description || 'Immediate emergency request.'}"
              </div>
            </div>

            {/* Right Columns: Scored and Ranked matches */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h4 className="font-extrabold text-slate-800 text-sm">Compatible Ranked Matches</h4>
                <span className="text-xs text-slate-400">{matches.length} compatible candidates found</span>
              </div>

              {matches.length > 0 ? (
                <div className="space-y-6">
                  
                  {/* BEST MATCH PANEL */}
                  <div className="p-5 border border-jeeva-navy/20 bg-jeeva-navy-soft rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 relative">
                    <span className="absolute top-0 right-6 -translate-y-1/2 bg-jeeva-navy text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Best Match</span>

                    <div className="flex items-center gap-4">
                      {/* Large circular confidence percentage */}
                      <div className="w-20 h-20 rounded-full border-4 border-jeeva-navy flex flex-col items-center justify-center bg-white shrink-0">
                        <span className="text-xl font-extrabold text-jeeva-navy">{matches[0].confidence}%</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block -mt-1">Match</span>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-slate-800 text-base">{matches[0].name}</h3>
                        <div className="flex gap-2 mt-1" aria-hidden="true">
                          <span className="text-[10px] font-bold text-jeeva-red uppercase">{matches[0].bloodGroup} Negative</span>
                          <span className="text-[10px] text-slate-400 font-semibold">• Elite Donor</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium mt-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                          Active & Available (Confirmed 2m ago)
                        </div>
                      </div>
                    </div>

                    <div className="text-center sm:text-right shrink-0 space-y-2">
                      <span className="bg-blue-50 text-jeeva-blue text-[10px] font-bold px-3 py-1 rounded-full block w-fit mx-auto sm:ml-auto">🚲 {matches[0].travelTimeMins} mins away</span>
                      
                      <button 
                        onClick={() => onDispatchNotification(activeMatchRequest.id, [matches[0].id])}
                        className="px-5 py-2.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-1.5 uppercase tracking-wider focus:outline-none"
                      >
                        <Sparkles className="w-4 h-4 animate-bounce" /> Notify & Dispatch
                      </button>
                    </div>
                  </div>

                  {/* BACKUPS SLOTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matches.slice(1, 3).map((backup) => (
                      <div key={backup.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{backup.name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{backup.bloodGroup} • {backup.distanceKm} km away</span>
                        </div>
                        <div className="text-right space-y-1.5 font-sans">
                          <span className="text-[10px] font-extrabold text-slate-600 block">{backup.confidence}% Match</span>
                          <button 
                            onClick={() => onDispatchNotification(activeMatchRequest.id, [backup.id])}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg text-[10px] transition focus:outline-none"
                          >
                            Select as Backup
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-12 h-12 mx-auto opacity-30 mb-3" />
                  <span>No matches found. Select a blood request to run matching.</span>
                </div>
              )}

            </div>
          </div>

          {/* AI Optimization Insights and Pathfinding details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2" aria-labelledby="aiHeading">
              <span className="p-2 bg-blue-50 text-jeeva-blue rounded-lg inline-block" aria-hidden="true"><Sparkles className="w-4 h-4" /></span>
              <h4 id="aiHeading" className="font-extrabold text-slate-800 text-sm">AI Optimization Insights</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">Based on real-time traffic data and donor response history, Arjun Malhotra has been prioritized. His route to National Teaching Hospital is currently clear of major congestion, ensuring a transit time of under 15 minutes.</p>
            </section>

            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between" aria-labelledby="pathHeading">
              <div>
                <span className="p-2 bg-red-50 text-jeeva-red rounded-lg inline-block" aria-hidden="true"><Navigation className="w-4 h-4" /></span>
                <h4 id="pathHeading" className="font-extrabold text-slate-800 text-sm mt-2">Transit Pathfinding</h4>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden" aria-hidden="true">
                  <div className="bg-jeeva-red h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>ROUTE CRITICAL</span>
                <span className="text-jeeva-red font-extrabold">Traffic priority scheduled for courier vehicle</span>
              </div>
            </section>
          </div>

        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-400">
          <Sparkles className="w-12 h-12 mx-auto text-jeeva-navy/30 mb-3 animate-pulse" />
          <h3 className="font-bold text-slate-700 text-sm">Run Matching Engine</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto font-medium">Please navigate to the <span className="font-semibold text-jeeva-navy">Blood Requests</span> view, find a request, and select **"Match Now"** to run compatibly ranked algorithm searches!</p>
        </div>
      )}

    </div>
  );
};
