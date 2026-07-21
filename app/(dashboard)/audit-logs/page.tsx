"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { AuditLog } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/modules/data-table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldAlert, Terminal, Lock } from "lucide-react";

export default function AuditLogsPage() {
  const { auditLogs } = useERPStore();

  const columns: ColumnDef<AuditLog>[] = [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.original.timestamp}</span>,
    },
    {
      accessorKey: "action",
      header: "Security Action",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.action}</span>,
    },
    {
      accessorKey: "module",
      header: "ERP Module",
      cell: ({ row }) => <span className="text-xs font-semibold">{row.original.module}</span>,
    },
    {
      accessorKey: "performedBy",
      header: "User / Actor",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.original.userAvatar} name={row.original.performedBy} size="sm" />
          <span className="font-medium text-xs text-foreground">{row.original.performedBy}</span>
        </div>
      ),
    },
    {
      accessorKey: "ipAddress",
      header: "Client IP",
      cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.original.ipAddress}</span>,
    },
    {
      accessorKey: "details",
      header: "Event Telemetry Details",
      cell: ({ row }) => <span className="text-xs text-muted-foreground line-clamp-1">{row.original.details}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & System Audit Trail Logs"
        description="Immutable enterprise security audit logs capturing privilege updates, financial disbursements, and record mutations."
      />

      <DataTable columns={columns} data={auditLogs} searchPlaceholder="Search audit logs by action, user or IP..." />
    </div>
  );
}
