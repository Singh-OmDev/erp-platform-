"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { SupportTicket } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { LifeBuoy, Plus, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from "lucide-react";

export default function SupportPage() {
  const { tickets, addTicket } = useERPStore();
  const [createTicketModal, setCreateTicketModal] = React.useState(false);

  const [ticketForm, setTicketForm] = React.useState({
    subject: "",
    category: "IT Equipment" as const,
    priority: "High" as const,
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.subject) return;

    addTicket({
      subject: ticketForm.subject,
      requestedBy: "Alexander Wright",
      requestedAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      category: ticketForm.category,
      priority: ticketForm.priority,
      assignedAgent: "IT Support Desk",
    });
    setCreateTicketModal(false);
    setTicketForm({ subject: "", category: "IT Equipment", priority: "High" });
  };

  const columns: ColumnDef<SupportTicket>[] = [
    {
      accessorKey: "ticketNumber",
      header: "Ticket #",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.ticketNumber}</span>,
    },
    {
      accessorKey: "subject",
      header: "Issue Subject",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-foreground">{row.original.subject}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.category} • Created {row.original.createdAt}</span>
        </div>
      ),
    },
    {
      accessorKey: "requestedBy",
      header: "Requested By",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.original.requestedAvatar} name={row.original.requestedBy} size="sm" />
          <span className="font-medium text-xs text-foreground">{row.original.requestedBy}</span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority SLA",
      cell: ({ row }) => <Badge status={row.original.priority} />,
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
        title="Internal HR & IT Helpdesk Support Center"
        description="Employee hardware requests, benefits inquiries, IT ticket resolution queues, and SLA performance tracking."
        actions={
          <Button onClick={() => setCreateTicketModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Submit Support Ticket
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Open Tickets"
          value={tickets.filter((t) => t.status !== "Resolved").length}
          subtitle="assigned to support"
          icon={<LifeBuoy className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Average SLA Resolution Time"
          value="1.8 Hours"
          change="99.2% SLA"
          changeType="positive"
          icon={<Clock className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Urgent Priority Issues"
          value={tickets.filter((t) => t.priority === "Urgent").length}
          change="Requires Action"
          changeType="negative"
          icon={<AlertTriangle className="h-5 w-5 text-rose-500" />}
        />
      </div>

      <DataTable columns={columns} data={tickets} searchPlaceholder="Search helpdesk tickets..." />

      {/* Submit Ticket Modal */}
      <Modal isOpen={createTicketModal} onClose={() => setCreateTicketModal(false)} title="Submit Internal Support Ticket" maxWidth="md">
        <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Issue Subject / Summary</label>
            <Input value={ticketForm.subject} onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })} placeholder="e.g. Need external monitor setup for desk" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value as any })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="IT Equipment">IT Equipment</option>
                <option value="HR Benefits">HR Benefits</option>
                <option value="Payroll Inquiry">Payroll Inquiry</option>
                <option value="Software License">Software License</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Priority SLA</label>
              <select
                value={ticketForm.priority}
                onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateTicketModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Ticket</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
