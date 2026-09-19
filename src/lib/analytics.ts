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

type EventName =
  | "cta_click"
  | "section_view"
  | "nav_click"
  | "contact_click"
  | "form_submit"
  | "whatsapp_click";

interface EventParams {
  cta_click: { label: string; destination: string; cta_type?: string; cta_location?: string };
  section_view: { section: string };
  nav_click: { label: string; destination: string };
  contact_click: { method: string; destination: string };
  form_submit: { form_name: string; form_location?: string };
  /** Voir `trackEvent` : émis automatiquement, à ne pas appeler à la main. */
  whatsapp_click: { location: string };
}

/**
 * Un clic WhatsApp est-il caché dans cet évènement ?
 *
 * WhatsApp est déclaré à neuf endroits du site, tantôt comme `cta_click` avec
 * un `label` en `…_whatsapp`, tantôt comme `contact_click` avec un `method`
 * valant `whatsapp`. Deux formes, neuf appels.
 */
function whatsappLocation<T extends EventName>(
  event: T,
  params: EventParams[T],
): string | null {
  if (event === "cta_click") {
    const { label } = params as EventParams["cta_click"];
    return label.includes("whatsapp") ? label.replace(/_?whatsapp_?/, "") || "cta" : null;
  }
  if (event === "contact_click") {
    const { method } = params as EventParams["contact_click"];
    return method.includes("whatsapp") ? method : null;
  }
  return null;
}

/**
 * Émet un évènement GA4.
 *
 * ⚠️ Émet EN PLUS un `whatsapp_click` dédié quand le clic part vers WhatsApp.
 *
 * Pourquoi ce doublon : Étienne compte deux conversions, l'envoi d'un devis et
 * le clic WhatsApp (19/09/2026). Or `cta_click` mélange tous les boutons du
 * site — 1 381 évènements, dont une poignée de WhatsApp — et le paramètre
 * `label` n'est PAS enregistré comme dimension personnalisée dans GA4 : il est
 * donc impossible de filtrer dessus, ni dans l'interface, ni par l'API. Seul un
 * NOM d'évènement distinct est interrogeable, d'où celui-ci.
 *
 * ⚠️ Conséquence à connaître : les clics WhatsApp antérieurs au 19/09/2026 sont
 * définitivement incomptables. Enregistrer `label` a posteriori n'y changerait
 * rien, les dimensions personnalisées ne sont pas rétroactives.
 *
 * `cta_click` et `contact_click` continuent d'être émis à l'identique : la
 * continuité historique de ces deux séries est préservée.
 */
export function trackEvent<T extends EventName>(
  event: T,
  params: EventParams[T]
) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", event, params);

  const location = whatsappLocation(event, params);
  if (location) {
    window.gtag("event", "whatsapp_click", { location });
  }
}
