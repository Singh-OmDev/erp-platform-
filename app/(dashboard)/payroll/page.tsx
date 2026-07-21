"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { PayrollRecord } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PayslipModal } from "@/components/modules/payslip-modal";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CreditCard, FileText, CheckCircle2, DollarSign, Download } from "lucide-react";

export default function PayrollPage() {
  const { payroll, markPayrollPaid } = useERPStore();
  const [selectedPayroll, setSelectedPayroll] = React.useState<PayrollRecord | null>(null);
  const [payslipModalOpen, setPayslipModalOpen] = React.useState(false);

  const totalGross = payroll.reduce((acc, curr) => acc + curr.grossSalary, 0);
  const totalNet = payroll.reduce((acc, curr) => acc + curr.netPay, 0);
  const totalTax = payroll.reduce((acc, curr) => acc + curr.taxDeduction, 0);

  const handleOpenPayslip = (p: PayrollRecord) => {
    setSelectedPayroll(p);
    setPayslipModalOpen(true);
  };

  const columns: ColumnDef<PayrollRecord>[] = [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.original.employeeAvatar} name={row.original.employeeName} size="md" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{row.original.employeeName}</span>
            <span className="text-[11px] text-muted-foreground">{row.original.designation}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "payPeriod",
      header: "Pay Period",
      cell: ({ row }) => <span className="text-xs font-medium">{row.original.payPeriod}</span>,
    },
    {
      accessorKey: "grossSalary",
      header: "Gross Pay",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold">{formatCurrency(row.original.grossSalary)}</span>,
    },
    {
      accessorKey: "taxDeduction",
      header: "Tax Withheld",
      cell: ({ row }) => <span className="font-mono text-xs text-rose-500">{formatCurrency(row.original.taxDeduction)}</span>,
    },
    {
      accessorKey: "netPay",
      header: "Net Pay",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(row.original.netPay)}</span>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Status",
      cell: ({ row }) => <Badge status={row.original.paymentStatus} />,
    },
    {
      id: "actions",
      header: "Payslip Actions",
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPayslip(p);
              }}
              className="h-7 px-2 text-xs gap-1"
            >
              <FileText className="h-3.5 w-3.5" /> View Payslip
            </Button>
            {p.paymentStatus !== "Paid" && (
              <Button
                variant="accent"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  markPayrollPaid(p.id);
                }}
                className="h-7 px-2 text-xs"
              >
                Disburse Pay
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll & Financial Compensation"
        description="Salary structures, tax withholdings, monthly disbursements, and official employee payslips."
        actions={
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" /> Run July Payroll Batch
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Gross Payroll"
          value={formatCurrency(totalGross)}
          change="3 Employees"
          subtitle="processed batch"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Total Net Payout"
          value={formatCurrency(totalNet)}
          change="100% Paid"
          changeType="positive"
          subtitle="direct deposit"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Tax Withholdings"
          value={formatCurrency(totalTax)}
          change="Reconciled"
          subtitle="IRS & State Tax"
          icon={<CreditCard className="h-5 w-5 text-sky-500" />}
        />
      </div>

      <DataTable columns={columns} data={payroll} searchPlaceholder="Search payroll records..." />

      <PayslipModal payroll={selectedPayroll} isOpen={payslipModalOpen} onClose={() => setPayslipModalOpen(false)} />
    </div>
  );
}
