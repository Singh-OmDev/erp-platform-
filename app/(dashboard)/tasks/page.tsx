"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Task, TaskComment } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { CheckSquare, Plus, MessageSquare, Paperclip, Calendar, User, Clock } from "lucide-react";

export default function TasksPage() {
  const { tasks, projects, addTask, updateTaskStatus } = useERPStore();
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);

  const [comments, setComments] = React.useState<TaskComment[]>([
    {
      id: "c1",
      author: "Sarah Jenkins",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      content: "Initial PR submitted for review. Checked against Lighthouse metrics.",
      createdAt: "1 hour ago",
    },
  ]);
  const [newComment, setNewComment] = React.useState("");

  const [taskForm, setTaskForm] = React.useState({
    title: "",
    projectId: "proj_01",
    assignee: "Sarah Jenkins",
    priority: "High" as const,
    dueDate: "2026-08-01",
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title) return;

    const proj = projects.find((p) => p.id === taskForm.projectId);

    addTask({
      title: taskForm.title,
      projectId: taskForm.projectId,
      projectName: proj?.name || "Nexus ERP",
      assignee: taskForm.assignee,
      assigneeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      status: "Todo",
      priority: taskForm.priority,
      dueDate: taskForm.dueDate,
    });
    setCreateModalOpen(false);
    setTaskForm({ title: "", projectId: "proj_01", assignee: "Sarah Jenkins", priority: "High", dueDate: "2026-08-01" });
  };

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setDetailModalOpen(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: `c_${Date.now()}`,
        author: "Alexander Wright",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        content: newComment,
        createdAt: "Just now",
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task Management Workspace"
        description="Filterable enterprise task queue, priority matrices, subtask checklists, and discussion threads."
        actions={
          <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Create Task
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(["Todo", "In Progress", "In Review", "Done"] as const).map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status);
          return (
            <div key={status} className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-3">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">{status}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold">{columnTasks.length}</span>
              </div>

              <div className="space-y-2.5">
                {columnTasks.map((t) => (
                  <Card
                    key={t.id}
                    onClick={() => openTaskDetail(t)}
                    className="p-3.5 cursor-pointer hover:border-primary/50 transition-all space-y-2"
                  >
                    <span className="text-[10px] font-mono font-semibold text-muted-foreground">{t.projectName}</span>
                    <h5 className="font-semibold text-xs text-foreground leading-snug">{t.title}</h5>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Avatar src={t.assigneeAvatar} name={t.assignee} size="sm" />
                        <span className="text-muted-foreground">{t.assignee}</span>
                      </div>
                      <Badge status={t.priority} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      <Modal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} title={selectedTask?.title} maxWidth="xl">
        {selectedTask && (
          <div className="space-y-6 text-xs">
            <div className="flex flex-wrap gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
              <div>
                <span className="text-muted-foreground">Project:</span>
                <p className="font-semibold text-foreground mt-0.5">{selectedTask.projectName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Assignee:</span>
                <p className="font-semibold text-foreground mt-0.5">{selectedTask.assignee}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Due Date:</span>
                <p className="font-semibold text-foreground mt-0.5">{selectedTask.dueDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="mt-0.5">
                  <select
                    value={selectedTask.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Task["status"];
                      updateTaskStatus(selectedTask.id, newStatus);
                      setSelectedTask({ ...selectedTask, status: newStatus });
                    }}
                    className="h-7 rounded-lg border border-input bg-background px-2 text-xs font-semibold"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Review">In Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Discussion Thread */}
            <div className="space-y-3 border-t border-border/40 pt-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> Discussion Thread ({comments.length})
              </h4>

              <div className="space-y-2.5 max-h-48 overflow-y-auto">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{c.author}</span>
                      <span className="text-[10px] text-muted-foreground">{c.createdAt}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{c.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  Comment
                </Button>
              </form>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Task Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Task" maxWidth="md">
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Task Title</label>
            <Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Project</label>
              <select
                value={taskForm.projectId}
                onChange={(e) => setTaskForm({ ...taskForm, projectId: e.target.value })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
