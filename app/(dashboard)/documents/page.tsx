"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { DocumentItem } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Folder, Download, Eye, ShieldCheck, Plus } from "lucide-react";

export default function DocumentsPage() {
  const { documents, uploadDocument } = useERPStore();
  const [selectedDoc, setSelectedDoc] = React.useState<DocumentItem | null>(null);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const [docForm, setDocForm] = React.useState({
    name: "",
    category: "HR" as const,
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.name) return;

    uploadDocument({
      name: docForm.name.endsWith(".pdf") ? docForm.name : `${docForm.name}.pdf`,
      category: docForm.category,
      fileSize: "2.4 MB",
      version: "v1.0",
    });
    setUploadModalOpen(false);
    setDocForm({ name: "", category: "HR" });
  };

  const filteredDocs = activeCategory === "All" ? documents : documents.filter((d) => d.category === activeCategory);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Document Vault"
        description="Centralized cloud repository for HR policies, contracts, tax compliance forms, and SOC2 security certificates."
        actions={
          <Button onClick={() => setUploadModalOpen(true)} className="gap-2">
            <Upload className="h-4 w-4" /> Upload Document
          </Button>
        }
      />

      {/* Category Folders Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["All", "HR", "Contract", "Tax", "Certification"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <Folder className="h-3.5 w-3.5" />
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="p-4 space-y-3 hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <Badge variant="outline">{doc.version}</Badge>
            </div>

            <div>
              <h4 className="font-bold text-sm text-foreground line-clamp-1">{doc.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{doc.category} Document • {doc.fileSize}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
              <span className="text-[11px] text-muted-foreground">Uploaded {doc.uploadedAt}</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedDoc(doc);
                    setPreviewOpen(true);
                  }}
                  className="h-7 w-7"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Preview Modal */}
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title={selectedDoc?.name} maxWidth="xl">
        {selectedDoc && (
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-xl bg-muted/20 border border-border/60 text-center space-y-2">
              <FileText className="h-12 w-12 text-primary mx-auto opacity-80" />
              <h3 className="font-bold text-base text-foreground">{selectedDoc.name}</h3>
              <p className="text-muted-foreground">Version {selectedDoc.version} • {selectedDoc.fileSize} • Uploaded {selectedDoc.uploadedAt}</p>
              <div className="pt-4 flex justify-center gap-2">
                <Button size="sm" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" /> Download Original Document
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Document Modal */}
      <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload Document to Vault" maxWidth="md">
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Document Title</label>
            <Input value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} placeholder="e.g. Employee_Safety_Policy_2026.pdf" required />
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Category</label>
            <select
              value={docForm.category}
              onChange={(e) => setDocForm({ ...docForm, category: e.target.value as any })}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
            >
              <option value="HR">HR</option>
              <option value="Contract">Contract</option>
              <option value="Tax">Tax</option>
              <option value="Certification">Certification</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-border/80 rounded-2xl p-6 text-center bg-muted/10 space-y-2">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="font-semibold text-foreground">Drag and drop file here or click to browse</p>
            <span className="text-[10px] text-muted-foreground">Supports PDF, DOCX, XLSX up to 50MB</span>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload Document</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
