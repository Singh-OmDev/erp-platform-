"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Invoice, ExpenseClaim } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DollarSign, FileText, Plus, CheckCircle2, AlertCircle, CreditCard, Receipt } from "lucide-react";

export default function FinancePage() {
  const { invoices, expenses, addInvoice } = useERPStore();
  const [activeTab, setActiveTab] = React.useState("invoices");
  const [createInvoiceModal, setCreateInvoiceModal] = React.useState(false);

  const [invoiceForm, setInvoiceForm] = React.useState({
    clientName: "",
    amount: "15000",
    dueDate: "2026-08-15",
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceForm.clientName) return;

    addInvoice({
      clientName: invoiceForm.clientName,
      amount: parseFloat(invoiceForm.amount) || 10000,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: invoiceForm.dueDate,
      status: "Pending",
      itemsCount: 3,
    });
    setCreateInvoiceModal(false);
    setInvoiceForm({ clientName: "", amount: "15000", dueDate: "2026-08-15" });
  };

  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((acc, curr) => acc + curr.amount, 0);

  const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice #",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.invoiceNumber}</span>,
    },
    {
      accessorKey: "clientName",
      header: "Client Account",
      cell: ({ row }) => <span className="font-semibold text-xs text-foreground">{row.original.clientName}</span>,
    },
    {
      accessorKey: "amount",
      header: "Invoice Total",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{formatCurrency(row.original.amount)}</span>,
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.dueDate}</span>,
    },
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => <Badge status={row.original.status} />,
    },
  ];

  const expenseColumns: ColumnDef<ExpenseClaim>[] = [
    {
      accessorKey: "claimNumber",
      header: "Claim #",
      cell: ({ row }) => <span className="font-mono text-xs font-bold">{row.original.claimNumber}</span>,
    },
    {
      accessorKey: "employeeName",
      header: "Claimant",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Avatar src={row.original.employeeAvatar} name={row.original.employeeName} size="sm" />
          <span className="font-semibold text-xs text-foreground">{row.original.employeeName}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Expense Category",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.category}</span>,
    },
    {
      accessorKey: "merchant",
      header: "Merchant / Vendor",
      cell: ({ row }) => <span className="text-xs font-medium text-foreground">{row.original.merchant}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-rose-500">{formatCurrency(row.original.amount)}</span>,
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
        title="Finance & Corporate Accounting"
        description="General Ledger accounts, customer billing invoices, Accounts Receivable/Payable, and employee expense claims."
        actions={
          <Button onClick={() => setCreateInvoiceModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Create Invoice
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Invoiced Accounts"
          value={formatCurrency(totalInvoiced)}
          change="3 Active Accounts"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Accounts Receivable Paid"
          value={formatCurrency(totalPaid)}
          change="Reconciled"
          changeType="positive"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Pending Expense Claims"
          value={formatCurrency(299)}
          change="1 Claim Pending"
          changeType="neutral"
          icon={<Receipt className="h-5 w-5 text-amber-500" />}
        />
      </div>

      <Tabs
        tabs={[
          { id: "invoices", label: "Invoices & Receivables", count: invoices.length, icon: <FileText className="h-4 w-4" /> },
          { id: "expenses", label: "Expense Claims", count: expenses.length, icon: <Receipt className="h-4 w-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "invoices" && <DataTable columns={invoiceColumns} data={invoices} searchPlaceholder="Search client invoices..." />}
      {activeTab === "expenses" && <DataTable columns={expenseColumns} data={expenses} searchPlaceholder="Search expense claims..." />}

      {/* Create Invoice Modal */}
      <Modal isOpen={createInvoiceModal} onClose={() => setCreateInvoiceModal(false)} title="Generate Client Invoice" maxWidth="md">
        <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Client Account Name</label>
            <Input value={invoiceForm.clientName} onChange={(e) => setInvoiceForm({ ...invoiceForm, clientName: e.target.value })} placeholder="e.g. Acme Corporation" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Invoice Amount ($)</label>
              <Input type="number" value={invoiceForm.amount} onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })} required />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Due Date</label>
              <Input type="date" value={invoiceForm.dueDate} onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })} required />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateInvoiceModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Issue Invoice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
