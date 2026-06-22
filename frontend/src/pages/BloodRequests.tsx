import React from 'react';
import { Plus, ShieldAlert, MapPin, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IBloodRequest, IUser } from '../types';

interface BloodRequestsProps {
  requests: IBloodRequest[];
  currentUser: IUser;
  onOpenAddModal: () => void;
  onStartMatching: (req: IBloodRequest) => void;
}

export const BloodRequests: React.FC<BloodRequestsProps> = ({
  requests,
  currentUser,
  onOpenAddModal,
  onStartMatching
}) => {
  const activityData = [
    { time: '08:00', requests: 4, matches: 2 },
    { time: '10:00', requests: 7, matches: 5 },
    { time: '12:00', requests: 5, matches: 4 },
    { time: '14:00', requests: 12, matches: 9 },
    { time: '16:00', requests: 8, matches: 7 },
    { time: '18:00', requests: 9, matches: 6 },
    { time: '20:00', requests: 11, matches: 10 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Active Blood Requests</h2>
          <p className="text-slate-400 text-xs font-medium">Real-time priority feed across regional healthcare centers.</p>
        </div>
        {currentUser.role !== 'Donor' && (
          <button 
            onClick={onOpenAddModal}
            className="px-5 py-2.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-jeeva-red"
          >
            <Plus className="w-4 h-4" /> Create Request
          </button>
        )}
      </div>

      {/* Critical warning supply status alert */}
      <div className="p-4 bg-red-50 border border-red-200 text-jeeva-red rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div className="flex gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 block">Critical Supply Alert</span>
            O- Negative blood inventory is below 15% at National Teaching Hospital regional branches.
          </div>
        </div>
        <button className="px-4 py-1.5 bg-white border border-red-200 hover:bg-red-50 text-jeeva-red text-xs font-bold rounded-lg transition focus:outline-none">
          Reroute Supply
        </button>
      </div>

      {/* Feed quick filters */}
      <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 w-fit">
        {['All Requests', 'Critical Only', 'Rare Types', 'Nearby'].map((tab, idx) => (
          <button 
            key={tab} 
            className={`px-4 py-2 text-xs font-bold rounded-lg transition focus:outline-none ${idx === 0 ? 'bg-jeeva-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Requests lists grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition">
            <div>
              <div className="flex justify-between items-start">
                <span className={`px-3 py-1 text-base font-extrabold rounded-lg ${r.bloodGroup.includes('-') ? 'bg-red-50 text-jeeva-red' : 'bg-blue-50 text-jeeva-blue'}`}>
                  {r.bloodGroup}
                </span>
                <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded uppercase tracking-wider ${r.urgencyLevel === 'Critical' ? 'bg-red-50 text-jeeva-red' : r.urgencyLevel === 'Urgent' ? 'bg-orange-50 text-jeeva-orange' : 'bg-green-50 text-green-700'}`}>
                  {r.urgencyLevel}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-800 text-base mt-4">{r.hospitalName}</h3>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> {r.location}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Units Required</span>
                  <span className="text-slate-700 text-xs font-extrabold block mt-1">{r.unitsRequired} pints</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Time Elapsed</span>
                  <span className="text-slate-700 text-xs font-bold block mt-1">{r.timeElapsed || '10m ago'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-sans">
              <span className="text-[10px] font-semibold text-slate-400">Status: <span className="font-bold text-slate-700">{r.status}</span></span>
              
              {currentUser.role === 'Admin' && r.status === 'Open' && (
                <button 
                  onClick={() => onStartMatching(r)}
                  className="px-4 py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition shrink-0 focus:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" /> Match Now
                </button>
              )}
              
              {r.status === 'Matched' && (
                <span className="text-xs text-jeeva-orange font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 animate-spin" /> Matching Pending
                </span>
              )}

              {r.status === 'Completed' && (
                <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Pulse Recharts graph + Logistics optimizer card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2" aria-labelledby="pulseHeading">
          <h3 id="pulseHeading" className="font-bold text-slate-800 text-base mb-1">Network Activity Pulse</h3>
          <p className="text-slate-400 text-xs mb-6 font-medium">Interactive logs displaying hourly emergency requests dispatched vs matched.</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B30006" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#B30006" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#002147" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#002147" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#B30006" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" name="Blood Requests" />
                <Area type="monotone" dataKey="matches" stroke="#002147" strokeWidth={2} fillOpacity={1} fill="url(#colorMatches)" name="Successful Matches" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="relative rounded-2xl overflow-hidden p-6 text-white border border-slate-200 flex flex-col justify-between" style={{ backgroundImage: "linear-gradient(rgba(0,20,42,0.85), rgba(0,20,42,0.95)), url('https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400')" }}>
          <div className="space-y-2">
            <span className="p-2 bg-white/10 rounded-lg inline-block text-jeeva-orange" aria-hidden="true"><Sparkles className="w-5 h-5" /></span>
            <h3 className="font-extrabold text-base pt-2">Logistics Optimizer</h3>
            <p className="text-white/60 text-xs font-medium">Our matching engine identifies the nearest compatible donors to reduce blood transit and delivery time by 22%.</p>
          </div>
          <button className="w-full py-2.5 mt-4 bg-white hover:bg-slate-100 text-jeeva-navy font-bold rounded-xl text-xs transition focus:outline-none">
            Launch Optimizer
          </button>
        </section>
      </div>

    </div>
  );
};
