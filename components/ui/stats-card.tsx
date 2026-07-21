import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, changeType = "positive", subtitle, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("relative overflow-hidden transition-all duration-200 hover:shadow-card", className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          {icon && <div className="p-2 rounded-xl bg-muted/60 text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        </div>
        {(change || subtitle) && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-semibold rounded px-1.5 py-0.5",
                  changeType === "positive" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                  changeType === "negative" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  changeType === "neutral" && "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                )}
              >
                {changeType === "positive" ? <TrendingUp className="h-3 w-3" /> : changeType === "negative" ? <TrendingDown className="h-3 w-3" /> : null}
                {change}
              </span>
            )}
            {subtitle && <span className="text-muted-foreground/80">{subtitle}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
