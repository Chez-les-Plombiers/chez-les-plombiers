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

type EventName = "cta_click" | "section_view" | "nav_click" | "contact_click" | "form_submit";

interface EventParams {
  cta_click: { label: string; destination: string; cta_type?: string; cta_location?: string };
  section_view: { section: string };
  nav_click: { label: string; destination: string };
  contact_click: { method: string; destination: string };
  form_submit: { form_name: string; form_location?: string };
}

export function trackEvent<T extends EventName>(
  event: T,
  params: EventParams[T]
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}
