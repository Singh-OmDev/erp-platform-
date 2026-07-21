import * as React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No data found",
  description = "There are no records matching your current filter criteria or selection.",
  actionText,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border/80 rounded-2xl bg-muted/10 my-4">
      <div className="p-3.5 rounded-2xl bg-muted text-muted-foreground mb-4">
        {icon || <FolderOpen className="h-7 w-7" />}
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
}
