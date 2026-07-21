"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Settings, ShieldCheck, Building2, Zap, Check, Lock } from "lucide-react";

const INITIAL_RBAC = [
  { role: "Super Admin", read: true, write: true, delete: true, approve: true },
  { role: "HR Director", read: true, write: true, delete: false, approve: true },
  { role: "Finance Lead", read: true, write: true, delete: false, approve: true },
  { role: "Team Lead", read: true, write: true, delete: false, approve: false },
  { role: "General Employee", read: true, write: false, delete: false, approve: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("company");
  const [rbacMatrix, setRbacMatrix] = React.useState(INITIAL_RBAC);

  const toggleRbac = (index: number, key: "read" | "write" | "delete" | "approve") => {
    const next = [...rbacMatrix];
    next[index][key] = !next[index][key];
    setRbacMatrix(next);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise System Settings & Security"
        description="Company legal entity setup, Role-Based Access Control (RBAC) security permissions, working hours, and third-party SaaS integrations."
      />

      <Tabs
        tabs={[
          { id: "company", label: "Company Info", icon: <Building2 className="h-4 w-4" /> },
          { id: "rbac", label: "RBAC Permissions", icon: <ShieldCheck className="h-4 w-4" /> },
          { id: "integrations", label: "Third-Party Integrations", icon: <Zap className="h-4 w-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "company" && (
        <Card className="p-6 space-y-4 max-w-2xl text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Company Legal Entity Name</label>
            <Input defaultValue="Nexus ERP Global Technologies Inc." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Corporate Tax ID / EIN</label>
              <Input defaultValue="XX-XXXXXXX" />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Fiscal Year Start</label>
              <Input defaultValue="January 1st" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">HQ Address</label>
            <Input defaultValue="500 Howard Street, Suite 400, San Francisco, CA 94105" />
          </div>

          <div className="pt-2">
            <Button size="sm">Save Company Profile</Button>
          </div>
        </Card>
      )}

      {activeTab === "rbac" && (
        <Card className="p-6 space-y-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base font-bold">Role-Based Access Control (RBAC) Matrix</CardTitle>
            <CardDescription>Granular permission enforcement across enterprise roles</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 border-b border-border/60 font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Role Name</th>
                    <th className="px-4 py-3 text-center">Read Access</th>
                    <th className="px-4 py-3 text-center">Write Access</th>
                    <th className="px-4 py-3 text-center">Delete Access</th>
                    <th className="px-4 py-3 text-center">Approve Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {rbacMatrix.map((item, idx) => (
                    <tr key={item.role} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-foreground">{item.role}</td>
                      {(["read", "write", "delete", "approve"] as const).map((perm) => (
                        <td key={perm} className="px-4 py-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={item[perm]}
                            onChange={() => toggleRbac(idx, perm)}
                            className="h-4 w-4 rounded border-input accent-primary cursor-pointer"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-4 flex justify-end">
              <Button size="sm">Update Security Matrix</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "integrations" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Slack", desc: "Instant automated HR & leave approval alerts.", connected: true },
            { name: "Google Workspace", desc: "Calendar sync & single sign-on authentication.", connected: true },
            { name: "Stripe Treasury", desc: "Automated global payroll direct deposit.", connected: true },
            { name: "QuickBooks Online", desc: "Financial ledger sync and tax export.", connected: false },
            { name: "Zoom Video", desc: "Automatic recruitment interview link creation.", connected: true },
            { name: "GitHub Enterprise", desc: "Engineer activity and deployment sync.", connected: false },
          ].map((int) => (
            <Card key={int.name} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">{int.name}</h4>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    int.connected ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {int.connected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{int.desc}</p>
              <Button variant="outline" size="sm" className="w-full text-xs">
                {int.connected ? "Configure Integration" : "Connect Account"}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
