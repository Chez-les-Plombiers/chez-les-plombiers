declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      action: string,
      params?: Record<string, string | number | boolean>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export const GA_MEASUREMENT_ID = "G-P14K1RH61R";
export const GTM_ID = "GTM-PXGXK94F";

type EventName = "cta_click" | "section_view" | "nav_click";

interface EventParams {
  cta_click: { label: string; destination: string };
  section_view: { section: string };
  nav_click: { label: string; destination: string };
}

export function trackEvent<T extends EventName>(
  event: T,
  params: EventParams[T]
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}
