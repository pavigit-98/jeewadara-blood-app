import React from 'react';
import { AlertTriangle, Activity, Info, Heart, CheckCircle2 } from 'lucide-react';
import { INotification } from '../types';

interface NotificationsProps {
  notifications: INotification[];
  alertFilterTab: string;
  setAlertFilterTab: (val: string) => void;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
  onStartMatching: (req: any) => void;
  requests: any[];
}

export const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  alertFilterTab,
  setAlertFilterTab,
  onMarkAllRead,
  onMarkRead,
  onStartMatching,
  requests
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Real-Time Alert Feed</h2>
          <p className="text-slate-400 text-xs font-medium">High-density monitoring for Jeevadhara healthcare network.</p>
        </div>
        <button 
          onClick={onMarkAllRead}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition focus:outline-none"
        >
          Mark all as Read
        </button>
      </div>

      {/* Feed Alert filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {['All Alerts', 'Blood Requests', 'Successful Matches', 'System Alerts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setAlertFilterTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 focus:outline-none ${alertFilterTab === tab ? 'bg-jeeva-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <select className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600 focus:outline-none w-fit">
          <option>Latest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      {/* Alerts Log Grid */}
      <div className="space-y-4">
        
        {/* Flashing Red Alert Notification Item */}
        {(alertFilterTab === 'All Alerts' || alertFilterTab === 'Blood Requests') && (
          <section className="p-5 bg-jeeva-red text-white rounded-2xl shadow-lg border border-jeeva-red/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 emergency-glow" aria-labelledby="criticalNotifHeading">
            <div className="flex gap-4">
              <div className="p-3 bg-white/10 rounded-xl text-white shrink-0" aria-hidden="true"><AlertTriangle className="w-5 h-5 animate-bounce" /></div>
              <div>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider block w-fit" aria-hidden="true">Critical Urgency</span>
                <h3 id="criticalNotifHeading" className="font-extrabold text-base mt-2">Emergency Type O- Negative Required</h3>
                <p className="text-white/80 text-xs mt-1 max-w-2xl font-medium">National Cancer Institute requests immediate supply. 4 units needed for trauma patient. Proximity matching activated.</p>
              </div>
            </div>
            <div className="flex gap-2 self-end md:self-center shrink-0 font-sans">
              <button 
                onClick={() => {
                  const criticalReq = requests.find(r => r.id === 'REQ-882') || requests[0];
                  if (criticalReq) onStartMatching(criticalReq);
                }}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-jeeva-red text-xs font-bold rounded-lg transition shadow-sm uppercase tracking-wider focus:outline-none"
              >
                Dispatch Blood
              </button>
              <button className="px-4 py-2 border border-white/20 hover:bg-white/5 text-white text-xs font-bold rounded-lg transition focus:outline-none">Acknowledge</button>
            </div>
          </section>
        )}

        {/* Feeds logging list */}
        {notifications.filter(n => {
          if (alertFilterTab === 'Blood Requests') return n.type === 'Request';
          if (alertFilterTab === 'Successful Matches') return n.type === 'Match';
          if (alertFilterTab === 'System Alerts') return n.type === 'System';
          return true;
        }).map((n) => (
          <div key={n.id} className={`p-4 bg-white border border-slate-200 rounded-2xl flex justify-between items-center hover:border-slate-300 transition ${n.status === 'Unread' ? 'border-l-4 border-l-jeeva-navy' : ''}`}>
            <div className="flex gap-4">
              <div className={`p-2.5 rounded-xl shrink-0 h-fit ${n.type === 'Request' ? 'bg-red-50 text-jeeva-red' : n.type === 'Match' ? 'bg-blue-50 text-jeeva-blue' : 'bg-slate-100 text-slate-500'}`} aria-hidden="true">
                {n.type === 'Request' ? <Heart className="w-5 h-5 fill-jeeva-red/10" /> : n.type === 'Match' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5 text-jeeva-blue" />}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold">{n.timestamp}</span>
                <h4 className="font-extrabold text-slate-800 text-sm mt-0.5">{n.title}</h4>
                <p className="text-slate-500 text-xs mt-1 font-medium">{n.message}</p>
              </div>
            </div>
            
            {n.status === 'Unread' && (
              <button 
                onClick={() => onMarkRead(n.id)}
                className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-lg text-[10px] transition shrink-0 focus:outline-none"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition uppercase tracking-wider text-center block focus:outline-none">
        Load Older Alerts
      </button>
    </div>
  );
};
