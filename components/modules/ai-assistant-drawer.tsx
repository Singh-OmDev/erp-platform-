"use client";

import * as React from "react";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Sparkles, Send, Bot, AlertTriangle, TrendingUp, Users, Search } from "lucide-react";

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

const SUGGESTED_QUERIES = [
  "Summarize workforce attendance & turnover risks for Q3",
  "Find engineers with Next.js skills in San Francisco",
  "Check open purchase orders and committed budget spend",
  "Detect expense claims with unusual amounts",
];

export function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Hello Alexander! I am your Nexus ERP Executive AI Copilot. Ask me anything about workforce telemetry, payroll cash flows, open requisitions, or inventory stock.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    setTimeout(() => {
      let responseText = "Analyzing enterprise telemetry dataset...";

      if (q.toLowerCase().includes("attendance") || q.toLowerCase().includes("turnover")) {
        responseText = "📊 **Workforce Telemetry Analysis**:\n- **On-time Attendance**: 96.4% across 142 active staff.\n- **Overtime Hours**: 8.3 hours logged in Engineering.\n- **Turnover Risk**: Low (0.4% attrition rate). Top performer Sarah Jenkins is on track for H2 promotion.";
      } else if (q.toLowerCase().includes("next.js") || q.toLowerCase().includes("engineer")) {
        responseText = "👩‍💻 **Qualified Talent Search**:\n- **Sarah Jenkins** (Principal Frontend Engineer) — SF HQ • Skills: Next.js, React, Architecture.\n- **Amara Okonkwo** (Senior Backend Lead) — Austin Remote • Skills: Go, Kubernetes, Next.js.";
      } else if (q.toLowerCase().includes("purchase") || q.toLowerCase().includes("budget")) {
        responseText = "💰 **Fiscal Spend Telemetry**:\n- Open Purchase Orders total **$173,000** (Intel Semiconductor & Cisco Systems).\n- July Net Payroll of **$344,000** has been 100% disbursed via direct deposit.";
      } else {
        responseText = `✨ **AI Executive Insights for "${q}"**:\nQuery executed across 23 enterprise ERP modules. System health is optimal, zero security policy violations recorded in audit logs.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          sender: "ai",
          text: responseText,
          timestamp: "Just now",
        },
      ]);
    }, 600);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right" width="xl">
      <div className="flex flex-col h-full space-y-4 text-xs">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-linear-to-r from-primary/10 via-card to-card border border-primary/20">
          <div className="p-2 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">Nexus AI ERP Executive Copilot</h4>
            <p className="text-[11px] text-muted-foreground">Real-time enterprise intelligence & natural language search</p>
          </div>
        </div>

        {/* Suggested Queries Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Suggested Queries</span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUERIES.map((sq) => (
              <button
                key={sq}
                onClick={() => handleSend(sq)}
                className="px-2.5 py-1 rounded-xl bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground text-[11px] border border-border/50 text-left transition-all"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl bg-muted/10 border border-border/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {m.sender === "ai" ? (
                <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              ) : (
                <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" size="sm" />
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-xs"
                    : "bg-card border border-border/80 text-foreground rounded-tl-xs shadow-subtle"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 pt-2 border-t border-border/50"
        >
          <Input
            placeholder="Ask AI Copilot about any ERP metric or workforce data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 h-10"
          />
          <Button type="submit" size="sm" className="h-10 px-4">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Drawer>
  );
}
