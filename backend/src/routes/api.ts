import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import { store } from '../services/dataStore';
import { runMatchingEngine } from '../services/matchingEngine';
import { IBloodRequest, INotification } from '../models/types';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middlewares/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'jeevadhara-secret-key-2026';

export const apiRouter = Router();

apiRouter.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Jeevadhara API is online. Use /api/auth/login to obtain a bearer token.' });
});

// ==========================================
// 1. AUTHENTICATION & DEMO ROLES
// ==========================================
apiRouter.post('/auth/login', (req: AuthenticatedRequest, res: Response) => {
  const { email, password, employeeId } = req.body;
  
  // Find user by email or employee ID
  const user = store.users.find(u => u.email === email || (employeeId && u.employeeId === employeeId));
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials or Medical Personnel ID.' });
  }

  // Generate formal secure JWT token signed by algorithm
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Return token and user profile
  return res.json({
    token: `Bearer ${token}`,
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      employeeId: user.employeeId,
      department: user.department
    }
  });
});

apiRouter.get('/auth/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

// ==========================================
// 2. DONORS MANAGEMENT (Protected by Authentication + Role Checks)
// ==========================================
apiRouter.get('/donors', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  let list = [...store.donors];
  const { search, bloodGroup, status, district } = req.query;

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(d => {
      const user = store.users.find(u => u.id === d.userId);
      return (
        user?.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q)
      );
    });
  }

  if (bloodGroup && bloodGroup !== 'All' && bloodGroup !== 'All Types') {
    list = list.filter(d => d.bloodGroup === bloodGroup);
  }

  if (status && status !== 'All') {
    list = list.filter(d => d.statusText?.toLowerCase().includes((status as string).toLowerCase()));
  }

  if (district) {
    list = list.filter(d => d.district.toLowerCase() === (district as string).toLowerCase());
  }

  const results = list.map(d => {
    const user = store.users.find(u => u.id === d.userId);
    return {
      ...d,
      name: user?.name || 'Anonymous Donor',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      email: user?.email || ''
    };
  });

  res.json(results);
});

apiRouter.post('/donors', authenticateToken, requireRole(['Admin']), (req: AuthenticatedRequest, res: Response) => {
  const { name, email, bloodGroup, district, availability, lastDonationDate, statusText } = req.body;
  
  const userId = `U-DONOR-${Date.now()}`;
  const donorId = `D-${Date.now().toString().slice(-4)}`;

  // Hashing password simulation / securing credential profiles
  const newUser = {
    id: userId,
    role: 'Donor' as const,
    name: name || 'New Donor',
    email: email || `${donorId.toLowerCase()}@jeevadhara.lk`,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  };

  const newDonor = {
    id: donorId,
    userId,
    bloodGroup: bloodGroup || 'O-',
    district: district || 'Colombo',
    availability: availability !== undefined ? availability : true,
    lastDonationDate: lastDonationDate || new Date().toISOString().split('T')[0],
    eligibilityScore: 90,
    donationHistory: [],
    statusText: statusText || 'LIVE & AVAILABLE'
  };

  store.users.push(newUser);
  store.donors.push(newDonor);

  res.status(201).json({ ...newDonor, name: newUser.name, avatar: newUser.avatar, email: newUser.email });
});

apiRouter.put('/donors/:id', authenticateToken, requireRole(['Admin', 'Donor']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const donorIdx = store.donors.findIndex(d => d.id === id);
  if (donorIdx === -1) return res.status(404).json({ message: 'Donor not found.' });

  const donor = store.donors[donorIdx];
  const { name, email, bloodGroup, district, availability, lastDonationDate, statusText } = req.body;

  donor.bloodGroup = bloodGroup ?? donor.bloodGroup;
  donor.district = district ?? donor.district;
  donor.availability = availability ?? donor.availability;
  donor.lastDonationDate = lastDonationDate ?? donor.lastDonationDate;
  donor.statusText = statusText ?? donor.statusText;

  const userIdx = store.users.findIndex(u => u.id === donor.userId);
  if (userIdx !== -1) {
    store.users[userIdx].name = name ?? store.users[userIdx].name;
    store.users[userIdx].email = email ?? store.users[userIdx].email;
  }

  res.json({
    ...donor,
    name: store.users[userIdx]?.name,
    avatar: store.users[userIdx]?.avatar,
    email: store.users[userIdx]?.email
  });
});

apiRouter.delete('/donors/:id', authenticateToken, requireRole(['Admin']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const donorIdx = store.donors.findIndex(d => d.id === id);
  if (donorIdx === -1) return res.status(404).json({ message: 'Donor not found.' });
  
  const donor = store.donors[donorIdx];
  store.donors.splice(donorIdx, 1);
  const userIdx = store.users.findIndex(u => u.id === donor.userId);
  if (userIdx !== -1) {
    store.users.splice(userIdx, 1);
  }
  
  res.json({ message: 'Donor successfully removed.' });
});

// ==========================================
// 3. HOSPITALS MANAGEMENT
// ==========================================
apiRouter.get('/hospitals', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { search } = req.query;
  let list = [...store.hospitals];

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(h => 
      h.hospitalName.toLowerCase().includes(q) || 
      h.location.toLowerCase().includes(q) || 
      h.adminName.toLowerCase().includes(q)
    );
  }

  res.json(list);
});

apiRouter.post('/hospitals', authenticateToken, requireRole(['Admin']), (req: AuthenticatedRequest, res: Response) => {
  const { hospitalName, location, contactNumber, adminName } = req.body;
  const id = `H-${Date.now().toString().slice(-4)}`;
  const newHosp = {
    id,
    userId: 'U-HOSP-NEW',
    hospitalName,
    location,
    contactNumber,
    adminName: adminName || 'Dr. Samantha L.',
    activeRequests: 0
  };
  store.hospitals.push(newHosp);
  res.status(201).json(newHosp);
});

// ==========================================
// 4. BLOOD REQUESTS & MATCHING ENGINE (Auth Protected)
// ==========================================
apiRouter.get('/requests', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json(store.bloodRequests);
});

apiRouter.post('/requests', authenticateToken, requireRole(['Admin', 'Hospital']), (req: AuthenticatedRequest, res: Response) => {
  const { bloodGroup, hospitalId, urgencyLevel, unitsRequired, patientName, description } = req.body;
  
  const hospital = store.hospitals.find(h => h.id === hospitalId) || store.hospitals[0];
  const newReq: IBloodRequest = {
    id: `REQ-${Date.now().toString().slice(-3)}`,
    bloodGroup: bloodGroup || 'O-',
    hospitalId: hospital.id,
    hospitalName: hospital.hospitalName,
    location: hospital.location,
    urgencyLevel: urgencyLevel || 'Urgent',
    expiryTime: new Date(Date.now() + 120 * 60000).toISOString(),
    status: 'Open',
    unitsRequired: unitsRequired || 2,
    timeElapsed: '1s ago',
    patientName: patientName || 'Unknown Patient',
    description: description || 'Emergency units requested immediately.'
  };

  store.bloodRequests.unshift(newReq);
  
  const newAlert: INotification = {
    id: `N-${Date.now().toString().slice(-4)}`,
    userId: 'U-ADMIN-01',
    title: `Emergency Type ${newReq.bloodGroup} Required`,
    message: `${newReq.hospitalName} requests ${newReq.unitsRequired} units. Proximity matching activated.`,
    status: 'Unread',
    urgency: newReq.urgencyLevel === 'Critical' || newReq.urgencyLevel === 'Urgent' ? 'Critical' : 'Normal',
    type: 'Request',
    timestamp: 'Just now'
  };
  store.notifications.unshift(newAlert);

  res.status(201).json(newReq);
});

apiRouter.get('/matching/run', authenticateToken, requireRole(['Admin']), (req: AuthenticatedRequest, res: Response) => {
  const { bloodGroup, district } = req.query;
  if (!bloodGroup) {
    return res.status(400).json({ message: 'Blood group parameter is required.' });
  }

  const matches = runMatchingEngine(bloodGroup as string, district as string);
  res.json(matches);
});

apiRouter.post('/matching/dispatch', authenticateToken, requireRole(['Admin']), (req: AuthenticatedRequest, res: Response) => {
  const { requestId, donorIds } = req.body;
  
  const request = store.bloodRequests.find(r => r.id === requestId);
  if (!request) return res.status(404).json({ message: 'Blood Request not found.' });

  request.status = 'Matched';
  request.transitProgress = 0;
  request.vehicleId = 'MED-TRANS-' + Math.floor(10 + Math.random() * 90);

  donorIds.forEach((donorId: string) => {
    const donor = store.donors.find(d => d.id === donorId);
    if (donor) {
      // Validate duplicate responses checks
      const hasResponse = store.responses.find(res => res.donorId === donorId && res.requestId === requestId);
      if (!hasResponse) {
        store.responses.push({
          id: `RES-${Date.now().toString().slice(-4)}-${donorId}`,
          donorId,
          donorName: store.users.find(u => u.id === donor.userId)?.name || 'Donor',
          requestId,
          responseStatus: 'Pending',
          timestamp: new Date().toISOString(),
          compatibilityScore: donor.eligibilityScore,
          travelTimeMins: Math.floor(10 + Math.random() * 20)
        });
      }

      store.notifications.unshift({
        id: `N-${Date.now().toString().slice(-4)}`,
        userId: donor.userId,
        title: `Critical Alert: ${request.bloodGroup} Blood Needed!`,
        message: `${request.hospitalName} requires urgent match. Please confirm availability.`,
        status: 'Unread',
        urgency: 'Critical',
        type: 'Match',
        timestamp: 'Just now'
      });
    }
  });

  // Automated acceptance simulation
  setTimeout(() => {
    const pendingResponses = store.responses.filter(res => res.requestId === requestId && res.responseStatus === 'Pending');
    if (pendingResponses.length > 0) {
      pendingResponses[0].responseStatus = 'Accepted';
      
      const donor = store.donors.find(d => d.id === pendingResponses[0].donorId);
      if (donor) {
        donor.availability = false;
        donor.lastDonationDate = new Date().toISOString().split('T')[0];
        donor.statusText = 'RECENTLY DONATED';
        
        donor.donationHistory.unshift({
          date: new Date().toISOString().split('T')[0],
          location: request.hospitalName,
          recipient: request.patientName || 'Emergency Patient',
          status: 'Completed'
        });
      }

      store.notifications.unshift({
        id: `N-${Date.now().toString().slice(-4)}`,
        userId: 'U-ADMIN-01',
        title: 'Successful Match Confirmed',
        message: `Donor ${pendingResponses[0].donorName} accepted request ${requestId} for ${request.hospitalName}.`,
        status: 'Unread',
        urgency: 'Normal',
        type: 'Match',
        timestamp: 'Just now'
      });

      request.status = 'Completed';
      request.transitProgress = 100;
    }
  }, 4000);

  res.json({ message: 'FCM push messages dispatched to ranked donors successfully.', request });
});

// ==========================================
// 5. NOTIFICATION CENTER
// ==========================================
apiRouter.get('/notifications', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.query;
  let list = store.notifications;
  if (userId) {
    list = list.filter(n => n.userId === userId || n.userId === 'U-ADMIN-01');
  }
  res.json(list);
});

apiRouter.post('/notifications/read-all', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  store.notifications.forEach(n => n.status = 'Read');
  res.json({ message: 'All notifications marked as read.' });
});

apiRouter.post('/notifications/:id/read', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const notif = store.notifications.find(n => n.id === id);
  if (notif) {
    notif.status = 'Read';
  }
  res.json({ success: true });
});

// ==========================================
// 6. CLINICAL CHATS / MESSAGES
// ==========================================
const mockChats: Record<string, { sender: string; text: string; time: string; doc?: string }[]> = {
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

apiRouter.get('/messages', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json(mockChats);
});

apiRouter.post('/messages/:contact', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { contact } = req.params;
  const { text, doc } = req.body;

  if (!mockChats[contact]) {
    mockChats[contact] = [];
  }

  const newMsg = {
    sender: 'You',
    text: text || 'File Attachment sent.',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    doc
  };

  mockChats[contact].push(newMsg);
  res.status(201).json(newMsg);
});

// ==========================================
// 7. PROFILE SETTINGS
// ==========================================
apiRouter.post('/settings/profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { firstName, lastName, email, employeeId, department } = req.body;
  
  const user = store.users[0];
  user.name = `Dr. ${firstName} ${lastName}`;
  user.email = email || user.email;
  user.employeeId = employeeId || user.employeeId;
  user.department = department || user.department;

  res.json({ message: 'Profile configuration saved successfully.', user });
});
