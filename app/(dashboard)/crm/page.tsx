"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { CRMLead } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Briefcase, Plus, ArrowRight, DollarSign, Building2, User } from "lucide-react";

const STAGES: CRMLead["stage"][] = ["Discovery", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

export default function CRMPage() {
  const { crmLeads, addCRMLead, updateLeadStage } = useERPStore();
  const [createLeadModal, setCreateLeadModal] = React.useState(false);

  const [leadForm, setLeadForm] = React.useState({
    companyName: "",
    contactName: "",
    email: "",
    dealValue: "250000",
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.companyName) return;

    addCRMLead({
      companyName: leadForm.companyName,
      contactName: leadForm.contactName,
      email: leadForm.email,
      dealValue: parseFloat(leadForm.dealValue) || 100000,
      stage: "Discovery",
      owner: "Lucas Moreno",
    });
    setCreateLeadModal(false);
    setLeadForm({ companyName: "", contactName: "", email: "", dealValue: "250000" });
  };

  const totalPipelineValue = crmLeads.reduce((acc, curr) => acc + curr.dealValue, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM & Enterprise Sales Pipeline"
        description="Lead management, deal opportunity tracking, pipeline valuation, and account management."
        actions={
          <Button onClick={() => setCreateLeadModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Deal Opportunity
          </Button>
        }
      />

      <div className="p-4 rounded-2xl bg-linear-to-r from-primary/10 via-card to-card border border-primary/20 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">Total Pipeline Opportunity Value</span>
          <h3 className="text-2xl font-bold text-foreground mt-0.5">{formatCurrency(totalPipelineValue)}</h3>
        </div>
        <Badge variant="outline">{crmLeads.length} Active Deals</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = crmLeads.filter((l) => l.stage === stage);
          const stageValue = stageLeads.reduce((acc, curr) => acc + curr.dealValue, 0);
          return (
            <div key={stage} className="rounded-xl border border-border/60 bg-muted/20 p-3 min-w-[220px] space-y-3">
              <div className="border-b border-border/40 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{stage}</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold">{stageLeads.length}</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono block mt-1">{formatCurrency(stageValue)}</span>
              </div>

              <div className="space-y-2.5">
                {stageLeads.map((lead) => (
                  <Card key={lead.id} className="p-3.5 space-y-2 hover:border-primary/50 transition-all">
                    <h5 className="font-bold text-xs text-foreground">{lead.companyName}</h5>
                    <p className="text-[11px] text-muted-foreground">{lead.contactName} • {lead.email}</p>
                    <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(lead.dealValue)}
                    </div>

                    {stage !== "Closed Won" && stage !== "Closed Lost" && (
                      <div className="pt-2 border-t border-border/40 text-[10px] flex justify-end">
                        <button
                          onClick={() => {
                            const nextIdx = STAGES.indexOf(stage) + 1;
                            if (nextIdx < STAGES.length) {
                              updateLeadStage(lead.id, STAGES[nextIdx]);
                            }
                          }}
                          className="text-primary font-semibold hover:underline flex items-center gap-0.5"
                        >
                          Advance <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Lead Modal */}
      <Modal isOpen={createLeadModal} onClose={() => setCreateLeadModal(false)} title="Create Deal Opportunity" maxWidth="md">
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Company / Account Name</label>
            <Input value={leadForm.companyName} onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Contact Person</label>
              <Input value={leadForm.contactName} onChange={(e) => setLeadForm({ ...leadForm, contactName: e.target.value })} required />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Email</label>
              <Input type="email" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Deal Value ($)</label>
            <Input type="number" value={leadForm.dealValue} onChange={(e) => setLeadForm({ ...leadForm, dealValue: e.target.value })} required />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateLeadModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Deal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
