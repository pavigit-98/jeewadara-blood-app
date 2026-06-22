import React from 'react';
import { 
  Heart, 
  Activity, 
  Users, 
  Building2, 
  Bell, 
  MessageSquare, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { IUser } from '../types';

interface SidebarProps {
  currentUser: IUser;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setRole: (role: 'Admin' | 'Hospital' | 'Donor') => void;
  onLogout: () => void;
  unreadCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  setRole,
  onLogout,
  unreadCount
}) => {
  return (
    <aside className="w-full md:w-64 bg-jeeva-navy text-white flex flex-col shrink-0" role="navigation" aria-label="Main Navigation">
      {/* Sidebar Header Brand */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-jeeva-navy text-xl tracking-tighter" aria-hidden="true">
          ජී
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-wide">Jeevadhara</h1>
          <span className="text-white/40 text-[10px] tracking-widest uppercase block -mt-1 font-bold">Healthcare Network</span>
        </div>
      </div>

      {/* Console Role Indicator Card */}
      <div className="p-4 mx-4 my-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
        <img 
          src={currentUser.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"} 
          alt={currentUser.name} 
          className="w-10 h-10 rounded-full object-cover border border-white/20"
        />
        <div className="overflow-hidden">
          <span className="font-semibold text-sm block truncate">{currentUser.name}</span>
          <span className="text-[10px] text-white/60 tracking-wider font-bold block uppercase -mt-0.5">{currentUser.role} Console</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
        {currentUser.role === 'Admin' && (
          <>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Activity className="w-4 h-4 text-jeeva-blue" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('hospitals')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'hospitals' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Building2 className="w-4 h-4 text-jeeva-blue" />
              Hospital Management
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'requests' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Heart className="w-4 h-4 text-jeeva-red fill-jeeva-red/20" />
              Blood Requests
            </button>
            <button 
              onClick={() => setActiveTab('donors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'donors' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Users className="w-4 h-4 text-jeeva-blue" />
              Donor Management
            </button>
            <button 
              onClick={() => setActiveTab('matching')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'matching' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Settings className="w-4 h-4 text-jeeva-orange animate-spin" style={{ animationDuration: '4s' }} />
              Matching Engine
            </button>
          </>
        )}

        {currentUser.role === 'Hospital' && (
          <>
            <button 
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'requests' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Heart className="w-4 h-4 text-jeeva-red" />
              My Blood Requests
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'messages' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <MessageSquare className="w-4 h-4 text-jeeva-blue" />
              Clinical Chat
            </button>
          </>
        )}

        {currentUser.role === 'Donor' && (
          <>
            <button 
              onClick={() => setActiveTab('donors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'donors' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Users className="w-4 h-4 text-jeeva-blue" />
              My Donor Profile
            </button>
          </>
        )}

        <div className="h-[1px] bg-white/10 my-4" aria-hidden="true"></div>

        <button 
          onClick={() => setActiveTab('notifications')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'notifications' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <span className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-white/50" />
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="bg-jeeva-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full" aria-label={`${unreadCount} unread alerts`}>
              {unreadCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => setActiveTab('messages')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'messages' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <MessageSquare className="w-4 h-4 text-white/50" />
          Messages
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'settings' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <Settings className="w-4 h-4 text-white/50" />
          Settings
        </button>

        <button 
          onClick={() => setActiveTab('help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'help' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <HelpCircle className="w-4 h-4 text-white/50" />
          Help Center
        </button>
      </nav>

      {/* Demo Mode switcher panel - standard compliance for pair testing */}
      <div className="p-4 m-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
        <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase block text-center">Interactive Demo Switcher</span>
        <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
          <button 
            onClick={() => setRole('Admin')}
            className={`p-1.5 rounded transition font-medium ${currentUser.role === 'Admin' ? 'bg-jeeva-blue text-white' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
          >
            Admin
          </button>
          <button 
            onClick={() => setRole('Hospital')}
            className={`p-1.5 rounded transition font-medium ${currentUser.role === 'Hospital' ? 'bg-jeeva-blue text-white' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
          >
            Hosp
          </button>
          <button 
            onClick={() => setRole('Donor')}
            className={`p-1.5 rounded transition font-medium ${currentUser.role === 'Donor' ? 'bg-jeeva-blue text-white' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
          >
            Donor
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10 font-sans">
        <button 
          onClick={onLogout}
          className="w-full py-2 border border-white/20 hover:bg-white/5 rounded-lg text-xs font-semibold text-white/70 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-white"
        >
          Log Out Portal
        </button>
      </div>
    </aside>
  );
};
