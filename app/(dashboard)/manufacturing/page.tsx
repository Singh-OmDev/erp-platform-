"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { WorkOrder } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Factory, Cpu, Plus, CheckCircle2, Clock } from "lucide-react";

export default function ManufacturingPage() {
  const { workOrders, addWorkOrder } = useERPStore();
  const [createWOModal, setCreateWOModal] = React.useState(false);

  const [woForm, setWoForm] = React.useState({
    productName: "",
    quantity: "500",
    workCenter: "Work Center Alpha (San Jose)",
    targetCompletion: "2026-08-30",
  });

  const handleCreateWO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!woForm.productName) return;

    addWorkOrder({
      productName: woForm.productName,
      quantityToProduce: parseInt(woForm.quantity, 10) || 100,
      startDate: new Date().toISOString().split("T")[0],
      targetCompletion: woForm.targetCompletion,
      status: "In Production",
      workCenter: woForm.workCenter,
    });
    setCreateWOModal(false);
    setWoForm({ productName: "", quantity: "500", workCenter: "Work Center Alpha (San Jose)", targetCompletion: "2026-08-30" });
  };

  const columns: ColumnDef<WorkOrder>[] = [
    {
      accessorKey: "workOrderNumber",
      header: "Work Order #",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.workOrderNumber}</span>,
    },
    {
      accessorKey: "productName",
      header: "Assembly Product",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-foreground">{row.original.productName}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.workCenter}</span>
        </div>
      ),
    },
    {
      accessorKey: "quantityToProduce",
      header: "Batch Target",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{row.original.quantityToProduce} Units</span>,
    },
    {
      accessorKey: "targetCompletion",
      header: "Target Completion",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.targetCompletion}</span>,
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
        title="Manufacturing & Material Requirements Planning (MRP)"
        description="Production work orders, shop floor scheduling, Bill of Materials (BOM), and quality control work centers."
        actions={
          <Button onClick={() => setCreateWOModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Issue Work Order
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Active Production Runs"
          value={workOrders.filter((w) => w.status === "In Production").length}
          subtitle="on shop floor"
          icon={<Factory className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Total Work Centers"
          value="4 Facilities"
          subtitle="San Jose, Austin, London, Tokyo"
          icon={<Cpu className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Planned Batch Target"
          value="750 Units"
          subtitle="scheduled completion"
          icon={<Clock className="h-5 w-5 text-amber-500" />}
        />
      </div>

      <DataTable columns={columns} data={workOrders} searchPlaceholder="Search work orders or product assemblies..." />

      {/* Create Work Order Modal */}
      <Modal isOpen={createWOModal} onClose={() => setCreateWOModal(false)} title="Issue Manufacturing Work Order" maxWidth="md">
        <form onSubmit={handleCreateWO} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Product Assembly Name</label>
            <Input value={woForm.productName} onChange={(e) => setWoForm({ ...woForm, productName: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Quantity Target</label>
              <Input type="number" value={woForm.quantity} onChange={(e) => setWoForm({ ...woForm, quantity: e.target.value })} required />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Target Completion</label>
              <Input type="date" value={woForm.targetCompletion} onChange={(e) => setWoForm({ ...woForm, targetCompletion: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Work Center</label>
            <Input value={woForm.workCenter} onChange={(e) => setWoForm({ ...woForm, workCenter: e.target.value })} />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateWOModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Issue Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
