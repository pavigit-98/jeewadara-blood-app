import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Users, 
  Building2, 
  Bell, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  ShieldAlert, 
  Search, 
  Plus, 
  SlidersHorizontal, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Clock, 
  Navigation, 
  Send, 
  Paperclip, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award,
  Video,
  ChevronRight,
  Check,
  Map,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useJeevaStore } from './store/useJeevaStore';

// Custom components & layouts built directly inside single cohesive App.tsx for flawless compilation and instant interaction!

export default function App() {
  const {
    currentUser,
    activeRole,
    activeTab,
    donors,
    hospitals,
    requests,
    notifications,
    chats,
    activeChatContact,
    activeMatchRequest,
    isScanning,
    scanProgress,
    matches,
    toast,
    setRole,
    setActiveTab,
    fetchData,
    createRequest,
    createHospital,
    createDonor,
    updateDonor,
    deleteDonor,
    startMatching,
    dispatchMatchNotification,
    markAllNotificationsRead,
    markNotificationRead,
    sendChatMessage,
    saveProfileSettings,
    hideToast
  } = useJeevaStore();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginId, setLoginId] = useState('H-2026-9921');
  const [loginKey, setLoginKey] = useState('••••••••••••');
  
  // Modal states
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState(false);
  const [isAddDonorOpen, setIsAddDonorOpen] = useState(false);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  
  // Form fields
  const [newHosp, setNewHosp] = useState({ name: '', location: '', contact: '', admin: '' });
  const [newDonor, setNewDonor] = useState({ name: '', email: '', bloodGroup: 'O-', district: 'Colombo', availability: true });
  const [newReq, setNewReq] = useState({ bloodGroup: 'O-', urgencyLevel: 'Critical', unitsRequired: 4, patientName: '', description: '' });
  const [chatInput, setChatInput] = useState('');
  
  // Settings Form fields
  const [profileForm, setProfileForm] = useState({
    firstName: 'Sarah',
    lastName: 'Perera',
    email: 's.perera@colombo-gen.gov.lk',
    employeeId: 'JD-9921-X',
    department: 'Administration'
  });

  // Support ticket form
  const [ticketForm, setTicketForm] = useState({ priority: 'Low - Minor UI Glitch', module: 'Donor Database', desc: '' });

  // Donor view availability toggle
  const [donorAvailable, setDonorAvailable] = useState(true);

  // Filters
  const [donorSearch, setDonorSearch] = useState('');
  const [donorFilterBlood, setDonorFilterBlood] = useState('All Types');
  const [donorFilterStatus, setDonorFilterStatus] = useState('All');
  
  const [hospitalSearch, setHospitalSearch] = useState('');
  const [alertFilterTab, setAlertFilterTab] = useState('All');

  // FAQ Accordion open
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Fetch initial mock dataset
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Login
  //accessToken
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUtQURNSU4tMDEiLCJyb2xlIjoiQWRtaW4iLCJuYW1lIjoiRHIuIEthdmluZGkgU2lsdmEiLCJlbWFpbCI6ImthdmluZGkuc2lsdmFAamVldmFkaGFyYS5nb3YubGsiLCJpYXQiOjE3ODAzNDI4MjUsImV4cCI6MTc4MDQyOTIyNX0.AlN8kRs9jxDMa01vwJfAHKcV047tr02sjDphMcmj1nc');
    setIsLoggedIn(true);
  };

  // Recharts fake data
  const activityData = [
    { time: '08:00', requests: 4, matches: 2 },
    { time: '10:00', requests: 7, matches: 5 },
    { time: '12:00', requests: 5, matches: 4 },
    { time: '14:00', requests: 12, matches: 9 },
    { time: '16:00', requests: 8, matches: 7 },
    { time: '18:00', requests: 9, matches: 6 },
    { time: '20:00', requests: 11, matches: 10 },
  ];

  const matchingPerformanceData = [
    { name: 'O-', matched: 98, total: 100 },
    { name: 'A+', matched: 85, total: 95 },
    { name: 'B+', matched: 92, total: 98 },
    { name: 'AB-', matched: 45, total: 60 },
    { name: 'O+', matched: 74, total: 80 },
  ];

  if (!isLoggedIn) {
    // -------------------------------------------------------------
    // PAGE 1: SECURE ACCESS PORTAL (LOGIN SCREEN)
    // -------------------------------------------------------------
    return (
      <div className="min-h-screen relative flex flex-col justify-between bg-cover bg-center text-white" style={{ backgroundImage: "linear-gradient(rgba(0, 20, 42, 0.9), rgba(0, 20, 42, 0.95)), url('https://images.unsplash.com/photo-1579684389782-64d84b5e901d?w=1200')" }}>
        <div className="absolute inset-0 bg-jeeva-navy/20 backdrop-blur-[2px]"></div>

        {/* Top Header */}
        <div className="relative z-10 flex justify-between items-center p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-white flex items-center justify-center font-bold text-jeeva-navy text-2xl tracking-tighter shadow-md">
              ජී
            </div>
            <span className="font-extrabold text-xl tracking-wide font-sans">Jeevadhara</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>System Live & Syncing</span>
          </div>
        </div>

        {/* Central Card */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
            {/* Top Indicator */}
            <div className="bg-white/5 p-8 text-center border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-jeeva-red fill-jeeva-red animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Secure Access Portal</h2>
              <p className="text-white/60 text-xs mt-1">Jeevadhara Healthcare Network Authentication</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Medical Personnel ID</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-white/40"><Users className="w-5 h-5" /></span>
                  <input 
                    type="text" 
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-jeeva-red transition" 
                    placeholder="H-2026-XXXX" 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Security Key</label>
                  <a href="#forgot" className="text-xs text-white/50 hover:text-white transition">Forgot Security Key?</a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-white/40"><Settings className="w-5 h-5" /></span>
                  <input 
                    type="password" 
                    value={loginKey}
                    onChange={(e) => setLoginKey(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-jeeva-red transition" 
                    placeholder="••••••••••••" 
                  />
                </div>
              </div>

              {/* MFA Warning */}
              <div className="p-4 bg-jeeva-navy/50 border border-white/10 rounded-lg flex gap-3 text-xs text-white/80">
                <Info className="w-5 h-5 text-jeeva-blue shrink-0" />
                <div>
                  <span className="font-bold block text-white">Multi-Factor Required</span>
                  A biometric or hardware security key challenge will follow this step for all Level 1 access.
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-jeeva-navy border border-white/20 hover:bg-jeeva-navy-light text-white font-bold rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
              >
                Initiate Secure Login
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Bottom Help Desk */}
            <div className="px-8 py-4 bg-white/5 border-t border-white/10 flex justify-between text-xs text-white/60">
              <a href="#help" className="hover:text-white transition">Forgot Security Key?</a>
              <a href="#help" className="hover:text-white transition font-bold">Help Desk</a>
            </div>

            {/* Crisis SOS Banner */}
            <div className="bg-jeeva-red text-center py-4 text-sm font-bold uppercase tracking-wider border-t border-white/10 animate-pulse">
              🚨 CRISIS MODE & EMERGENCY ACCESS: 1-800-JEEVA-SOS 🚨
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center p-6 bg-jeeva-navy border-t border-white/5 text-xs text-white/50 w-full gap-4">
          <span>© 2026 Jeevadhara Healthcare Network. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Award className="w-4 h-4" /> ISO 27001 Certified</span>
            <span>•</span>
            <span>End-to-End Encryption</span>
            <span>•</span>
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DUAL-PORTAL LAYOUT (ADMIN, HOSPITAL, DONOR VIEWS)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-slate-50">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-jeeva-navy text-white flex flex-col shrink-0">
        
        {/* Sidebar Header Brand */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-jeeva-navy text-xl tracking-tighter">
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
                <Sparkles className="w-4 h-4 text-jeeva-orange" />
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

          <div className="h-[1px] bg-white/10 my-4"></div>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'notifications' ? 'bg-white/15 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-white/50" />
              Notifications
            </span>
            {notifications.filter(n => n.status === 'Unread').length > 0 && (
              <span className="bg-jeeva-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {notifications.filter(n => n.status === 'Unread').length}
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
              Hospital
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
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full py-2 border border-white/20 hover:bg-white/5 rounded-lg text-xs font-semibold text-white/70 hover:text-white transition"
          >
            Log Out Portal
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <span className="absolute left-3 top-2.5 text-slate-400"><Search className="w-4 h-4" /></span>
              <input 
                type="text" 
                placeholder="Global system search..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-jeeva-navy"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Quick Emergency button */}
            {currentUser.role !== 'Donor' && (
              <button 
                onClick={() => {
                  setNewReq({ bloodGroup: 'O-', urgencyLevel: 'Critical', unitsRequired: 4, patientName: 'Saman Silva', description: 'Immediate trauma blood reserve request.' });
                  setIsNewRequestOpen(true);
                }}
                className="px-4 py-1.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md transition animate-pulse"
              >
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                Emergency Request
              </button>
            )}

            {/* Notification Dropdown Quick Trigger */}
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition"
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => n.status === 'Unread').length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-jeeva-red rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Live Synchronizing Tag */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Syncing
            </div>
          </div>
        </header>

        {/* Toast Alerts Notification Panel */}
        {toast && (
          <div className="fixed top-20 right-6 z-50 animate-scale-up">
            <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Info className="w-5 h-5 text-blue-600" />}
              <span className="text-sm font-semibold">{toast.message}</span>
              <button onClick={hideToast} className="text-xs opacity-60 hover:opacity-100 font-bold ml-4">✕</button>
            </div>
          </div>
        )}

        {/* Render Active View Tab */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* ========================================================= */}
          {/* PAGE 2: MAIN ADMIN DASHBOARD VIEW                          */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && currentUser.role === 'Admin' && (
            <div className="space-y-6">
              
              {/* Critical Shortage Warning Banner */}
              <div className="p-4 bg-jeeva-red text-white rounded-xl shadow-lg border border-jeeva-red/20 flex flex-col md:flex-row justify-between items-center gap-4 emergency-glow">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 rounded-lg">
                    <ShieldAlert className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base tracking-wide">CRITICAL ALERT: O- Negative Blood Required</h3>
                    <p className="text-white/80 text-xs">National Teaching Hospital — Emergency surgery in progress. 4 units needed within 45 minutes.</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const criticalReq = requests.find(r => r.id === 'REQ-882') || requests[0];
                    startMatching(criticalReq);
                  }}
                  className="px-5 py-2 bg-white hover:bg-slate-100 text-jeeva-red text-xs font-bold rounded-lg transition shadow-md shrink-0 uppercase tracking-wider"
                >
                  Deploy Match Engine
                </button>
              </div>

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
                  <div className="p-3 bg-red-50 text-jeeva-red rounded-xl"><Heart className="w-6 h-6 fill-jeeva-red/20" /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Donors Pool</span>
                    <h3 className="text-3xl font-extrabold text-slate-800 mt-1">3,892</h3>
                    <span className="text-green-600 text-xs font-bold flex items-center gap-1 mt-1">
                      ● Active Live Now
                    </span>
                  </div>
                  <div className="p-3 bg-green-50 text-green-700 rounded-xl"><Users className="w-6 h-6" /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Response Time Avg</span>
                    <h3 className="text-3xl font-extrabold text-slate-800 mt-1">18.4 min</h3>
                    <span className="text-jeeva-blue text-xs font-bold flex items-center gap-1 mt-1">
                      ⚡ High Matching Efficiency
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50 text-jeeva-blue rounded-xl"><Clock className="w-6 h-6" /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Emergencies</span>
                    <h3 className="text-3xl font-extrabold text-jeeva-red mt-1">08 cases</h3>
                    <span className="text-jeeva-red text-xs font-bold flex items-center gap-1 mt-1">
                      🚨 Needs immediate match
                    </span>
                  </div>
                  <div className="p-3 bg-red-50 text-jeeva-red rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
                </div>
              </div>

              {/* Main Content Row: Sri Lanka Vector map + Matching feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Geolocation Coordinate network map */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Real-Time Donor Distribution Map</h3>
                      <p className="text-slate-400 text-xs">Live heat map of available donors and emergency requests across the regional network</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-jeeva-red"><span className="w-2.5 h-2.5 rounded-full bg-jeeva-red inline-block"></span> Urgent Demand</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-jeeva-navy"><span className="w-2.5 h-2.5 rounded-full bg-jeeva-navy inline-block"></span> Donor Pool</span>
                    </div>
                  </div>
                  
                  {/* Styled Simulated Sri Lanka SVG Map representation */}
                  <div className="flex-1 min-h-[300px] border border-slate-100 bg-slate-50 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full max-h-[350px] opacity-25 absolute" viewBox="0 0 100 100">
                      {/* Grid overlay */}
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
                </div>

                {/* Match logs live feed */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Matching Feed</h3>
                      <p className="text-slate-400 text-xs">Live matching actions logs</p>
                    </div>
                    <span className="px-2 py-0.5 bg-red-100 text-jeeva-red text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">Live</span>
                  </div>
                  
                  <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-2">
                    {notifications.slice(0, 4).map((n, i) => (
                      <div key={n.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex gap-3 text-xs leading-relaxed">
                        <div className={`p-2 rounded-lg shrink-0 h-fit ${n.type === 'Request' ? 'bg-red-50 text-jeeva-red' : n.type === 'Match' ? 'bg-blue-50 text-jeeva-blue' : 'bg-slate-100 text-slate-500'}`}>
                          {n.type === 'Request' ? <AlertTriangle className="w-4 h-4" /> : n.type === 'Match' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
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
                    onClick={() => setActiveTab('notifications')}
                    className="w-full py-2.5 mt-4 border border-slate-200 hover:bg-slate-50 text-jeeva-navy font-bold rounded-xl text-xs transition uppercase tracking-wider text-center block"
                  >
                    View Full Activity Log
                  </button>
                </div>
              </div>

              {/* Blood group inventory card grid matrix */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Blood Group Inventory Matrix</h3>
                    <p className="text-slate-400 text-xs">Real-time blood stocks tracking across regional hub warehouses</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('hospitals')}
                    className="px-4 py-1.5 border border-slate-200 hover:bg-slate-50 text-jeeva-navy text-xs font-bold rounded-lg transition"
                  >
                    Filter Hospitals
                  </button>
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
                      
                      {/* Percent progress meter bar */}
                      <div className="w-full bg-slate-200 h-2.5 rounded-full my-3 overflow-hidden">
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
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 3: HOSPITALS MANAGEMENT VIEW                         */}
          {/* ========================================================= */}
          {activeTab === 'hospitals' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Healthcare Network Directory</h2>
                  <p className="text-slate-400 text-xs">Manage and monitor all partner clinics, blood banks, and diagnostic nodes in the network.</p>
                </div>
                {currentUser.role === 'Admin' && (
                  <button 
                    onClick={() => setIsAddHospitalOpen(true)}
                    className="px-5 py-2.5 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Register New Entry
                  </button>
                )}
              </div>

              {/* Demand Detection Info Banner */}
              <div className="p-4 bg-jeeva-navy-soft border border-jeeva-navy/10 text-jeeva-navy rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                <div className="flex gap-3 text-xs leading-relaxed">
                  <Info className="w-5 h-5 text-jeeva-navy shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">High Demand Detected</span>
                    3 hospitals are currently reporting critical shortages of O-negative units.
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('requests')}
                  className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition"
                >
                  View Logistics Heatmap
                </button>
              </div>

              {/* Search & filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-slate-400"><Search className="w-4 h-4" /></span>
                  <input 
                    type="text" 
                    placeholder="Search by name, district, or admin administrator..."
                    value={hospitalSearch}
                    onChange={(e) => setHospitalSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-jeeva-navy"
                  />
                </div>
                <button className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
              </div>

              {/* Hospitals list grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.filter(h => h.hospitalName.toLowerCase().includes(hospitalSearch.toLowerCase()) || h.location.toLowerCase().includes(hospitalSearch.toLowerCase())).map((h) => (
                  <div key={h.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500"><Building2 className="w-5 h-5" /></div>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {h.activeRequests && h.activeRequests > 0 ? `🔴 ${h.activeRequests} Active Requests` : '🟢 0 Active Requests'}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-base mt-4">{h.hospitalName}</h3>
                      
                      <div className="space-y-2 mt-4 text-xs text-slate-500">
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0 text-slate-400" /> {h.location}</div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0 text-slate-400" /> {h.contactNumber}</div>
                        <div className="flex items-center gap-2"><Users className="w-4 h-4 shrink-0 text-slate-400" /> Admin: {h.adminName}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                      <button className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition">
                        Manage Staff
                      </button>
                      <button className="py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition">
                        View Inventory
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Partner Card */}
                {currentUser.role === 'Admin' && (
                  <div 
                    onClick={() => setIsAddHospitalOpen(true)}
                    className="border-2 border-dashed border-slate-200 hover:border-slate-400 bg-white/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] transition"
                  >
                    <div className="p-4 bg-slate-100 rounded-full text-slate-500 mb-3"><Plus className="w-6 h-6" /></div>
                    <h3 className="font-bold text-slate-800 text-sm">Add Partner</h3>
                    <p className="text-slate-400 text-xs mt-1 max-w-[200px]">Click to register a new healthcare facility to the network.</p>
                  </div>
                )}
              </div>

              {/* Bottom compliance image box */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-44 bg-cover bg-center flex items-end p-6 border border-slate-200" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,20,42,0.85)), url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600')" }}>
                  <div>
                    <h3 className="text-white font-extrabold text-lg">Logistics Map</h3>
                    <p className="text-white/70 text-xs mt-1">Real-time visualization of blood unit movement between listed facilities.</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="p-2 bg-blue-50 text-jeeva-blue rounded-lg inline-block"><Award className="w-5 h-5" /></span>
                    <h4 className="font-extrabold text-slate-800 mt-3 text-sm">Compliance Status</h4>
                    <p className="text-slate-400 text-xs mt-1">98% of partner hospitals have completed their quarterly safety audits.</p>
                  </div>
                  <button className="w-full py-2.5 mt-4 border border-slate-200 hover:bg-slate-50 text-jeeva-navy font-bold rounded-xl text-xs transition">
                    Generate Network Report
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 4: DONOR NETWORK DIRECTORY & PROFILE VIEW            */}
          {/* ========================================================= */}
          {activeTab === 'donors' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Donor Network Directory</h2>
                  <p className="text-slate-400 text-xs">Real-time access to the Jeevadhara donor pool. Manage verified individuals, track availability, and initiate screening matches.</p>
                </div>
                {currentUser.role === 'Admin' && (
                  <button 
                    onClick={() => setIsAddDonorOpen(true)}
                    className="px-5 py-2.5 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Register New Donor
                  </button>
                )}
              </div>

              {/* Search filter board */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-3 top-2.5 text-slate-400"><Search className="w-4 h-4" /></span>
                  <input 
                    type="text" 
                    placeholder="Search by name, ID, or location..."
                    value={donorSearch}
                    onChange={(e) => setDonorSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-jeeva-navy"
                  />
                </div>
                
                <div className="flex gap-4 w-full md:w-auto shrink-0">
                  <div className="flex items-center gap-2 text-sm text-slate-500 w-1/2 md:w-auto">
                    <span className="font-semibold shrink-0">Blood Group:</span>
                    <select 
                      value={donorFilterBlood}
                      onChange={(e) => setDonorFilterBlood(e.target.value)}
                      className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-800 focus:outline-none"
                    >
                      <option>All Types</option>
                      <option>O-</option>
                      <option>O+</option>
                      <option>A-</option>
                      <option>A+</option>
                      <option>B-</option>
                      <option>B+</option>
                      <option>AB-</option>
                      <option>AB+</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500 w-1/2 md:w-auto">
                    <span className="font-semibold shrink-0">Status:</span>
                    <select 
                      value={donorFilterStatus}
                      onChange={(e) => setDonorFilterStatus(e.target.value)}
                      className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-800 focus:outline-none"
                    >
                      <option>All</option>
                      <option>Available</option>
                      <option>Recently Donated</option>
                      <option>Deferred</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Profiles Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.filter(d => {
                  const mSearch = d.name.toLowerCase().includes(donorSearch.toLowerCase()) || d.id.toLowerCase().includes(donorSearch.toLowerCase()) || d.district.toLowerCase().includes(donorSearch.toLowerCase());
                  const mBlood = donorFilterBlood === 'All Types' || d.bloodGroup === donorFilterBlood;
                  
                  let mStatus = true;
                  if (donorFilterStatus === 'Available') mStatus = d.availability === true;
                  else if (donorFilterStatus === 'Recently Donated') mStatus = d.statusText === 'RECENTLY DONATED';
                  else if (donorFilterStatus === 'Deferred') mStatus = d.statusText?.includes('DEFERRED') || false;

                  return mSearch && mBlood && mStatus;
                }).map((d) => (
                  <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden hover:shadow-md transition">
                    
                    {/* Compatibility percentage banner background */}
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <img 
                          src={d.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
                          alt={d.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                        />
                        <div>
                          <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                            {d.name} 
                            <span className={`w-2 h-2 rounded-full ${d.availability ? 'bg-green-500 animate-pulse' : d.statusText === 'RECENTLY DONATED' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                          </h3>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{d.district} District</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${d.bloodGroup.includes('-') ? 'bg-red-50 text-jeeva-red' : 'bg-blue-50 text-jeeva-blue'}`}>
                        {d.bloodGroup}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Live text badge */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block ${d.availability ? 'bg-green-50 text-green-700' : d.statusText === 'RECENTLY DONATED' ? 'bg-orange-50 text-jeeva-orange' : 'bg-red-50 text-jeeva-red'}`}>
                        {d.statusText}
                      </span>

                      {/* Cooldown donation history dates */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Last Donation</span>
                          <span className="text-slate-700 text-xs font-bold block mt-1">{d.lastDonationDate || 'N/A'}</span>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Donations</span>
                          <span className="text-slate-700 text-xs font-bold block mt-1">{d.donationHistory?.length || 0} Times</span>
                        </div>
                      </div>

                      {/* Compatibility History match fill */}
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                          <span>Compatibility History</span>
                          <span>{d.eligibilityScore}% Match</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-jeeva-navy h-full rounded-full" style={{ width: `${d.eligibilityScore}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                      <button className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition">
                        View Profile
                      </button>
                      <button className="py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Call Donor
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 5: BLOOD REQUESTS VIEW                               */}
          {/* ========================================================= */}
          {activeTab === 'requests' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Active Blood Requests</h2>
                  <p className="text-slate-400 text-xs">Real-time priority feed across regional healthcare centers.</p>
                </div>
                {currentUser.role !== 'Donor' && (
                  <button 
                    onClick={() => setIsNewRequestOpen(true)}
                    className="px-5 py-2.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md"
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
                <button className="px-4 py-1.5 bg-white border border-red-200 hover:bg-red-50 text-jeeva-red text-xs font-bold rounded-lg transition">
                  Reroute Supply
                </button>
              </div>

              {/* Feed quick filters */}
              <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 w-fit">
                {['All Requests', 'Critical Only', 'Rare Types', 'Nearby'].map((tab, idx) => (
                  <button 
                    key={tab} 
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition ${idx === 0 ? 'bg-jeeva-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
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

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">Status: <span className="font-bold text-slate-700">{r.status}</span></span>
                      
                      {currentUser.role === 'Admin' && r.status === 'Open' && (
                        <button 
                          onClick={() => startMatching(r)}
                          className="px-4 py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition shrink-0"
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                  <h3 className="font-bold text-slate-800 text-base mb-1">Network Activity Pulse</h3>
                  <p className="text-slate-400 text-xs mb-6">Interactive logs displaying hourly emergency requests dispatched vs matched.</p>
                  
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
                </div>

                <div className="relative rounded-2xl overflow-hidden p-6 text-white border border-slate-200 flex flex-col justify-between" style={{ backgroundImage: "linear-gradient(rgba(0,20,42,0.85), rgba(0,20,42,0.95)), url('https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400')" }}>
                  <div className="space-y-2">
                    <span className="p-2 bg-white/10 rounded-lg inline-block text-jeeva-orange"><Sparkles className="w-5 h-5" /></span>
                    <h3 className="font-extrabold text-base pt-2">Logistics Optimizer</h3>
                    <p className="text-white/60 text-xs">Our matching engine identifies the nearest compatible donors to reduce blood transit and delivery time by 22%.</p>
                  </div>
                  <button className="w-full py-2.5 mt-4 bg-white hover:bg-slate-100 text-jeeva-navy font-bold rounded-xl text-xs transition">
                    Launch Optimizer
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 6: SMART MATCHING ENGINE RUN DISPLAY                 */}
          {/* ========================================================= */}
          {activeTab === 'matching' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Smart Matching Engine</h2>

              {activeMatchRequest ? (
                <div className="space-y-6">
                  
                  {/* Flashing Urgency Alert Header */}
                  <div className="p-4 bg-jeeva-red text-white rounded-xl shadow-lg border border-jeeva-red/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/10 rounded-lg shrink-0">
                        <ShieldAlert className="w-6 h-6 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base tracking-wide">Critical Request: {activeMatchRequest.bloodGroup} Negative Required</h3>
                        <p className="text-white/80 text-xs">Emergency Trauma Center • Case #{activeMatchRequest.id} • Required within 45 mins</p>
                      </div>
                    </div>
                    <span className="bg-white/10 px-3 py-1 rounded text-xs font-bold">ID: BLOOD-TX-901</span>
                  </div>

                  {/* Scanning progress indicators */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>{isScanning ? 'Match Searching...' : 'Scan Complete'}</span>
                      <span>{scanProgress}% Scan Complete</span>
                    </div>
                    
                    {/* Progress Bar filling */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
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
                        
                        <div className="mt-3 flex gap-2">
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

                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-500 italic">
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
                                <div className="flex gap-2 mt-1">
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
                                onClick={() => dispatchMatchNotification(activeMatchRequest.id, [matches[0].id])}
                                className="px-5 py-2.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-1.5 uppercase tracking-wider"
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
                                <div className="text-right space-y-1.5">
                                  <span className="text-[10px] font-extrabold text-slate-600 block">{backup.confidence}% Match</span>
                                  <button 
                                    onClick={() => dispatchMatchNotification(activeMatchRequest.id, [backup.id])}
                                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg text-[10px] transition"
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
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <span className="p-2 bg-blue-50 text-jeeva-blue rounded-lg inline-block"><Sparkles className="w-4 h-4" /></span>
                      <h4 className="font-extrabold text-slate-800 text-sm">AI Optimization Insights</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">Based on real-time traffic data and donor response history, Arjun Malhotra has been prioritized. His route to National Teaching Hospital is currently clear of major congestion, ensuring a transit time of under 15 minutes.</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="p-2 bg-red-50 text-jeeva-red rounded-lg inline-block"><Navigation className="w-4 h-4" /></span>
                        <h4 className="font-extrabold text-slate-800 text-sm mt-2">Transit Pathfinding</h4>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                          <div className="bg-jeeva-red h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span>ROUTE CRITICAL</span>
                        <span className="text-jeeva-red">Traffic priority scheduled for courier vehicle</span>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-400">
                  <Sparkles className="w-12 h-12 mx-auto text-jeeva-navy/30 mb-3 animate-pulse" />
                  <h3 className="font-bold text-slate-700 text-sm">Run Matching Engine</h3>
                  <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">Please navigate to the <span className="font-semibold text-jeeva-navy">Blood Requests</span> view, find a request, and select **"Match Now"** to run compatibly ranked algorithm searches!</p>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 7: REAL-TIME ALERT FEED (NOTIFICATIONS) VIEW          */}
          {/* ========================================================= */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Real-Time Alert Feed</h2>
                  <p className="text-slate-400 text-xs">High-density monitoring for Jeevadhara healthcare network.</p>
                </div>
                <button 
                  onClick={markAllNotificationsRead}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition"
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
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${alertFilterTab === tab ? 'bg-jeeva-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
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
                
                {/* 1. Flashing Red Alert Notification Item */}
                {(alertFilterTab === 'All Alerts' || alertFilterTab === 'Blood Requests') && (
                  <div className="p-5 bg-jeeva-red text-white rounded-2xl shadow-lg border border-jeeva-red/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 emergency-glow">
                    <div className="flex gap-4">
                      <div className="p-3 bg-white/10 rounded-xl text-white shrink-0"><AlertTriangle className="w-5 h-5 animate-bounce" /></div>
                      <div>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider block w-fit">Critical Urgency</span>
                        <h3 className="font-extrabold text-base mt-2">Emergency Type O- Negative Required</h3>
                        <p className="text-white/80 text-xs mt-1 max-w-2xl">National Cancer Institute requests immediate supply. 4 units needed for trauma patient. Proximity matching activated.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-center shrink-0">
                      <button className="px-4 py-2 bg-white hover:bg-slate-100 text-jeeva-red text-xs font-bold rounded-lg transition shadow-sm uppercase tracking-wider">Dispatch Blood</button>
                      <button className="px-4 py-2 border border-white/20 hover:bg-white/5 text-white text-xs font-bold rounded-lg transition">Acknowledge</button>
                    </div>
                  </div>
                )}

                {/* 2. Feeds logging list */}
                {notifications.filter(n => {
                  if (alertFilterTab === 'Blood Requests') return n.type === 'Request';
                  if (alertFilterTab === 'Successful Matches') return n.type === 'Match';
                  if (alertFilterTab === 'System Alerts') return n.type === 'System';
                  return true;
                }).map((n) => (
                  <div key={n.id} className={`p-4 bg-white border border-slate-200 rounded-2xl flex justify-between items-center hover:border-slate-300 transition ${n.status === 'Unread' ? 'border-l-4 border-l-jeeva-navy' : ''}`}>
                    <div className="flex gap-4">
                      <div className={`p-2.5 rounded-xl shrink-0 h-fit ${n.type === 'Request' ? 'bg-red-50 text-jeeva-red' : n.type === 'Match' ? 'bg-blue-50 text-jeeva-blue' : 'bg-slate-100 text-slate-500'}`}>
                        {n.type === 'Request' ? <Heart className="w-5 h-5 fill-jeeva-red/10" /> : n.type === 'Match' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold">{n.timestamp}</span>
                        <h4 className="font-extrabold text-slate-800 text-sm mt-0.5">{n.title}</h4>
                        <p className="text-slate-500 text-xs mt-1">{n.message}</p>
                      </div>
                    </div>
                    
                    {n.status === 'Unread' && (
                      <button 
                        onClick={() => markNotificationRead(n.id)}
                        className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-lg text-[10px] transition shrink-0"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition uppercase tracking-wider text-center block">
                Load Older Alerts
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 8: CLINICAL MESSAGES / SECURE CHATS VIEW              */}
          {/* ========================================================= */}
          {activeTab === 'messages' && (
            <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
              
              {/* Chats List Sidebar */}
              <div className="w-full md:w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200 shrink-0">
                  <h3 className="font-bold text-slate-800 text-base">Clinical Communication</h3>
                  <div className="relative mt-3">
                    <span className="absolute left-3 top-2.5 text-slate-400"><Search className="w-3.5 h-3.5" /></span>
                    <input 
                      type="text" 
                      placeholder="Search discussions..." 
                      className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-xs placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {Object.keys(chats).map((contact) => {
                    const cMsgs = chats[contact];
                    const lastMsg = cMsgs[cMsgs.length - 1];
                    return (
                      <div 
                        key={contact}
                        onClick={() => useJeevaStore.setState({ activeChatContact: contact })}
                        className={`p-3 rounded-xl cursor-pointer transition flex justify-between gap-2 items-start ${activeChatContact === contact ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50'}`}
                      >
                        <div className="flex gap-3 overflow-hidden">
                          <div className="w-9 h-9 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0 uppercase">
                            {contact.charAt(0)}
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-xs text-slate-800 block truncate">{contact}</span>
                            <span className="text-[10px] text-slate-400 font-medium block truncate mt-0.5">{lastMsg?.text || 'File shared.'}</span>
                          </div>
                        </div>
                        <span className="text-[8px] text-slate-400 shrink-0 font-bold uppercase">{lastMsg?.time || 'Now'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Chat Conversation window */}
              <div className="flex-1 flex flex-col bg-slate-50">
                <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center font-extrabold text-jeeva-navy shrink-0">
                      {activeChatContact.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{activeChatContact}</h4>
                      <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">● Direct Channel • Online</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition"><Phone className="w-4 h-4" /></button>
                    <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition"><Video className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  
                  {/* LIVE VEHICLE COURIER PROGRESS CARD - screenshot high fidelity match */}
                  {activeChatContact === 'City General Blood Bank' && (
                    <div className="max-w-md mx-auto bg-jeeva-navy text-white rounded-2xl shadow-xl overflow-hidden border border-white/10 animate-pulse-slow">
                      <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-white/60">Live Status • REQ-882</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce"></span>
                      </div>
                      
                      <div className="p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <span className="text-[9px] font-bold text-white/50 uppercase tracking-wide block">Asset Type</span>
                            <span className="text-sm font-extrabold block mt-1">O Positive (O+)</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-white/50 uppercase tracking-wide block">Quantity</span>
                            <span className="text-sm font-extrabold block mt-1">4 Units</span>
                          </div>
                        </div>

                        {/* Transit Progress Bar fill */}
                        <div>
                          <div className="flex justify-between text-[10px] font-bold text-white/50 mb-1">
                            <span>Transit Progress</span>
                            <span>75%</span>
                          </div>
                          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-jeeva-red h-full rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>

                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 text-[10px] font-bold text-white/80">
                          <Navigation className="w-4 h-4 text-jeeva-orange shrink-0 animate-bounce" />
                          <span>Vehicle ID: MED-TRANS-04 (En route)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conversation messages */}
                  {chats[activeChatContact]?.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col max-w-[70%] ${msg.sender === 'You' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${msg.sender === 'You' ? 'bg-jeeva-navy text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                        {msg.text}
                        
                        {msg.doc && (
                          <div className="mt-3 p-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-3 text-white text-[11px] font-bold uppercase">
                            <FileText className="w-5 h-5 text-jeeva-orange shrink-0" />
                            <span>{msg.doc}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[8px] text-slate-400 font-bold uppercase mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Messaging Typing Box */}
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (chatInput.trim()) {
                        sendChatMessage(activeChatContact, chatInput);
                        setChatInput('');
                      }
                    }}
                    className="flex gap-3"
                  >
                    <button 
                      type="button"
                      onClick={() => {
                        sendChatMessage(activeChatContact, 'Cross-match laboratory verification certificate uploaded successfully.', 'CrossMatch_Report_882.pdf');
                      }}
                      className="p-3 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    
                    <input 
                      type="text" 
                      placeholder="Type clinical message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-jeeva-navy"
                    />

                    <button 
                      type="submit"
                      className="p-3 bg-jeeva-navy hover:bg-jeeva-navy-light text-white rounded-xl transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 9: SYSTEM CONFIGURATION (SETTINGS) VIEW               */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">System Configuration</h2>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                
                {/* Configuration sub-tabs layout */}
                <div className="flex border-b border-slate-200 overflow-x-auto">
                  {['Profile', 'Security (MFA)', 'Notifications', 'System Integrations'].map((tab, idx) => (
                    <button 
                      key={tab}
                      className={`px-6 py-4 text-xs font-bold shrink-0 border-b-2 transition ${idx === 0 ? 'border-jeeva-navy text-jeeva-navy' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                  
                  {/* Left profile image circle layout panel */}
                  <div className="w-full lg:w-64 flex flex-col items-center text-center shrink-0">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150" 
                        alt="Dr. Sarah Perera" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md"
                      />
                      <button className="absolute bottom-1 right-1 p-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white rounded-full shadow-lg transition">
                        ✎
                      </button>
                    </div>

                    <h3 className="font-extrabold text-slate-800 text-base mt-4">Dr. Sarah Perera</h3>
                    <p className="text-slate-400 text-xs">Hospital Chief Administrator</p>
                    <span className="bg-blue-50 text-jeeva-blue text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider block w-fit mt-3">Verified Official</span>
                  </div>

                  {/* Right Account Information forms */}
                  <div className="flex-1 space-y-6">
                    <h3 className="font-extrabold text-slate-800 text-base tracking-wide border-b border-slate-100 pb-3">Account Information</h3>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      saveProfileSettings(profileForm);
                    }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">First Name</label>
                        <input 
                          type="text" 
                          value={profileForm.firstName}
                          onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Last Name</label>
                        <input 
                          type="text" 
                          value={profileForm.lastName}
                          onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none" 
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Employee ID</label>
                        <input 
                          type="text" 
                          value={profileForm.employeeId}
                          onChange={(e) => setProfileForm({ ...profileForm, employeeId: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Department</label>
                        <select 
                          value={profileForm.department}
                          onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none"
                        >
                          <option>Administration</option>
                          <option>Logistics</option>
                          <option>Surgical Wing</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 flex justify-end gap-3 pt-6 border-t border-slate-100">
                        <button type="button" className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition">
                          Discard Changes
                        </button>
                        <button type="submit" className="px-5 py-2.5 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition shadow-md">
                          Save Profile Configuration
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 10: SUPPORT & HELP CENTER VIEW                        */}
          {/* ========================================================= */}
          {activeTab === 'help' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Support & Resources</h2>

              {/* Hotline cards blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Emergency Hotline Crimson card */}
                <div className="p-6 bg-jeeva-red text-white rounded-2xl shadow-lg border border-jeeva-red/20 flex justify-between items-center gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase block">Emergency Hotline (24/7)</span>
                    <h3 className="text-2xl font-extrabold tracking-wide">+94 11 234 5678</h3>
                  </div>
                  <div className="p-3 bg-white/10 rounded-full text-white animate-bounce"><Phone className="w-6 h-6" /></div>
                </div>

                {/* System incident operations card */}
                <div className="p-6 bg-jeeva-navy text-white rounded-2xl shadow-lg border border-white/10 flex justify-between items-center gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase block">System Incident Status</span>
                    <h3 className="text-lg font-extrabold tracking-wide">All Systems Operational</h3>
                  </div>
                  <div className="p-3 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 animate-pulse"><CheckCircle2 className="w-6 h-6" /></div>
                </div>
              </div>

              {/* Knowledge folders and report issue split row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left side Knowledge Base grid */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
                      <h3 className="font-bold text-slate-800 text-base">Knowledge Base</h3>
                      <a href="#view" className="text-xs text-jeeva-navy hover:underline font-bold">View All</a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Blood Storage Protocols', desc: 'Updated guidelines for temperature-controlled storage and logistics for rare types.', icon: <Heart className="w-5 h-5" /> },
                        { title: 'Privacy & Compliance', desc: 'HIPAA-compliant data handling for donor information and medical history.', icon: <Info className="w-5 h-5" /> },
                        { title: 'Emergency Requests', desc: 'Steps to initiate priority logistics for life-saving blood transfers.', icon: <Sparkles className="w-5 h-5" /> },
                        { title: 'Donor Management', desc: 'Best practices for onboarding new donors and maintaining records.', icon: <Users className="w-5 h-5" /> },
                      ].map((item) => (
                        <div key={item.title} className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-300 cursor-pointer transition">
                          <span className="p-2 bg-blue-50 text-jeeva-blue rounded-lg inline-block">{item.icon}</span>
                          <h4 className="font-bold text-slate-800 text-sm mt-3">{item.title}</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System training video modules */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800 text-base">System Training Modules</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative rounded-xl overflow-hidden h-36 bg-slate-100 flex items-center justify-center border border-slate-200 hover:shadow-md cursor-pointer transition">
                        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Video thumbnail" />
                        <div className="absolute inset-0 bg-jeeva-navy/20"></div>
                        <div className="relative z-10 text-center">
                          <span className="p-2 bg-white text-jeeva-navy rounded-full inline-block shadow-md mx-auto mb-2"><Video className="w-4 h-4" /></span>
                          <span className="text-white font-extrabold text-xs block">Introduction to Admin Console</span>
                          <span className="text-white/60 text-[9px] block mt-0.5">12:45 • Advanced Level</span>
                        </div>
                      </div>

                      <div className="relative rounded-xl overflow-hidden h-36 bg-slate-100 flex items-center justify-center border border-slate-200 hover:shadow-md cursor-pointer transition">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Video thumbnail" />
                        <div className="absolute inset-0 bg-jeeva-navy/20"></div>
                        <div className="relative z-10 text-center">
                          <span className="p-2 bg-white text-jeeva-navy rounded-full inline-block shadow-md mx-auto mb-2"><Video className="w-4 h-4" /></span>
                          <span className="text-white font-extrabold text-xs block">Inventory Analytics Guide</span>
                          <span className="text-white/60 text-[9px] block mt-0.5">08:20 • Intermediate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side support ticket forms sidebar */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-base">Report Issue</h3>
                  <p className="text-slate-400 text-xs">Submit a technical ticket to our support team.</p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setTicketForm({ priority: 'Low - Minor UI Glitch', module: 'Donor Database', desc: '' });
                      showToast('Support ticket successfully logged. SLA response is within 2 hours.', 'success');
                    }}
                    className="space-y-4 pt-4 border-t border-slate-100"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Priority Level</label>
                      <select 
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none"
                      >
                        <option>Low - Minor UI Glitch</option>
                        <option>Medium - Performance degradation</option>
                        <option>High - Severe workflow block</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Module</label>
                      <select 
                        value={ticketForm.module}
                        onChange={(e) => setTicketForm({ ...ticketForm, module: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none"
                      >
                        <option>Donor Database</option>
                        <option>Hospital Portal</option>
                        <option>Smart Matching Engine</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Description</label>
                      <textarea 
                        rows={4}
                        placeholder="Describe the problem in detail..."
                        value={ticketForm.desc}
                        onChange={(e) => setTicketForm({ ...ticketForm, desc: e.target.value })}
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Attachment</label>
                      <div className="border border-dashed border-slate-200 p-4 rounded-lg text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer text-slate-500 text-[10px] font-bold">
                        Upload screenshots (Max 5MB)
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition shadow-sm"
                    >
                      Submit Support Ticket
                    </button>
                  </form>
                </div>
              </div>

              {/* FAQs accordions blocks */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-base">Frequently Asked Questions</h3>
                
                <div className="space-y-2">
                  {[
                    { q: 'How do I register a new hospital sub-unit?', a: 'Navigate to "Hospital Management" in the sidebar and select "Add Partner". Ensure you have the facility license number ready for validation.' },
                    { q: 'How do I reset my administrative credentials?', a: 'Under the Settings -> Profile configurations module, choose Security settings and configure active personnel tokens. To reset physical IDs, contact network directories.' },
                    { q: 'Can I export donor statistics for compliance reports?', a: 'Yes! Navigate to the Dashboard or Hospital directory bottom panels, choose compliance status models, and click "Generate Network Report" to export direct CSV/PDF formats.' },
                    { q: 'What is the average matching time for rare blood types?', a: 'Our Smart Matching Engine calculations finish in less than 3 seconds, scanning 100% of local hubs. Push notifications to compatible matched donors typically complete within 12 seconds.' }
                  ].map((faq, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-4 text-left font-bold text-slate-700 hover:bg-slate-50 transition text-xs flex justify-between items-center"
                      >
                        {faq.q}
                        <span>{openFaq === i ? '▲' : '▼'}</span>
                      </button>
                      
                      {openFaq === i && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* DONOR PORTAL: PROFILE VIEW WORKSPACE                      */}
          {/* ========================================================= */}
          {activeRole === 'Donor' && activeTab === 'donors' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Donor Workspace Dashboard</h2>
                  <p className="text-slate-400 text-xs">Verify your status, update available districts, and accept match requests.</p>
                </div>
              </div>

              {/* Urgent matched alert if active request */}
              <div className="p-5 border-2 border-jeeva-navy/20 bg-jeeva-navy-soft rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-jeeva-red text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">Critical Proximity Request</span>
                  <span className="text-[10px] text-slate-400 font-bold">12 mins away</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1.5 bg-red-50 border border-red-200 text-jeeva-red text-base font-extrabold rounded-xl">O-</span>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm">National Teaching Hospital</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Urgent emergency surgery requires compatible O- Negative blood immediately.</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => {
                      dispatchMatchNotification('REQ-882', ['D-01']);
                    }}
                    className="px-5 py-2.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white text-xs font-bold rounded-xl transition shadow-md"
                  >
                    Accept & Confirm Donation
                  </button>
                  <button className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition">
                    Decline Request
                  </button>
                </div>
              </div>

              {/* Profile Card updates */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm p-6 space-y-6">
                <h3 className="font-extrabold text-slate-800 text-base tracking-wide border-b border-slate-100 pb-3">My Donation Settings</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Availability toggle switch */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div>
                      <span className="font-extrabold text-slate-800 text-sm block">Toggle Availability</span>
                      <span className="text-slate-400 text-[11px] block mt-0.5">Make yourself visible to emergency dispatchers</span>
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => setDonorAvailable(!donorAvailable)}
                      className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${donorAvailable ? 'bg-green-600' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${donorAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Active District</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none">
                      <option>Colombo</option>
                      <option>Kandy</option>
                      <option>Galle</option>
                    </select>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="h-12 bg-white border-t border-slate-200 px-6 flex flex-col sm:flex-row justify-between items-center shrink-0 text-[10px] text-slate-400 gap-2 font-semibold">
          <span>ජීවධාරා Healthcare Network • © 2026</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#compliance" className="hover:underline">Compliance</a>
          </div>
        </footer>

      </main>

      {/* ========================================================= */}
      {/* MODAL: REGISTER NEW HOSPITAL                              */}
      {/* ========================================================= */}
      {isAddHospitalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jeeva-navy/55 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-slate-800 text-base">Register Hospital Partner</h3>
              <button onClick={() => setIsAddHospitalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                createHospital({ hospitalName: newHosp.name, location: newHosp.location, contactNumber: newHosp.contact, adminName: newHosp.admin });
                setNewHosp({ name: '', location: '', contact: '', admin: '' });
                setIsAddHospitalOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hospital Name</label>
                <input 
                  type="text" 
                  value={newHosp.name}
                  onChange={(e) => setNewHosp({ ...newHosp, name: e.target.value })}
                  required
                  placeholder="e.g. Colombo General Clinic"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Location / Address</label>
                <input 
                  type="text" 
                  value={newHosp.location}
                  onChange={(e) => setNewHosp({ ...newHosp, location: e.target.value })}
                  required
                  placeholder="e.g. Galle Road, Colombo"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Contact Number</label>
                <input 
                  type="text" 
                  value={newHosp.contact}
                  onChange={(e) => setNewHosp({ ...newHosp, contact: e.target.value })}
                  required
                  placeholder="e.g. +94 11 000 0000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Chief Administrator Name</label>
                <input 
                  type="text" 
                  value={newHosp.admin}
                  onChange={(e) => setNewHosp({ ...newHosp, admin: e.target.value })}
                  required
                  placeholder="Dr. Bandara L."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none" 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddHospitalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition">Add Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: REGISTER NEW DONOR                                 */}
      {/* ========================================================= */}
      {isAddDonorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jeeva-navy/55 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-slate-800 text-base">Register New Blood Donor</h3>
              <button onClick={() => setIsAddDonorOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                createDonor({ name: newDonor.name, email: newDonor.email, bloodGroup: newDonor.bloodGroup, district: newDonor.district, availability: newDonor.availability });
                setNewDonor({ name: '', email: '', bloodGroup: 'O-', district: 'Colombo', availability: true });
                setIsAddDonorOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                  required
                  placeholder="Sarah Janansiri"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={newDonor.email}
                  onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
                  required
                  placeholder="donor@gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Blood Group</label>
                  <select 
                    value={newDonor.bloodGroup}
                    onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none text-slate-800"
                  >
                    <option>O-</option>
                    <option>O+</option>
                    <option>A-</option>
                    <option>A+</option>
                    <option>B-</option>
                    <option>B+</option>
                    <option>AB-</option>
                    <option>AB+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">District / Region</label>
                  <select 
                    value={newDonor.district}
                    onChange={(e) => setNewDonor({ ...newDonor, district: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none text-slate-800"
                  >
                    <option>Colombo</option>
                    <option>Kandy</option>
                    <option>Galle</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddDonorOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition">Register Donor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DISPATCH NEW EMERGENCY REQUEST                      */}
      {/* ========================================================= */}
      {isNewRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jeeva-navy/55 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-slate-800 text-base">Dispatch Emergency Request</h3>
              <button onClick={() => setIsNewRequestOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                createRequest({ bloodGroup: newReq.bloodGroup, urgencyLevel: newReq.urgencyLevel as any, unitsRequired: newReq.unitsRequired, patientName: newReq.patientName, description: newReq.description });
                setNewReq({ bloodGroup: 'O-', urgencyLevel: 'Critical', unitsRequired: 4, patientName: '', description: '' });
                setIsNewRequestOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Blood Group Required</label>
                  <select 
                    value={newReq.bloodGroup}
                    onChange={(e) => setNewReq({ ...newReq, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none text-slate-800"
                  >
                    <option>O-</option>
                    <option>O+</option>
                    <option>A-</option>
                    <option>A+</option>
                    <option>B-</option>
                    <option>B+</option>
                    <option>AB-</option>
                    <option>AB+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Urgency Level</label>
                  <select 
                    value={newReq.urgencyLevel}
                    onChange={(e) => setNewReq({ ...newReq, urgencyLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none text-slate-800"
                  >
                    <option>Critical</option>
                    <option>Urgent</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Units Required (pints)</label>
                  <input 
                    type="number" 
                    value={newReq.unitsRequired}
                    onChange={(e) => setNewReq({ ...newReq, unitsRequired: parseInt(e.target.value) || 1 })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Patient Full Name</label>
                  <input 
                    type="text" 
                    value={newReq.patientName}
                    onChange={(e) => setNewReq({ ...newReq, patientName: e.target.value })}
                    placeholder="Aditiya Varma"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Clinical Notes / Details</label>
                <textarea 
                  rows={3}
                  value={newReq.description}
                  onChange={(e) => setNewReq({ ...newReq, description: e.target.value })}
                  placeholder="Describe patient emergency and specific details..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsNewRequestOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-jeeva-red hover:bg-jeeva-red-hover text-white font-bold rounded-xl text-xs transition">Dispatch Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
