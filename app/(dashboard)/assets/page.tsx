"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Asset } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { HardDrive, Plus, ShieldCheck, Laptop, Monitor, Key } from "lucide-react";

export default function AssetsPage() {
  const { assets, employees, addAsset, assignAsset } = useERPStore();
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [assignModalOpen, setAssignModalOpen] = React.useState(false);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);
  const [assigneeEmpId, setAssigneeEmpId] = React.useState("");

  const [assetForm, setAssetForm] = React.useState({
    name: "",
    category: "Laptop" as const,
    serialNumber: "",
    cost: "1999",
    warrantyExpiry: "2028-01-01",
  });

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetForm.name || !assetForm.serialNumber) return;

    addAsset({
      assetTag: `AST-${Date.now().toString().slice(-6)}`,
      name: assetForm.name,
      category: assetForm.category,
      serialNumber: assetForm.serialNumber,
      purchaseDate: new Date().toISOString().split("T")[0],
      cost: parseFloat(assetForm.cost) || 1500,
      status: "Available",
      warrantyExpiry: assetForm.warrantyExpiry,
    });
    setCreateModalOpen(false);
    setAssetForm({ name: "", category: "Laptop", serialNumber: "", cost: "1999", warrantyExpiry: "2028-01-01" });
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId || !assigneeEmpId) return;

    const emp = employees.find((e) => e.id === assigneeEmpId);
    if (emp) {
      assignAsset(selectedAssetId, emp.name, emp.avatar);
    }
    setAssignModalOpen(false);
  };

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "assetTag",
      header: "Asset Tag",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.assetTag}</span>,
    },
    {
      accessorKey: "name",
      header: "Asset Description",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{row.original.name}</span>
          <span className="text-[11px] text-muted-foreground">S/N: {row.original.serialNumber}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span className="text-xs font-medium">{row.original.category}</span>,
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned Custodian",
      cell: ({ row }) => {
        const a = row.original;
        if (!a.assignedTo) return <span className="text-xs text-muted-foreground italic">Unassigned (In Inventory)</span>;
        return (
          <div className="flex items-center gap-2">
            <Avatar src={a.assignedAvatar} name={a.assignedTo} size="sm" />
            <span className="font-medium text-xs text-foreground">{a.assignedTo}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "cost",
      header: "Asset Cost",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold">{formatCurrency(row.original.cost)}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const a = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedAssetId(a.id);
              setAssignModalOpen(true);
            }}
            className="h-7 px-2 text-xs"
          >
            Assign Custodian
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Asset & Hardware Directory"
        description="Physical hardware inventory, software license allocations, maintenance logs, and warranty tracking."
        actions={
          <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Register Asset
          </Button>
        }
      />

      <DataTable columns={columns} data={assets} searchPlaceholder="Search assets by tag, serial number or model..." />

      {/* Assign Custodian Modal */}
      <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title="Assign Asset Custodian" maxWidth="md">
        <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Select Employee</label>
            <select
              value={assigneeEmpId}
              onChange={(e) => setAssigneeEmpId(e.target.value)}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              required
            >
              <option value="">-- Choose Employee --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.department})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Assign Custodian</Button>
          </div>
        </form>
      </Modal>

      {/* Register Asset Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Register New Corporate Asset" maxWidth="md">
        <form onSubmit={handleCreateAsset} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Asset Name / Model</label>
            <Input value={assetForm.name} onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Category</label>
              <select
                value={assetForm.category}
                onChange={(e) => setAssetForm({ ...assetForm, category: e.target.value as any })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Peripherals">Peripherals</option>
                <option value="Mobile">Mobile</option>
                <option value="Software License">Software License</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Serial Number</label>
              <Input value={assetForm.serialNumber} onChange={(e) => setAssetForm({ ...assetForm, serialNumber: e.target.value })} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Purchase Cost ($)</label>
              <Input type="number" value={assetForm.cost} onChange={(e) => setAssetForm({ ...assetForm, cost: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Warranty Expiration</label>
              <Input type="date" value={assetForm.warrantyExpiry} onChange={(e) => setAssetForm({ ...assetForm, warrantyExpiry: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Asset</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
