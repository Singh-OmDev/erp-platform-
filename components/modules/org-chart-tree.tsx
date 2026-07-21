"use client";

import * as React from "react";
import { OrgNode } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrgNodeProps {
  node: OrgNode;
}

export function OrgChartNode({ node }: OrgNodeProps) {
  const [expanded, setExpanded] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <Card className="p-3.5 w-60 border-border/80 bg-card hover:border-primary/50 transition-all shadow-subtle relative group">
        <div className="flex items-center gap-3">
          <Avatar src={node.avatar} name={node.name} size="md" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-foreground truncate">{node.name}</span>
            <span className="text-[11px] text-muted-foreground truncate">{node.role}</span>
            <span className="text-[10px] text-primary/80 font-medium truncate mt-0.5">{node.department}</span>
          </div>
        </div>

        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        )}
      </Card>

      {hasChildren && expanded && (
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-border/80" />
          <div className="flex gap-8 relative before:absolute before:top-0 before:left-12 before:right-12 before:h-px before:bg-border/80">
            {node.children!.map((child) => (
              <div key={child.id} className="relative pt-6 before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-6 before:bg-border/80">
                <OrgChartNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
