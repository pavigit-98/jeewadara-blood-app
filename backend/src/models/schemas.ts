import mongoose, { Schema, Document } from 'mongoose';
import { IUser, IDonor, IHospital, IBloodRequest, IDonorResponse, INotification } from './types';

// User Schema
export interface IUserDocument extends IUser, Document {
  id: string;
}
const UserSchema = new Schema<IUserDocument>({
  role: { type: String, required: true, enum: ['Admin', 'Hospital', 'Donor'] },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  avatar: { type: String },
  employeeId: { type: String },
  department: { type: String }
}, { timestamps: true });

// Donor Schema
export interface IDonorDocument extends IDonor, Document {
  id: string;
}
const DonorSchema = new Schema<IDonorDocument>({
  userId: { type: String, required: true, unique: true, index: true },
  bloodGroup: { type: String, required: true, index: true },
  district: { type: String, required: true, index: true },
  availability: { type: Boolean, required: true, default: true },
  donationHistory: [{
    date: { type: String, required: true },
    location: { type: String, required: true },
    recipient: { type: String },
    status: { type: String, required: true, enum: ['Completed', 'Deferred', 'Pending'] }
  }],
  lastDonationDate: { type: String, required: true },
  eligibilityScore: { type: Number, required: true, default: 100 },
  statusText: { type: String, default: 'LIVE & AVAILABLE' }
}, { timestamps: true });

// Hospital Schema
export interface IHospitalDocument extends IHospital, Document {
  id: string;
}
const HospitalSchema = new Schema<IHospitalDocument>({
  userId: { type: String, required: true, index: true },
  hospitalName: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  adminName: { type: String, required: true },
  activeRequests: { type: Number, default: 0 }
}, { timestamps: true });

// Blood Request Schema
export interface IBloodRequestDocument extends IBloodRequest, Document {
  id: string;
}
const BloodRequestSchema = new Schema<IBloodRequestDocument>({
  bloodGroup: { type: String, required: true, index: true },
  hospitalId: { type: String, required: true, index: true },
  hospitalName: { type: String, required: true },
  location: { type: String, required: true },
  urgencyLevel: { type: String, required: true, enum: ['Critical', 'Urgent', 'High', 'Medium', 'Low'] },
  expiryTime: { type: String, required: true },
  status: { type: String, required: true, enum: ['Open', 'Matched', 'Completed', 'Cancelled'] },
  unitsRequired: { type: Number, required: true, default: 1 },
  timeElapsed: { type: String },
  patientName: { type: String },
  description: { type: String },
  transitProgress: { type: Number, default: 0 },
  vehicleId: { type: String }
}, { timestamps: true });

// Response Schema
export interface IDonorResponseDocument extends IDonorResponse, Document {
  id: string;
}
const DonorResponseSchema = new Schema<IDonorResponseDocument>({
  donorId: { type: String, required: true, index: true },
  donorName: { type: String, required: true },
  requestId: { type: String, required: true, index: true },
  responseStatus: { type: String, required: true, enum: ['Pending', 'Accepted', 'Declined'] },
  timestamp: { type: String, required: true },
  compatibilityScore: { type: Number, required: true },
  travelTimeMins: { type: Number }
}, { timestamps: true });

// Notification Schema
export interface INotificationDocument extends INotification, Document {
  id: string;
}
const NotificationSchema = new Schema<INotificationDocument>({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true, enum: ['Read', 'Unread'] },
  urgency: { type: String, required: true, enum: ['Critical', 'Urgent', 'Normal'] },
  type: { type: String, required: true, enum: ['Request', 'Match', 'System', 'Message'] },
  timestamp: { type: String, required: true }
}, { timestamps: true });

// Compound indexes for optimal matching query speeds
DonorSchema.index({ bloodGroup: 1, availability: 1 });
BloodRequestSchema.index({ status: 1, urgencyLevel: -1 });

export const UserModel = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
export const DonorModel = mongoose.models.Donor || mongoose.model<IDonorDocument>('Donor', DonorSchema);
export const HospitalModel = mongoose.models.Hospital || mongoose.model<IHospitalDocument>('Hospital', HospitalSchema);
export const BloodRequestModel = mongoose.models.BloodRequest || mongoose.model<IBloodRequestDocument>('BloodRequest', BloodRequestSchema);
export const DonorResponseModel = mongoose.models.DonorResponse || mongoose.model<IDonorResponseDocument>('DonorResponse', DonorResponseSchema);
export const NotificationModel = mongoose.models.Notification || mongoose.model<INotificationDocument>('Notification', NotificationSchema);
