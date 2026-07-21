"use client";

import * as React from "react";
import { useERPStore } from "@/lib/store";
import { CalendarEvent } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Plus, Video, Cake, Palmtree, Users, Clock } from "lucide-react";

export default function CalendarPage() {
  const { calendarEvents, addCalendarEvent } = useERPStore();
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const [eventForm, setEventForm] = React.useState({
    title: "",
    type: "Meeting" as const,
    date: "2026-07-25",
    startTime: "10:00",
    endTime: "11:00",
    location: "Zoom & Room A",
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title) return;

    addCalendarEvent({
      title: eventForm.title,
      type: eventForm.type,
      date: eventForm.date,
      startTime: eventForm.startTime,
      endTime: eventForm.endTime,
      location: eventForm.location,
    });
    setCreateModalOpen(false);
    setEventForm({ title: "", type: "Meeting", date: "2026-07-25", startTime: "10:00", endTime: "11:00", location: "Zoom & Room A" });
  };

  const filteredEvents = selectedCategory === "All" ? calendarEvents : calendarEvents.filter((ev) => ev.type === selectedCategory);

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "Meeting":
        return <Video className="h-4 w-4 text-sky-500" />;
      case "Birthday":
        return <Cake className="h-4 w-4 text-rose-500" />;
      case "Holiday":
        return <Palmtree className="h-4 w-4 text-emerald-500" />;
      case "Interview":
        return <Users className="h-4 w-4 text-amber-500" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Master Enterprise Calendar"
        description="Unified corporate schedule for all-hands meetings, employee birthdays, out-of-office leaves, and recruitment interviews."
        actions={
          <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Schedule Event
          </Button>
        }
      />

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {["All", "Meeting", "Holiday", "Birthday", "Leave", "Interview"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((ev) => (
          <Card key={ev.id} className="p-4 space-y-3 hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-muted/40">{getEventIcon(ev.type)}</div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{ev.title}</h4>
                  <span className="text-[11px] text-muted-foreground">{ev.type} Event</span>
                </div>
              </div>
              <Badge variant="outline">{ev.date}</Badge>
            </div>

            {(ev.startTime || ev.location) && (
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/40">
                {ev.startTime && <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {ev.startTime} - {ev.endTime}</p>}
                {ev.location && <p className="font-medium text-foreground">{ev.location}</p>}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Schedule Event Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Schedule Event" maxWidth="md">
        <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Event Title</label>
            <Input value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Event Type</label>
              <select
                value={eventForm.type}
                onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as any })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Meeting">Meeting</option>
                <option value="Holiday">Holiday</option>
                <option value="Birthday">Birthday</option>
                <option value="Leave">Leave</option>
                <option value="Interview">Interview</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Date</label>
              <Input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Start Time</label>
              <Input type="time" value={eventForm.startTime} onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Location / Link</label>
              <Input value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
