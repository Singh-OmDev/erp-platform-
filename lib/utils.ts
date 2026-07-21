import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type SupportedCurrency = "USD" | "EUR" | "GBP" | "JPY" | "CAD";

const EXCHANGE_RATES: Record<SupportedCurrency, { rate: number; symbol: string; locale: string }> = {
  USD: { rate: 1.0, symbol: "$", locale: "en-US" },
  EUR: { rate: 0.92, symbol: "€", locale: "de-DE" },
  GBP: { rate: 0.78, symbol: "£", locale: "en-GB" },
  JPY: { rate: 155.0, symbol: "¥", locale: "ja-JP" },
  CAD: { rate: 1.36, symbol: "C$", locale: "en-CA" },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amountInUSD: number, currency: SupportedCurrency = "USD"): string {
  const config = EXCHANGE_RATES[currency] || EXCHANGE_RATES.USD;
  const converted = amountInUSD * config.rate;

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 0,
  }).format(converted);
}

export function formatDate(dateString: string | Date): string {
  if (!dateString) return "";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(timeString: string): string {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
}

export function getStatusBadgeClass(status: string): string {
  const clean = status.toLowerCase();
  if (
    clean.includes("active") ||
    clean.includes("present") ||
    clean.includes("approved") ||
    clean.includes("completed") ||
    clean.includes("hired") ||
    clean.includes("paid") ||
    clean.includes("resolved") ||
    clean.includes("in stock")
  ) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  }
  if (
    clean.includes("pending") ||
    clean.includes("review") ||
    clean.includes("in progress") ||
    clean.includes("interviewing") ||
    clean.includes("late") ||
    clean.includes("on leave") ||
    clean.includes("open") ||
    clean.includes("low stock")
  ) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  }
  if (
    clean.includes("rejected") ||
    clean.includes("absent") ||
    clean.includes("terminated") ||
    clean.includes("overdue") ||
    clean.includes("unpaid") ||
    clean.includes("cancelled") ||
    clean.includes("urgent") ||
    clean.includes("out of stock")
  ) {
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
  }
  if (clean.includes("remote") || clean.includes("scheduled") || clean.includes("applied")) {
    return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
  }
  return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
}

export function getInitials(name: string): string {
  if (!name) return "NA";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
