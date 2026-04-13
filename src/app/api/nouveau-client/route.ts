import { NextResponse } from "next/server";

interface NouveauClientPayload {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  endClient?: string;
  address: string;
  siret: string;
  tva: string;
  dateStart: string;
  dateEnd?: string;
  timeSlot: string;
  guestCount: number;
  space: string;
}

const REQUIRED_FIELDS: (keyof NouveauClientPayload)[] = [
  "fullName",
  "email",
  "phone",
  "company",
  "address",
  "siret",
  "tva",
  "dateStart",
  "timeSlot",
  "guestCount",
  "space",
];

export async function POST(request: Request) {
  let body: NouveauClientPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Step 1: Validate required fields
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    if (value === undefined || value === null) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    return false;
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Champs requis manquants : ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Step 2: Create Notion page
  const notionToken = process.env.NOTION_API_TOKEN;
  if (!notionToken) {
    return NextResponse.json(
      { error: "Notion API token not configured" },
      { status: 500 }
    );
  }

  const databaseId = "12262c83-ae64-8051-98a8-f6e3b3200354";

  const siretNumber = parseInt(body.siret.replace(/\s/g, ""), 10);

  const properties: Record<string, unknown> = {
    Nom: { title: [{ text: { content: body.fullName } }] },
    MAIL: { email: body.email },
    TEL: { phone_number: body.phone },
    ENTREPRISE: { rich_text: [{ text: { content: body.company } }] },
    "ADRESSE POSTALE": { rich_text: [{ text: { content: body.address } }] },
    SIRET: { number: isNaN(siretNumber) ? 0 : siretNumber },
    TVA: { rich_text: [{ text: { content: body.tva } }] },
    DATE: { date: { start: body.dateStart, end: body.dateEnd || null } },
    "CRÉNEAU": { multi_select: [{ name: body.timeSlot }] },
    "NBRE INVITÉS": { number: body.guestCount },
    ESPACE: { select: { name: body.space } },
    STEP: { select: { name: "Option" } },
  };

  if (body.endClient && body.endClient.trim()) {
    properties["CLIENT FINAL"] = {
      multi_select: [{ name: body.endClient.trim() }],
    };
  }

  let notionResponse: Response;
  try {
    notionResponse = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });
  } catch (err) {
    console.error("Notion API request failed:", err);
    return NextResponse.json(
      { error: "Échec de la connexion à Notion" },
      { status: 500 }
    );
  }

  if (!notionResponse.ok) {
    const errorBody = await notionResponse.text();
    console.error("Notion API error:", notionResponse.status, errorBody);
    return NextResponse.json(
      { error: "Échec de la création dans Notion" },
      { status: 500 }
    );
  }

  // Step 3: Send email notification (non-critical)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const formatDate = (iso: string) => {
      try {
        return new Date(iso).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return iso;
      }
    };

    const dateDisplay = body.dateEnd
      ? `${formatDate(body.dateStart)} → ${formatDate(body.dateEnd)}`
      : formatDate(body.dateStart);

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 22px; color: #111; border-bottom: 2px solid #111; padding-bottom: 12px;">
    Nouveau client en Option
  </h1>
  <p style="color: #666; font-size: 14px; margin-bottom: 24px;">
    Une nouvelle fiche client a été créée dans Notion. Merci de la traiter sous 48h.
  </p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; width: 160px; border-bottom: 1px solid #e5e5e5;">Nom</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.fullName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Email</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${body.email}" style="color: #0066cc;">${body.email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Téléphone</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;"><a href="tel:${body.phone}" style="color: #0066cc;">${body.phone}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Entreprise</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.company}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">SIRET</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.siret}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">TVA</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.tva}</td>
    </tr>
    ${body.endClient ? `<tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Client final</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.endClient}</td>
    </tr>` : ""}
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Adresse</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.address}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Date(s)</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${dateDisplay}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Créneau</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.timeSlot}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Nb invités</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.guestCount}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-bottom: 1px solid #e5e5e5;">Espace</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${body.space}</td>
    </tr>
  </table>

  <p style="margin-top: 24px; font-size: 13px; color: #999;">
    Cet email a été envoyé automatiquement depuis le site Chez Les Plombiers.
  </p>
</body>
</html>`.trim();

    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Chez Les Plombiers <notifications@chezlesplombiers.fr>",
          to: [
            "etienne@chezlesplombiers.fr",
            "celine@chezlesplombiers.fr",
          ],
          subject: "Nouveau client en Option — à traiter sous 48h",
          html,
        }),
      });

      if (!emailResponse.ok) {
        const errText = await emailResponse.text();
        console.error("Resend API error:", emailResponse.status, errText);
      }
    } catch (err) {
      console.error("Email notification failed:", err);
    }
  } else {
    console.warn("RESEND_API_KEY not set, skipping email notification");
  }

  // Step 4: Return success
  return NextResponse.json({ success: true });
}
