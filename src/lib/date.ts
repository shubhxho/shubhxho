import { site } from "@/lib/site";

export function formatSiteDate(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("month")}.${value("day")}.${value("year")}`;
}

export function formatSiteIsoDate(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function timelineDateToIso(date: string) {
  const [month, day, year] = date.split(".");
  return `20${year}-${month}-${day}`;
}

export function formatSiteTime(date: Date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}
