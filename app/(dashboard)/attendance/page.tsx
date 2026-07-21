"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { AttendanceRecord } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, CheckCircle2, AlertTriangle, Moon, Sun, Laptop } from "lucide-react";

export default function AttendancePage() {
  const { attendance, clockedIn, clockInTime, clockIn, clockOut } = useERPStore();

  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const lateCount = attendance.filter((a) => a.status === "Late").length;
  const overtimeTotal = attendance.reduce((acc, curr) => acc + curr.overtimeHours, 0);

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.original.employeeAvatar} name={row.original.employeeName} size="md" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{row.original.employeeName}</span>
            <span className="text-[11px] text-muted-foreground">{row.original.department}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <span className="font-medium text-xs">{row.original.date}</span>,
    },
    {
      accessorKey: "shift",
      header: "Shift Roster",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.shift}</span>,
    },
    {
      accessorKey: "clockIn",
      header: "Clock In",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold text-emerald-600">{row.original.clockIn}</span>,
    },
    {
      accessorKey: "clockOut",
      header: "Clock Out",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold text-rose-500">{row.original.clockOut}</span>,
    },
    {
      accessorKey: "totalHours",
      header: "Total Hours",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{row.original.totalHours} hrs</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge status={row.original.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance & Time Tracking"
        description="Shift rosters, live biometric & clock-in telemetry, overtime logs, and monthly punch compliance."
      />

      {/* Top Banner: Punch Clock Widget */}
      <Card className="border-primary/20 bg-linear-to-r from-primary/5 via-card to-card">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary text-primary-foreground">
              <Clock className="h-8 w-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Punch Terminal</span>
              <h3 className="text-xl font-bold text-foreground mt-0.5">
                {clockedIn ? `Active Shift (Clocked in at ${clockInTime})` : "Not Clocked In"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">IP: 192.168.1.104 • San Francisco Office Terminal</p>
            </div>
          </div>
          <Button
            size="lg"
            variant={clockedIn ? "accent" : "default"}
            onClick={clockedIn ? clockOut : clockIn}
            className="w-full md:w-auto font-bold px-8 shadow-md"
          >
            {clockedIn ? "Clock Out Now" : "Punch Clock In"}
          </Button>
        </CardContent>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="On-Time Attendance"
          value={`${presentCount} Employees`}
          change="94.2%"
          subtitle="shift compliance"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Late Arrivals Today"
          value={lateCount}
          change="-2"
          changeType="positive"
          subtitle="vs yesterday"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        />
        <StatsCard
          title="Total Overtime Hours"
          value={`${overtimeTotal.toFixed(1)} hrs`}
          change="+4.5 hrs"
          subtitle="logged this month"
          icon={<Clock className="h-5 w-5 text-sky-500" />}
        />
      </div>

      {/* Shift Rosters & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <DataTable columns={columns} data={attendance} searchPlaceholder="Filter attendance logs by employee..." />
        </div>

        {/* Shift Schedule List */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Active Shifts</CardTitle>
            <CardDescription>Enterprise roster schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-500" />
                <div>
                  <span className="font-bold">Morning Shift</span>
                  <p className="text-[10px] text-muted-foreground">09:00 - 17:00</p>
                </div>
              </div>
              <Badge variant="outline">82 Emps</Badge>
            </div>

            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-indigo-500" />
                <div>
                  <span className="font-bold">Evening Shift</span>
                  <p className="text-[10px] text-muted-foreground">14:00 - 22:00</p>
                </div>
              </div>
              <Badge variant="outline">34 Emps</Badge>
            </div>

            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-sky-500" />
                <div>
                  <span className="font-bold">Flexible Remote</span>
                  <p className="text-[10px] text-muted-foreground">Core 10:00 - 16:00</p>
                </div>
              </div>
              <Badge variant="outline">26 Emps</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
