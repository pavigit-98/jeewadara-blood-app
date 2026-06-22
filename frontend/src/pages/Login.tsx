import React from 'react';
import { Heart, Users, Settings, ArrowRight, Award, Info } from 'lucide-react';

interface LoginProps {
  loginId: string;
  setLoginId: (val: string) => void;
  loginKey: string;
  setLoginKey: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Login: React.FC<LoginProps> = ({
  loginId,
  setLoginId,
  loginKey,
  setLoginKey,
  onSubmit
}) => {
  return (
    <div 
      className="min-h-screen relative flex flex-col justify-between bg-cover bg-center text-white" 
      style={{ backgroundImage: "linear-gradient(rgba(0, 20, 42, 0.9), rgba(0, 20, 42, 0.95)), url('https://images.unsplash.com/photo-1579684389782-64d84b5e901d?w=1200')" }}
    >
      <div className="absolute inset-0 bg-jeeva-navy/20 backdrop-blur-[2px]"></div>

      {/* Top Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-white flex items-center justify-center font-bold text-jeeva-navy text-2xl tracking-tighter shadow-md" aria-hidden="true">
            ජී
          </div>
          <span className="font-extrabold text-xl tracking-wide font-sans">Jeevadhara</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>System Live & Syncing</span>
        </div>
      </header>

      {/* Central Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
          {/* Top Indicator */}
          <div className="bg-white/5 p-8 text-center border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-jeeva-red fill-jeeva-red animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Secure Access Portal</h2>
            <p className="text-white/60 text-xs mt-1 font-medium">Jeevadhara Healthcare Network Authentication</p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="p-8 space-y-6">
            <div>
              <label htmlFor="personnelId" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Medical Personnel ID</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-white/40"><Users className="w-5 h-5" /></span>
                <input 
                  id="personnelId"
                  type="text" 
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-jeeva-red focus:ring-1 focus:ring-jeeva-red transition" 
                  placeholder="H-2026-XXXX" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="securityKey" className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Security Key</label>
                <a href="#forgot" className="text-xs text-white/50 hover:text-white transition">Forgot Security Key?</a>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-white/40"><Settings className="w-5 h-5" /></span>
                <input 
                  id="securityKey"
                  type="password" 
                  value={loginKey}
                  onChange={(e) => setLoginKey(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-jeeva-red focus:ring-1 focus:ring-jeeva-red transition" 
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
            <a href="#forgot-key" className="hover:text-white transition">Forgot Security Key?</a>
            <a href="#help-desk" className="hover:text-white transition font-bold">Help Desk</a>
          </div>

          {/* Crisis SOS Banner */}
          <div className="bg-jeeva-red text-center py-4 text-sm font-bold uppercase tracking-wider border-t border-white/10 animate-pulse">
            🚨 CRISIS MODE & EMERGENCY ACCESS: 1-800-JEEVA-SOS 🚨
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col sm:flex-row justify-between items-center p-6 bg-jeeva-navy border-t border-white/5 text-xs text-white/50 w-full gap-4">
        <span>© 2026 Jeevadhara Healthcare Network. All rights reserved.</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Award className="w-4 h-4" /> ISO 27001 Certified</span>
          <span>•</span>
          <span>End-to-End Encryption</span>
          <span>•</span>
          <span>HIPAA Compliant</span>
        </div>
      </footer>
    </div>
  );
};
