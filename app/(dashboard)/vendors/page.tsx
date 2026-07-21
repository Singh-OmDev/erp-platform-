"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Vendor } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Building2, Star, Plus, Mail, Phone, DollarSign } from "lucide-react";

export default function VendorsPage() {
  const { vendors, addVendor } = useERPStore();
  const [createVendorModal, setCreateVendorModal] = React.useState(false);

  const [vendorForm, setVendorForm] = React.useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Hardware Supplier" as const,
  });

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorForm.name) return;

    addVendor({
      name: vendorForm.name,
      contactPerson: vendorForm.contactPerson,
      email: vendorForm.email,
      phone: vendorForm.phone || "+1 (800) 000-0000",
      category: vendorForm.category,
      rating: 4.8,
      status: "Active",
      totalSpent: 0,
    });
    setCreateVendorModal(false);
    setVendorForm({ name: "", contactPerson: "", email: "", phone: "", category: "Hardware Supplier" });
  };

  const totalVendorSpend = vendors.reduce((acc, curr) => acc + curr.totalSpent, 0);

  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "vendorCode",
      header: "Vendor ID",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.vendorCode}</span>,
    },
    {
      accessorKey: "name",
      header: "Vendor Company",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-foreground">{row.original.name}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: "contactPerson",
      header: "Primary Contact",
      cell: ({ row }) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-foreground">{row.original.contactPerson}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Reliability Score",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 font-bold text-xs text-amber-500">
          <Star className="h-3.5 w-3.5 fill-current" /> {row.original.rating} / 5.0
        </div>
      ),
    },
    {
      accessorKey: "totalSpent",
      header: "YTD Spend",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{formatCurrency(row.original.totalSpent)}</span>,
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
        title="Vendor & Supplier Management Portal"
        description="Corporate vendor directory, supplier reliability scorecards, contract agreements, and procurement YTD spend."
        actions={
          <Button onClick={() => setCreateVendorModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Onboard Vendor
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Active Corporate Vendors"
          value={vendors.length}
          subtitle="verified suppliers"
          icon={<Building2 className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Total Procurement Spend"
          value={formatCurrency(totalVendorSpend)}
          subtitle="YTD hardware & cloud"
          icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Average Supplier Rating"
          value="4.9 / 5.0"
          change="99.4% Delivery"
          changeType="positive"
          icon={<Star className="h-5 w-5 text-amber-500" />}
        />
      </div>

      <DataTable columns={columns} data={vendors} searchPlaceholder="Search corporate vendors..." />

      {/* Register Vendor Modal */}
      <Modal isOpen={createVendorModal} onClose={() => setCreateVendorModal(false)} title="Onboard Corporate Supplier" maxWidth="md">
        <form onSubmit={handleCreateVendor} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Company / Supplier Name</label>
            <Input value={vendorForm.name} onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Contact Person</label>
              <Input value={vendorForm.contactPerson} onChange={(e) => setVendorForm({ ...vendorForm, contactPerson: e.target.value })} required />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Email Address</label>
              <Input type="email" value={vendorForm.email} onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Vendor Category</label>
            <select
              value={vendorForm.category}
              onChange={(e) => setVendorForm({ ...vendorForm, category: e.target.value as any })}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
            >
              <option value="Hardware Supplier">Hardware Supplier</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              <option value="SaaS Software">SaaS Software</option>
              <option value="Office Logistics">Office Logistics</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateVendorModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Onboard Vendor</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
