import type { ComponentProps } from "react";
import type { Portrait } from "@/components/ui/Portrait";

export type PortraitVariant = ComponentProps<typeof Portrait>["variant"];

export type ResultCase = {
  label: string;
  before: PortraitVariant;
  after: PortraitVariant;
};

export type ProtocolStep = {
  step: string;
  title: string;
  body: string;
  duration?: string;
};

export type FaqItem = { q: string; a: string };

export type InterventionDetail = {
  slug: string;
  name: string;
  category: string;
  teaser: string;
  hero: {
    eyebrow: string;
    headline: string;
    italicSuffix: string;
    portrait: PortraitVariant;
  };
  intro: string;
  presentation: { title: string; body: string }[];
  indications: string[];
  meta: {
    duration: string;
    anesthesia: string;
    hospitalization: string;
    socialResume: string;
  };
  protocol: ProtocolStep[];
  results: ResultCase[];
  faq: FaqItem[];
  related: string[];
};

export const interventionDetails: InterventionDetail[] = [
  {
    slug: "rhinoplastie",
    name: "Rhinoplastie",
    category: "Chirurgie du nez",
    teaser:
      "Une approche millimétrée pour un nez en harmonie avec l’ensemble du visage.",
    hero: {
      eyebrow: "I · Chirurgie du nez",
      headline: "Une rhinoplastie millimétrée",
      italicSuffix: "pour un nez en harmonie.",
      portrait: "result-a",
    },
    intro:
      "La rhinoplastie est l’intervention emblématique de notre centre. Esthétique, fonctionnelle ou secondaire, elle exige une lecture précise de l’architecture du visage et un sens du résultat naturel.",
    presentation: [
      {
        title: "Une chirurgie d’architecture",
        body:
          "Le nez est l’ancre du visage. Sa modification, même infime, déplace l’équilibre de l’ensemble. Notre approche commence par une analyse architecturale du visage, puis une planification millimétrée — pour un résultat qui ne se remarque qu’à sa cohérence.",
      },
      {
        title: "Esthétique & fonctionnelle",
        body:
          "Nous intégrons systématiquement l’évaluation respiratoire à la planification esthétique. Une rhinoplastie réussie corrige les disgrâces visibles sans jamais compromettre — et idéalement en améliorant — la fonction nasale.",
      },
    ],
    indications: [
      "Bosse dorsale, nez busqué",
      "Pointe tombante ou trop projetée",
      "Asymétrie post-traumatique",
      "Cloison déviée — gêne respiratoire",
      "Reprise après une première rhinoplastie",
    ],
    meta: {
      duration: "1h30 — 3h",
      anesthesia: "Générale",
      hospitalization: "Ambulatoire ou 1 nuit",
      socialResume: "10 — 14 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Consultation approfondie",
        body:
          "Analyse morphologique, simulation 2D, écoute des attentes — la consultation est le moment où se dessine l’intention chirurgicale.",
        duration: "60 min",
      },
      {
        step: "02",
        title: "Planification millimétrée",
        body:
          "Examen pré-opératoire, repères architecturaux, choix de la technique (ouverte, fermée, ultrasonique). Rien n’est laissé au hasard.",
      },
      {
        step: "03",
        title: "Intervention",
        body:
          "Sous anesthésie générale, en bloc opératoire conforme aux normes internationales. Techniques mini-invasives privilégiées.",
        duration: "1h30 — 3h",
      },
      {
        step: "04",
        title: "Suivi rapproché",
        body:
          "Pansement à 7 jours, contrôles à 1, 3, 6 et 12 mois. La forme définitive s’apprécie à un an.",
      },
    ],
    results: [
      {
        label: "Rhinoplastie esthétique · résultat à 6 mois",
        before: "result-a",
        after: "result-b",
      },
      {
        label: "Rhinoplastie ultrasonique · à 9 mois",
        before: "result-b",
        after: "result-a",
      },
    ],
    faq: [
      {
        q: "L’intervention laisse-t-elle des cicatrices visibles ?",
        a: "En technique fermée, les incisions sont strictement intra-nasales. En technique ouverte, une fine cicatrice columellaire devient quasi invisible en quelques mois.",
      },
      {
        q: "Quand voit-on le résultat définitif ?",
        a: "Un nez retrouve sa forme à environ 80 % à six mois. Le résultat définitif s’apprécie à un an, voire dix-huit mois pour les peaux épaisses.",
      },
      {
        q: "Une rhinoplastie peut-elle être prise en charge ?",
        a: "Seul le volet fonctionnel (septoplastie pour gêne respiratoire avérée) peut être pris en charge. Le volet esthétique reste hors prise en charge.",
      },
    ],
    related: ["lifting-cervico-facial", "genioplastie", "lipofilling-du-visage"],
  },
  {
    slug: "lifting-cervico-facial",
    name: "Lifting cervico-facial",
    category: "Chirurgie du visage",
    teaser:
      "Redessiner l’ovale et le cou sans altérer l’identité du visage.",
    hero: {
      eyebrow: "II · Chirurgie du visage",
      headline: "Le lifting cervico-facial,",
      italicSuffix: "le visage rendu à lui-même.",
      portrait: "portrait",
    },
    intro:
      "Le lifting cervico-facial restaure l’ovale du visage et la ligne du cou en repositionnant les structures profondes. C’est une chirurgie d’équilibre — jamais d’étirement.",
    presentation: [
      {
        title: "Repositionner, jamais tirer",
        body:
          "Notre approche s’appuie sur les techniques SMAS, qui agissent sur les couches musculo-aponévrotiques profondes. Le résultat est naturel, durable, sans tension cutanée visible.",
      },
      {
        title: "Cou & visage en continuité",
        body:
          "Le cou et l’ovale forment une unité visuelle. Les traiter conjointement est la condition d’un résultat cohérent et discret.",
      },
    ],
    indications: [
      "Relâchement de l’ovale",
      "Bajoues, perte de l’angle cervico-mentonnier",
      "Excès cutané du cou",
      "Affaissement des plis nasogéniens (selon technique)",
    ],
    meta: {
      duration: "3h — 4h",
      anesthesia: "Générale",
      hospitalization: "1 nuit",
      socialResume: "14 — 21 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Consultation & analyse morphologique",
        body:
          "Évaluation de la qualité cutanée, des volumes, du positionnement osseux. Choix de la technique adaptée.",
        duration: "60 min",
      },
      {
        step: "02",
        title: "Bilan pré-opératoire",
        body:
          "Bilan biologique, anesthésique, photographies standardisées.",
      },
      {
        step: "03",
        title: "Intervention SMAS",
        body:
          "Repositionnement des structures profondes, redrapage cutané sans tension. Cicatrices dissimulées dans les plis péri-auriculaires.",
        duration: "3h — 4h",
      },
      {
        step: "04",
        title: "Suivi à 8 jours, 1 mois, 3, 6 et 12 mois",
        body:
          "Œdème et ecchymoses régressent en deux à trois semaines. Résultat final stabilisé à 6 mois.",
      },
    ],
    results: [
      {
        label: "Lifting cervico-facial · résultat à 3 mois",
        before: "portrait",
        after: "hero",
      },
    ],
    faq: [
      {
        q: "Le lifting va-t-il modifier mes traits ?",
        a: "Non. L’objectif est de repositionner — pas de transformer. Vos proches reconnaîtront un visage reposé, jamais étranger.",
      },
      {
        q: "Combien de temps tient un lifting ?",
        a: "Un lifting bien réalisé recule l’horloge de huit à dix ans. Le vieillissement reprend son cours, mais à partir d’un point de départ rajeuni.",
      },
    ],
    related: ["blepharoplastie", "lipofilling-du-visage", "rhinoplastie"],
  },
  {
    slug: "blepharoplastie",
    name: "Blépharoplastie",
    category: "Chirurgie des paupières",
    teaser: "Rouvrir le regard — discrètement, durablement.",
    hero: {
      eyebrow: "III · Chirurgie des paupières",
      headline: "La blépharoplastie,",
      italicSuffix: "le regard, lavé du temps.",
      portrait: "result-b",
    },
    intro:
      "Le regard est la première signature du visage. La blépharoplastie traite l’excès cutané et les poches palpébrales pour restaurer un regard ouvert, sans signature visible.",
    presentation: [
      {
        title: "Supérieure, inférieure ou combinée",
        body:
          "Selon votre morphologie, l’intervention concerne la paupière supérieure (excès cutané), inférieure (poches sous les yeux) ou les deux. Les cicatrices se cachent dans les plis naturels.",
      },
    ],
    indications: [
      "Excès cutané supérieur masquant le regard",
      "Poches inférieures",
      "Cernes creux (avec lipofilling associé)",
      "Asymétrie palpébrale",
    ],
    meta: {
      duration: "1h — 2h",
      anesthesia: "Locale ou générale",
      hospitalization: "Ambulatoire",
      socialResume: "7 — 10 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Consultation",
        body:
          "Analyse de la qualité cutanée, des volumes, du tonus du muscle orbiculaire.",
        duration: "45 min",
      },
      {
        step: "02",
        title: "Intervention",
        body:
          "Tracé minutieux dans les plis. Technique trans-conjonctivale possible pour les paupières inférieures (sans cicatrice visible).",
        duration: "1h — 2h",
      },
      {
        step: "03",
        title: "Suivi à 7 jours, puis 1, 3 et 6 mois",
        body:
          "Œdème modéré, ecchymoses possibles. Reprise sociale à 7-10 jours. Résultat définitif à 3 mois.",
      },
    ],
    results: [
      {
        label: "Blépharoplastie supérieure · à 2 mois",
        before: "result-b",
        after: "result-a",
      },
    ],
    faq: [
      {
        q: "Peut-on combiner blépharoplastie et lifting ?",
        a: "Oui — c’est même fréquent. La cohérence du regard avec l’ovale est essentielle pour un résultat harmonieux.",
      },
      {
        q: "L’intervention modifie-t-elle la forme de l’œil ?",
        a: "Non, sauf demande explicite. L’objectif est de restaurer la forme naturelle, pas de la modifier.",
      },
    ],
    related: ["lifting-cervico-facial", "lipofilling-du-visage", "acide-hyaluronique"],
  },
  {
    slug: "genioplastie",
    name: "Génioplastie",
    category: "Chirurgie du menton",
    teaser: "Rééquilibrer le profil par une correction précise du menton.",
    hero: {
      eyebrow: "IV · Chirurgie du menton",
      headline: "La génioplastie,",
      italicSuffix: "le profil retrouvé.",
      portrait: "result-a",
    },
    intro:
      "Le menton est la clé du profil. Trop fuyant, trop proéminent ou asymétrique, il déséquilibre l’ensemble du visage. La génioplastie le repositionne avec une précision millimétrique.",
    presentation: [
      {
        title: "Génioplastie osseuse ou par implant",
        body:
          "Selon le défaut à corriger, nous proposons une ostéotomie de glissement (modifie l’os) ou un implant sur mesure. La planification s’appuie sur l’analyse architecturale de la face.",
      },
    ],
    indications: [
      "Menton fuyant (rétrognathie)",
      "Menton proéminent (prognathie modérée)",
      "Asymétrie mentonnière",
      "Disproportion menton / lèvre / nez",
    ],
    meta: {
      duration: "1h — 2h",
      anesthesia: "Générale",
      hospitalization: "Ambulatoire",
      socialResume: "7 — 10 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Analyse céphalométrique",
        body:
          "Téléradiographie de profil, analyse architecturale, simulation du résultat.",
      },
      {
        step: "02",
        title: "Intervention par voie endo-buccale",
        body:
          "Pas de cicatrice visible — l’incision est faite à l’intérieur de la bouche. Ostéotomie ou implant selon le plan.",
        duration: "1h — 2h",
      },
      {
        step: "03",
        title: "Suivi à 7 jours, 1 mois, 3 et 6 mois",
        body:
          "Alimentation molle pendant 10 jours. Œdème modéré, sensibilité du menton transitoire.",
      },
    ],
    results: [],
    faq: [
      {
        q: "Y a-t-il une cicatrice visible ?",
        a: "Non — l’abord est endo-buccal. Aucune cicatrice n’apparaît sur la peau.",
      },
      {
        q: "Peut-on associer la génioplastie à une rhinoplastie ?",
        a: "Oui, c’est une association fréquente pour rééquilibrer harmonieusement le profil.",
      },
    ],
    related: ["rhinoplastie", "chirurgie-orthognatique", "lipofilling-du-visage"],
  },
  {
    slug: "lipofilling-du-visage",
    name: "Lipofilling du visage",
    category: "Volumétrie",
    teaser:
      "Restaurer les volumes avec la propre graisse du patient — naturel absolu.",
    hero: {
      eyebrow: "V · Volumétrie",
      headline: "Le lipofilling,",
      italicSuffix: "votre matière, votre visage.",
      portrait: "portrait",
    },
    intro:
      "Le lipofilling restaure les volumes du visage avec votre propre graisse, prélevée sur une zone donneuse. C’est l’apport de matière le plus naturel qui soit.",
    presentation: [
      {
        title: "Une matière biocompatible — la vôtre",
        body:
          "La graisse autologue présente l’avantage absolu d’être votre propre tissu. Une fois intégrée, elle vit, vieillit et se comporte comme le reste de votre visage.",
      },
    ],
    indications: [
      "Cernes creux, sillon naso-jugal",
      "Pommettes plates",
      "Plis nasogéniens",
      "Tempes creuses, ovale dévitalisé",
    ],
    meta: {
      duration: "1h30",
      anesthesia: "Locale ou générale légère",
      hospitalization: "Ambulatoire",
      socialResume: "5 — 8 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Cartographie volumique",
        body:
          "Identification précise des zones à restaurer, choix du site donneur.",
      },
      {
        step: "02",
        title: "Prélèvement & purification",
        body:
          "Liposuccion douce, centrifugation et purification de la graisse selon les protocoles les plus rigoureux.",
      },
      {
        step: "03",
        title: "Réinjection micrométrique",
        body:
          "Réinjection en couches fines, à la canule mousse, pour une intégration optimale.",
      },
    ],
    results: [],
    faq: [
      {
        q: "Combien de graisse est définitivement intégrée ?",
        a: "En moyenne 60 à 70 % du volume injecté est définitivement vascularisé. Une légère sur-correction initiale en tient compte.",
      },
      {
        q: "Peut-on combiner lipofilling et lifting ?",
        a: "Oui — c’est l’association de référence pour traiter à la fois la perte de tonicité et de volume.",
      },
    ],
    related: ["lifting-cervico-facial", "blepharoplastie", "acide-hyaluronique"],
  },
  {
    slug: "acide-hyaluronique",
    name: "Acide hyaluronique",
    category: "Médecine esthétique",
    teaser: "Corriger, volumiser, hydrater — sans bistouri, sans éviction.",
    hero: {
      eyebrow: "VI · Médecine esthétique",
      headline: "L’acide hyaluronique,",
      italicSuffix: "corriger sans transformer.",
      portrait: "result-b",
    },
    intro:
      "L’acide hyaluronique est l’outil le plus polyvalent de la médecine esthétique. Bien posé, il corrige avec subtilité — jamais avec excès.",
    presentation: [
      {
        title: "La règle d’or : la mesure",
        body:
          "Notre approche est minimaliste — nous ne posons que ce qui est strictement nécessaire pour rétablir un équilibre. Aucun visage ne doit porter la signature d’un produit.",
      },
    ],
    indications: [
      "Sillons nasogéniens, plis d’amertume",
      "Cernes creux (sillon naso-jugal)",
      "Pommettes, ovale du visage",
      "Lèvres — hydratation, contour, volume mesuré",
      "Nez médical (rhinoplastie sans bistouri légère)",
    ],
    meta: {
      duration: "30 — 45 min",
      anesthesia: "Crème anesthésiante",
      hospitalization: "Ambulatoire",
      socialResume: "Immédiate",
    },
    protocol: [
      {
        step: "01",
        title: "Consultation & cartographie",
        body:
          "Lecture des volumes, choix du produit (densité, réticulation).",
      },
      {
        step: "02",
        title: "Injection",
        body:
          "Technique à la canule privilégiée pour minimiser le risque vasculaire et l’inconfort.",
        duration: "20 — 30 min",
      },
      {
        step: "03",
        title: "Contrôle à 15 jours",
        body:
          "Évaluation du résultat à distance de l’œdème initial. Ajustement éventuel.",
      },
    ],
    results: [],
    faq: [
      {
        q: "Combien de temps tient l’acide hyaluronique ?",
        a: "Selon la zone et le produit, de 9 à 18 mois en moyenne. Les zones très mobiles (lèvres) tiennent moins longtemps.",
      },
      {
        q: "Le résultat est-il réversible ?",
        a: "Oui. L’acide hyaluronique peut être dissous par injection d’hyaluronidase si nécessaire.",
      },
    ],
    related: ["botox", "lipofilling-du-visage", "blepharoplastie"],
  },
  {
    slug: "botox",
    name: "Botox",
    category: "Médecine esthétique",
    teaser:
      "Atténuer les rides d’expression, préserver la mobilité du visage.",
    hero: {
      eyebrow: "VII · Médecine esthétique",
      headline: "Le botox,",
      italicSuffix: "l’expression, jamais figée.",
      portrait: "result-a",
    },
    intro:
      "Le botox détend les muscles responsables des rides d’expression. La règle est la mesure : le visage doit rester mobile, expressif, vivant.",
    presentation: [
      {
        title: "Rides d’expression — pas rides cutanées",
        body:
          "Le botox ne traite pas les plis cutanés profonds (qui relèvent du lifting ou de l’AH). Il agit en amont, en relâchant les muscles à l’origine du pli.",
      },
    ],
    indications: [
      "Rides du lion (entre les sourcils)",
      "Rides frontales",
      "Pattes d’oie",
      "Bruxisme — masséters hypertrophiés",
      "Hyperhidrose axillaire ou palmaire",
    ],
    meta: {
      duration: "15 — 20 min",
      anesthesia: "Aucune",
      hospitalization: "Ambulatoire",
      socialResume: "Immédiate",
    },
    protocol: [
      {
        step: "01",
        title: "Analyse de l’expression",
        body:
          "Étude des rides au repos et en mouvement. Définition d’un plan d’injection respectant l’expression naturelle.",
      },
      {
        step: "02",
        title: "Injection",
        body:
          "Aiguilles très fines, douleur quasi-nulle. Effet visible en 4 à 7 jours.",
        duration: "15 min",
      },
      {
        step: "03",
        title: "Contrôle à 15 jours",
        body:
          "Réajustement éventuel pour parfaire l’équilibre.",
      },
    ],
    results: [],
    faq: [
      {
        q: "Combien de temps dure l’effet ?",
        a: "Quatre à six mois en moyenne. L’effet décroît progressivement, sans rebond.",
      },
      {
        q: "Le visage va-t-il paraître figé ?",
        a: "Non — pas avec un dosage juste. Notre approche privilégie une atténuation, jamais une paralysie.",
      },
    ],
    related: ["acide-hyaluronique", "blepharoplastie", "lipofilling-du-visage"],
  },
  {
    slug: "chirurgie-orthognatique",
    name: "Chirurgie orthognatique",
    category: "Maxillo-facial",
    teaser:
      "Corriger l’architecture osseuse pour un visage fonctionnel et harmonieux.",
    hero: {
      eyebrow: "VIII · Maxillo-facial",
      headline: "La chirurgie orthognatique,",
      italicSuffix: "rétablir l’architecture.",
      portrait: "surgery",
    },
    intro:
      "La chirurgie orthognatique corrige les anomalies de croissance des bases osseuses du visage. C’est une chirurgie d’architecture, à la fois fonctionnelle et esthétique.",
    presentation: [
      {
        title: "Fonction d’abord, esthétique ensuite",
        body:
          "Une mauvaise occlusion compromet la mastication, la respiration, la phonation. La chirurgie orthognatique restaure d’abord la fonction — la transformation esthétique en découle naturellement.",
      },
      {
        title: "Une équipe pluridisciplinaire",
        body:
          "Cette chirurgie nécessite une coordination étroite avec votre orthodontiste. Le suivi se conçoit en équipe, sur une période de 18 à 24 mois.",
      },
    ],
    indications: [
      "Classe II ou III squelettique",
      "Béance antérieure ou latérale",
      "Asymétrie maxillo-mandibulaire",
      "Apnées du sommeil d’origine architecturale",
      "Profil disharmonieux secondaire",
    ],
    meta: {
      duration: "3h — 5h",
      anesthesia: "Générale",
      hospitalization: "2 — 3 nuits",
      socialResume: "21 — 30 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Analyse architecturale",
        body:
          "Téléradiographie, scanner 3D, modèles dentaires. Analyse en concertation avec l’orthodontiste.",
      },
      {
        step: "02",
        title: "Phase pré-opératoire orthodontique",
        body:
          "12 à 18 mois de préparation orthodontique pour aligner les arcades en vue de la chirurgie.",
      },
      {
        step: "03",
        title: "Intervention",
        body:
          "Ostéotomies maxillaire et / ou mandibulaire selon le plan. Voie endo-buccale, aucune cicatrice cutanée.",
        duration: "3h — 5h",
      },
      {
        step: "04",
        title: "Suivi & finition orthodontique",
        body:
          "Hospitalisation 2-3 nuits, alimentation molle 6 semaines, suivi orthodontique de finition sur 6 à 12 mois.",
      },
    ],
    results: [],
    faq: [
      {
        q: "Y a-t-il des cicatrices visibles ?",
        a: "Non. Toutes les voies d’abord sont endo-buccales.",
      },
      {
        q: "Cette chirurgie est-elle prise en charge ?",
        a: "Oui, dans la grande majorité des cas, elle entre dans le cadre d’une prise en charge médicale au titre du défaut fonctionnel.",
      },
    ],
    related: ["genioplastie", "rhinoplastie", "lifting-cervico-facial"],
  },
];

export function getInterventionBySlug(slug: string): InterventionDetail | undefined {
  return interventionDetails.find((i) => i.slug === slug);
}

export function getRelated(slugs: string[]): InterventionDetail[] {
  return slugs
    .map((s) => getInterventionBySlug(s))
    .filter((x): x is InterventionDetail => Boolean(x));
}
