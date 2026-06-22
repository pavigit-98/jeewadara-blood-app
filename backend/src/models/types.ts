export type UserRole = 'Admin' | 'Hospital' | 'Donor';

export interface IUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  employeeId?: string;
  department?: string;
}

export interface IDonationHistory {
  date: string;
  location: string;
  recipient?: string;
  status: 'Completed' | 'Deferred' | 'Pending';
}

export interface IDonor {
  id: string;
  userId: string;
  bloodGroup: string;
  district: string;
  availability: boolean;
  donationHistory: IDonationHistory[];
  lastDonationDate: string;
  eligibilityScore: number; // calculated score
  statusText?: string; // e.g. "Live & Available", "Recently Donated", "Deferred"
}

export interface IHospital {
  id: string;
  userId: string;
  hospitalName: string;
  location: string;
  contactNumber: string;
  adminName: string;
  activeRequests?: number;
}

export interface IBloodRequest {
  id: string;
  bloodGroup: string;
  hospitalId: string;
  hospitalName: string;
  location: string;
  urgencyLevel: 'Critical' | 'Urgent' | 'High' | 'Medium' | 'Low';
  expiryTime: string; // ISO string
  status: 'Open' | 'Matched' | 'Completed' | 'Cancelled';
  unitsRequired: number;
  timeElapsed: string; // for high fidelity display
  patientName?: string;
  description?: string;
  transitProgress?: number; // 0-100
  vehicleId?: string;
}

export interface IDonorResponse {
  id: string;
  donorId: string;
  donorName: string;
  requestId: string;
  responseStatus: 'Pending' | 'Accepted' | 'Declined';
  timestamp: string;
  compatibilityScore: number;
  travelTimeMins?: number;
}

export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  status: 'Read' | 'Unread';
  urgency: 'Critical' | 'Urgent' | 'Normal';
  type: 'Request' | 'Match' | 'System' | 'Message';
  timestamp: string;
}
