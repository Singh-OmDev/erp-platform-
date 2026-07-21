"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types";
import { Star, Download, Mail, Phone, Briefcase, Award } from "lucide-react";

interface ResumePreviewModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResumePreviewModal({ candidate, isOpen, onClose }: ResumePreviewModalProps) {
  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-6">
        {/* Candidate Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{candidate.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{candidate.jobTitle}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
            <Star className="h-3.5 w-3.5 fill-current" /> {candidate.rating} / 5.0 Rating
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground p-3 rounded-xl bg-muted/40 border border-border/50">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-primary" /> {candidate.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" /> {candidate.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary" /> {candidate.experienceYears} Years Exp
          </span>
        </div>

        {/* Simulated Resume Document View */}
        <div className="p-6 rounded-xl border border-border/80 bg-background space-y-4 text-xs font-sans shadow-inner">
          <div className="border-b border-border/40 pb-3">
            <h3 className="font-bold text-sm text-foreground">Executive Summary</h3>
            <p className="text-muted-foreground mt-1 leading-relaxed">
              Highly motivated and results-driven senior professional with over {candidate.experienceYears} years of experience designing and deploying scalable infrastructure and enterprise platforms. Recognized for technical excellence, strategic vision, and cross-functional leadership.
            </p>
          </div>

          <div className="border-b border-border/40 pb-3 space-y-2">
            <h3 className="font-bold text-sm text-foreground">Core Competencies</h3>
            <div className="flex flex-wrap gap-1.5">
              {["System Architecture", "React & Next.js", "Distributed Systems", "CI/CD Pipeline", "Agile Leadership"].map((skill) => (
                <span key={skill} className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium text-[11px]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-foreground">Work History Highlights</h3>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40">
                <span className="font-semibold text-foreground">Lead Systems Architect — Tech Corp</span>
                <p className="text-muted-foreground text-[11px] mt-0.5">2021 — Present</p>
                <p className="text-muted-foreground mt-1">Spearheaded platform migration reducing latency by 42% across 2M daily users.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/50">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download Full PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
}
