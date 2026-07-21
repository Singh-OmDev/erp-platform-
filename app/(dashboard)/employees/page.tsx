"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { Employee } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/modules/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Drawer } from "@/components/ui/drawer";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Building2,
  FileText,
  CreditCard,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";

export default function EmployeesPage() {
  const { employees, addEmployee, deleteEmployee } = useERPStore();
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");

  // Form State
  const [formState, setFormState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "Engineering",
    designation: "Senior Software Engineer",
    employmentType: "Full-Time" as const,
    location: "San Francisco, CA",
    salary: "140000",
  });

  const handleRowClick = (emp: Employee) => {
    setSelectedEmployee(emp);
    setDrawerOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.firstName || !formState.lastName || !formState.email) return;

    addEmployee({
      firstName: formState.firstName,
      lastName: formState.lastName,
      name: `${formState.firstName} ${formState.lastName}`,
      email: formState.email,
      phone: formState.phone || "+1 (555) 000-1122",
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      department: formState.department,
      team: `${formState.department} Team`,
      designation: formState.designation,
      status: "Active",
      employmentType: formState.employmentType,
      joinDate: new Date().toISOString().split("T")[0],
      salary: parseFloat(formState.salary) || 120000,
      location: formState.location,
      manager: "Alexander Wright",
      skills: ["React", "TypeScript", "Enterprise ERP"],
      emergencyContact: { name: "Contact Person", relationship: "Spouse", phone: "+1 (555) 999-0000", email: "contact@gmail.com" },
      education: [{ degree: "B.S. Computer Science", institution: "University", year: "2020" }],
      experience: [{ role: formState.designation, company: "Tech Inc", duration: "2020-2024" }],
      bankDetails: { accountName: `${formState.firstName} ${formState.lastName}`, accountNumber: "••••••••9900", bankName: "Chase Bank", routingNumber: "021000021", swiftCode: "CHASUS33" },
      documents: [],
    });

    setCreateModalOpen(false);
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "Engineering",
      designation: "Senior Software Engineer",
      employmentType: "Full-Time",
      location: "San Francisco, CA",
      salary: "140000",
    });
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Employee",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar src={emp.avatar} name={emp.name} size="md" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{emp.name}</span>
              <span className="text-[11px] text-muted-foreground">{emp.employeeCode}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department & Role",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.designation}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.department}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge status={row.original.status} />,
    },
    {
      accessorKey: "employmentType",
      header: "Type",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.employmentType}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.location}</span>,
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold">{formatCurrency(row.original.salary)}</span>,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            deleteEmployee(row.original.id);
          }}
          className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory"
        description="Comprehensive master database of enterprise workforce profiles, contracts, and compensation models."
        actions={
          <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Employee
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={employees}
        searchPlaceholder="Search employees by name, code, role or department..."
        onRowClick={handleRowClick}
      />

      {/* Employee Details Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={
          selectedEmployee ? (
            <div className="flex items-center gap-3">
              <Avatar src={selectedEmployee.avatar} name={selectedEmployee.name} size="lg" />
              <div>
                <h3 className="text-base font-bold">{selectedEmployee.name}</h3>
                <span className="text-xs text-muted-foreground">{selectedEmployee.designation} • {selectedEmployee.employeeCode}</span>
              </div>
            </div>
          ) : undefined
        }
        width="xl"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <Tabs
              tabs={[
                { id: "overview", label: "Overview" },
                { id: "skills", label: "Skills & Education" },
                { id: "bank", label: "Financial Details" },
                { id: "docs", label: "Documents", count: selectedEmployee.documents.length },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {activeTab === "overview" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div>
                    <span className="text-muted-foreground">Department:</span>
                    <p className="font-semibold text-foreground mt-0.5">{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team:</span>
                    <p className="font-semibold text-foreground mt-0.5">{selectedEmployee.team}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-semibold text-foreground mt-0.5">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-semibold text-foreground mt-0.5">{selectedEmployee.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-semibold text-foreground mt-0.5">{selectedEmployee.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Manager:</span>
                    <p className="font-semibold text-foreground mt-0.5">{selectedEmployee.manager}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border/50 space-y-2">
                  <h4 className="font-bold text-foreground">Emergency Contact</h4>
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                    <p>Name: <span className="font-medium text-foreground">{selectedEmployee.emergencyContact.name}</span></p>
                    <p>Relation: <span className="font-medium text-foreground">{selectedEmployee.emergencyContact.relationship}</span></p>
                    <p>Phone: <span className="font-medium text-foreground">{selectedEmployee.emergencyContact.phone}</span></p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Technical Skills & Certifications</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEmployee.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <h4 className="font-bold text-foreground">Education</h4>
                  {selectedEmployee.education.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/20 border border-border/40">
                      <span className="font-semibold text-foreground">{edu.degree}</span>
                      <p className="text-muted-foreground">{edu.institution} — {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="space-y-3 text-xs p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Account Name</span>
                  <span className="font-semibold">{selectedEmployee.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Bank Name</span>
                  <span className="font-semibold">{selectedEmployee.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Account Number</span>
                  <span className="font-semibold font-mono">{selectedEmployee.bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Routing Number</span>
                  <span className="font-semibold font-mono">{selectedEmployee.bankDetails.routingNumber}</span>
                </div>
              </div>
            )}

            {activeTab === "docs" && (
              <div className="space-y-2">
                {selectedEmployee.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-card text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <span className="font-semibold text-foreground">{doc.name}</span>
                        <p className="text-[10px] text-muted-foreground">{doc.fileSize} • Uploaded {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{doc.version}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Create Employee Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create Employee Profile" maxWidth="lg">
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">First Name</label>
              <Input value={formState.firstName} onChange={(e) => setFormState({ ...formState, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Last Name</label>
              <Input value={formState.lastName} onChange={(e) => setFormState({ ...formState, lastName: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Work Email</label>
            <Input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Department</label>
              <select
                value={formState.department}
                onChange={(e) => setFormState({ ...formState, department: e.target.value })}
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
              <label className="font-semibold text-muted-foreground block mb-1">Designation</label>
              <Input value={formState.designation} onChange={(e) => setFormState({ ...formState, designation: e.target.value })} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Base Annual Salary ($)</label>
              <Input type="number" value={formState.salary} onChange={(e) => setFormState({ ...formState, salary: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Location</label>
              <Input value={formState.location} onChange={(e) => setFormState({ ...formState, location: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
