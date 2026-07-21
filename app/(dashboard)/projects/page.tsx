"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Project, Task } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { FolderGit2, Plus, CheckSquare, Clock, ArrowRight, User } from "lucide-react";

export default function ProjectsPage() {
  const { projects, tasks, updateTaskStatus } = useERPStore();
  const [activeTab, setActiveTab] = React.useState<"grid" | "kanban">("grid");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project & Initiative Workspace"
        description="Key enterprise projects, budget utilization tracking, milestone timelines, and interactive task Kanban."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("grid")}
            >
              Projects Grid
            </Button>
            <Button
              variant={activeTab === "kanban" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("kanban")}
            >
              Task Kanban Board
            </Button>
          </div>
        }
      />

      {activeTab === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                    {p.key}
                  </span>
                  <h4 className="font-bold text-base text-foreground">{p.name}</h4>
                </div>
                <Badge status={p.status} />
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-border/40">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Progress</span>
                  <span className="text-primary">{p.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-muted/30 border border-border/40">
                <div>
                  <span className="text-muted-foreground">Budget Spent</span>
                  <p className="font-bold text-foreground mt-0.5">{formatCurrency(p.spent)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Budget</span>
                  <p className="font-bold text-foreground mt-0.5">{formatCurrency(p.budget)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-2">
                  <Avatar src={p.leadAvatar} name={p.lead} size="sm" />
                  <span className="font-medium text-foreground">{p.lead}</span>
                </div>
                <span className="text-muted-foreground">{p.membersCount} Members</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto">
          {(["Todo", "In Progress", "In Review", "Done"] as const).map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            return (
              <div key={status} className="rounded-xl border border-border/60 bg-muted/20 p-3 min-w-[240px] space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{status}</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold">{statusTasks.length}</span>
                </div>

                <div className="space-y-2.5">
                  {statusTasks.map((task) => (
                    <Card key={task.id} className="p-3.5 space-y-2 hover:border-primary/50 transition-all">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground">{task.projectName}</span>
                      <h5 className="font-semibold text-xs text-foreground leading-snug">{task.title}</h5>

                      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Avatar src={task.assigneeAvatar} name={task.assignee} size="sm" />
                          <span className="text-[11px] text-muted-foreground">{task.assignee}</span>
                        </div>
                        <Badge status={task.priority} />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
