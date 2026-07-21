"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { ShieldCheck, Lock, Smartphone, Laptop, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { currentUser, updateUser } = useERPStore();
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [phone, setPhone] = React.useState(currentUser.phone);

  const [tfaModalOpen, setTfaModalOpen] = React.useState(false);
  const [tfaEnabled, setTfaEnabled] = React.useState(currentUser.twoFactorEnabled);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="User Profile & Security Controls"
        description="Personal workspace credentials, multi-factor authentication (2FA), and active device sessions."
      />

      {/* User Header Banner */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="xl" />
          <div>
            <h3 className="text-xl font-bold text-foreground">{currentUser.name}</h3>
            <p className="text-xs text-muted-foreground">{currentUser.role} • {currentUser.email}</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mt-2">
              <CheckCircle2 className="h-3 w-3" /> Enterprise Admin Verified
            </span>
          </div>
        </div>
      </Card>

      {/* Personal Info Form */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base font-bold">Personal Details</CardTitle>
          <CardDescription>Update your public account information</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Email Address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Phone Number</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security & 2FA Card */}
      <Card className="p-6 space-y-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" /> Multi-Factor Authentication (2FA)
          </CardTitle>
          <CardDescription>Add an extra layer of security using an authenticator app (TOTP)</CardDescription>
        </CardHeader>
        <CardContent className="px-0 flex items-center justify-between">
          <div>
            <span className="font-bold text-xs text-foreground">Status: {tfaEnabled ? "Enabled" : "Disabled"}</span>
            <p className="text-xs text-muted-foreground mt-0.5">Protect your Enterprise account from unauthorized sign-ins.</p>
          </div>
          <Button
            variant={tfaEnabled ? "outline" : "default"}
            size="sm"
            onClick={() => setTfaModalOpen(true)}
          >
            {tfaEnabled ? "Reconfigure 2FA" : "Enable 2FA"}
          </Button>
        </CardContent>
      </Card>

      {/* 2FA Setup Modal */}
      <Modal isOpen={tfaModalOpen} onClose={() => setTfaModalOpen(false)} title="Setup 2-Factor Authentication" maxWidth="md">
        <div className="space-y-4 text-xs text-center">
          <p className="text-muted-foreground">Scan this QR code with Google Authenticator, 1Password, or Authy:</p>

          <div className="p-4 bg-white rounded-2xl w-44 h-44 mx-auto flex items-center justify-center border border-border shadow-md">
            {/* Visual QR Code Mock */}
            <div className="grid grid-cols-5 gap-1.5 w-36 h-36">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`rounded-xs ${i % 2 === 0 ? "bg-black" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 font-mono text-[11px] text-foreground font-bold select-all">
            SECRET: NEXUS-2FA-OR91-8829-4412
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-border/50">
            <Button variant="outline" onClick={() => setTfaModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setTfaEnabled(true);
                updateUser({ twoFactorEnabled: true });
                setTfaModalOpen(false);
              }}
            >
              Verify & Enable
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
