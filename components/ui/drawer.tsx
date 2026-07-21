"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  side?: "right" | "left";
  width?: "md" | "lg" | "xl" | "2xl";
}

export function Drawer({ isOpen, onClose, title, description, children, side = "right", width = "xl" }: DrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widths = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  const initialX = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className={cn("fixed inset-y-0 flex max-w-full", side === "right" ? "right-0 pl-10" : "left-0 pr-10")}>
            <motion.div
              initial={{ x: initialX }}
              animate={{ x: 0 }}
              exit={{ x: initialX }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn("w-screen border-l border-border bg-card text-card-foreground shadow-2xl flex flex-col z-10", widths[width])}
            >
              <div className="flex items-center justify-between border-b border-border/50 p-6">
                <div>
                  {title && <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>}
                  {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
