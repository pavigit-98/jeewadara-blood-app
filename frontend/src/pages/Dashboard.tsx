import React from 'react';
import { 
  Heart, 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp 
} from 'lucide-react';
import { SVGMap } from '../components/SVGMap';
import { INotification, IBloodRequest } from '../types';

interface DashboardProps {
  notifications: INotification[];
  requests: IBloodRequest[];
  onDeployEngine: (req: IBloodRequest) => void;
  onNavigateToNotifications: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  notifications,
  requests,
  onDeployEngine,
  onNavigateToNotifications
}) => {
  return (
    <div className="space-y-6">
      
      {/* Critical Shortage Warning Banner */}
      <section className="p-4 bg-jeeva-red text-white rounded-xl shadow-lg border border-jeeva-red/20 flex flex-col md:flex-row justify-between items-center gap-4 emergency-glow">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-lg">
            <ShieldAlert className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="font-extrabold text-base tracking-wide">CRITICAL ALERT: O- Negative Blood Required</h3>
            <p className="text-white/80 text-xs font-medium">National Teaching Hospital — Emergency surgery in progress. 4 units needed within 45 minutes.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            const criticalReq = requests.find(r => r.id === 'REQ-882') || requests[0];
            if (criticalReq) onDeployEngine(criticalReq);
          }}
          className="px-5 py-2 bg-white hover:bg-slate-100 text-jeeva-red text-xs font-bold rounded-lg transition shadow-md shrink-0 uppercase tracking-wider focus:ring-2 focus:ring-white"
        >
          Deploy Match Engine
        </button>
      </section>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Blood Required</span>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">142 Units</h3>
            <span className="text-jeeva-red text-xs font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% increase
            </span>
          </div>
          <div className="p-3 bg-red-50 text-jeeva-red rounded-xl" aria-hidden="true">
            <Heart className="w-6 h-6 fill-jeeva-red/20" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Donors Pool</span>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">3,892</h3>
            <span className="text-green-600 text-xs font-bold flex items-center gap-1 mt-1">
              ● Active Live Now
            </span>
          </div>
          <div className="p-3 bg-green-50 text-green-700 rounded-xl" aria-hidden="true">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Response Time Avg</span>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">18.4 min</h3>
            <span className="text-jeeva-blue text-xs font-bold flex items-center gap-1 mt-1 font-medium">
              ⚡ High Matching Efficiency
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-jeeva-blue rounded-xl" aria-hidden="true">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Emergencies</span>
            <h3 className="text-3xl font-extrabold text-jeeva-red mt-1">08 cases</h3>
            <span className="text-jeeva-red text-xs font-bold flex items-center gap-1 mt-1">
              🚨 Needs immediate match
            </span>
          </div>
          <div className="p-3 bg-red-50 text-jeeva-red rounded-xl" aria-hidden="true">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Row: Sri Lanka Vector map + Matching feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Geolocation Coordinate network map */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col" aria-labelledby="mapHeading">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 id="mapHeading" className="font-bold text-slate-800 text-base">Real-Time Donor Distribution Map</h3>
              <p className="text-slate-400 text-xs">Live heat map of available donors and emergency requests across the regional network</p>
            </div>
            <div className="flex gap-2" aria-hidden="true">
              <span className="flex items-center gap-1 text-[10px] font-bold text-jeeva-red"><span className="w-2.5 h-2.5 rounded-full bg-jeeva-red inline-block"></span> Urgent Demand</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-jeeva-navy"><span className="w-2.5 h-2.5 rounded-full bg-jeeva-navy inline-block"></span> Donor Pool</span>
            </div>
          </div>
          
          <SVGMap />
        </section>

        {/* Match logs live feed */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col" aria-labelledby="feedHeading">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 id="feedHeading" className="font-bold text-slate-800 text-base">Matching Feed</h3>
              <p className="text-slate-400 text-xs">Live matching actions logs</p>
            </div>
            <span className="px-2 py-0.5 bg-red-100 text-jeeva-red text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse" aria-hidden="true">Live</span>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-2">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex gap-3 text-xs leading-relaxed">
                <div className={`p-2 rounded-lg shrink-0 h-fit ${n.type === 'Request' ? 'bg-red-50 text-jeeva-red' : n.type === 'Match' ? 'bg-blue-50 text-jeeva-blue' : 'bg-slate-100 text-slate-500'}`} aria-hidden="true">
                  {n.type === 'Request' ? <AlertTriangle className="w-4 h-4" /> : n.type === 'Match' ? <Activity className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">{n.title}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">{n.message}</p>
                  <span className="text-slate-400 text-[9px] block mt-1">{n.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onNavigateToNotifications}
            className="w-full py-2.5 mt-4 border border-slate-200 hover:bg-slate-50 text-jeeva-navy font-bold rounded-xl text-xs transition uppercase tracking-wider text-center block focus:ring-2 focus:ring-jeeva-navy"
          >
            View Full Activity Log
          </button>
        </section>
      </div>

      {/* Blood group inventory card grid matrix */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" aria-labelledby="inventoryHeading">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 id="inventoryHeading" className="font-bold text-slate-800 text-base">Blood Group Inventory Matrix</h3>
            <p className="text-slate-400 text-xs">Real-time blood stocks tracking across regional hub warehouses</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { group: 'A+', pct: 25, status: 'CRITICAL' },
            { group: 'A-', pct: 62, status: 'STABLE' },
            { group: 'B+', pct: 88, status: 'OPTIMAL' },
            { group: 'B-', pct: 45, status: 'STABLE' },
            { group: 'AB+', pct: 95, status: 'OPTIMAL' },
            { group: 'AB-', pct: 32, status: 'LOW' },
            { group: 'O+', pct: 74, status: 'STABLE' },
            { group: 'O-', pct: 12, status: 'CRITICAL' },
          ].map((inv) => (
            <div key={inv.group} className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center flex flex-col justify-between items-center shadow-xs">
              <span className="text-xl font-extrabold text-slate-800">{inv.group}</span>
              
              <div className="w-full bg-slate-200 h-2.5 rounded-full my-3 overflow-hidden" aria-hidden="true">
                <div 
                  className={`h-full rounded-full ${inv.status === 'CRITICAL' ? 'bg-jeeva-red' : inv.status === 'LOW' ? 'bg-jeeva-orange' : 'bg-green-600'}`} 
                  style={{ width: `${inv.pct}%` }}
                ></div>
              </div>

              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${inv.status === 'CRITICAL' ? 'bg-red-50 text-jeeva-red' : inv.status === 'LOW' ? 'bg-orange-50 text-jeeva-orange' : inv.status === 'STABLE' ? 'bg-slate-100 text-slate-600' : 'bg-green-50 text-green-700'}`}>
                {inv.status} ({inv.pct}%)
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// Simple visual helper component for info blocks
const Info: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
