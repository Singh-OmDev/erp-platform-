import { create } from "zustand";
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
  SupportedCurrency,
} from "@/types";
import {
  INITIAL_USER,
  MOCK_EMPLOYEES,
  MOCK_DEPARTMENTS,
  MOCK_ATTENDANCE,
  MOCK_LEAVES,
  MOCK_LEAVE_BALANCES,
  MOCK_PAYROLL,
  MOCK_JOBS,
  MOCK_CANDIDATES,
  MOCK_GOALS,
  MOCK_REVIEWS,
  MOCK_PROJECTS,
  MOCK_TASKS,
  MOCK_ASSETS,
  MOCK_DOCUMENTS,
  MOCK_CALENDAR_EVENTS,
  MOCK_NOTIFICATIONS,
  MOCK_INVOICES,
  MOCK_EXPENSES,
  MOCK_INVENTORY,
  MOCK_PURCHASE_ORDERS,
  MOCK_WORK_ORDERS,
  MOCK_CRM_LEADS,
  MOCK_AUDIT_LOGS,
  MOCK_TICKETS,
  MOCK_VENDORS,
} from "@/lib/mock-data";

interface ERPStore {
  // Global Currency Switcher
  currency: SupportedCurrency;
  setCurrency: (curr: SupportedCurrency) => void;

  // User Profile & Settings
  currentUser: UserProfile;
  updateUser: (user: Partial<UserProfile>) => void;

  // Sidebar collapse state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // Clock In / Clock Out live state
  clockedIn: boolean;
  clockInTime: string | null;
  clockInDate: string | null;
  clockIn: () => void;
  clockOut: () => void;

  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, "id" | "employeeCode">) => void;
  updateEmployee: (id: string, updated: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;

  // Departments
  departments: Department[];
  addDepartment: (dept: Omit<Department, "id">) => void;

  // Attendance
  attendance: AttendanceRecord[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, "id">) => void;

  // Leaves
  leaves: LeaveRequest[];
  leaveBalances: LeaveBalance;
  applyLeave: (leave: Omit<LeaveRequest, "id" | "status" | "appliedOn">) => void;
  updateLeaveStatus: (id: string, status: "Approved" | "Rejected") => void;

  // Payroll
  payroll: PayrollRecord[];
  markPayrollPaid: (id: string) => void;

  // Recruitment
  jobs: JobRequisition[];
  candidates: Candidate[];
  addJob: (job: Omit<JobRequisition, "id" | "postedDate" | "applicantsCount">) => void;
  updateCandidateStage: (candidateId: string, stage: Candidate["stage"]) => void;

  // Performance
  goals: PerformanceGoal[];
  reviews: PerformanceReview[];
  updateGoalProgress: (goalId: string, progress: number) => void;

  // Projects & Tasks
  projects: Project[];
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "commentsCount" | "attachmentsCount">) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;

  // Assets
  assets: Asset[];
  addAsset: (asset: Omit<Asset, "id">) => void;
  assignAsset: (assetId: string, employeeName: string, avatar: string) => void;

  // Documents
  documents: DocumentItem[];
  uploadDocument: (doc: Omit<DocumentItem, "id" | "uploadedAt">) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, "id">) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Finance & Accounting
  invoices: Invoice[];
  expenses: ExpenseClaim[];
  addInvoice: (invoice: Omit<Invoice, "id" | "invoiceNumber">) => void;

  // Inventory & SCM
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  addInventoryItem: (item: Omit<InventoryItem, "id" | "sku">) => void;

  // Manufacturing
  workOrders: WorkOrder[];
  addWorkOrder: (order: Omit<WorkOrder, "id" | "workOrderNumber">) => void;

  // CRM
  crmLeads: CRMLead[];
  addCRMLead: (lead: Omit<CRMLead, "id">) => void;
  updateLeadStage: (id: string, stage: CRMLead["stage"]) => void;

  // Audit Logs
  auditLogs: AuditLog[];

  // Support Helpdesk
  tickets: SupportTicket[];
  addTicket: (t: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt" | "status">) => void;

  // Vendors
  vendors: Vendor[];
  addVendor: (v: Omit<Vendor, "id" | "vendorCode">) => void;
}

export const useERPStore = create<ERPStore>((set) => ({
  currency: "USD",
  setCurrency: (curr) => set({ currency: curr }),

  currentUser: INITIAL_USER,
  updateUser: (updated) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...updated },
    })),

  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  clockedIn: false,
  clockInTime: null,
  clockInDate: null,
  clockIn: () => {
    const now = new Date();
    const timeStr = now.toTimeString().substring(0, 5);
    const dateStr = now.toISOString().split("T")[0];
    set((state) => ({
      clockedIn: true,
      clockInTime: timeStr,
      clockInDate: dateStr,
      attendance: [
        {
          id: `att_${Date.now()}`,
          employeeId: state.currentUser.id,
          employeeName: state.currentUser.name,
          employeeAvatar: state.currentUser.avatar,
          department: "Executive Management",
          date: dateStr,
          clockIn: timeStr,
          clockOut: "--:--",
          totalHours: 0,
          status: "Present",
          shift: "Morning (09:00-17:00)",
          overtimeHours: 0,
          ipAddress: "127.0.0.1",
        },
        ...state.attendance,
      ],
    }));
  },
  clockOut: () => {
    const now = new Date();
    const timeStr = now.toTimeString().substring(0, 5);
    set((state) => ({
      clockedIn: false,
      attendance: state.attendance.map((rec, index) => {
        if (index === 0 && rec.clockOut === "--:--") {
          return { ...rec, clockOut: timeStr, totalHours: 8.0 };
        }
        return rec;
      }),
    }));
  },

  employees: MOCK_EMPLOYEES,
  addEmployee: (emp) =>
    set((state) => {
      const id = `emp_${Date.now()}`;
      const code = `NEX-0${state.employees.length + 101}`;
      return {
        employees: [{ ...emp, id, employeeCode: code }, ...state.employees],
      };
    }),
  updateEmployee: (id, updated) =>
    set((state) => ({
      employees: state.employees.map((emp) => (emp.id === id ? { ...emp, ...updated } : emp)),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),

  departments: MOCK_DEPARTMENTS,
  addDepartment: (dept) =>
    set((state) => ({
      departments: [...state.departments, { ...dept, id: `dept_${Date.now()}` }],
    })),

  attendance: MOCK_ATTENDANCE,
  addAttendanceRecord: (record) =>
    set((state) => ({
      attendance: [{ ...record, id: `att_${Date.now()}` }, ...state.attendance],
    })),

  leaves: MOCK_LEAVES,
  leaveBalances: MOCK_LEAVE_BALANCES,
  applyLeave: (leave) =>
    set((state) => ({
      leaves: [
        {
          ...leave,
          id: `lv_${Date.now()}`,
          status: "Pending",
          appliedOn: new Date().toISOString().split("T")[0],
        },
        ...state.leaves,
      ],
    })),
  updateLeaveStatus: (id, status) =>
    set((state) => ({
      leaves: state.leaves.map((l) => (l.id === id ? { ...l, status } : l)),
    })),

  payroll: MOCK_PAYROLL,
  markPayrollPaid: (id) =>
    set((state) => ({
      payroll: state.payroll.map((p) => (p.id === id ? { ...p, paymentStatus: "Paid", paymentDate: new Date().toISOString().split("T")[0] } : p)),
    })),

  jobs: MOCK_JOBS,
  candidates: MOCK_CANDIDATES,
  addJob: (job) =>
    set((state) => ({
      jobs: [
        {
          ...job,
          id: `job_${Date.now()}`,
          postedDate: new Date().toISOString().split("T")[0],
          applicantsCount: 0,
        },
        ...state.jobs,
      ],
    })),
  updateCandidateStage: (candidateId, stage) =>
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === candidateId ? { ...c, stage } : c)),
    })),

  goals: MOCK_GOALS,
  reviews: MOCK_REVIEWS,
  updateGoalProgress: (goalId, progress) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === goalId ? { ...g, progress, status: progress === 100 ? "Completed" : progress < 50 ? "At Risk" : "On Track" } : g)),
    })),

  projects: MOCK_PROJECTS,
  tasks: MOCK_TASKS,
  addTask: (task) =>
    set((state) => ({
      tasks: [
        {
          ...task,
          id: `tsk_${Date.now()}`,
          commentsCount: 0,
          attachmentsCount: 0,
        },
        ...state.tasks,
      ],
    })),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),

  assets: MOCK_ASSETS,
  addAsset: (asset) =>
    set((state) => ({
      assets: [{ ...asset, id: `ast_${Date.now()}` }, ...state.assets],
    })),
  assignAsset: (assetId, employeeName, avatar) =>
    set((state) => ({
      assets: state.assets.map((a) => (a.id === assetId ? { ...a, assignedTo: employeeName, assignedAvatar: avatar, status: "In Use" } : a)),
    })),

  documents: MOCK_DOCUMENTS,
  uploadDocument: (doc) =>
    set((state) => ({
      documents: [
        {
          ...doc,
          id: `doc_${Date.now()}`,
          uploadedAt: new Date().toISOString().split("T")[0],
        },
        ...state.documents,
      ],
    })),

  calendarEvents: MOCK_CALENDAR_EVENTS,
  addCalendarEvent: (event) =>
    set((state) => ({
      calendarEvents: [...state.calendarEvents, { ...event, id: `cal_${Date.now()}` }],
    })),

  notifications: MOCK_NOTIFICATIONS,
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  invoices: MOCK_INVOICES,
  expenses: MOCK_EXPENSES,
  addInvoice: (inv) =>
    set((state) => ({
      invoices: [{ ...inv, id: `inv_${Date.now()}`, invoiceNumber: `INV-2026-0${state.invoices.length + 10}` }, ...state.invoices],
    })),

  inventory: MOCK_INVENTORY,
  purchaseOrders: MOCK_PURCHASE_ORDERS,
  addInventoryItem: (item) =>
    set((state) => ({
      inventory: [{ ...item, id: `inv_item_${Date.now()}`, sku: `SKU-CUST-${Date.now().toString().slice(-4)}` }, ...state.inventory],
    })),

  workOrders: MOCK_WORK_ORDERS,
  addWorkOrder: (order) =>
    set((state) => ({
      workOrders: [{ ...order, id: `wo_${Date.now()}`, workOrderNumber: `WO-${Date.now().toString().slice(-4)}` }, ...state.workOrders],
    })),

  crmLeads: MOCK_CRM_LEADS,
  addCRMLead: (lead) =>
    set((state) => ({
      crmLeads: [{ ...lead, id: `lead_${Date.now()}` }, ...state.crmLeads],
    })),
  updateLeadStage: (id, stage) =>
    set((state) => ({
      crmLeads: state.crmLeads.map((l) => (l.id === id ? { ...l, stage } : l)),
    })),

  auditLogs: MOCK_AUDIT_LOGS,

  tickets: MOCK_TICKETS,
  addTicket: (t) =>
    set((state) => ({
      tickets: [
        {
          ...t,
          id: `tck_${Date.now()}`,
          ticketNumber: `TICK-${Date.now().toString().slice(-4)}`,
          createdAt: "Just now",
          status: "Open",
        },
        ...state.tickets,
      ],
    })),

  vendors: MOCK_VENDORS,
  addVendor: (v) =>
    set((state) => ({
      vendors: [
        {
          ...v,
          id: `v_${Date.now()}`,
          vendorCode: `VND-CUST-${Date.now().toString().slice(-3)}`,
        },
        ...state.vendors,
      ],
    })),
}));
