"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Bell, Megaphone, CheckCircle2, MessageSquare, Plus, Mail } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useERPStore();
  const [announcementModal, setAnnouncementModal] = React.useState(false);
  const [announcementText, setAnnouncementText] = React.useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notification & Announcement Center"
        description="System telemetry notifications, leave approval alerts, payroll receipts, and company announcements."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead} className="gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Mark All Read
            </Button>
            <Button size="sm" onClick={() => setAnnouncementModal(true)} className="gap-1.5">
              <Megaphone className="h-3.5 w-3.5" /> Broadcast Announcement
            </Button>
          </div>
        }
      />

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`p-4 transition-all border-border/60 ${
              !n.read ? "bg-primary/5 border-primary/30" : "bg-card"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${!n.read ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{n.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-muted-foreground/80 mt-1 block">{n.timestamp}</span>
                </div>
              </div>

              {!n.read && (
                <Button variant="ghost" size="sm" onClick={() => markNotificationAsRead(n.id)} className="text-xs text-primary">
                  Mark Read
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Broadcast Announcement Modal */}
      <Modal isOpen={announcementModal} onClose={() => setAnnouncementModal(false)} title="Broadcast Company Announcement" maxWidth="md">
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Announcement Message</label>
            <textarea
              rows={4}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. Please be reminded that tomorrow is the annual health checkup deadline..."
              className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button variant="outline" onClick={() => setAnnouncementModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setAnnouncementModal(false);
                setAnnouncementText("");
              }}
            >
              Broadcast Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
