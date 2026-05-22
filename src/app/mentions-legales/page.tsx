import type { Metadata } from "next";

import { LegalShell } from "@/components/sections/LegalShell";
import { clinic } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site du Centre du Docteur Hannouni, chirurgie esthétique et maxillo-faciale à Marrakech : éditeur, hébergement, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <LegalShell eyebrow="Informations légales" title="Mentions légales" lastUpdated="mai 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le présent site, accessible à l&apos;adresse{" "}
        <a href="https://centrehannouni.com">centrehannouni.com</a>, est édité par le{" "}
        <strong>Centre du Docteur Hannouni</strong>.
      </p>
      <address>
        Dr Hannouni Youssef — Chirurgien esthétique &amp; maxillo-facial
        <br />
        {clinic.address.line1}, {clinic.address.line2}
        <br />
        {clinic.address.city}, {clinic.address.country}
        <br />
        Téléphone : <a href={`tel:${clinic.phoneE164}`}>{clinic.phoneDisplay}</a>
        <br />
        E-mail : <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
      </address>
      <p>
        <strong>Directeur de la publication :</strong> Dr Hannouni Youssef.
      </p>

      <h2>Activité réglementée</h2>
      <p>
        Le Dr Hannouni Youssef exerce la médecine en qualité de chirurgien esthétique et
        maxillo-facial. La profession de médecin est une profession réglementée au Maroc :
        le praticien est soumis au Code de déontologie médicale et inscrit au Conseil
        national de l&apos;Ordre des médecins du Maroc.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>
      </p>
      <address>
        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
        <br />
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
      </address>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, photographies, logo,
        identité visuelle, mise en page) est la propriété exclusive du Centre du Docteur
        Hannouni, sauf mention contraire. Toute reproduction, représentation ou diffusion,
        totale ou partielle, sans autorisation écrite préalable, est interdite et
        constituerait une contrefaçon.
      </p>

      <h2>Photographies de résultats</h2>
      <p>
        Les photographies de résultats présentées sur ce site (« avant / après ») sont
        publiées avec l&apos;accord écrit des patients concernés. Les résultats illustrés
        sont propres à chaque patient et ne sauraient constituer une garantie : ils
        varient selon l&apos;anatomie, l&apos;indication et le respect des consignes
        post-opératoires.
      </p>

      <h2>Informations médicales</h2>
      <p>
        Les informations médicales diffusées sur ce site le sont à titre purement
        informatif. Elles ne remplacent en aucun cas une consultation médicale. Seule une
        consultation avec le Dr Hannouni permet d&apos;établir un diagnostic, d&apos;évaluer
        une indication et d&apos;informer sur les bénéfices et les risques d&apos;une
        intervention.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles collectées via le formulaire de prise de
        rendez-vous est décrit dans notre{" "}
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site :{" "}
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a> ·{" "}
        <a href={`tel:${clinic.phoneE164}`}>{clinic.phoneDisplay}</a>.
      </p>
    </LegalShell>
  );
}
