"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = React.useState(["8", "4", "9", "2", "1", "0"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background enterprise-grid p-4 select-none">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-modal border-border/80 text-center">
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 w-fit mx-auto">
          <ShieldCheck className="h-8 w-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">2-Factor Authentication</h2>
          <p className="text-xs text-muted-foreground mt-1">Enter the 6-digit security code from your authenticator app.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  const next = [...otp];
                  next[idx] = val;
                  setOtp(next);
                }}
                className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring focus:outline-none"
              />
            ))}
          </div>

          <Button type="submit" size="lg" className="w-full font-bold gap-2">
            Verify & Authenticate <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
