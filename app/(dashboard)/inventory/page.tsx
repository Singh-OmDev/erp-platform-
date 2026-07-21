"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { InventoryItem, PurchaseOrder } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Package, Truck, AlertTriangle, Plus, ShoppingCart } from "lucide-react";

export default function InventoryPage() {
  const { inventory, purchaseOrders, addInventoryItem } = useERPStore();
  const [activeTab, setActiveTab] = React.useState("stock");
  const [createItemModal, setCreateItemModal] = React.useState(false);

  const [itemForm, setItemForm] = React.useState({
    name: "",
    category: "Component" as const,
    quantity: "50",
    minStockLevel: "10",
    unitPrice: "450",
    location: "SF Warehouse A",
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name) return;

    addInventoryItem({
      name: itemForm.name,
      category: itemForm.category,
      quantity: parseInt(itemForm.quantity, 10) || 50,
      minStockLevel: parseInt(itemForm.minStockLevel, 10) || 10,
      unitPrice: parseFloat(itemForm.unitPrice) || 100,
      location: itemForm.location,
      status: "In Stock",
    });
    setCreateItemModal(false);
    setItemForm({ name: "", category: "Component", quantity: "50", minStockLevel: "10", unitPrice: "450", location: "SF Warehouse A" });
  };

  const lowStockCount = inventory.filter((i) => i.status !== "In Stock").length;

  const stockColumns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.sku}</span>,
    },
    {
      accessorKey: "name",
      header: "Item Description",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-foreground">{row.original.name}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.category} • Location: {row.original.location}</span>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity in Stock",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{row.original.quantity} Units</span>,
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Cost",
      cell: ({ row }) => <span className="font-mono text-xs">{formatCurrency(row.original.unitPrice)}</span>,
    },
    {
      accessorKey: "status",
      header: "Stock Status",
      cell: ({ row }) => <Badge status={row.original.status} />,
    },
  ];

  const poColumns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "poNumber",
      header: "PO #",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.poNumber}</span>,
    },
    {
      accessorKey: "supplierName",
      header: "Vendor / Supplier",
      cell: ({ row }) => <span className="font-semibold text-xs text-foreground">{row.original.supplierName}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: "Total Value",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{formatCurrency(row.original.totalAmount)}</span>,
    },
    {
      accessorKey: "expectedDelivery",
      header: "Expected Delivery",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.expectedDelivery}</span>,
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
        title="Supply Chain & Inventory Management"
        description="Warehouse stock inventory, SKU tracking, low stock reorder alerts, and vendor purchase orders."
        actions={
          <Button onClick={() => setCreateItemModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Stock Item
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total SKUs In Inventory"
          value={inventory.length}
          subtitle="across 3 warehouses"
          icon={<Package className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Low / Out of Stock Warnings"
          value={lowStockCount}
          change="Needs Reorder"
          changeType="negative"
          icon={<AlertTriangle className="h-5 w-5 text-rose-500" />}
        />
        <StatsCard
          title="Open Purchase Orders"
          value={purchaseOrders.length}
          change={formatCurrency(173000)}
          subtitle="committed spend"
          icon={<Truck className="h-5 w-5 text-sky-500" />}
        />
      </div>

      <Tabs
        tabs={[
          { id: "stock", label: "Stock Inventory", count: inventory.length, icon: <Package className="h-4 w-4" /> },
          { id: "pos", label: "Purchase Orders (PO)", count: purchaseOrders.length, icon: <ShoppingCart className="h-4 w-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "stock" && <DataTable columns={stockColumns} data={inventory} searchPlaceholder="Search SKUs or item descriptions..." />}
      {activeTab === "pos" && <DataTable columns={poColumns} data={purchaseOrders} searchPlaceholder="Search purchase orders..." />}

      {/* Add Stock Item Modal */}
      <Modal isOpen={createItemModal} onClose={() => setCreateItemModal(false)} title="Register Stock SKU" maxWidth="md">
        <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Item Description</label>
            <Input value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Category</label>
              <select
                value={itemForm.category}
                onChange={(e) => setItemForm({ ...itemForm, category: e.target.value as any })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Raw Material">Raw Material</option>
                <option value="Component">Component</option>
                <option value="Finished Goods">Finished Goods</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Warehouse Location</label>
              <Input value={itemForm.location} onChange={(e) => setItemForm({ ...itemForm, location: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Initial Quantity</label>
              <Input type="number" value={itemForm.quantity} onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Unit Cost ($)</label>
              <Input type="number" value={itemForm.unitPrice} onChange={(e) => setItemForm({ ...itemForm, unitPrice: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateItemModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Stock SKU</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
