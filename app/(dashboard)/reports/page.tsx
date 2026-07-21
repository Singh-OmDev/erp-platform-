"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { BarChart3, Download, Printer, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MONTHLY_PAYROLL_REPORT = [
  { month: "Jan", gross: 320000, net: 240000, tax: 80000 },
  { month: "Feb", gross: 335000, net: 251000, tax: 84000 },
  { month: "Mar", gross: 350000, net: 262000, tax: 88000 },
  { month: "Apr", gross: 362000, net: 271000, tax: 91000 },
  { month: "May", gross: 380000, net: 285000, tax: 95000 },
  { month: "Jun", gross: 410000, net: 307000, tax: 103000 },
  { month: "Jul", gross: 458900, net: 344000, tax: 114900 },
];

const LEAVE_TYPES_PIE = [
  { name: "Paid Time Off", value: 65, color: "#10b981" },
  { name: "Sick Leave", value: 20, color: "#ef4444" },
  { name: "Casual Leave", value: 10, color: "#0284c7" },
  { name: "Parental", value: 5, color: "#6366f1" },
];

export default function ReportsPage() {
  const [reportTab, setReportTab] = React.useState("payroll");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Reports & Analytics"
        description="Comprehensive workforce analytics, fiscal tax audits, attendance compliance, and talent conversion graphs."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Printer className="h-3.5 w-3.5" /> Print Summary
            </Button>
            <Button size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export PDF Audit
            </Button>
          </div>
        }
      />

      <Tabs
        tabs={[
          { id: "payroll", label: "Financial & Payroll Audit" },
          { id: "attendance", label: "Attendance & Shift Telemetry" },
          { id: "leave", label: "Leave Distribution" },
        ]}
        activeTab={reportTab}
        onChange={setReportTab}
      />

      {reportTab === "payroll" && (
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Gross vs Net vs Tax Breakdown</CardTitle>
              <CardDescription>Fiscal year 2026 monthly audit progression</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_PAYROLL_REPORT} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.15)" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="gross" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Gross Payroll" />
                  <Bar dataKey="net" fill="#10b981" radius={[4, 4, 0, 0]} name="Net Paid" />
                  <Bar dataKey="tax" fill="#ef4444" radius={[4, 4, 0, 0]} name="Tax Withheld" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {reportTab === "leave" && (
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base font-bold">Leave Share Distribution</CardTitle>
            <CardDescription>Percentage share of leave types taken across the company</CardDescription>
          </CardHeader>
          <CardContent className="px-0 flex justify-center">
            <div className="h-72 w-full max-w-md">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={LEAVE_TYPES_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {LEAVE_TYPES_PIE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {reportTab === "attendance" && (
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base font-bold">Shift Punctuality Trend</CardTitle>
            <CardDescription>Percentage of on-time shift arrivals</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_PAYROLL_REPORT}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.15)" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                  <YAxis domain={[90, 100]} stroke="#888888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="gross" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
