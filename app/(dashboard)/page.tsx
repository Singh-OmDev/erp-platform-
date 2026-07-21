"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Users,
  CreditCard,
  Clock,
  UserPlus,
  FolderGit2,
  Calendar,
  CheckCircle2,
  Megaphone,
  Cake,
  Palmtree,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const HEADCOUNT_TREND_DATA = [
  { month: "Jan", headcount: 120, payroll: 320000 },
  { month: "Feb", headcount: 124, payroll: 335000 },
  { month: "Mar", headcount: 129, payroll: 350000 },
  { month: "Apr", headcount: 133, payroll: 362000 },
  { month: "May", headcount: 138, payroll: 380000 },
  { month: "Jun", headcount: 142, payroll: 410000 },
  { month: "Jul", headcount: 146, payroll: 458900 },
];

const DEPT_ATTENDANCE_DATA = [
  { name: "Engineering", present: 96 },
  { name: "Design", present: 94 },
  { name: "HR", present: 98 },
  { name: "Finance", present: 100 },
  { name: "Sales", present: 91 },
  { name: "Support", present: 95 },
];

export default function ExecutiveDashboard() {
  const { employees, projects, leaves, jobs, clockedIn, clockIn, clockOut } = useERPStore();

  const activeEmployeesCount = employees.length;
  const pendingLeavesCount = leaves.filter((l) => l.status === "Pending").length;
  const activeJobsCount = jobs.filter((j) => j.status === "Active").length;
  const activeProjectsCount = projects.filter((p) => p.status === "In Progress").length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <PageHeader
        title="Executive Overview"
        description="Real-time organizational performance metrics, workforce telemetry, and operational pipeline."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={clockedIn ? "accent" : "default"}
              size="sm"
              onClick={clockedIn ? clockOut : clockIn}
              className="gap-1.5"
            >
              <Clock className="h-4 w-4" />
              {clockedIn ? "Clock Out Active Shift" : "Quick Clock In"}
            </Button>
          </div>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Workforce"
          value={activeEmployeesCount}
          change="+8.4%"
          changeType="positive"
          subtitle="vs last quarter"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Monthly Payroll Spend"
          value={formatCurrency(458900)}
          change="+3.2%"
          changeType="positive"
          subtitle="tax reconciled"
          icon={<CreditCard className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Attendance Rate"
          value="96.4%"
          change="+1.1%"
          changeType="positive"
          subtitle="today's shift"
          icon={<Clock className="h-5 w-5 text-sky-500" />}
        />
        <StatsCard
          title="Active Requisitions"
          value={activeJobsCount}
          change="4 Openings"
          changeType="neutral"
          subtitle="in interview stage"
          icon={<UserPlus className="h-5 w-5 text-amber-500" />}
        />
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headcount & Payroll Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Headcount & Financial Spend Trend</CardTitle>
              <CardDescription>Monthly growth progression across FY 2026</CardDescription>
            </div>
            <Badge variant="outline">2026 Telemetry</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HEADCOUNT_TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="payrollGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.15)" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="payroll" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#payrollGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Attendance Rate Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Department Attendance (%)</CardTitle>
            <CardDescription>Live attendance percentage by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEPT_ATTENDANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.15)" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={[80, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="present" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects Tracker */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Active Key Initiatives</CardTitle>
              <CardDescription>{activeProjectsCount} high-priority projects in progress</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              View All Projects <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl border border-border/50 bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                      {p.key}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{p.name}</span>
                  </div>
                  <Badge status={p.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Lead: {p.lead}</span>
                  <span>Budget Spent: {formatCurrency(p.spent)} / {formatCurrency(p.budget)}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Company Announcements & Birthdays Sidebar */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-amber-500" />
                Company Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400">Q3 All-Hands Townhall</span>
                <p className="text-muted-foreground">Scheduled for tomorrow at 10:00 AM EST in Main Auditorium A.</p>
              </div>
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs space-y-1">
                <span className="font-bold text-sky-600 dark:text-sky-400">SOC2 Audit Completed</span>
                <p className="text-muted-foreground">Passed with zero exceptions across all cloud infrastructure endpoints.</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <Cake className="h-4 w-4 text-rose-500" />
                  <span>Amara Okonkwo's Birthday</span>
                </div>
                <span className="font-semibold text-muted-foreground">Jul 25</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <Palmtree className="h-4 w-4 text-emerald-500" />
                  <span>Labor Day Holiday</span>
                </div>
                <span className="font-semibold text-muted-foreground">Sep 07</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
