import { create } from 'zustand';
import { IUser, IDonor, IHospital, IBloodRequest, IDonorResponse, INotification } from '../types';

interface JeevaState {
  currentUser: IUser;
  activeRole: 'Admin' | 'Hospital' | 'Donor';
  activeTab: string; // 'dashboard' | 'hospitals' | 'donors' | 'requests' | 'matching' | 'notifications' | 'messages' | 'settings' | 'help'
  donors: (IDonor & { name: string; avatar: string; email: string })[];
  hospitals: IHospital[];
  requests: IBloodRequest[];
  notifications: INotification[];
  chats: Record<string, { sender: string; text: string; time: string; doc?: string }[]>;
  activeChatContact: string;
  activeMatchRequest: IBloodRequest | null;
  isScanning: boolean;
  scanProgress: number;
  matches: any[];
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;

  // Actions
  setRole: (role: 'Admin' | 'Hospital' | 'Donor') => void;
  setActiveTab: (tab: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  
  // Fetch / Async simulation methods (supports offline client-side logic beautifully!)
  fetchData: () => Promise<void>;
  createRequest: (reqData: Partial<IBloodRequest>) => Promise<void>;
  createHospital: (hospData: Partial<IHospital>) => Promise<void>;
  createDonor: (donorData: any) => Promise<void>;
  updateDonor: (id: string, donorData: any) => Promise<void>;
  deleteDonor: (id: string) => Promise<void>;
  
  // Matching Engine triggers
  startMatching: (request: IBloodRequest) => void;
  dispatchMatchNotification: (requestId: string, donorIds: string[]) => Promise<void>;
  
  // Notification actions
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;

  // Chat message send
  sendChatMessage: (contact: string, text: string, doc?: string) => void;
  saveProfileSettings: (profileData: { firstName: string; lastName: string; email: string; employeeId: string; department: string }) => void;
}

const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('accessToken');
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const useJeevaStore = create<JeevaState>((set, get) => ({
  currentUser: {
    id: "U-ADMIN-01",
    role: "Admin",
    name: "Dr. Kavindi Silva",
    email: "kavindi.silva@jeevadhara.gov.lk",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    employeeId: "DIR-2026-09",
    department: "Regional Logistics"
  },
  activeRole: 'Admin',
  activeTab: 'dashboard',
  donors: [],
  hospitals: [],
  requests: [],
  notifications: [],
  chats: {},
  activeChatContact: 'City General Blood Bank',
  activeMatchRequest: null,
  isScanning: false,
  scanProgress: 0,
  matches: [],
  toast: null,

  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 4000);
  },
  hideToast: () => set({ toast: null }),

  setRole: (role) => {
    const defaultUsers = {
      Admin: {
        id: "U-ADMIN-01",
        role: "Admin" as const,
        name: "Dr. Kavindi Silva",
        email: "kavindi.silva@jeevadhara.gov.lk",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        employeeId: "DIR-2026-09",
        department: "Regional Logistics"
      },
      Hospital: {
        id: "U-HOSP-01",
        role: "Hospital" as const,
        name: "Dr. Sarah Chen",
        email: "sarah.chen@hospital.lk",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
        employeeId: "JD-9921-X",
        department: "Emergency Response"
      },
      Donor: {
        id: "U-DONOR-01",
        role: "Donor" as const,
        name: "Sarah Janansiri",
        email: "sarah.j@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
      }
    };
    
    set({ 
      activeRole: role, 
      currentUser: defaultUsers[role],
      activeTab: role === 'Donor' ? 'donors' : 'dashboard'
    });
    get().showToast(`Switched active workspace role to ${role}`, 'success');
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  fetchData: async () => {
    try {
      // 1. Fetch from Express API
      const rReq = await fetch(`${API_BASE}/requests`, {
        headers: getAuthHeaders()
      });
      const requests = await rReq.json();

      const rHosp = await fetch(`${API_BASE}/hospitals`, {
        headers: getAuthHeaders()
      });
      const hospitals = await rHosp.json();

      const rDon = await fetch(`${API_BASE}/donors`, {
        headers: getAuthHeaders()
      });
      const donors = await rDon.json();

      const rNot = await fetch(`${API_BASE}/notifications`, {
        headers: getAuthHeaders()
      });
      const notifications = await rNot.json();

      const rMsg = await fetch(`${API_BASE}/messages`, {
        headers: getAuthHeaders()
      });
      const chats = await rMsg.json();

      set({ requests, hospitals, donors, notifications, chats });
    } catch (err) {
      console.warn('Backend API server not accessible, utilizing premium self-contained simulated state data store.');
      // Local fallback dataset populated if server is offline
      const mockHospitals: IHospital[] = [
        { id: "H-NTH", userId: "U-HOSP-01", hospitalName: "National Teaching Hospital", location: "Ward Place, Colombo 07", contactNumber: "+94 11 234 5678", adminName: "Dr. Anura Perera", activeRequests: 12 },
        { id: "H-CBB", userId: "U-HOSP-01", hospitalName: "Central Blood Bank", location: "Kandy Road, Peradeniya", contactNumber: "+94 81 238 8000", adminName: "Sarah Wijetunga", activeRequests: 0 },
        { id: "H-AOI", userId: "U-HOSP-01", hospitalName: "Apeksha Oncology Institute", location: "High Level Rd, Maharagama", contactNumber: "+94 11 285 0252", adminName: "Dr. L. Fernando", activeRequests: 4 },
        { id: "H-JGH", userId: "U-HOSP-01", hospitalName: "Jaffna General Hospital", location: "Hospital Rd, Jaffna", contactNumber: "+94 21 222 3348", adminName: "S. Thivakaran", activeRequests: 21 },
        { id: "H-SPD", userId: "U-HOSP-01", hospitalName: "Southern Province Depot", location: "Matara Rd, Galle", contactNumber: "+94 91 223 4000", adminName: "K. Ratnayake", activeRequests: 2 }
      ];

      const mockDonors = [
        { id: "D-01", userId: "U-DONOR-01", name: "Sarah Janansiri", email: "sarah.j@gmail.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", bloodGroup: "O-", district: "Colombo", availability: true, lastDonationDate: "2025-10-14", eligibilityScore: 98, statusText: "LIVE & AVAILABLE", donationHistory: [{ date: "2025-10-14", location: "National Teaching Hospital", status: "Completed" as const }] },
        { id: "D-02", userId: "U-DONOR-02", name: "Arjun Perera", email: "arjun.p@gmail.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", bloodGroup: "A+", district: "Colombo", availability: false, lastDonationDate: "2026-05-22", eligibilityScore: 35, statusText: "RECENTLY DONATED", donationHistory: [{ date: "2026-05-22", location: "Central Blood Bank", status: "Completed" as const }] },
        { id: "D-03", userId: "U-DONOR-03", name: "Malani Fonseka", email: "malani.f@gmail.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", bloodGroup: "B+", district: "Colombo", availability: true, lastDonationDate: "2025-11-08", eligibilityScore: 92, statusText: "LIVE & AVAILABLE", donationHistory: [{ date: "2025-11-08", location: "National Teaching Hospital", status: "Completed" as const }] },
        { id: "D-04", userId: "U-DONOR-01", name: "Nilanthi Jaya", email: "nilanthi.j@gmail.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", bloodGroup: "AB-", district: "Kandy", availability: false, lastDonationDate: "2025-01-15", eligibilityScore: 0, statusText: "DEFERRED (MEDICAL)", donationHistory: [{ date: "2025-01-15", location: "Central Blood Bank", status: "Deferred" as const }] },
        { id: "D-05", userId: "U-DONOR-02", name: "Robert Alvis", email: "robert.a@gmail.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", bloodGroup: "A-", district: "Galle", availability: true, lastDonationDate: "2025-12-30", eligibilityScore: 84, statusText: "LIVE & AVAILABLE", donationHistory: [{ date: "2025-12-30", location: "Southern Province Depot", status: "Completed" as const }] },
        { id: "D-06", userId: "U-DONOR-03", name: "Samanthi Dias", email: "samanthi.d@gmail.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", bloodGroup: "O+", district: "Colombo", availability: true, lastDonationDate: "2026-01-05", eligibilityScore: 94, statusText: "LIVE & AVAILABLE", donationHistory: [{ date: "2026-01-05", location: "Apeksha Oncology Institute", status: "Completed" as const }] }
      ];

      const mockRequests: IBloodRequest[] = [
        { id: "REQ-882", bloodGroup: "O-", hospitalId: "H-NTH", hospitalName: "National Teaching Hospital", location: "Ward Place, Colombo 07", urgencyLevel: "Critical", expiryTime: new Date(Date.now() + 45 * 60000).toISOString(), status: "Open", unitsRequired: 4, timeElapsed: "12m ago", patientName: "Aditiya Varma", description: "Patient in critical condition following motorway incident. Proximity matching activated.", transitProgress: 75, vehicleId: "MED-TRANS-04" },
        { id: "REQ-883", bloodGroup: "AB+", hospitalId: "H-CBB", hospitalName: "St. Jude Medical Center", location: "West Wing, Colombo", urgencyLevel: "Urgent", expiryTime: new Date(Date.now() + 180 * 60000).toISOString(), status: "Open", unitsRequired: 2, timeElapsed: "45m ago" },
        { id: "REQ-884", bloodGroup: "A-", hospitalId: "H-AOI", hospitalName: "Lakeside Children's Hospital", location: "North Shore, Colombo", urgencyLevel: "Low", expiryTime: new Date(Date.now() + 720 * 60000).toISOString(), status: "Open", unitsRequired: 1, timeElapsed: "2h ago" },
        { id: "REQ-885", bloodGroup: "B+", hospitalId: "H-SPD", hospitalName: "Metro Trauma Center", location: "Central Metro, Colombo", urgencyLevel: "Urgent", expiryTime: new Date(Date.now() + 120 * 60000).toISOString(), status: "Open", unitsRequired: 6, timeElapsed: "18m ago" },
        { id: "REQ-886", bloodGroup: "O+", hospitalId: "H-AOI", hospitalName: "Regional Blood Bank", location: "Outer Ring, Kandy", urgencyLevel: "Critical", expiryTime: new Date(Date.now() + 30 * 60000).toISOString(), status: "Open", unitsRequired: 12, timeElapsed: "5m ago" }
      ];

      const mockNotifications: INotification[] = [
        { id: "N-01", userId: "U-ADMIN-01", title: "Emergency Type O- Negative Required", message: "National Cancer Institute requests immediate supply. 4 units needed for trauma patient.", status: "Unread", urgency: "Critical", type: "Request", timestamp: "2 mins ago" },
        { id: "N-02", userId: "U-ADMIN-01", title: "Donor Aruna Kumara Matched", message: "Compatibility score 98.4%. Match confirmed with ID #88219. Awaiting hospital pick-up.", status: "Unread", urgency: "Normal", type: "Match", timestamp: "15 mins ago" },
        { id: "N-03", userId: "U-ADMIN-01", title: "New Request: General Hospital Colombo", message: "Standard request for 10 units of A+ blood. Routine surgery backup. Priority: Normal.", status: "Unread", urgency: "Normal", type: "Request", timestamp: "42 mins ago" },
        { id: "N-04", userId: "U-ADMIN-01", title: "Daily Database Sync Complete", message: "All regional nodes synchronized successfully. 1,240 new donor profiles indexed.", status: "Read", urgency: "Normal", type: "System", timestamp: "2 hours ago" },
        { id: "N-05", userId: "U-ADMIN-01", title: "New Partner: Kandy Specialty Clinic", message: "Jeevadhara network welcomes Kandy Specialty Clinic. New logistics hub established.", status: "Unread", urgency: "Normal", type: "System", timestamp: "5 hours ago" }
      ];

      const mockChats = {
        'City General Blood Bank': [
          { sender: 'Dr. Sarah Chen', text: 'We have confirmed the matching for Request REQ-882.', time: '10:42 AM' },
          { sender: 'Dr. Sarah Chen', text: 'Dispatching 4 units of O+ immediately. Expect arrival at Loading Dock 4 in 20 mins.', time: '10:42 AM' },
          { sender: 'You', text: 'Understood. Dr. Miller is standing by at Dock 4. Please send the digital cross-match reports once the courier is scanned in.', time: '10:45 AM' }
        ],
        'St. Mary\'s Laboratory': [
          { sender: 'Lab Admin', text: 'Screening results for Batch #409 are ready for download.', time: '14:20 PM' }
        ],
        'National Hematology Center': [
          { sender: 'Director NHC', text: 'New guidelines for plasma extraction protocols released today.', time: 'Yesterday' }
        ]
      };

      set({ requests: mockRequests, hospitals: mockHospitals, donors: mockDonors, notifications: mockNotifications, chats: mockChats });
    }
  },

  createRequest: async (reqData) => {
    try {
      const res = await fetch(`${API_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(reqData)
      });
      if (res.ok) {
        await get().fetchData();
        get().showToast('Emergency request successfully dispatched across network!', 'success');
        return;
      }
    } catch {}
    
    // Fallback logic
    const activeHosp = get().hospitals.find(h => h.id === reqData.hospitalId) || get().hospitals[0];
    const newReq: IBloodRequest = {
      id: `REQ-${Date.now().toString().slice(-3)}`,
      bloodGroup: reqData.bloodGroup || 'O-',
      hospitalId: activeHosp.id,
      hospitalName: activeHosp.hospitalName,
      location: activeHosp.location,
      urgencyLevel: reqData.urgencyLevel || 'Urgent',
      expiryTime: new Date(Date.now() + 120 * 60000).toISOString(),
      status: 'Open',
      unitsRequired: reqData.unitsRequired || 2,
      timeElapsed: '1s ago',
      patientName: reqData.patientName || 'Emergency Patient',
      description: reqData.description || 'Emergency blood units required immediately.'
    };
    
    const newAlert: INotification = {
      id: `N-${Date.now().toString().slice(-4)}`,
      userId: 'U-ADMIN-01',
      title: `Emergency Type ${newReq.bloodGroup} Required`,
      message: `${newReq.hospitalName} requests ${newReq.unitsRequired} units. Proximity matching activated.`,
      status: 'Unread',
      urgency: 'Critical',
      type: 'Request',
      timestamp: 'Just now'
    };

    set({
      requests: [newReq, ...get().requests],
      notifications: [newAlert, ...get().notifications]
    });
    get().showToast('Emergency request successfully created (Local Simulation Mode)', 'success');
  },

  createHospital: async (hospData) => {
    try {
      const res = await fetch(`${API_BASE}/hospitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(hospData)
      });
      if (res.ok) {
        await get().fetchData();
        get().showToast('New healthcare partner successfully registered.', 'success');
        return;
      }
    } catch {}

    const newH: IHospital = {
      id: `H-${Date.now().toString().slice(-3)}`,
      userId: 'U-HOSP-MOCK',
      hospitalName: hospData.hospitalName || 'New Health Center',
      location: hospData.location || 'Colombo Road, Sri Lanka',
      contactNumber: hospData.contactNumber || '+94 11 000 0000',
      adminName: hospData.adminName || 'Dr. Deshan S.',
      activeRequests: 0
    };
    set({ hospitals: [...get().hospitals, newH] });
    get().showToast('Healthcare partner registered locally (Local Mode)', 'success');
  },

  createDonor: async (donorData) => {
    try {
      const res = await fetch(`${API_BASE}/donors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(donorData)
      });
      if (res.ok) {
        await get().fetchData();
        get().showToast('New blood donor registered successfully in network.', 'success');
        return;
      }
    } catch {}

    const id = `D-${Date.now().toString().slice(-4)}`;
    const newD = {
      id,
      userId: `U-DONOR-${id}`,
      name: donorData.name || 'Anonymous Donor',
      email: donorData.email || 'donor@jeevadhara.lk',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      bloodGroup: donorData.bloodGroup || 'O-',
      district: donorData.district || 'Colombo',
      availability: donorData.availability !== undefined ? donorData.availability : true,
      lastDonationDate: donorData.lastDonationDate || '2025-10-10',
      eligibilityScore: 90,
      donationHistory: [],
      statusText: donorData.statusText || 'LIVE & AVAILABLE'
    };
    set({ donors: [newD, ...get().donors] });
    get().showToast('Donor registered locally', 'success');
  },

  updateDonor: async (id, donorData) => {
    try {
      const res = await fetch(`${API_BASE}/donors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(donorData)
      });
      if (res.ok) {
        await get().fetchData();
        get().showToast('Donor records updated successfully.', 'success');
        return;
      }
    } catch {}

    const updated = get().donors.map(d => {
      if (d.id === id) {
        return {
          ...d,
          ...donorData,
          name: donorData.name || d.name,
          email: donorData.email || d.email
        };
      }
      return d;
    });
    set({ donors: updated });
    get().showToast('Donor profile updated locally', 'success');
  },

  deleteDonor: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/donors/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await get().fetchData();
        get().showToast('Donor successfully removed from directory.', 'info');
        return;
      }
    } catch {}

    set({ donors: get().donors.filter(d => d.id !== id) });
    get().showToast('Donor deleted locally', 'info');
  },

  startMatching: (request) => {
    set({ activeMatchRequest: request, isScanning: true, scanProgress: 0, matches: [], activeTab: 'matching' });
    
    // Simulate smart matching scanning animations
    const interval = setInterval(() => {
      const current = get().scanProgress;
      if (current >= 92) {
        clearInterval(interval);
        
        // Match calculation formula
        const groupCompatibility: Record<string, string[]> = {
          'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
          'O+': ['O+', 'A+', 'B+', 'AB+'],
          'A-': ['A-', 'A+', 'AB-', 'AB+'],
          'A+': ['A+', 'AB+'],
          'B-': ['B-', 'B+', 'AB-', 'AB+'],
          'B+': ['B+', 'AB+'],
          'AB-': ['AB-', 'AB+'],
          'AB+': ['AB+']
        };

        const targetBlood = request.bloodGroup;
        // Filter compatible donors
        const compatibleDonors = get().donors.filter(d => 
          groupCompatibility[d.bloodGroup]?.includes(targetBlood) && 
          !d.statusText?.includes('DEFERRED')
        );

        // Map and rank matches
        const mappedMatches = compatibleDonors.map(donor => {
          // availability (50) + activity (30) + base (20)
          const availScore = donor.availability ? 50 : 0;
          const coolMs = 90 * 24 * 60 * 60 * 1000;
          const donatedMs = Date.now() - new Date(donor.lastDonationDate).getTime();
          const activityScore = donatedMs >= coolMs ? 30 : 0;
          const eligScore = donor.donationHistory.some(h => h.status === 'Deferred') ? 5 : 20;
          const score = availScore + activityScore + eligScore;

          const sameDistrict = donor.district.toLowerCase() === request.location.toLowerCase() || donor.district === 'Colombo';
          const distanceKm = sameDistrict ? parseFloat((Math.random() * 4 + 1).toFixed(1)) : parseFloat((Math.random() * 20 + 5).toFixed(1));
          const travelTimeMins = Math.round(distanceKm * 2.5 + Math.random() * 4);
          const confidence = Math.round(70 + (score / 100) * 29);

          return {
            id: donor.id,
            name: donor.name,
            avatar: donor.avatar,
            bloodGroup: donor.bloodGroup,
            score,
            confidence,
            distanceKm,
            travelTimeMins,
            availability: donor.availability,
            statusText: donor.statusText
          };
        }).sort((a, b) => b.score - a.score || a.distanceKm - b.distanceKm);

        set({ matches: mappedMatches, isScanning: false, scanProgress: 100 });
        get().showToast('Smart matching algorithms completed successfully!', 'success');
      } else {
        set({ scanProgress: current + 15 });
      }
    }, 400);
  },

  dispatchMatchNotification: async (requestId, donorIds) => {
    try {
      const res = await fetch(`${API_BASE}/matching/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ requestId, donorIds })
      });
      if (res.ok) {
        get().showToast('FCM Cloud Alerts dispatched to selected donors.', 'success');
        // Let api do completion async
        setTimeout(() => get().fetchData(), 4000);
        return;
      }
    } catch {}

    // Local simulation fallback
    const requests = get().requests.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'Matched' as const,
          transitProgress: 0,
          vehicleId: 'MED-TRANS-04'
        };
      }
      return r;
    });

    const primaryDonorId = donorIds[0];
    const donorMatch = get().donors.find(d => d.id === primaryDonorId);

    // Create notifications
    const newNotifications = [
      {
        id: `N-MOCK-${Date.now()}`,
        userId: 'U-ADMIN-01',
        title: 'Emergency Matches Dispatched',
        message: `FCM push notifications dispatched to ${donorIds.length} compatibly ranked donors.`,
        status: 'Unread' as const,
        urgency: 'Normal' as const,
        type: 'Match' as const,
        timestamp: 'Just now'
      },
      ...get().notifications
    ];

    set({ requests, notifications: newNotifications });
    get().showToast('FCM matches successfully broadcasted!', 'success');

    // Simulate donor accept response in 4 seconds
    setTimeout(() => {
      if (donorMatch) {
        // Mark donor as deferred/unavailable due to cooldown rules
        const updatedDonors = get().donors.map(d => {
          if (d.id === donorMatch.id) {
            return {
              ...d,
              availability: false,
              lastDonationDate: new Date().toISOString().split('T')[0],
              statusText: 'RECENTLY DONATED',
              donationHistory: [
                { date: new Date().toISOString().split('T')[0], location: 'National Teaching Hospital', recipient: 'Aditiya Varma', status: 'Completed' as const },
                ...d.donationHistory
              ]
            };
          }
          return d;
        });

        // Set request transit progress completed
        const finalRequests = get().requests.map(r => {
          if (r.id === requestId) {
            return {
              ...r,
              status: 'Completed' as const,
              transitProgress: 100,
              vehicleId: 'MED-TRANS-04'
            };
          }
          return r;
        });

        const matchNotification = {
          id: `N-MOCK-OK-${Date.now()}`,
          userId: 'U-ADMIN-01',
          title: 'Successful Match Confirmed',
          message: `Donor ${donorMatch.name} accepted critical request REQ-882. Transit courier active.`,
          status: 'Unread' as const,
          urgency: 'Normal' as const,
          type: 'Match' as const,
          timestamp: 'Just now'
        };

        // Add matching log in chat conversation
        const chatMsgs = get().chats['City General Blood Bank'] || [];
        const updatedChats = {
          ...get().chats,
          'City General Blood Bank': [
            ...chatMsgs,
            { sender: donorMatch.name, text: 'Confirmed. I am on my way to the Regional Center to donate for Aditiya Varma.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            { sender: 'System Coordinator', text: 'CrossMatch matches verified with ID #88219. courier transit scheduled.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };

        set({ donors: updatedDonors, requests: finalRequests, notifications: [matchNotification, ...get().notifications], chats: updatedChats });
        get().showToast(`Match verified! Donor ${donorMatch.name} accepted request.`, 'success');
      }
    }, 4500);
  },

  markAllNotificationsRead: () => {
    const list = get().notifications.map(n => ({ ...n, status: 'Read' as const }));
    set({ notifications: list });
    get().showToast('All notifications marked as read', 'info');
  },

  markNotificationRead: (id) => {
    const list = get().notifications.map(n => n.id === id ? { ...n, status: 'Read' as const } : n);
    set({ notifications: list });
  },

  sendChatMessage: (contact, text, doc) => {
    const currentMsgs = get().chats[contact] || [];
    const newMsg = {
      sender: 'You',
      text: text || 'File document attachment sent.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doc
    };
    const updatedChats = {
      ...get().chats,
      [contact]: [...currentMsgs, newMsg]
    };
    set({ chats: updatedChats });

    // Try sending to api
    fetch(`${API_BASE}/messages/${encodeURIComponent(contact)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ text, doc })
    }).catch(() => {});
  },

  saveProfileSettings: (profileData) => {
    const updatedUser = {
      ...get().currentUser,
      name: `Dr. ${profileData.firstName} ${profileData.lastName}`,
      email: profileData.email,
      employeeId: profileData.employeeId,
      department: profileData.department
    };
    set({ currentUser: updatedUser });
    get().showToast('Profile configuration saved successfully!', 'success');

    // Sync with api
    fetch(`${API_BASE}/settings/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(profileData)
    }).catch(() => {});
  }
}));
