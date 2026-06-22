import React from 'react';
import { Building2, Plus, SlidersHorizontal, MapPin, Phone, Users, Info, Award } from 'lucide-react';
import { IHospital, IUser } from '../types';

interface HospitalManagementProps {
  hospitals: IHospital[];
  currentUser: IUser;
  hospitalSearch: string;
  setHospitalSearch: (val: string) => void;
  onOpenAddModal: () => void;
  onNavigateToRequests: () => void;
}

export const HospitalManagement: React.FC<HospitalManagementProps> = ({
  hospitals,
  currentUser,
  hospitalSearch,
  setHospitalSearch,
  onOpenAddModal,
  onNavigateToRequests
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Healthcare Network Directory</h2>
          <p className="text-slate-400 text-xs font-medium">Manage and monitor all partner clinics, blood banks, and diagnostic nodes in the network.</p>
        </div>
        {currentUser.role === 'Admin' && (
          <button 
            onClick={onOpenAddModal}
            className="px-5 py-2.5 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md focus:ring-2 focus:ring-jeeva-navy"
          >
            <Plus className="w-4 h-4" /> Register New Entry
          </button>
        )}
      </div>

      {/* Demand Detection Info Banner */}
      <div className="p-4 bg-jeeva-navy-soft border border-jeeva-navy/10 text-jeeva-navy rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div className="flex gap-3 text-xs leading-relaxed">
          <Info className="w-5 h-5 text-jeeva-navy shrink-0 text-jeeva-blue" />
          <div>
            <span className="font-bold text-slate-800 block">High Demand Detected</span>
            3 hospitals are currently reporting critical shortages of O-negative units.
          </div>
        </div>
        <button 
          onClick={onNavigateToRequests}
          className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition focus:outline-none"
        >
          View Logistics Heatmap
        </button>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-3 text-slate-400" aria-hidden="true"><SearchIcon className="w-4 h-4" /></span>
          <input 
            type="text" 
            placeholder="Search by name, district, or administration name..."
            value={hospitalSearch}
            onChange={(e) => setHospitalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-jeeva-navy focus:ring-1 focus:ring-jeeva-navy"
            aria-label="Search hospitals directory"
          />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-sm flex items-center gap-2 focus:outline-none">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Hospitals list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.filter(h => h.hospitalName.toLowerCase().includes(hospitalSearch.toLowerCase()) || h.location.toLowerCase().includes(hospitalSearch.toLowerCase())).map((h) => (
          <div key={h.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500" aria-hidden="true">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${h.activeRequests && h.activeRequests > 0 ? 'bg-red-50 text-jeeva-red' : 'bg-green-50 text-green-700'}`}>
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
            
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 font-sans">
              <button className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition focus:outline-none">
                Manage Staff
              </button>
              <button className="py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition focus:outline-none">
                View Inventory
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Partner Card */}
        {currentUser.role === 'Admin' && (
          <button 
            onClick={onOpenAddModal}
            className="border-2 border-dashed border-slate-200 hover:border-slate-400 bg-white/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center min-h-[220px] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-jeeva-navy"
            aria-label="Register a new healthcare facility"
          >
            <div className="p-4 bg-slate-100 rounded-full text-slate-500 mb-3" aria-hidden="true"><Plus className="w-6 h-6" /></div>
            <h3 className="font-bold text-slate-800 text-sm">Add Partner</h3>
            <p className="text-slate-400 text-xs mt-1 max-w-[200px] font-medium">Click to register a new healthcare facility to the network.</p>
          </button>
        )}
      </div>

      {/* Bottom information boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-44 bg-cover bg-center flex items-end p-6 border border-slate-200" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,20,42,0.85)), url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600')" }}>
          <div>
            <h3 className="text-white font-extrabold text-lg">Logistics Map</h3>
            <p className="text-white/70 text-xs mt-1 font-medium">Real-time visualization of blood unit movement between listed facilities.</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="p-2 bg-blue-50 text-jeeva-blue rounded-lg inline-block" aria-hidden="true"><Award className="w-5 h-5" /></span>
            <h4 className="font-extrabold text-slate-800 mt-3 text-sm">Compliance Status</h4>
            <p className="text-slate-400 text-xs mt-1 font-medium">98% of partner hospitals have completed their quarterly safety audits.</p>
          </div>
          <button className="w-full py-2.5 mt-4 border border-slate-200 hover:bg-slate-50 text-jeeva-navy font-bold rounded-xl text-xs transition focus:outline-none">
            Generate Network Report
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
