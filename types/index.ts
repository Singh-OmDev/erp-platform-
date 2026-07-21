export type EmployeeStatus = "Active" | "Remote" | "On Leave" | "Onboarding" | "Terminated";
export type EmploymentType = "Full-Time" | "Part-Time" | "Contract" | "Intern";
export type SupportedCurrency = "USD" | "EUR" | "GBP" | "JPY" | "CAD";

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  swiftCode: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: "HR" | "Contract" | "Tax" | "Identity" | "Performance" | "Certification";
  fileSize: string;
  uploadedAt: string;
  version: string;
  url?: string;
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  team: string;
  designation: string;
  status: EmployeeStatus;
  employmentType: EmploymentType;
  joinDate: string;
  salary: number;
  location: string;
  manager: string;
  skills: string[];
  emergencyContact: EmergencyContact;
  education: Education[];
  experience: Experience[];
  bankDetails: BankDetails;
  documents: DocumentItem[];
  notes?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  employeeCount: number;
  budget: number;
  teamsCount: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: "Present" | "Late" | "Half Day" | "Absent" | "On Leave";
  shift: "Morning (09:00-17:00)" | "Evening (14:00-22:00)" | "Night (22:00-06:00)" | "Flexible";
  overtimeHours: number;
  ipAddress: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  type: "Paid Time Off" | "Sick Leave" | "Casual Leave" | "Parental Leave" | "Unpaid Leave";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
  approver?: string;
}

export interface LeaveBalance {
  paidTimeOff: { total: number; used: number; remaining: number };
  sickLeave: { total: number; used: number; remaining: number };
  casualLeave: { total: number; used: number; remaining: number };
  parentalLeave: { total: number; used: number; remaining: number };
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  designation: string;
  baseSalary: number;
  hra: number;
  allowances: number;
  bonus: number;
  grossSalary: number;
  taxDeduction: number;
  pfDeduction: number;
  healthInsurance: number;
  totalDeductions: number;
  netPay: number;
  payPeriod: string;
  paymentStatus: "Paid" | "Pending" | "Processing";
  paymentDate: string;
}

export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  experienceLevel: "Entry" | "Mid-Senior" | "Lead" | "Executive";
  applicantsCount: number;
  openings: number;
  status: "Active" | "Draft" | "Closed";
  postedDate: string;
  hiringManager: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  stage: "Applied" | "Screening" | "Interviewing" | "Offer Sent" | "Hired" | "Rejected";
  appliedDate: string;
  rating: number;
  resumeUrl: string;
  experienceYears: number;
  expectedSalary: string;
}

export interface PerformanceGoal {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  category: "Company" | "Departmental" | "Individual";
  progress: number;
  status: "On Track" | "At Risk" | "Ahead" | "Completed";
  dueDate: string;
  kpiMetrics: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  reviewPeriod: string;
  selfRating: number;
  managerRating: number;
  finalRating: number;
  status: "Completed" | "Self Review Pending" | "Manager Review Pending";
  reviewDate: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  client: string;
  status: "In Progress" | "Completed" | "On Hold" | "Planning";
  lead: string;
  leadAvatar: string;
  progress: number;
  startDate: string;
  dueDate: string;
  budget: number;
  spent: number;
  membersCount: number;
  priority: "High" | "Medium" | "Low";
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  assignee: string;
  assigneeAvatar: string;
  status: "Todo" | "In Progress" | "In Review" | "Done";
  priority: "Urgent" | "High" | "Medium" | "Low";
  dueDate: string;
  commentsCount: number;
  attachmentsCount: number;
}

export interface TaskComment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  assetTag: string;
  name: string;
  category: "Laptop" | "Monitor" | "Peripherals" | "Mobile" | "Software License";
  serialNumber: string;
  assignedTo?: string;
  assignedAvatar?: string;
  purchaseDate: string;
  cost: number;
  status: "In Use" | "Available" | "Maintenance" | "Retired";
  warrantyExpiry: string;
}

export interface OrgNode {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  reportsTo?: string;
  children?: OrgNode[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: "Meeting" | "Holiday" | "Birthday" | "Leave" | "Interview";
  date: string;
  startTime?: string;
  endTime?: string;
  participants?: string[];
  location?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "system" | "leave" | "payroll" | "recruitment" | "task";
  read: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "HR Director" | "Finance Lead" | "Engineering Lead";
  avatar: string;
  phone: string;
  timezone: string;
  twoFactorEnabled: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  itemsCount: number;
}

export interface ExpenseClaim {
  id: string;
  claimNumber: string;
  employeeName: string;
  employeeAvatar: string;
  category: "Travel" | "Software" | "Office Supplies" | "Meals";
  amount: number;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
  merchant: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: "Raw Material" | "Component" | "Finished Goods";
  quantity: number;
  minStockLevel: number;
  unitPrice: number;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: "Draft" | "Submitted" | "Received" | "Cancelled";
}

export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  productName: string;
  quantityToProduce: number;
  startDate: string;
  targetCompletion: string;
  status: "Planned" | "In Production" | "Completed" | "On Hold";
  workCenter: string;
}

export interface CRMLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  dealValue: number;
  stage: "Discovery" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
  owner: string;
}

export interface AuditLog {
  id: string;
  action: string;
  module: string;
  performedBy: string;
  userAvatar: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}

// 6. Helpdesk Support Tickets
export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  requestedBy: string;
  requestedAvatar: string;
  category: "IT Equipment" | "HR Benefits" | "Payroll Inquiry" | "Software License";
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  assignedAgent: string;
}

// 7. Vendors & Suppliers
export interface Vendor {
  id: string;
  vendorCode: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: "Hardware Supplier" | "Cloud Infrastructure" | "SaaS Software" | "Office Logistics";
  rating: number;
  status: "Active" | "Under Review" | "Inactive";
  totalSpent: number;
}
