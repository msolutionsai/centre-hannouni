import type { Metadata } from "next";

import { LegalShell } from "@/components/sections/LegalShell";
import { clinic } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du Centre du Docteur Hannouni : données collectées via le formulaire de rendez-vous, finalités, durée de conservation et vos droits (loi 09-08, RGPD).",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalShell
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      lastUpdated="mai 2026"
    >
      <p>
        Le Centre du Docteur Hannouni accorde une importance primordiale à la protection de
        vos données personnelles et au respect du secret médical. La présente politique
        explique quelles informations nous collectons, pourquoi, comment elles sont
        traitées et quels sont vos droits.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement est le <strong>Centre du Docteur Hannouni</strong>,
        représenté par le Dr Hannouni Youssef.
      </p>
      <address>
        {clinic.address.line1}, {clinic.address.line2}
        <br />
        {clinic.address.city}, {clinic.address.country}
        <br />
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a> ·{" "}
        <a href={`tel:${clinic.phoneE164}`}>{clinic.phoneDisplay}</a>
      </address>

      <h2>Données que nous collectons</h2>
      <p>
        Lorsque vous remplissez le formulaire de demande de rendez-vous, nous collectons
        uniquement les informations que vous nous transmettez volontairement :
      </p>
      <ul>
        <li>Civilité, prénom et nom</li>
        <li>Date de naissance</li>
        <li>Adresse e-mail et numéro de téléphone</li>
        <li>Date de rendez-vous souhaitée</li>
        <li>Intervention concernée par votre demande</li>
        <li>Adresse, ville et pays (le cas échéant)</li>
        <li>Le message libre que vous rédigez</li>
      </ul>
      <p>
        Nous ne collectons aucune donnée au-delà de ce que vous saisissez. Nous vous
        invitons à ne pas communiquer d&apos;informations médicales sensibles dans le champ
        de message libre : celles-ci seront abordées lors de la consultation.
      </p>

      <h2>Finalités du traitement</h2>
      <ul>
        <li>Traiter et organiser votre demande de rendez-vous ;</li>
        <li>Vous recontacter afin de fixer une consultation ;</li>
        <li>Assurer le suivi de votre dossier dans le respect du secret médical.</li>
      </ul>

      <h2>Base légale</h2>
      <p>
        Le traitement repose sur votre <strong>consentement explicite</strong>, recueilli
        via la case à cocher du formulaire, ainsi que sur l&apos;intérêt légitime du centre
        à répondre à votre demande.
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Ce site <strong>n&apos;utilise aucun cookie publicitaire, ni traceur de suivi, ni
        outil de mesure d&apos;audience tiers</strong>. Aucun profilage n&apos;est réalisé.
        Seuls les éléments strictement nécessaires au bon fonctionnement du site peuvent
        être employés.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées au seul personnel habilité du Centre du Docteur
        Hannouni. Elles peuvent être traitées, pour notre compte et selon nos instructions,
        par des prestataires techniques (hébergement du site, automatisation sécurisée de
        la prise de rendez-vous). Le site étant hébergé par Vercel Inc. (États-Unis), un
        transfert de données en dehors du Maroc peut intervenir ; ce transfert est encadré
        par des garanties appropriées.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées le temps nécessaire au traitement de votre demande,
        puis conservées conformément aux obligations légales applicables aux données de
        santé, ou supprimées sur votre demande lorsqu&apos;aucune obligation de conservation
        ne s&apos;applique.
      </p>

      <h2>Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
        protéger vos données : transmission chiffrée (HTTPS), accès restreint aux seules
        personnes habilitées et hébergement sécurisé.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi marocaine n° 09-08 relative à la protection des personnes
        physiques à l&apos;égard du traitement des données à caractère personnel, ainsi
        qu&apos;aux principes du Règlement Général sur la Protection des Données (RGPD), vous
        disposez des droits suivants :
      </p>
      <ul>
        <li>Droit d&apos;accès à vos données ;</li>
        <li>Droit de rectification ;</li>
        <li>Droit de suppression (« droit à l&apos;oubli ») ;</li>
        <li>Droit d&apos;opposition et de limitation du traitement ;</li>
        <li>Droit à la portabilité de vos données.</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à{" "}
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a>. Vous pouvez également
        introduire une réclamation auprès de la CNDP (Commission Nationale de contrôle de la
        protection des Données à caractère Personnel —{" "}
        <a href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer">
          cndp.ma
        </a>
        ).
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à cette politique :{" "}
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a> ·{" "}
        <a href={`tel:${clinic.phoneE164}`}>{clinic.phoneDisplay}</a>.
      </p>
    </LegalShell>
  );
}
