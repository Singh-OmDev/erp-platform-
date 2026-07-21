"use client";

import * as React from "react";
import Link from "next/link";
import { useERPStore } from "@/lib/store";
import { SupportedCurrency } from "@/types";
import { useTheme } from "next-themes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CommandMenu } from "@/components/modules/command-menu";
import { AiAssistantDrawer } from "@/components/modules/ai-assistant-drawer";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  Plus,
  Sun,
  Moon,
  Clock,
  Sparkles,
  DollarSign,
  Globe,
} from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const {
    currentUser,
    notifications,
    clockedIn,
    clockIn,
    clockOut,
    markAllNotificationsAsRead,
    currency,
    setCurrency,
  } = useERPStore();

  const [commandOpen, setCommandOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = React.useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = React.useState(false);
  const [currencyOpen, setCurrencyOpen] = React.useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="h-14 border-b border-border/60 bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 select-none">
        {/* Left Side: Breadcrumb Navigator */}
        <div className="flex items-center gap-3 min-w-0">
          <Breadcrumbs />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* AI Executive Copilot Drawer Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAiDrawerOpen(true)}
            className="gap-1.5 border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 font-bold text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
            <span>AI Copilot</span>
          </Button>

          {/* Currency Switcher Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="gap-1 px-2.5 h-9 text-xs font-semibold"
            >
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{currency}</span>
            </Button>

            {currencyOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-border bg-card p-1.5 shadow-dropdown z-40">
                <div className="text-[10px] font-bold px-2 py-1 text-muted-foreground uppercase border-b border-border/40 mb-1">
                  Currency FX
                </div>
                {(["USD", "EUR", "GBP", "JPY", "CAD"] as SupportedCurrency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl transition-colors font-medium ${
                      currency === curr ? "bg-primary text-primary-foreground font-bold" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{curr}</span>
                    <span className="text-[10px] opacity-70">
                      {curr === "USD" ? "$" : curr === "EUR" ? "€" : curr === "GBP" ? "£" : curr === "JPY" ? "¥" : "C$"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Global Search Command K */}
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-input bg-background text-muted-foreground text-xs hover:border-border/80 hover:text-foreground transition-all w-44 md:w-56"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="truncate">Search commands...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* Punch Clock Button */}
          <Button
            variant={clockedIn ? "accent" : "outline"}
            size="sm"
            onClick={clockedIn ? clockOut : clockIn}
            className="gap-1.5 text-xs font-semibold"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>{clockedIn ? "Clock Out" : "Clock In"}</span>
          </Button>

          {/* Quick Actions Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="h-9 w-9 rounded-xl"
              title="Quick Actions"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {quickActionsOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-dropdown z-40">
                <div className="text-xs font-semibold px-2 py-1.5 text-muted-foreground border-b border-border/50 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Quick Enterprise Actions
                </div>
                <Link
                  href="/leave"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-foreground hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Apply for Leave
                </Link>
                <Link
                  href="/employees"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-foreground hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add New Employee
                </Link>
                <Link
                  href="/support"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-foreground hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Submit Support Ticket
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-foreground hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Create Project
                </Link>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNotifOpen(!notifOpen)}
              className="h-9 w-9 rounded-xl relative"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </Button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-3 shadow-dropdown z-40">
                <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
                  <span className="text-xs font-semibold text-foreground">Notifications ({unreadNotifs})</span>
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] font-medium text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{n.title}</span>
                        <span className="text-[10px] text-muted-foreground">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-xl"
            title="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* User Profile Avatar Link */}
          <Link href="/profile">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="md" className="cursor-pointer hover:ring-2 hover:ring-primary transition-all" />
          </Link>
        </div>
      </header>

      {/* Command Menu Modal */}
      <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />
    </>
  );
}
