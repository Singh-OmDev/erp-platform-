"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { OrgChartNode } from "@/components/modules/org-chart-tree";
import { MOCK_ORG_TREE } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Network, Building2, MapPin, Users, DollarSign } from "lucide-react";

const GLOBAL_BRANCHES = [
  { city: "San Francisco, CA", country: "United States", role: "Global HQ", headcount: 120 },
  { city: "London", country: "United Kingdom", role: "EMEA Regional Hub", headcount: 45 },
  { city: "Tokyo", country: "Japan", role: "APAC Regional Hub", headcount: 32 },
  { city: "New York, NY", country: "United States", role: "East Coast Office", headcount: 28 },
];

export default function OrganizationPage() {
  const { departments } = useERPStore();
  const [activeTab, setActiveTab] = React.useState("chart");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Hierarchy & Structure"
        description="Visual executive reporting tree, department breakdowns, and international branch office locations."
      />

      <Tabs
        tabs={[
          { id: "chart", label: "Org Chart Tree", icon: <Network className="h-4 w-4" /> },
          { id: "departments", label: "Departments", count: departments.length, icon: <Building2 className="h-4 w-4" /> },
          { id: "branches", label: "Global Offices", count: GLOBAL_BRANCHES.length, icon: <MapPin className="h-4 w-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "chart" && (
        <Card className="p-8 overflow-x-auto min-h-[500px] flex justify-center bg-muted/10 border-dashed border-border/80">
          <OrgChartNode node={MOCK_ORG_TREE} />
        </Card>
      )}

      {activeTab === "departments" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((d) => (
            <Card key={d.id} className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-primary/10 text-primary">
                  {d.code}
                </span>
                <span className="text-xs text-muted-foreground">{d.teamsCount} Teams</span>
              </div>

              <div>
                <h4 className="font-bold text-base text-foreground">{d.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Head of Dept: {d.head}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-muted/30 border border-border/40">
                <div>
                  <span className="text-muted-foreground">Workforce</span>
                  <p className="font-bold text-foreground mt-0.5">{d.employeeCount} Emps</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Annual Budget</span>
                  <p className="font-bold text-foreground mt-0.5">{formatCurrency(d.budget)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "branches" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GLOBAL_BRANCHES.map((b) => (
            <Card key={b.city} className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h4 className="font-bold text-sm text-foreground">{b.city}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{b.country} • {b.role}</p>
              <div className="pt-2 border-t border-border/40 text-xs font-semibold text-foreground">
                {b.headcount} Local Staff
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
