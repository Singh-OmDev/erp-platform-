import {
  Employee,
  Department,
  AttendanceRecord,
  LeaveRequest,
  LeaveBalance,
  PayrollRecord,
  JobRequisition,
  Candidate,
  PerformanceGoal,
  PerformanceReview,
  Project,
  Task,
  Asset,
  DocumentItem,
  OrgNode,
  CalendarEvent,
  NotificationItem,
  UserProfile,
  Invoice,
  ExpenseClaim,
  InventoryItem,
  PurchaseOrder,
  WorkOrder,
  CRMLead,
  AuditLog,
  SupportTicket,
  Vendor,
} from "@/types";

export const INITIAL_USER: UserProfile = {
  id: "usr_001",
  name: "Alexander Wright",
  email: "alexander.wright@nexuserp.io",
  role: "Super Admin",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  phone: "+1 (555) 234-5678",
  timezone: "America/New_York (UTC-5)",
  twoFactorEnabled: true,
};

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "emp_101",
    employeeCode: "NEX-0101",
    firstName: "Sarah",
    lastName: "Jenkins",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@nexuserp.io",
    phone: "+1 (555) 912-3456",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    team: "Frontend Platform",
    designation: "Principal Frontend Engineer",
    status: "Active",
    employmentType: "Full-Time",
    joinDate: "2021-03-15",
    salary: 165000,
    location: "San Francisco, CA",
    manager: "Alexander Wright",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Architecture"],
    emergencyContact: {
      name: "David Jenkins",
      relationship: "Spouse",
      phone: "+1 (555) 912-3450",
      email: "david.j@gmail.com",
    },
    education: [
      { degree: "M.S. Computer Science", institution: "Stanford University", year: "2019" },
      { degree: "B.S. Software Engineering", institution: "UC Berkeley", year: "2017" },
    ],
    experience: [
      { role: "Senior UI Developer", company: "Stripe", duration: "2019 - 2021" },
      { role: "Frontend Engineer", company: "Vercel", duration: "2017 - 2019" },
    ],
    bankDetails: {
      accountName: "Sarah Jenkins",
      accountNumber: "••••••••4892",
      bankName: "JPMorgan Chase",
      routingNumber: "021000021",
      swiftCode: "CHASUS33",
    },
    documents: [
      { id: "doc_01", name: "Offer_Letter_Signed.pdf", category: "Contract", fileSize: "1.4 MB", uploadedAt: "2021-03-10", version: "v1.0" },
      { id: "doc_02", name: "W4_Tax_Form_2024.pdf", category: "Tax", fileSize: "840 KB", uploadedAt: "2024-01-15", version: "v2.1" },
    ],
    notes: "Top performer in Q1 2026 frontend infrastructure overhaul.",
  },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "dept_01", name: "Engineering", code: "ENG", head: "Sarah Jenkins", employeeCount: 142, budget: 14500000, teamsCount: 8 },
  { id: "dept_02", name: "Product Design", code: "DES", head: "Marcus Vance", employeeCount: 38, budget: 4200000, teamsCount: 3 },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "att_01",
    employeeId: "emp_101",
    employeeName: "Sarah Jenkins",
    employeeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    date: "2026-07-21",
    clockIn: "08:52",
    clockOut: "17:15",
    totalHours: 8.38,
    status: "Present",
    shift: "Morning (09:00-17:00)",
    overtimeHours: 0.38,
    ipAddress: "192.168.1.104",
  },
];

export const MOCK_LEAVES: LeaveRequest[] = [
  {
    id: "lv_01",
    employeeId: "emp_102",
    employeeName: "Marcus Vance",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Product Design",
    type: "Paid Time Off",
    startDate: "2026-08-01",
    endDate: "2026-08-07",
    days: 5,
    reason: "Summer family vacation in Amalfi coast.",
    status: "Pending",
    appliedOn: "2026-07-20",
    approver: "Alexander Wright",
  },
];

export const MOCK_LEAVE_BALANCES: LeaveBalance = {
  paidTimeOff: { total: 24, used: 8, remaining: 16 },
  sickLeave: { total: 12, used: 3, remaining: 9 },
  casualLeave: { total: 10, used: 2, remaining: 8 },
  parentalLeave: { total: 60, used: 0, remaining: 60 },
};

export const MOCK_PAYROLL: PayrollRecord[] = [
  {
    id: "pay_101",
    employeeId: "emp_101",
    employeeName: "Sarah Jenkins",
    employeeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    designation: "Principal Frontend Engineer",
    baseSalary: 11000,
    hra: 1500,
    allowances: 1250,
    bonus: 2000,
    grossSalary: 15750,
    taxDeduction: 3150,
    pfDeduction: 750,
    healthInsurance: 350,
    totalDeductions: 4250,
    netPay: 11500,
    payPeriod: "July 2026",
    paymentStatus: "Paid",
    paymentDate: "2026-07-15",
  },
];

export const MOCK_JOBS: JobRequisition[] = [
  {
    id: "job_01",
    title: "Senior Staff Infrastructure Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-Time",
    experienceLevel: "Lead",
    applicantsCount: 48,
    openings: 2,
    status: "Active",
    postedDate: "2026-06-10",
    hiringManager: "Sarah Jenkins",
  },
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "cand_01",
    name: "Jonathan Hayes",
    email: "j.hayes@devmail.org",
    phone: "+1 (555) 789-0123",
    jobId: "job_01",
    jobTitle: "Senior Staff Infrastructure Engineer",
    stage: "Interviewing",
    appliedDate: "2026-06-14",
    rating: 4.8,
    resumeUrl: "#",
    experienceYears: 9,
    expectedSalary: "$180,000",
  },
];

export const MOCK_GOALS: PerformanceGoal[] = [
  {
    id: "goal_01",
    employeeId: "emp_101",
    employeeName: "Sarah Jenkins",
    title: "Migrate Core ERP Bundle to Server Components",
    category: "Departmental",
    progress: 85,
    status: "On Track",
    dueDate: "2026-08-31",
    kpiMetrics: "95+ Lighthouse Score",
  },
];

export const MOCK_REVIEWS: PerformanceReview[] = [
  {
    id: "rev_01",
    employeeId: "emp_101",
    employeeName: "Sarah Jenkins",
    department: "Engineering",
    reviewPeriod: "H1 2026",
    selfRating: 4.8,
    managerRating: 4.9,
    finalRating: 4.85,
    status: "Completed",
    reviewDate: "2026-06-30",
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj_01",
    name: "Nexus ERP v3.0 Core Overhaul",
    key: "NEX",
    description: "Enterprise redesign featuring high-density Linear aesthetics.",
    client: "Internal Global Workforce",
    status: "In Progress",
    lead: "Sarah Jenkins",
    leadAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    progress: 78,
    startDate: "2026-05-01",
    dueDate: "2026-08-30",
    budget: 450000,
    spent: 312000,
    membersCount: 14,
    priority: "High",
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "tsk_101",
    title: "Implement TanStack Table with server-side column search",
    projectId: "proj_01",
    projectName: "Nexus ERP v3.0 Core Overhaul",
    assignee: "Sarah Jenkins",
    assigneeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "In Progress",
    priority: "Urgent",
    dueDate: "2026-07-24",
    commentsCount: 6,
    attachmentsCount: 2,
  },
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: "ast_01",
    assetTag: "AST-APL-0912",
    name: "MacBook Pro 16\" M3 Max",
    category: "Laptop",
    serialNumber: "C02G9012Q168",
    assignedTo: "Sarah Jenkins",
    assignedAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    purchaseDate: "2024-02-10",
    cost: 3899,
    status: "In Use",
    warrantyExpiry: "2027-02-10",
  },
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  { id: "d1", name: "Global_Employee_Handbook_2026.pdf", category: "HR", fileSize: "4.2 MB", uploadedAt: "2026-01-02", version: "v3.0" },
];

export const MOCK_ORG_TREE: OrgNode = {
  id: "org_ceo",
  name: "Alexander Wright",
  role: "Chief Executive Officer",
  department: "Executive",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  children: [
    {
      id: "org_eng_lead",
      name: "Sarah Jenkins",
      role: "VP of Engineering",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      reportsTo: "Alexander Wright",
    },
  ],
};

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "cal_1", title: "Q3 All-Hands Company Townhall", type: "Meeting", date: "2026-07-22", startTime: "10:00", endTime: "11:30", location: "Auditorium A & Zoom" },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    title: "New Leave Request",
    message: "Marcus Vance applied for 5 days of Paid Time Off.",
    timestamp: "10 mins ago",
    type: "leave",
    read: false,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: "inv_101", invoiceNumber: "INV-2026-001", clientName: "Acme Enterprise Corp", amount: 48500, issueDate: "2026-07-01", dueDate: "2026-07-31", status: "Paid", itemsCount: 4 },
];

export const MOCK_EXPENSES: ExpenseClaim[] = [
  { id: "exp_1", claimNumber: "EXP-0912", employeeName: "Sarah Jenkins", employeeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", category: "Travel", amount: 1450, date: "2026-07-18", status: "Approved", merchant: "Delta Air Lines" },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: "inv_item_1", sku: "SKU-SER-001", name: "Enterprise Server Motherboard X9", category: "Component", quantity: 142, minStockLevel: 20, unitPrice: 850, location: "SF Warehouse A", status: "In Stock" },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: "po_01", poNumber: "PO-2026-8801", supplierName: "Intel Semiconductor Global", totalAmount: 125000, orderDate: "2026-07-05", expectedDelivery: "2026-07-28", status: "Submitted" },
];

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  { id: "wo_01", workOrderNumber: "WO-9901", productName: "Nexus Edge Gateway Appliance", quantityToProduce: 500, startDate: "2026-07-15", targetCompletion: "2026-08-15", status: "In Production", workCenter: "Work Center Alpha (San Jose)" },
];

export const MOCK_CRM_LEADS: CRMLead[] = [
  { id: "lead_01", companyName: "Global Bank International", contactName: "Robert Thorne", email: "r.thorne@gbi.com", dealValue: 350000, stage: "Proposal", owner: "Lucas Moreno" },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "audit_1", action: "UPDATE_EMPLOYEE_SALARY", module: "Payroll & Compensation", performedBy: "Alexander Wright", userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", ipAddress: "192.168.1.104", timestamp: "2026-07-21 14:22:10", details: "Adjusted base salary for Sarah Jenkins from $160,000 to $165,000." },
];

// NEW MOCK DATA

export const MOCK_TICKETS: SupportTicket[] = [
  { id: "tck_1", ticketNumber: "TICK-4091", subject: "MacBook 16\" Display Flicker & USB-C Port Issue", requestedBy: "Sarah Jenkins", requestedAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", category: "IT Equipment", priority: "Urgent", status: "In Progress", createdAt: "2 hours ago", assignedAgent: "IT Helpdesk Support" },
  { id: "tck_2", ticketNumber: "TICK-4092", subject: "401k Employer Contribution Tax Deduction Inquiry", requestedBy: "Marcus Vance", requestedAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", category: "Payroll Inquiry", priority: "Medium", status: "Open", createdAt: "5 hours ago", assignedAgent: "Finance Team" },
];

export const MOCK_VENDORS: Vendor[] = [
  { id: "v_1", vendorCode: "VND-APL-01", name: "Apple Enterprise Direct", contactPerson: "Jennifer Cole", email: "j.cole@apple.com", phone: "+1 (800) 692-7753", category: "Hardware Supplier", rating: 4.9, status: "Active", totalSpent: 489000 },
  { id: "v_2", vendorCode: "VND-AWS-02", name: "Amazon Web Services (AWS)", contactPerson: "Account Team", email: "aws-enterprise@amazon.com", phone: "+1 (888) 280-4331", category: "Cloud Infrastructure", rating: 5.0, status: "Active", totalSpent: 1250000 },
  { id: "v_3", vendorCode: "VND-SLK-03", name: "Slack Technologies Inc.", contactPerson: "Support Lead", email: "sales@slack.com", phone: "+1 (800) 555-0199", category: "SaaS Software", rating: 4.7, status: "Active", totalSpent: 84000 },
];
