import { NextResponse } from "next/server";

/**
 * RDV form handler.
 *
 * Pipes the frontend submission to the n8n webhook specified in env:
 *   N8N_WEBHOOK_URL=https://<your-n8n-host>/webhook/centre-hannouni-rdv
 *
 * If the env var is absent, we log the payload and succeed — useful for
 * local preview / staging without credentials.
 *
 * PAYLOAD (contract for n8n) — designed for the Centre Hannouni workflow:
 * {
 *   leadId:         "HANN-<timestamp>-<rand>",
 *   source:         "Website - Centre Hannouni",
 *   submittedAt:    ISO 8601,
 *   civilite:       "Madame" | "Monsieur" | "Non précisé",
 *   prenom, nom, nomComplet,
 *   dateNaissance:  "YYYY-MM-DD" | "",
 *   email, telephone,
 *   dateSouhaitee:  "YYYY-MM-DD" | "",
 *   intervention:   string,
 *   message,
 *   adresse, ville, pays,
 *   consentement:   boolean,
 *   // Compat fields for the existing MSOLUTIONSAI workflow ("activity", etc.)
 *   firstName, lastName, fullName, phone, activity, company: ""
 * }
 */

type Body = {
  gender: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  preferredDate: string;
  intervention: string;
  address: string;
  city: string;
  country: string;
  message: string;
  consent: boolean;
};

function sanitize(s: string | undefined | null) {
  return (s ?? "").toString().trim().slice(0, 2000);
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const firstName = sanitize(body.firstName);
  const lastName = sanitize(body.lastName);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const intervention = sanitize(body.intervention);
  const consent = !!body.consent;

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "Merci d'indiquer votre prénom et votre nom." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "L'adresse e-mail renseignée ne semble pas valide." },
      { status: 400 }
    );
  }
  if (!phone) {
    return NextResponse.json(
      { error: "Merci d'indiquer un numéro de téléphone joignable." },
      { status: 400 }
    );
  }
  if (!intervention) {
    return NextResponse.json(
      { error: "Merci d'indiquer le type d'intervention souhaité." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Votre consentement est requis pour traiter la demande." },
      { status: 400 }
    );
  }

  const now = new Date();
  const leadId =
    "HANN-" +
    now.getTime().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 7).toUpperCase();

  const fullName = `${firstName} ${lastName}`.trim();

  const payload = {
    leadId,
    source: "Website - Centre Hannouni",
    submittedAt: now.toISOString(),
    civilite: sanitize(body.gender) || "Non précisé",
    prenom: firstName,
    nom: lastName,
    nomComplet: fullName,
    dateNaissance: sanitize(body.birthDate),
    email,
    telephone: phone,
    dateSouhaitee: sanitize(body.preferredDate),
    intervention,
    message: sanitize(body.message),
    adresse: sanitize(body.address),
    ville: sanitize(body.city),
    pays: sanitize(body.country) || "Maroc",
    consentement: consent,

    // Compat block — aligns with existing n8n workflow keys if reused as-is
    firstName,
    lastName,
    fullName,
    phone,
    activity: intervention,
    company: "",
  };

  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[RDV] N8N_WEBHOOK_URL absent — payload logged only:", payload);
    }
    return NextResponse.json({ ok: true, leadId, delivered: false }, { status: 200 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[RDV] webhook rejected:", res.status, txt);
      return NextResponse.json(
        { error: "Le serveur de réception est momentanément indisponible." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[RDV] webhook error:", err);
    return NextResponse.json(
      { error: "Impossible de joindre le serveur. Merci de réessayer." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, leadId, delivered: true }, { status: 200 });
}
