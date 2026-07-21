"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Target, Star, Award, TrendingUp, CheckCircle2 } from "lucide-react";

export default function PerformancePage() {
  const { goals, reviews, updateGoalProgress } = useERPStore();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance & OKR Management"
        description="Quarterly key results, 360-degree performance reviews, rating scorecards, and promotion eligibility."
      />

      {/* Goals & Key Results Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" /> Active OKRs & Key Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((g) => (
            <Card key={g.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{g.category}</span>
                  <h4 className="font-bold text-sm text-foreground mt-0.5">{g.title}</h4>
                </div>
                <Badge status={g.status} />
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Target KPI:</span> {g.kpiMetrics}
              </div>

              {/* Progress Control */}
              <div className="space-y-1 pt-2 border-t border-border/40">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Progress</span>
                  <span className="text-primary">{g.progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={g.progress}
                  onChange={(e) => updateGoalProgress(g.id, parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                <span>Owner: {g.employeeName}</span>
                <span>Due: {g.dueDate}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Reviews Matrix */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" /> 360-Degree Review Scorecards
        </h3>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border/60 font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Review Period</th>
                  <th className="px-4 py-3">Self Rating</th>
                  <th className="px-4 py-3">Manager Rating</th>
                  <th className="px-4 py-3">Final Score</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {reviews.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{r.employeeName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.department}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.reviewPeriod}</td>
                    <td className="px-4 py-3 font-mono font-medium">{r.selfRating} / 5.0</td>
                    <td className="px-4 py-3 font-mono font-medium">{r.managerRating} / 5.0</td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-500">{r.finalRating} / 5.0</td>
                    <td className="px-4 py-3"><Badge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
