"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("alexander.wright@nexuserp.io");
  const [password, setPassword] = React.useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify-otp");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background enterprise-grid p-4 select-none">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-modal border-border/80">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary text-primary-foreground font-black text-xl mb-2 shadow-md">
            N
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign in to Nexus ERP</h2>
          <p className="text-xs text-muted-foreground">Enterprise single sign-on & authentication portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Work Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-muted-foreground">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full font-bold gap-2">
            Continue to Verification <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="border-t border-border/50 pt-4 text-center text-xs text-muted-foreground">
          Protected by Enterprise SAML 2.0 & SOC2 Compliance.
        </div>
      </Card>
    </div>
  );
}
