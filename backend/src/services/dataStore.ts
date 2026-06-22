import { IUser, IDonor, IHospital, IBloodRequest, IDonorResponse, INotification } from '../models/types';

// In-Memory Data Store (used as fallback or for direct API response if MongoDB is not used)
export class DataStore {
  public users: IUser[] = [];
  public donors: IDonor[] = [];
  public hospitals: IHospital[] = [];
  public bloodRequests: IBloodRequest[] = [];
  public responses: IDonorResponse[] = [];
  public notifications: INotification[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // 1. Initial Users
    this.users = [
      {
        id: "U-ADMIN-01",
        role: "Admin",
        name: "Dr. Kavindi Silva",
        email: "kavindi.silva@jeevadhara.gov.lk",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        employeeId: "DIR-2026-09",
        department: "Regional Logistics"
      },
      {
        id: "U-HOSP-01",
        role: "Hospital",
        name: "Dr. Sarah Chen",
        email: "sarah.chen@hospital.lk",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
        employeeId: "JD-9921-X",
        department: "Emergency Response"
      },
      {
        id: "U-DONOR-01",
        role: "Donor",
        name: "Sarah Janansiri",
        email: "sarah.j@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
      },
      {
        id: "U-DONOR-02",
        role: "Donor",
        name: "Arjun Perera",
        email: "arjun.p@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      {
        id: "U-DONOR-03",
        role: "Donor",
        name: "Malani Fonseka",
        email: "malani.f@gmail.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
      }
    ];

    // 2. Initial Hospitals (Healthcare Network Directory)
    this.hospitals = [
      {
        id: "H-NTH",
        userId: "U-HOSP-01",
        hospitalName: "National Teaching Hospital",
        location: "Ward Place, Colombo 07",
        contactNumber: "+94 11 234 5678",
        adminName: "Dr. Anura Perera",
        activeRequests: 12
      },
      {
        id: "H-CBB",
        userId: "U-HOSP-01",
        hospitalName: "Central Blood Bank",
        location: "Kandy Road, Peradeniya",
        contactNumber: "+94 81 238 8000",
        adminName: "Sarah Wijetunga",
        activeRequests: 0
      },
      {
        id: "H-AOI",
        userId: "U-HOSP-01",
        hospitalName: "Apeksha Oncology Institute",
        location: "High Level Rd, Maharagama",
        contactNumber: "+94 11 285 0252",
        adminName: "Dr. L. Fernando",
        activeRequests: 4
      },
      {
        id: "H-JGH",
        userId: "U-HOSP-01",
        hospitalName: "Jaffna General Hospital",
        location: "Hospital Rd, Jaffna",
        contactNumber: "+94 21 222 3348",
        adminName: "S. Thivakaran",
        activeRequests: 21
      },
      {
        id: "H-SPD",
        userId: "U-HOSP-01",
        hospitalName: "Southern Province Depot",
        location: "Matara Rd, Galle",
        contactNumber: "+94 91 223 4000",
        adminName: "K. Ratnayake",
        activeRequests: 2
      }
    ];

    // 3. Initial Donors (Donor Network Directory)
    this.donors = [
      {
        id: "D-01",
        userId: "U-DONOR-01",
        bloodGroup: "O-",
        district: "Colombo",
        availability: true,
        lastDonationDate: "2025-10-14",
        eligibilityScore: 98,
        donationHistory: [
          { date: "2025-10-14", location: "National Teaching Hospital", recipient: "L. K. Perera", status: "Completed" },
          { date: "2025-05-12", location: "Central Blood Bank", recipient: "M. N. De Silva", status: "Completed" }
        ],
        statusText: "LIVE & AVAILABLE"
      },
      {
        id: "D-02",
        userId: "U-DONOR-02",
        bloodGroup: "A+",
        district: "Colombo",
        availability: false,
        lastDonationDate: "2026-05-22",
        eligibilityScore: 35,
        donationHistory: [
          { date: "2026-05-22", location: "Central Blood Bank", recipient: "Saman Kumara", status: "Completed" }
        ],
        statusText: "RECENTLY DONATED"
      },
      {
        id: "D-03",
        userId: "U-DONOR-03",
        bloodGroup: "B+",
        district: "Colombo",
        availability: true,
        lastDonationDate: "2025-11-08",
        eligibilityScore: 92,
        donationHistory: [
          { date: "2025-11-08", location: "National Teaching Hospital", recipient: "R. M. Bandara", status: "Completed" }
        ],
        statusText: "LIVE & AVAILABLE"
      },
      {
        id: "D-04",
        userId: "U-DONOR-01", // Linked for convenience
        bloodGroup: "AB-",
        district: "Kandy",
        availability: false,
        lastDonationDate: "2025-01-15",
        eligibilityScore: 0,
        donationHistory: [
          { date: "2025-01-15", location: "Central Blood Bank", status: "Deferred" }
        ],
        statusText: "DEFERRED (MEDICAL)"
      },
      {
        id: "D-05",
        userId: "U-DONOR-02",
        bloodGroup: "A-",
        district: "Galle",
        availability: true,
        lastDonationDate: "2025-12-30",
        eligibilityScore: 84,
        donationHistory: [
          { date: "2025-12-30", location: "Southern Province Depot", status: "Completed" }
        ],
        statusText: "LIVE & AVAILABLE"
      },
      {
        id: "D-06",
        userId: "U-DONOR-03",
        bloodGroup: "O+",
        district: "Colombo",
        availability: true,
        lastDonationDate: "2026-01-05",
        eligibilityScore: 94,
        donationHistory: [
          { date: "2026-01-05", location: "Apeksha Oncology Institute", status: "Completed" }
        ],
        statusText: "LIVE & AVAILABLE"
      }
    ];

    // 4. Initial Blood Requests (Active Blood Requests Feed)
    this.bloodRequests = [
      {
        id: "REQ-882",
        bloodGroup: "O-",
        hospitalId: "H-NTH",
        hospitalName: "National Teaching Hospital",
        location: "Ward Place, Colombo 07",
        urgencyLevel: "Critical",
        expiryTime: new Date(Date.now() + 45 * 60000).toISOString(), // 45 mins expiry
        status: "Open",
        unitsRequired: 4,
        timeElapsed: "12m ago",
        patientName: "Aditiya Varma",
        description: "Patient in critical condition following motorway incident. Immediate transfusion required.",
        transitProgress: 75,
        vehicleId: "MED-TRANS-04"
      },
      {
        id: "REQ-883",
        bloodGroup: "AB+",
        hospitalId: "H-CBB",
        hospitalName: "St. Jude Medical Center", // Mock additional center
        location: "West Wing, Colombo",
        urgencyLevel: "Urgent",
        expiryTime: new Date(Date.now() + 180 * 60000).toISOString(),
        status: "Open",
        unitsRequired: 2,
        timeElapsed: "45m ago"
      },
      {
        id: "REQ-884",
        bloodGroup: "A-",
        hospitalId: "H-AOI",
        hospitalName: "Lakeside Children's Hospital",
        location: "North Shore, Colombo",
        urgencyLevel: "Low", // Stable
        expiryTime: new Date(Date.now() + 720 * 60000).toISOString(),
        status: "Open",
        unitsRequired: 1,
        timeElapsed: "2h ago"
      },
      {
        id: "REQ-885",
        bloodGroup: "B+",
        hospitalId: "H-SPD",
        hospitalName: "Metro Trauma Center",
        location: "Central Metro, Colombo",
        urgencyLevel: "Urgent",
        expiryTime: new Date(Date.now() + 120 * 60000).toISOString(),
        status: "Open",
        unitsRequired: 6,
        timeElapsed: "18m ago"
      },
      {
        id: "REQ-886",
        bloodGroup: "O+",
        hospitalId: "H-AOI",
        hospitalName: "Regional Blood Bank",
        location: "Outer Ring, Kandy",
        urgencyLevel: "Critical",
        expiryTime: new Date(Date.now() + 30 * 60000).toISOString(),
        status: "Open",
        unitsRequired: 12,
        timeElapsed: "5m ago"
      },
      {
        id: "REQ-887",
        bloodGroup: "B-",
        hospitalId: "H-NTH",
        hospitalName: "Community Health",
        location: "West Hill, Galle",
        urgencyLevel: "Urgent",
        expiryTime: new Date(Date.now() + 240 * 60000).toISOString(),
        status: "Open",
        unitsRequired: 3,
        timeElapsed: "1h ago"
      }
    ];

    // 5. Initial Notifications (Real-Time Alert Feed)
    this.notifications = [
      {
        id: "N-01",
        userId: "U-ADMIN-01",
        title: "Emergency Type O- Negative Required",
        message: "National Cancer Institute requests immediate supply. 4 units needed for trauma patient. Proximity matching activated.",
        status: "Unread",
        urgency: "Critical",
        type: "Request",
        timestamp: "2 mins ago"
      },
      {
        id: "N-02",
        userId: "U-ADMIN-01",
        title: "Donor Aruna Kumara Matched",
        message: "Compatibility score 98.4%. Match confirmed with ID #88219. Awaiting hospital pick-up confirmation.",
        status: "Unread",
        urgency: "Normal",
        type: "Match",
        timestamp: "15 mins ago"
      },
      {
        id: "N-03",
        userId: "U-ADMIN-01",
        title: "New Request: General Hospital Colombo",
        message: "Standard request for 10 units of A+ blood. Routine surgery backup. Priority: Normal.",
        status: "Unread",
        urgency: "Normal",
        type: "Request",
        timestamp: "42 mins ago"
      },
      {
        id: "N-04",
        userId: "U-ADMIN-01",
        title: "Daily Database Sync Complete",
        message: "All regional nodes synchronized successfully. 1,240 new donor profiles indexed into the Jeevadhara network.",
        status: "Read",
        urgency: "Normal",
        type: "System",
        timestamp: "2 hours ago"
      },
      {
        id: "N-05",
        userId: "U-ADMIN-01",
        title: "New Partner: Kandy Specialty Clinic",
        message: "Jeevadhara network welcomes Kandy Specialty Clinic. New logistics hub established for the central province.",
        status: "Unread",
        urgency: "Normal",
        type: "System",
        timestamp: "5 hours ago"
      }
    ];

    // 6. Initial Responses (Simulating matches in engine)
    this.responses = [
      {
        id: "RES-01",
        donorId: "D-01",
        donorName: "Sarah Janansiri",
        requestId: "REQ-882",
        responseStatus: "Pending",
        timestamp: new Date().toISOString(),
        compatibilityScore: 98,
        travelTimeMins: 14
      }
    ];
  }
}

export const store = new DataStore();
