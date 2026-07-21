"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { LeaveRequest } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Plus, CheckCircle2, XCircle, Clock, Palmtree, Stethoscope } from "lucide-react";

export default function LeavePage() {
  const { leaves, leaveBalances, applyLeave, updateLeaveStatus } = useERPStore();
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);

  const [formState, setFormState] = React.useState({
    type: "Paid Time Off" as const,
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    reason: "Summer vacation trip.",
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyLeave({
      employeeId: "usr_001",
      employeeName: "Alexander Wright",
      employeeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Executive",
      type: formState.type,
      startDate: formState.startDate,
      endDate: formState.endDate,
      days: 5,
      reason: formState.reason,
    });
    setApplyModalOpen(false);
  };

  const columns: ColumnDef<LeaveRequest>[] = [
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
      accessorKey: "type",
      header: "Leave Type",
      cell: ({ row }) => <span className="font-medium text-xs text-foreground">{row.original.type}</span>,
    },
    {
      accessorKey: "duration",
      header: "Dates & Duration",
      cell: ({ row }) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-foreground">{row.original.startDate} to {row.original.endDate}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.days} Days Total</span>
        </div>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => <span className="text-xs text-muted-foreground line-clamp-1">{row.original.reason}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const l = row.original;
        if (l.status !== "Pending") return null;
        return (
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateLeaveStatus(l.id, "Approved")}
              className="h-7 px-2 text-xs text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateLeaveStatus(l.id, "Rejected")}
              className="h-7 px-2 text-xs text-rose-600 border-rose-500/30 hover:bg-rose-500/10"
            >
              <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        description="Employee time-off requests, balances, manager approval workflows, and out-of-office schedules."
        actions={
          <Button onClick={() => setApplyModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Apply for Leave
          </Button>
        }
      />

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Paid Time Off (PTO)</span>
            <Palmtree className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold">{leaveBalances.paidTimeOff.remaining} Days</span>
            <span className="text-xs text-muted-foreground">Used: {leaveBalances.paidTimeOff.used} / {leaveBalances.paidTimeOff.total}</span>
          </div>
        </Card>

        <Card className="p-4 border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Sick Leave</span>
            <Stethoscope className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold">{leaveBalances.sickLeave.remaining} Days</span>
            <span className="text-xs text-muted-foreground">Used: {leaveBalances.sickLeave.used} / {leaveBalances.sickLeave.total}</span>
          </div>
        </Card>

        <Card className="p-4 border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Casual Leave</span>
            <CalendarDays className="h-4 w-4 text-sky-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold">{leaveBalances.casualLeave.remaining} Days</span>
            <span className="text-xs text-muted-foreground">Used: {leaveBalances.casualLeave.used} / {leaveBalances.casualLeave.total}</span>
          </div>
        </Card>

        <Card className="p-4 border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Parental Leave</span>
            <Clock className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold">{leaveBalances.parentalLeave.remaining} Days</span>
            <span className="text-xs text-muted-foreground">Used: {leaveBalances.parentalLeave.used} / {leaveBalances.parentalLeave.total}</span>
          </div>
        </Card>
      </div>

      <DataTable columns={columns} data={leaves} searchPlaceholder="Search leave applications..." />

      {/* Apply Leave Modal */}
      <Modal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} title="Submit Leave Application" maxWidth="md">
        <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Leave Type</label>
            <select
              value={formState.type}
              onChange={(e) => setFormState({ ...formState, type: e.target.value as any })}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
            >
              <option value="Paid Time Off">Paid Time Off</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Parental Leave">Parental Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Start Date</label>
              <Input type="date" value={formState.startDate} onChange={(e) => setFormState({ ...formState, startDate: e.target.value })} required />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">End Date</label>
              <Input type="date" value={formState.endDate} onChange={(e) => setFormState({ ...formState, endDate: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Reason / Notes</label>
            <textarea
              rows={3}
              value={formState.reason}
              onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
              className="w-full rounded-xl border border-input bg-background p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
