export type Role = "ADMIN" | "VOTER";
export type ElectionStatus = "DRAFT" | "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type VoterStatus = "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
export type CandidateStatus = "ACTIVE" | "INACTIVE" | "DISQUALIFIED";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  mobile?: string;
  dob?: string;
  voterId?: string;
  status: VoterStatus;
  registeredAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface Election {
  id: string;
  name: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ElectionStatus;
  eligibleCategory: string;
  rules: string;
  allowRegistration: boolean;
  autoPublish: boolean;
  totalVoters: number;
  votesCast: number;
  candidatesCount: number;
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  electionId: string;
  position: string;
  party: string;
  biography: string;
  manifesto: string;
  symbol: string;
  status: CandidateStatus;
  votes: number;
  photo: string;
}

export interface Vote {
  id: string;
  voterId: string;
  electionId: string;
  candidateId: string;
  timestamp: string;
  reference: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "info" | "success" | "warning";
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  userId: string;
  ipAddress: string;
  description: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "u1",
    name: "System Administrator",
    email: "admin@votesecure.com",
    password: "Admin@123",
    role: "ADMIN",
    status: "VERIFIED",
    registeredAt: "2024-01-01T08:00:00Z",
    lastLogin: "2025-08-19T09:30:00Z",
  },
  {
    id: "u2",
    name: "Vaishnavi Sharma",
    email: "vaishnavi@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543210",
    dob: "2002-03-15",
    voterId: "VTR-2024-001",
    status: "VERIFIED",
    registeredAt: "2024-06-10T10:00:00Z",
    lastLogin: "2025-08-18T14:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vaishnavi",
  },
  {
    id: "u3",
    name: "Arjun Mehta",
    email: "arjun@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543211",
    dob: "2001-07-22",
    voterId: "VTR-2024-002",
    status: "VERIFIED",
    registeredAt: "2024-06-11T11:00:00Z",
    lastLogin: "2025-08-17T16:00:00Z",
  },
  {
    id: "u4",
    name: "Priya Nair",
    email: "priya@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543212",
    dob: "2002-11-05",
    voterId: "VTR-2024-003",
    status: "VERIFIED",
    registeredAt: "2024-06-12T09:00:00Z",
  },
  {
    id: "u5",
    name: "Rahul Kumar",
    email: "rahul@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543213",
    dob: "2003-01-18",
    voterId: "VTR-2024-004",
    status: "PENDING",
    registeredAt: "2024-08-01T10:00:00Z",
  },
  {
    id: "u6",
    name: "Sneha Patel",
    email: "sneha@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543214",
    dob: "2002-05-30",
    voterId: "VTR-2024-005",
    status: "VERIFIED",
    registeredAt: "2024-06-15T12:00:00Z",
  },
  {
    id: "u7",
    name: "Karan Singh",
    email: "karan@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543215",
    dob: "2001-09-12",
    voterId: "VTR-2024-006",
    status: "VERIFIED",
    registeredAt: "2024-06-16T13:00:00Z",
  },
  {
    id: "u8",
    name: "Anjali Rao",
    email: "anjali@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543216",
    dob: "2003-04-25",
    voterId: "VTR-2024-007",
    status: "SUSPENDED",
    registeredAt: "2024-06-17T14:00:00Z",
  },
  {
    id: "u9",
    name: "Dev Chopra",
    email: "dev@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543217",
    dob: "2002-08-08",
    voterId: "VTR-2024-008",
    status: "VERIFIED",
    registeredAt: "2024-06-18T15:00:00Z",
  },
  {
    id: "u10",
    name: "Nisha Gupta",
    email: "nisha@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543218",
    dob: "2001-12-20",
    voterId: "VTR-2024-009",
    status: "VERIFIED",
    registeredAt: "2024-06-19T16:00:00Z",
  },
  {
    id: "u11",
    name: "Rohan Verma",
    email: "rohan@student.edu",
    password: "Voter@123",
    role: "VOTER",
    mobile: "+91 9876543219",
    dob: "2002-02-14",
    voterId: "VTR-2024-010",
    status: "REJECTED",
    registeredAt: "2024-07-05T10:00:00Z",
  },
];

export const elections: Election[] = [
  {
    id: "e1",
    name: "Student Council Election 2025",
    type: "Student Council",
    description: "Annual Student Council Election to elect the President, Vice-President, and Secretary for the academic year 2025-26.",
    startDate: "2025-08-15T09:00:00Z",
    endDate: "2025-08-20T18:00:00Z",
    status: "ONGOING",
    eligibleCategory: "All Students",
    rules: "Each voter may cast one vote. Candidates must have a minimum GPA of 3.0. Results will be announced within 24 hours.",
    allowRegistration: true,
    autoPublish: false,
    totalVoters: 850,
    votesCast: 612,
    candidatesCount: 6,
    createdAt: "2025-07-01T10:00:00Z",
  },
  {
    id: "e2",
    name: "College President Election 2025",
    type: "College Election",
    description: "Election for the College President position representing the entire institution.",
    startDate: "2025-09-01T09:00:00Z",
    endDate: "2025-09-05T18:00:00Z",
    status: "UPCOMING",
    eligibleCategory: "Senior Students",
    rules: "Only final-year students are eligible to vote. Candidates must have completed at least 2 years at the institution.",
    allowRegistration: false,
    autoPublish: true,
    totalVoters: 320,
    votesCast: 0,
    candidatesCount: 4,
    createdAt: "2025-07-15T10:00:00Z",
  },
  {
    id: "e3",
    name: "Class Representative Election — CS Dept",
    type: "Class Representative",
    description: "Election for Class Representatives across all years in the Computer Science Department.",
    startDate: "2025-07-10T09:00:00Z",
    endDate: "2025-07-12T18:00:00Z",
    status: "COMPLETED",
    eligibleCategory: "CS Students",
    rules: "Each class elects one CR. The candidate with the highest votes wins.",
    allowRegistration: true,
    autoPublish: true,
    totalVoters: 200,
    votesCast: 178,
    candidatesCount: 8,
    createdAt: "2025-06-20T10:00:00Z",
  },
  {
    id: "e4",
    name: "Sports Club Captain Election",
    type: "Club Election",
    description: "Election for the Sports Club captain and vice-captain positions.",
    startDate: "2025-08-25T09:00:00Z",
    endDate: "2025-08-26T18:00:00Z",
    status: "DRAFT",
    eligibleCategory: "Sports Club Members",
    rules: "Only registered Sports Club members may vote. One vote per member.",
    allowRegistration: false,
    autoPublish: false,
    totalVoters: 150,
    votesCast: 0,
    candidatesCount: 0,
    createdAt: "2025-08-10T10:00:00Z",
  },
  {
    id: "e5",
    name: "Cultural Society Leadership Election",
    type: "Organization Election",
    description: "Election for the Cultural Society committee positions.",
    startDate: "2025-06-01T09:00:00Z",
    endDate: "2025-06-03T18:00:00Z",
    status: "CANCELLED",
    eligibleCategory: "Cultural Society Members",
    rules: "Registered society members only.",
    allowRegistration: false,
    autoPublish: false,
    totalVoters: 120,
    votesCast: 0,
    candidatesCount: 5,
    createdAt: "2025-05-01T10:00:00Z",
  },
];

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Aditya Sharma",
    electionId: "e1",
    position: "President",
    party: "Student Progress Alliance",
    biography: "Third-year Computer Science student with 3 years of student leadership experience.",
    manifesto: "Better campus facilities, improved student-faculty communication, and enhanced placement support.",
    symbol: "🌟",
    status: "ACTIVE",
    votes: 245,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya",
  },
  {
    id: "c2",
    name: "Meera Krishnan",
    electionId: "e1",
    position: "President",
    party: "United Students Front",
    biography: "Final-year Economics student and former cultural committee head.",
    manifesto: "Student welfare, transparent governance, and academic excellence initiatives.",
    symbol: "🌿",
    status: "ACTIVE",
    votes: 198,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
  },
  {
    id: "c3",
    name: "Vivek Reddy",
    electionId: "e1",
    position: "Vice President",
    party: "Student Progress Alliance",
    biography: "Second-year MBA student, sports captain, and community volunteer.",
    manifesto: "Sports infrastructure, mental health resources, and inter-college events.",
    symbol: "⚡",
    status: "ACTIVE",
    votes: 167,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=vivek",
  },
  {
    id: "c4",
    name: "Tanya Bhatt",
    electionId: "e1",
    position: "Secretary",
    party: "United Students Front",
    biography: "Third-year student, debate champion, and social media coordinator.",
    manifesto: "Digital transformation of student services and better grievance redressal.",
    symbol: "📋",
    status: "ACTIVE",
    votes: 134,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=tanya",
  },
  {
    id: "c5",
    name: "Faisal Ahmed",
    electionId: "e1",
    position: "Treasurer",
    party: "Independent",
    biography: "Finance student with internship experience at a major bank.",
    manifesto: "Transparent budget allocation and student fund management.",
    symbol: "💰",
    status: "ACTIVE",
    votes: 89,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=faisal",
  },
  {
    id: "c6",
    name: "Pooja Iyer",
    electionId: "e1",
    position: "Cultural Secretary",
    party: "Arts Collective",
    biography: "Second-year Arts student and event coordinator.",
    manifesto: "Revive cultural festivals and support student artists.",
    symbol: "🎭",
    status: "ACTIVE",
    votes: 78,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=pooja",
  },
  {
    id: "c7",
    name: "Siddharth Joshi",
    electionId: "e2",
    position: "College President",
    party: "Forward Together",
    biography: "Final-year Civil Engineering student and NSS coordinator.",
    manifesto: "Infrastructure development and industry partnerships.",
    symbol: "🏛️",
    status: "ACTIVE",
    votes: 0,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=siddharth",
  },
  {
    id: "c8",
    name: "Ananya Das",
    electionId: "e2",
    position: "College President",
    party: "Student Voice",
    biography: "Final-year MBA student, placement coordinator, and TEDx organizer.",
    manifesto: "Alumni network, startup incubation cell, and wellness programs.",
    symbol: "🎯",
    status: "ACTIVE",
    votes: 0,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya",
  },
  {
    id: "c9",
    name: "Manish Yadav",
    electionId: "e3",
    position: "Class Representative - CS Year 3",
    party: "Independent",
    biography: "Third-year CS student with strong academic record.",
    manifesto: "Better lab access, industry visits, and peer tutoring.",
    symbol: "💻",
    status: "ACTIVE",
    votes: 87,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=manish",
  },
  {
    id: "c10",
    name: "Rashmi Singh",
    electionId: "e3",
    position: "Class Representative - CS Year 3",
    party: "Independent",
    biography: "Active participant in hackathons and coding competitions.",
    manifesto: "Workshops, guest lectures, and improved Wi-Fi coverage.",
    symbol: "🔧",
    status: "ACTIVE",
    votes: 65,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rashmi",
  },
];

export const votes: Vote[] = [
  { id: "v1", voterId: "u2", electionId: "e1", candidateId: "c1", timestamp: "2025-08-16T10:32:00Z", reference: "VT-2025-001-A3K9" },
  { id: "v2", voterId: "u3", electionId: "e1", candidateId: "c2", timestamp: "2025-08-16T11:05:00Z", reference: "VT-2025-002-B7M2" },
  { id: "v3", voterId: "u6", electionId: "e1", candidateId: "c1", timestamp: "2025-08-17T09:15:00Z", reference: "VT-2025-003-C4N8" },
  { id: "v4", voterId: "u2", electionId: "e3", candidateId: "c9", timestamp: "2025-07-11T10:00:00Z", reference: "VT-2025-004-D1P5" },
];

export const notifications: Notification[] = [
  { id: "n1", userId: "u2", title: "Election Started", message: "Student Council Election 2025 is now open for voting.", read: false, createdAt: "2025-08-15T09:00:00Z", type: "info" },
  { id: "n2", userId: "u2", title: "Vote Recorded", message: "Your vote for Student Council Election 2025 has been recorded.", read: false, createdAt: "2025-08-16T10:32:00Z", type: "success" },
  { id: "n3", userId: "u2", title: "Results Published", message: "CS Department CR Election results have been published.", read: true, createdAt: "2025-07-13T10:00:00Z", type: "success" },
  { id: "n4", userId: "u1", title: "New Voter Registration", message: "Rahul Kumar has registered and is pending verification.", read: false, createdAt: "2025-08-01T10:00:00Z", type: "info" },
  { id: "n5", userId: "u1", title: "Election Reminder", message: "Student Council Election ends in 24 hours.", read: false, createdAt: "2025-08-19T18:00:00Z", type: "warning" },
];

export const auditLogs: AuditLog[] = [
  { id: "a1", action: "ELECTION_CREATED", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Created Student Council Election 2025", createdAt: "2025-07-01T10:00:00Z" },
  { id: "a2", action: "VOTER_REGISTERED", user: "Vaishnavi Sharma", userId: "u2", ipAddress: "192.168.1.105", description: "New voter account registered", createdAt: "2024-06-10T10:00:00Z" },
  { id: "a3", action: "VOTER_VERIFIED", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Verified voter: Vaishnavi Sharma (VTR-2024-001)", createdAt: "2024-06-10T12:00:00Z" },
  { id: "a4", action: "CANDIDATE_ADDED", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Added candidate Aditya Sharma to Student Council Election 2025", createdAt: "2025-07-10T11:00:00Z" },
  { id: "a5", action: "ELECTION_STARTED", user: "System", userId: "u1", ipAddress: "—", description: "Student Council Election 2025 status changed to ONGOING", createdAt: "2025-08-15T09:00:00Z" },
  { id: "a6", action: "VOTE_SUBMITTED", user: "Vaishnavi Sharma", userId: "u2", ipAddress: "192.168.1.115", description: "Vote cast in Student Council Election 2025", createdAt: "2025-08-16T10:32:00Z" },
  { id: "a7", action: "RESULTS_PUBLISHED", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Results published for CS Department CR Election", createdAt: "2025-07-13T10:00:00Z" },
  { id: "a8", action: "ADMIN_LOGIN", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Admin login from browser", createdAt: "2025-08-19T09:30:00Z" },
  { id: "a9", action: "ELECTION_UPDATED", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Updated election rules for College President Election 2025", createdAt: "2025-07-20T14:00:00Z" },
  { id: "a10", action: "VOTER_SUSPENDED", user: "System Administrator", userId: "u1", ipAddress: "192.168.1.100", description: "Suspended voter: Anjali Rao (VTR-2024-007)", createdAt: "2025-07-25T11:00:00Z" },
];

export const votesOverTime = [
  { date: "Aug 15", votes: 45 },
  { date: "Aug 16", votes: 187 },
  { date: "Aug 17", votes: 143 },
  { date: "Aug 18", votes: 98 },
  { date: "Aug 19", votes: 139 },
];
