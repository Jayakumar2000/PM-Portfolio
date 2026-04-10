import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "Mobile";
  if (/Tablet|iPad/i.test(ua)) return "Tablet";
  return "Desktop";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Other";
}

function getCountryFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta")) return "India";
    if (tz.startsWith("America/")) return "USA/Americas";
    if (tz.startsWith("Europe/")) return "Europe";
    if (tz.startsWith("Asia/")) return "Asia";
    if (tz.startsWith("Australia/")) return "Australia";
    if (tz.startsWith("Africa/")) return "Africa";
    return tz.split("/")[0];
  } catch { return "Unknown"; }
}

let sessionId = "";
function getSessionId(): string {
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  return sessionId;
}

export async function trackPageView(path: string): Promise<void> {
  try {
    await addDoc(collection(db, "page_views"), {
      path,
      referrer: document.referrer || "direct",
      device: getDeviceType(),
      browser: getBrowser(),
      region: getCountryFromTimezone(),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      sessionId: getSessionId(),
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    // Silent fail - analytics should never break the site
    console.debug("Analytics:", e);
  }
}

export async function trackEvent(action: string, label?: string): Promise<void> {
  try {
    await addDoc(collection(db, "events"), {
      action,
      label: label || "",
      path: window.location.pathname,
      sessionId: getSessionId(),
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.debug("Analytics event:", e);
  }
    }
