"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Bot, Send, Search, CheckCircle2, ShieldAlert, TrendingUp } from "lucide-react";

export default function AiAssistantPage() {
  const [messages, setMessages] = React.useState([
    {
      id: "1",
      sender: "ai",
      text: "Welcome to Nexus Executive AI Intelligence! I am trained across all 23 enterprise ERP modules. Ask me to perform anomaly detection, generate workforce digests, or query skills.",
    },
  ]);
  const [query, setQuery] = React.useState("");

  const handleSend = (text?: string) => {
    const q = text || query;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: q }]);
    if (!text) setQuery("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: `🤖 **AI Executive Digest for "${q}"**:\n\n- **Workforce Health**: 96.4% on-time attendance today across SF, London, and Tokyo offices.\n- **Fiscal Position**: July net payroll of $344,000 processed 100% via Stripe Treasury.\n- **Anomaly Flag**: Zero security policy violations logged in audit trail over past 24 hours.`,
        },
      ]);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="AI Executive Copilot & Intelligence Portal"
        description="Natural language ERP search engine, real-time anomaly detection, and automated executive digests."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Chat Stream */}
        <Card className="md:col-span-2 p-6 flex flex-col h-[550px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 text-xs ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold ${
                    m.sender === "ai" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {m.sender === "ai" ? <Sparkles className="h-4 w-4" /> : "U"}
                </div>
                <div
                  className={`p-3.5 rounded-2xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-xs"
                      : "bg-muted/30 border border-border/60 text-foreground rounded-tl-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2 pt-4 border-t border-border/50"
          >
            <Input
              placeholder="Ask Copilot anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="gap-1.5">
              <Send className="h-4 w-4" /> Ask Copilot
            </Button>
          </form>
        </Card>

        {/* Quick Intelligence Widgets */}
        <div className="space-y-4 text-xs">
          <Card className="p-4 space-y-2">
            <h4 className="font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" /> Executive AI Shortcuts
            </h4>
            <div className="space-y-2 pt-1">
              {[
                "Analyze attendance & overtime risks",
                "Find engineers available for transfer",
                "Audit recent high-value purchase orders",
                "Check Q3 OKR completion rate",
              ].map((shortcut) => (
                <button
                  key={shortcut}
                  onClick={() => handleSend(shortcut)}
                  className="w-full text-left p-2.5 rounded-xl bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors border border-border/40"
                >
                  {shortcut}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 space-y-2 bg-emerald-500/10 border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 className="h-4 w-4" /> System Telemetry Optimal
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI background agents actively monitoring 23 ERP modules. All data models reconciled in real time.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
