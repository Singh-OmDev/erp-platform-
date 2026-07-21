"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useERPStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
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
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { title: "Dashboard", href: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
  { title: "AI Executive Copilot", href: "/ai-assistant", icon: <Sparkles className="h-4 w-4 text-amber-500" />, badge: "AI" },
  { title: "Employees", href: "/employees", icon: <Users className="h-4 w-4" />, badge: "142" },
  { title: "Attendance", href: "/attendance", icon: <Clock className="h-4 w-4" /> },
  { title: "Leave", href: "/leave", icon: <CalendarDays className="h-4 w-4" />, badge: "3" },
  { title: "Payroll", href: "/payroll", icon: <CreditCard className="h-4 w-4" /> },
  { title: "Finance & Accounts", href: "/finance", icon: <DollarSign className="h-4 w-4" /> },
  { title: "Inventory & SCM", href: "/inventory", icon: <Package className="h-4 w-4" /> },
  { title: "Manufacturing MRP", href: "/manufacturing", icon: <Factory className="h-4 w-4" /> },
  { title: "CRM & Sales", href: "/crm", icon: <Briefcase className="h-4 w-4" /> },
  { title: "Vendor Portal", href: "/vendors", icon: <Building2 className="h-4 w-4" /> },
  { title: "Helpdesk Support", href: "/support", icon: <LifeBuoy className="h-4 w-4" />, badge: "2" },
  { title: "Recruitment", href: "/recruitment", icon: <UserPlus className="h-4 w-4" />, badge: "4" },
  { title: "Performance", href: "/performance", icon: <Target className="h-4 w-4" /> },
  { title: "Projects", href: "/projects", icon: <FolderGit2 className="h-4 w-4" /> },
  { title: "Tasks", href: "/tasks", icon: <CheckSquare className="h-4 w-4" /> },
  { title: "Assets", href: "/assets", icon: <HardDrive className="h-4 w-4" /> },
  { title: "Documents", href: "/documents", icon: <FileText className="h-4 w-4" /> },
  { title: "Organization", href: "/organization", icon: <Network className="h-4 w-4" /> },
  { title: "Audit Trail Logs", href: "/audit-logs", icon: <ShieldAlert className="h-4 w-4" /> },
  { title: "Reports", href: "/reports", icon: <BarChart3 className="h-4 w-4" /> },
  { title: "Calendar", href: "/calendar", icon: <Calendar className="h-4 w-4" /> },
  { title: "Notifications", href: "/notifications", icon: <Bell className="h-4 w-4" />, badge: "2" },
  { title: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
  { title: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, currentUser } = useERPStore();
  const [filterText, setFilterText] = React.useState("");

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 z-20 select-none",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border shrink-0">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground">
          <div className="flex items-center justify-center h-8 w-8 rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-sm">
            N
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight leading-none">Nexus ERP</span>
              <span className="text-[10px] font-normal text-muted-foreground mt-0.5">Enterprise v3.0</span>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Quick Search inside Sidebar */}
      {!sidebarCollapsed && (
        <div className="p-3">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Filter menu..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full h-8 pl-8 pr-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/50 text-xs text-sidebar-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
            />
          </div>
        </div>
      )}

      {/* Nav Menu Items */}
      <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-1">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={sidebarCollapsed ? item.title : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors relative group",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <div className="shrink-0">{item.icon}</div>
              {!sidebarCollapsed && <span className="truncate">{item.title}</span>}
              {!sidebarCollapsed && item.badge && (
                <span
                  className={cn(
                    "ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-sidebar-border shrink-0">
        <div
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl bg-sidebar-accent/40 border border-sidebar-border/40",
            sidebarCollapsed && "justify-center"
          )}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-8 w-8 rounded-full object-cover border border-border/50 shrink-0"
          />
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold truncate text-foreground">{currentUser.name}</span>
              <span className="text-[10px] text-muted-foreground truncate">{currentUser.role}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
