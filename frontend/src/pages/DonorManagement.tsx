import React from 'react';
import { Search, Plus, MapPin, Phone, Calendar, Users } from 'lucide-react';
import { IDonor, IUser } from '../types';

interface DonorManagementProps {
  donors: (IDonor & { name: string; avatar: string; email: string })[];
  currentUser: IUser;
  donorSearch: string;
  setDonorSearch: (val: string) => void;
  donorFilterBlood: string;
  setDonorFilterBlood: (val: string) => void;
  donorFilterStatus: string;
  setDonorFilterStatus: (val: string) => void;
  onOpenAddModal: () => void;
  onToggleAvailability?: () => void;
  donorAvailable?: boolean;
  activeRole: string;
}

export const DonorManagement: React.FC<DonorManagementProps> = ({
  donors,
  currentUser,
  donorSearch,
  setDonorSearch,
  donorFilterBlood,
  setDonorFilterBlood,
  donorFilterStatus,
  setDonorFilterStatus,
  onOpenAddModal,
  onToggleAvailability,
  donorAvailable = true,
  activeRole
}) => {

  // DONOR VIEW WORKSPACE
  if (activeRole === 'Donor') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Donor Workspace Dashboard</h2>
          <p className="text-slate-400 text-xs font-medium">Verify your status, update available districts, and accept match requests.</p>
        </div>

        {/* Urgent matched alert if active request */}
        <div className="p-5 border-2 border-jeeva-navy/20 bg-jeeva-navy-soft rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="bg-jeeva-red text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">Critical Proximity Request</span>
            <span className="text-[10px] text-slate-400 font-bold">12 mins away</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1.5 bg-red-50 border border-red-200 text-jeeva-red text-base font-extrabold rounded-xl" aria-hidden="true">O-</span>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">National Teaching Hospital</h3>
              <p className="text-slate-400 text-xs mt-0.5 font-medium">Urgent emergency surgery requires compatible O- Negative blood immediately.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2 font-sans">
            <button 
              onClick={() => {
                if (onToggleAvailability) onToggleAvailability();
              }}
              className="px-5 py-2.5 bg-jeeva-red hover:bg-jeeva-red-hover text-white text-xs font-bold rounded-xl transition shadow-md focus:outline-none"
            >
              Accept & Confirm Donation
            </button>
            <button className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition focus:outline-none">
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
                onClick={onToggleAvailability}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${donorAvailable ? 'bg-green-600' : 'bg-slate-300'}`}
                aria-label="Toggle availability status"
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${donorAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div>
              <label htmlFor="districtSelect" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Active District</label>
              <select id="districtSelect" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none">
                <option>Colombo</option>
                <option>Kandy</option>
                <option>Galle</option>
              </select>
            </div>

          </div>
        </div>

      </div>
    );
  }

  // STANDARD ADMIN VIEW
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Donor Network Directory</h2>
          <p className="text-slate-400 text-xs font-medium">Real-time access to the Jeevadhara donor pool. Manage verified individuals, track availability, and initiate screening matches.</p>
        </div>
        {currentUser.role === 'Admin' && (
          <button 
            onClick={onOpenAddModal}
            className="px-5 py-2.5 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-jeeva-navy"
          >
            <Plus className="w-4 h-4" /> Register New Donor
          </button>
        )}
      </div>

      {/* Search filter board */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-2.5 text-slate-400" aria-hidden="true"><Search className="w-4 h-4" /></span>
          <input 
            type="text" 
            placeholder="Search by name, ID, or location..."
            value={donorSearch}
            onChange={(e) => setDonorSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-jeeva-navy"
            aria-label="Search donor directory"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500 w-1/2 md:w-auto">
            <label htmlFor="bloodFilter" className="font-semibold shrink-0">Blood:</label>
            <select 
              id="bloodFilter"
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
            <label htmlFor="statusFilter" className="font-semibold shrink-0">Status:</label>
            <select 
              id="statusFilter"
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
                    <span className={`w-2.5 h-2.5 rounded-full ${d.availability ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} aria-hidden="true"></span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{d.district} District</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${d.bloodGroup.includes('-') ? 'bg-red-50 text-jeeva-red' : 'bg-blue-50 text-jeeva-blue'}`}>
                {d.bloodGroup}
              </span>
            </div>

            <div className="space-y-4">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block ${d.availability ? 'bg-green-50 text-green-700' : d.statusText === 'RECENTLY DONATED' ? 'bg-orange-50 text-jeeva-orange' : 'bg-red-50 text-jeeva-red'}`}>
                {d.statusText}
              </span>

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

              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>Compatibility History</span>
                  <span>{d.eligibilityScore}% Match</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden" aria-hidden="true">
                  <div className="bg-jeeva-navy h-full rounded-full" style={{ width: `${d.eligibilityScore}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 font-sans">
              <button className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition focus:outline-none">
                View Profile
              </button>
              <button className="py-2 bg-jeeva-navy hover:bg-jeeva-navy-light text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 focus:outline-none">
                <Phone className="w-3.5 h-3.5" /> Call Donor
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
