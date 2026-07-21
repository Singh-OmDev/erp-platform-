"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Candidate, JobRequisition } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ResumePreviewModal } from "@/components/modules/resume-preview-modal";
import { UserPlus, Star, Briefcase, Plus, FileText, ArrowRight } from "lucide-react";

const PIPELINE_STAGES: Candidate["stage"][] = ["Applied", "Screening", "Interviewing", "Offer Sent", "Hired"];

export default function RecruitmentPage() {
  const { jobs, candidates, addJob, updateCandidateStage } = useERPStore();
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const [jobModalOpen, setJobModalOpen] = React.useState(false);

  const [jobForm, setJobForm] = React.useState({
    title: "",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-Time" as const,
    openings: "1",
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title) return;

    addJob({
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      type: jobForm.type,
      experienceLevel: "Mid-Senior",
      openings: parseInt(jobForm.openings, 10) || 1,
      status: "Active",
      hiringManager: "Alexander Wright",
    });
    setJobModalOpen(false);
    setJobForm({ title: "", department: "Engineering", location: "San Francisco, CA", type: "Full-Time", openings: "1" });
  };

  const openResume = (c: Candidate) => {
    setSelectedCandidate(c);
    setResumeOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recruitment & Talent Acquisition"
        description="Job requisitions, candidate sourcing pipeline, rating scorecards, and interactive resume viewer."
        actions={
          <Button onClick={() => setJobModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Create Job Requisition
          </Button>
        }
      />

      {/* Active Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-sm text-foreground">{job.title}</h4>
                <p className="text-xs text-muted-foreground">{job.department} • {job.location}</p>
              </div>
              <Badge status={job.status} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 pt-2">
              <span>{job.applicantsCount} Applicants</span>
              <span>Manager: {job.hiringManager}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Candidate Pipeline Kanban */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-foreground">Hiring Kanban Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage) => {
            const stageCandidates = candidates.filter((c) => c.stage === stage);
            return (
              <div key={stage} className="rounded-xl border border-border/60 bg-muted/20 p-3 min-w-[220px] space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{stage}</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold">{stageCandidates.length}</span>
                </div>

                <div className="space-y-2.5">
                  {stageCandidates.map((c) => (
                    <Card
                      key={c.id}
                      onClick={() => openResume(c)}
                      className="p-3 cursor-pointer hover:border-primary/50 transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-xs text-foreground">{c.name}</span>
                        <div className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-500">
                          <Star className="h-3 w-3 fill-current" /> {c.rating}
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{c.jobTitle}</p>

                      {/* Stage Move Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[10px]">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openResume(c);
                          }}
                          className="h-6 px-1.5 text-[10px]"
                        >
                          <FileText className="h-3 w-3 mr-1" /> Resume
                        </Button>
                        {stage !== "Hired" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextIdx = PIPELINE_STAGES.indexOf(stage) + 1;
                              if (nextIdx < PIPELINE_STAGES.length) {
                                updateCandidateStage(c.id, PIPELINE_STAGES[nextIdx]);
                              }
                            }}
                            className="text-primary hover:underline font-semibold flex items-center gap-0.5"
                          >
                            Advance <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ResumePreviewModal candidate={selectedCandidate} isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Job Requisition Modal */}
      <Modal isOpen={jobModalOpen} onClose={() => setJobModalOpen(false)} title="New Job Requisition" maxWidth="md">
        <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Job Title</label>
            <Input value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Department</label>
              <select
                value={jobForm.department}
                onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Design">Product Design</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Location</label>
              <Input value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setJobModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
