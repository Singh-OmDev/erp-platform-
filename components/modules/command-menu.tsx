"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Search,
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  CreditCard,
  UserPlus,
  Target,
  FolderGit2,
  CheckSquare,
  HardDrive,
  FileText,
  Network,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  User,
  DollarSign,
  Package,
  Factory,
  Briefcase,
  ShieldAlert,
  Sparkles,
  LifeBuoy,
  Building2,
  ArrowRight,
} from "lucide-react";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMAND_ROUTES = [
  { name: "Executive Dashboard", path: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "AI Executive Copilot & Intelligence Portal", path: "/ai-assistant", icon: <Sparkles className="h-4 w-4 text-amber-500" /> },
  { name: "Employee Directory & Profiles", path: "/employees", icon: <Users className="h-4 w-4" /> },
  { name: "Attendance & Shift Punch Clock", path: "/attendance", icon: <Clock className="h-4 w-4" /> },
  { name: "Leave Requests & Approvals", path: "/leave", icon: <CalendarDays className="h-4 w-4" /> },
  { name: "Payroll, Payslips & Compensation", path: "/payroll", icon: <CreditCard className="h-4 w-4" /> },
  { name: "Finance, Invoices & Expense Claims", path: "/finance", icon: <DollarSign className="h-4 w-4" /> },
  { name: "Inventory, Warehouse & Purchase Orders", path: "/inventory", icon: <Package className="h-4 w-4" /> },
  { name: "Manufacturing MRP & Production Orders", path: "/manufacturing", icon: <Factory className="h-4 w-4" /> },
  { name: "CRM & Sales Deal Pipeline", path: "/crm", icon: <Briefcase className="h-4 w-4" /> },
  { name: "Vendor & Supplier Management Portal", path: "/vendors", icon: <Building2 className="h-4 w-4" /> },
  { name: "Internal HR & IT Helpdesk Support Center", path: "/support", icon: <LifeBuoy className="h-4 w-4" /> },
  { name: "Recruitment & Candidate Pipeline", path: "/recruitment", icon: <UserPlus className="h-4 w-4" /> },
  { name: "Performance Goals & 360 Reviews", path: "/performance", icon: <Target className="h-4 w-4" /> },
  { name: "Projects & Milestone Tracking", path: "/projects", icon: <FolderGit2 className="h-4 w-4" /> },
  { name: "Task Workspace & Kanban Board", path: "/tasks", icon: <CheckSquare className="h-4 w-4" /> },
  { name: "Asset Directory & Warranties", path: "/assets", icon: <HardDrive className="h-4 w-4" /> },
  { name: "Document Vault & Versions", path: "/documents", icon: <FileText className="h-4 w-4" /> },
  { name: "Organization Visual Tree & Branches", path: "/organization", icon: <Network className="h-4 w-4" /> },
  { name: "Security Audit Trail Logs", path: "/audit-logs", icon: <ShieldAlert className="h-4 w-4" /> },
  { name: "Enterprise Reports & Analytics", path: "/reports", icon: <BarChart3 className="h-4 w-4" /> },
  { name: "Master Enterprise Calendar", path: "/calendar", icon: <Calendar className="h-4 w-4" /> },
  { name: "Notification & Announcement Hub", path: "/notifications", icon: <Bell className="h-4 w-4" /> },
  { name: "Enterprise RBAC & System Settings", path: "/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "User Profile & Security 2FA", path: "/profile", icon: <User className="h-4 w-4" /> },
];

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const filtered = COMMAND_ROUTES.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Type a command or jump to a module..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            autoFocus
            className="h-11 text-base rounded-xl"
          />
        </div>

        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          Enterprise ERP Navigation
        </div>

        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.path}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted text-foreground transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:bg-primary/10">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No matching ERP routes found for "{query}".
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
