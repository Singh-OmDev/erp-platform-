"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { PayrollRecord } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Printer, Download, Building2, CheckCircle2 } from "lucide-react";

interface PayslipModalProps {
  payroll: PayrollRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PayslipModal({ payroll, isOpen, onClose }: PayslipModalProps) {
  if (!payroll) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-6 select-none">
        {/* Company Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-primary-foreground font-black text-lg">
              N
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Nexus ERP Inc.</h2>
              <p className="text-xs text-muted-foreground">500 Howard Street, San Francisco, CA 94105</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" /> Official Payslip
            </span>
            <p className="text-xs text-muted-foreground mt-1">Period: {payroll.payPeriod}</p>
          </div>
        </div>

        {/* Employee Info Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 text-xs">
          <div>
            <span className="text-muted-foreground">Employee Name:</span>
            <p className="font-semibold text-foreground mt-0.5">{payroll.employeeName}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Designation:</span>
            <p className="font-semibold text-foreground mt-0.5">{payroll.designation}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Department:</span>
            <p className="font-semibold text-foreground mt-0.5">{payroll.department}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Payment Date:</span>
            <p className="font-semibold text-foreground mt-0.5">{payroll.paymentDate}</p>
          </div>
        </div>

        {/* Breakdown Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Earnings */}
          <div className="border border-border/60 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border/40 pb-2">
              Earnings
            </h4>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">Base Salary</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.baseSalary)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">House Rent Allowance (HRA)</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.hra)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">Special Allowances</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.allowances)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">Performance Bonus</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.bonus)}</span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border/40 font-bold text-emerald-600">
              <span>Gross Earnings</span>
              <span>{formatCurrency(payroll.grossSalary)}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="border border-border/60 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border/40 pb-2">
              Deductions
            </h4>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">Income Tax (PAYE)</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.taxDeduction)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">Provident Fund (401k)</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.pfDeduction)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-muted-foreground">Health Insurance Premium</span>
              <span className="font-medium text-foreground">{formatCurrency(payroll.healthInsurance)}</span>
            </div>
            <div className="flex justify-between text-xs pt-8 border-t border-border/40 font-bold text-rose-600">
              <span>Total Deductions</span>
              <span>{formatCurrency(payroll.totalDeductions)}</span>
            </div>
          </div>
        </div>

        {/* Net Pay Highlight */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground">
          <div>
            <span className="text-xs text-primary-foreground/80 uppercase font-semibold">Net Salary Payout</span>
            <p className="text-2xl font-bold mt-0.5">{formatCurrency(payroll.netPay)}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-1.5">
            <Printer className="h-4 w-4" /> Print Payslip
          </Button>
        </div>
      </div>
    </Modal>
  );
}
