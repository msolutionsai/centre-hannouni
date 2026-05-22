import type { ComponentProps } from "react";
import type { Portrait } from "@/components/ui/Portrait";

export type PortraitVariant = ComponentProps<typeof Portrait>["variant"];

export type ResultCase = {
  label: string;
  before: string;
  after: string;
};

const RESULTS_BASE =
  "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/PHOTO%20AVANT%20APRES";

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
  image: string;
  hero: {
    eyebrow: string;
    headline: string;
    italicSuffix: string;
    portrait: PortraitVariant;
  };
  intro: string;
  /** Meta description SEO (≈150-160 car.) — géo-optimisée "<procédure> à Marrakech". */
  metaDescription?: string;
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
    metaDescription:
      "Rhinoplastie à Marrakech (Maroc) par le Dr Hannouni, chirurgien maxillo-facial. Technique fermée ou ouverte, résultat naturel. Consultation à Guéliz.",
    name: "Rhinoplastie",
    category: "Chirurgie du nez",
    teaser:
      "Une approche millimétrée pour un nez en harmonie avec l’ensemble du visage.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Rhinoplastie.png",
    hero: {
      eyebrow: "I · Chirurgie du nez",
      headline: "Une rhinoplastie millimétrée",
      italicSuffix: "pour un nez en harmonie.",
      portrait: "result-a",
    },
    intro:
      "La rhinoplastie est l’intervention emblématique de notre centre. Esthétique, fonctionnelle ou secondaire, elle exige une lecture précise de l’anatomie du visage et un sens du résultat naturel.",
    presentation: [
      {
        title: "Une chirurgie de précision",
        body:
          "Le nez est l’ancre du visage. Sa modification, même infime, déplace l’équilibre de l’ensemble. Notre approche commence par une analyse anatomique du visage, puis une planification millimétrée, pour un résultat qui ne se remarque qu’à sa cohérence.",
      },
      {
        title: "Esthétique & fonctionnelle",
        body:
          "Nous intégrons systématiquement l’évaluation respiratoire à la planification esthétique. Une rhinoplastie réussie corrige les disgrâces visibles sans jamais compromettre la fonction nasale, et idéalement en l’améliorant.",
      },
    ],
    indications: [
      "Bosse dorsale, nez busqué",
      "Pointe tombante ou trop projetée",
      "Asymétrie post-traumatique",
      "Cloison déviée · gêne respiratoire",
      "Reprise après une première rhinoplastie",
    ],
    meta: {
      duration: "1h30 à 3h",
      anesthesia: "Générale",
      hospitalization: "Ambulatoire ou 1 nuit",
      socialResume: "10 à 14 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Consultation approfondie",
        body:
          "Analyse morphologique, simulation 2D, écoute des attentes : la consultation est le moment où se dessine l’intention chirurgicale.",
        duration: "60 min",
      },
      {
        step: "02",
        title: "Planification millimétrée",
        body:
          "Examen pré-opératoire, repères anatomiques, choix de la technique (ouverte, fermée, ultrasonique). Rien n’est laissé au hasard.",
      },
      {
        step: "03",
        title: "Intervention",
        body:
          "Sous anesthésie générale, en bloc opératoire conforme aux normes internationales. Techniques mini-invasives privilégiées.",
        duration: "1h30 à 3h",
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
        label: "Rhinoplastie · avant / après",
        before: `${RESULTS_BASE}/Rhinoplastie%20AVANT.png`,
        after: `${RESULTS_BASE}/Rhinoplastie%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte une rhinoplastie à Marrakech ?",
        a: "Le tarif d’une rhinoplastie est établi en consultation, après analyse morphologique et fonctionnelle. Il dépend de la technique (fermée, ouverte, primaire ou de reprise) et inclut le bloc opératoire, l’anesthésie et l’ensemble du suivi post-opératoire jusqu’à un an.",
      },
      {
        q: "L’intervention laisse-t-elle des cicatrices visibles ?",
        a: "En technique fermée, les incisions sont strictement intra-nasales et donc invisibles. En technique ouverte, une fine cicatrice columellaire de 4 à 5 mm devient quasi imperceptible en quelques mois.",
      },
      {
        q: "Quand voit-on le résultat définitif d’une rhinoplastie ?",
        a: "Un nez retrouve sa forme à environ 80 % à six mois. Le résultat définitif s’apprécie à un an, voire dix-huit mois pour les peaux épaisses. La patience fait partie intégrante du protocole.",
      },
      {
        q: "La rhinoplastie est-elle douloureuse ?",
        a: "L’intervention se déroule sous anesthésie générale, donc sans douleur. En post-opératoire, la sensation dominante est une congestion nasale, traitée par antalgiques simples. La douleur reste modérée et de courte durée.",
      },
      {
        q: "Combien de temps dure la convalescence après une rhinoplastie ?",
        a: "L’attelle nasale est retirée à sept jours. Les ecchymoses péri-orbitaires régressent en dix à quinze jours. La reprise sociale est possible à partir du dixième jour, sport doux à trois semaines, sport de contact à trois mois.",
      },
      {
        q: "Quels sont les risques d’une rhinoplastie ?",
        a: "Comme toute chirurgie, la rhinoplastie comporte des risques rares mais réels : œdème prolongé, asymétrie résiduelle, troubles de la cicatrisation, ou nécessité d’une retouche (5 à 10 % des cas). Une consultation détaillée vous présente l’ensemble du protocole de sécurité.",
      },
      {
        q: "À partir de quel âge peut-on faire une rhinoplastie ?",
        a: "La croissance nasale s’achève vers 16 ans chez la femme et 17 ans chez l’homme. Une rhinoplastie esthétique est donc envisageable à partir de cet âge, avec accord parental jusqu’à la majorité.",
      },
      {
        q: "Une rhinoplastie peut-elle être prise en charge ?",
        a: "Seul le volet fonctionnel (septoplastie pour gêne respiratoire avérée, traumatisme) peut entrer dans une prise en charge médicale. Le volet purement esthétique reste à la charge du patient.",
      },
      {
        q: "Peut-on respirer normalement après une rhinoplastie ?",
        a: "La respiration est gênée pendant les premiers jours par l’œdème intra-nasal et la mèche éventuelle. Elle redevient normale en deux à trois semaines, et le plus souvent meilleure qu’avant si une septoplastie a été associée.",
      },
      {
        q: "Quand puis-je reprendre le sport après une rhinoplastie ?",
        a: "Marche dès le lendemain, sport doux (vélo d’appartement, cardio léger) à trois semaines, course et musculation à six semaines, sports de contact et arts martiaux à trois mois minimum.",
      },
    ],
    related: ["lifting-cervico-facial", "genioplastie", "lipofilling-du-visage"],
  },
  {
    slug: "lifting-cervico-facial",
    metaDescription:
      "Lifting cervico-facial à Marrakech (Maroc) : le Dr Hannouni restaure l'ovale du visage par technique SMAS. Résultat naturel, sans effet tiré. RDV à Guéliz.",
    name: "Lifting cervico-facial",
    category: "Chirurgie du visage",
    teaser:
      "Redessiner l’ovale et le cou sans altérer l’identité du visage.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Lifting%20cervico-facial.png",
    hero: {
      eyebrow: "II · Chirurgie du visage",
      headline: "Le lifting cervico-facial,",
      italicSuffix: "le visage rendu à lui-même.",
      portrait: "portrait",
    },
    intro:
      "Le lifting cervico-facial restaure l’ovale du visage et la ligne du cou en repositionnant les structures profondes. C’est une chirurgie d’équilibre, jamais d’étirement.",
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
      duration: "3h à 4h",
      anesthesia: "Générale",
      hospitalization: "1 nuit",
      socialResume: "14 à 21 jours",
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
        duration: "3h à 4h",
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
        label: "Lifting cervico-facial · avant / après",
        before: `${RESULTS_BASE}/Lifting%20cervico-facial%20AVANT.png`,
        after: `${RESULTS_BASE}/Lifting%20cervico-facial%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte un lifting cervico-facial à Marrakech ?",
        a: "Le tarif d’un lifting cervico-facial est établi en consultation, après analyse anatomique et discussion du plan opératoire. Il intègre le bloc, l’anesthésie générale, la nuit d’hospitalisation et l’ensemble des consultations de suivi sur un an.",
      },
      {
        q: "Le lifting va-t-il modifier mes traits ?",
        a: "Non. L’objectif d’un lifting SMAS est de repositionner les structures profondes, pas de transformer le visage. Vos proches reconnaîtront un visage reposé, jamais étranger — c’est précisément la signature d’un lifting réussi.",
      },
      {
        q: "Combien de temps tient un lifting cervico-facial ?",
        a: "Un lifting bien réalisé recule l’horloge biologique de huit à dix ans. Le vieillissement reprend son cours naturel, mais à partir d’un point de départ rajeuni. Un entretien par lipofilling ou médecine esthétique permet de prolonger ce bénéfice.",
      },
      {
        q: "À quel âge envisager un lifting cervico-facial ?",
        a: "Il n’y a pas d’âge précis. Le bon moment est celui où le relâchement de l’ovale et du cou commence à signer le visage. Pour la majorité des patients, cela se situe entre 45 et 65 ans, parfois plus tôt en cas de fonte volumique précoce.",
      },
      {
        q: "Les cicatrices d’un lifting sont-elles visibles ?",
        a: "Non. Les cicatrices sont dissimulées dans les plis naturels : devant et derrière l’oreille, et le long du cuir chevelu. Six mois après, elles sont quasi invisibles, même cheveux relevés.",
      },
      {
        q: "L’intervention est-elle douloureuse ?",
        a: "Le lifting est réalisé sous anesthésie générale, donc sans douleur. En post-opératoire, on note surtout une sensation de tension et d’engourdissement, traitée par antalgiques simples. La douleur véritable est exceptionnelle.",
      },
      {
        q: "Quels sont les risques d’un lifting cervico-facial ?",
        a: "Le risque le plus fréquent est l’hématome (1 à 3 % des cas), drainé sans séquelle. D’autres risques rares existent : troubles cicatriciels, paresthésies transitoires, atteinte d’une branche du nerf facial (exceptionnelle). Une consultation détaillée vous présente l’ensemble du protocole.",
      },
      {
        q: "Combien de temps dure la convalescence ?",
        a: "Une nuit d’hospitalisation, retour à domicile dès J+1. Les fils sont retirés à dix jours. Œdème et ecchymoses régressent en deux à trois semaines. Reprise sociale entre 14 et 21 jours, sport doux à six semaines, sport intensif à trois mois.",
      },
      {
        q: "Peut-on combiner lifting et lipofilling ?",
        a: "Oui, c’est même l’association de référence. Le lifting traite la laxité, le lipofilling restaure les volumes perdus (tempes, pommettes, ovale). Combinés, ils offrent un résultat global plus naturel et durable.",
      },
    ],
    related: ["blepharoplastie", "lipofilling-du-visage", "rhinoplastie"],
  },
  {
    slug: "blepharoplastie",
    metaDescription:
      "Blépharoplastie à Marrakech (Maroc) par le Dr Hannouni : chirurgie des paupières pour rouvrir le regard, sans cicatrice visible. Supérieure ou inférieure.",
    name: "Blépharoplastie",
    category: "Chirurgie des paupières",
    teaser: "Rouvrir le regard, discrètement et durablement.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Ble%CC%81pharoplastie.png",
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
      duration: "1h à 2h",
      anesthesia: "Locale ou générale",
      hospitalization: "Ambulatoire",
      socialResume: "7 à 10 jours",
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
        duration: "1h à 2h",
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
        label: "Blépharoplastie · avant / après",
        before: `${RESULTS_BASE}/Ble%CC%81pharoplastie%20AVANT.png`,
        after: `${RESULTS_BASE}/Ble%CC%81pharoplastie%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte une blépharoplastie à Marrakech ?",
        a: "Le tarif d’une blépharoplastie est établi en consultation. Il varie selon le geste (supérieure seule, inférieure seule, ou combinée) et inclut l’anesthésie, le bloc en ambulatoire et les consultations de suivi.",
      },
      {
        q: "Y a-t-il des cicatrices visibles après une blépharoplastie ?",
        a: "Non. Pour la paupière supérieure, la cicatrice est dissimulée dans le pli palpébral naturel. Pour la paupière inférieure, la voie trans-conjonctivale (à l’intérieur de la paupière) ne laisse aucune cicatrice cutanée.",
      },
      {
        q: "L’opération est-elle douloureuse ?",
        a: "Très peu. Sous anesthésie locale ou générale légère, l’intervention est indolore. Les suites se résument à une sensation de tension, traitée par antalgiques simples. Les patients reprennent une activité normale très vite.",
      },
      {
        q: "Quelle est la durée de récupération d’une blépharoplastie ?",
        a: "Œdème et ecchymoses palpébrales pendant 7 à 10 jours. Les fils sont retirés à J+7. Reprise sociale possible entre 7 et 10 jours, parfois moins avec du maquillage correcteur. Résultat définitif à trois mois.",
      },
      {
        q: "À partir de quel âge envisager une blépharoplastie ?",
        a: "Il n’y a pas d’âge précis. Le bon moment est celui où l’excès cutané ou les poches commencent à alourdir le regard. La majorité des patients se situe entre 40 et 70 ans, mais une indication peut exister plus tôt en cas de prédisposition familiale.",
      },
      {
        q: "Quels sont les risques d’une blépharoplastie ?",
        a: "Les risques sérieux sont exceptionnels. Plus fréquemment : sécheresse oculaire transitoire, larmoiement, asymétrie minime, cicatrice perceptible chez les peaux à risque. Un bilan ophtalmologique préalable est systématique en cas de doute.",
      },
      {
        q: "Peut-on porter du maquillage après l’intervention ?",
        a: "Le maquillage est autorisé dès l’ablation des fils (J+7), à condition d’utiliser des produits doux et de démaquiller avec délicatesse. Les lentilles peuvent être reportées à 15 jours environ.",
      },
      {
        q: "Peut-on combiner blépharoplastie et lifting ?",
        a: "Oui, c’est même fréquent. La cohérence du regard avec l’ovale du visage est essentielle pour un résultat harmonieux. L’association blépharoplastie + lifting est l’une des plus demandées chez les patients de plus de 55 ans.",
      },
      {
        q: "L’intervention modifie-t-elle la forme de l’œil ?",
        a: "Non, sauf demande explicite (canthopexie). L’objectif d’une blépharoplastie classique est de restaurer la forme naturelle du regard, pas de la modifier.",
      },
      {
        q: "Quand puis-je reprendre le sport ?",
        a: "Marche dès le lendemain, sport doux à 10 jours, sport intensif et activités à risque de choc à 4 semaines. La piscine est à reporter à 3 semaines.",
      },
    ],
    related: ["lifting-cervico-facial", "lipofilling-du-visage", "acide-hyaluronique"],
  },
  {
    slug: "genioplastie",
    metaDescription:
      "Génioplastie à Marrakech (Maroc) : le Dr Hannouni rééquilibre le profil par une correction du menton (ostéotomie ou implant). Voie endo-buccale, sans cicatrice.",
    name: "Génioplastie",
    category: "Chirurgie du menton",
    teaser: "Rééquilibrer le profil par une correction précise du menton.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Ge%CC%81nioplastie.png",
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
          "Selon le défaut à corriger, nous proposons une ostéotomie de glissement (modifie l’os) ou un implant sur mesure. La planification s’appuie sur l’analyse anatomique de la face.",
      },
    ],
    indications: [
      "Menton fuyant (rétrognathie)",
      "Menton proéminent (prognathie modérée)",
      "Asymétrie mentonnière",
      "Disproportion menton / lèvre / nez",
    ],
    meta: {
      duration: "1h à 2h",
      anesthesia: "Générale",
      hospitalization: "Ambulatoire",
      socialResume: "7 à 10 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Analyse céphalométrique",
        body:
          "Téléradiographie de profil, analyse anatomique, simulation du résultat.",
      },
      {
        step: "02",
        title: "Intervention par voie endo-buccale",
        body:
          "Pas de cicatrice visible : l’incision est faite à l’intérieur de la bouche. Ostéotomie ou implant selon le plan.",
        duration: "1h à 2h",
      },
      {
        step: "03",
        title: "Suivi à 7 jours, 1 mois, 3 et 6 mois",
        body:
          "Alimentation molle pendant 10 jours. Œdème modéré, sensibilité du menton transitoire.",
      },
    ],
    results: [
      {
        label: "Génioplastie · avant / après",
        before: `${RESULTS_BASE}/Ge%CC%81nioplastie%20AVANT%20.png`,
        after: `${RESULTS_BASE}/Ge%CC%81nioplastie%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte une génioplastie à Marrakech ?",
        a: "Le tarif d’une génioplastie est défini en consultation et dépend de la technique retenue (ostéotomie de glissement ou implant sur mesure). Il inclut l’analyse céphalométrique, l’anesthésie générale, l’intervention en ambulatoire et le suivi.",
      },
      {
        q: "Y a-t-il une cicatrice visible après une génioplastie ?",
        a: "Non, l’abord est endo-buccal (à l’intérieur de la bouche). Aucune cicatrice cutanée n’apparaît sur le menton ou sous la mâchoire.",
      },
      {
        q: "Quelle différence entre génioplastie osseuse et implant ?",
        a: "L’ostéotomie de glissement modifie directement l’os mentonnier et permet une correction en trois dimensions (avance, recul, asymétrie). L’implant en silicone, prosthèse sur mesure, est moins invasif mais ne corrige qu’une projection antérieure. Le choix se fait au cas par cas.",
      },
      {
        q: "L’intervention est-elle douloureuse ?",
        a: "Sous anesthésie générale, l’intervention est indolore. Les suites se résument à une gêne à la mastication et à une légère sensibilité du menton, prises en charge par antalgiques classiques. La douleur réelle est exceptionnelle.",
      },
      {
        q: "Quels sont les risques d’une génioplastie ?",
        a: "Risques rares mais à connaître : hypoesthésie transitoire de la lèvre inférieure (par contact du nerf mentonnier), asymétrie résiduelle, infection du foyer opératoire. Une planification rigoureuse réduit considérablement ces risques.",
      },
      {
        q: "Combien de temps dure l’œdème post-opératoire ?",
        a: "L’œdème est marqué les 5 premiers jours, modéré à 10 jours, puis régresse progressivement sur 4 à 6 semaines. Le résultat définitif s’apprécie à 3 mois, parfois 6 mois pour les ostéotomies.",
      },
      {
        q: "Quand puis-je reprendre une alimentation normale ?",
        a: "Alimentation molle pendant 10 jours pour ménager le foyer opératoire. Alimentation tendre jusqu’à 3 semaines. Retour à une alimentation normale à 4-6 semaines selon la cicatrisation et la technique utilisée.",
      },
      {
        q: "Le résultat d’une génioplastie est-il définitif ?",
        a: "Oui. Une fois la consolidation osseuse acquise (3 à 6 mois), le résultat est définitif. C’est précisément l’intérêt de la chirurgie par rapport aux comblements temporaires.",
      },
      {
        q: "Peut-on associer la génioplastie à une rhinoplastie ?",
        a: "Oui, c’est une association très fréquente. Nez et menton sont les deux points d’équilibre du profil ; les traiter conjointement permet d’atteindre une harmonie globale impossible avec une seule intervention.",
      },
      {
        q: "À partir de quel âge faire une génioplastie ?",
        a: "Après la fin de la croissance osseuse, soit vers 17-18 ans. Avant cet âge, la croissance peut modifier le résultat. Il n’y a en revanche pas de limite supérieure.",
      },
    ],
    related: ["rhinoplastie", "chirurgie-orthognatique", "lipofilling-du-visage"],
  },
  {
    slug: "lipofilling-du-visage",
    metaDescription:
      "Lipofilling du visage à Marrakech (Maroc) par le Dr Hannouni : restauration des volumes avec votre propre graisse. Résultat naturel et durable. RDV à Guéliz.",
    name: "Lipofilling du visage",
    category: "Volumétrie",
    teaser:
      "Restaurer les volumes avec la propre graisse du patient : naturel absolu.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Lipofilling%20du%20visage.png",
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
        title: "Une matière biocompatible : la vôtre",
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
      socialResume: "5 à 8 jours",
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
    results: [
      {
        label: "Lipofilling du visage · avant / après",
        before: `${RESULTS_BASE}/Lipofilling%20du%20visage%20AVANT.png`,
        after: `${RESULTS_BASE}/Lipofilling%20du%20visage%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte un lipofilling du visage à Marrakech ?",
        a: "Le tarif d’un lipofilling du visage est défini en consultation, après cartographie volumique. Il inclut le prélèvement, la purification, la réinjection, l’anesthésie et le suivi. Un seul tarif couvre le geste complet, quelle que soit la zone donneuse.",
      },
      {
        q: "D’où vient la graisse prélevée ?",
        a: "La graisse est prélevée sur une zone donneuse choisie avec vous : abdomen, flancs, faces internes des cuisses ou des genoux. Le volume requis pour un lipofilling du visage est modeste (20 à 80 cc), souvent invisible sur la zone donneuse.",
      },
      {
        q: "Combien de graisse est définitivement intégrée ?",
        a: "En moyenne 60 à 70 % du volume injecté est définitivement vascularisé et persiste dans le temps. Une légère sur-correction initiale tient compte de cette résorption naturelle. Au-delà de 6 mois, le volume restant est stable.",
      },
      {
        q: "L’intervention est-elle douloureuse ?",
        a: "Sous anesthésie locale tumescente ou générale légère, l’intervention est indolore. Les suites se limitent à un œdème modéré et à de discrètes ecchymoses sur la zone donneuse. Une simple antalgique de niveau 1 suffit.",
      },
      {
        q: "Combien de temps dure le résultat d’un lipofilling ?",
        a: "Une fois intégrée (à 3-6 mois), la graisse vit, vieillit et se comporte comme le tissu naturel. Le résultat est donc permanent au sens où la matière reste, mais elle suit le vieillissement physiologique du visage.",
      },
      {
        q: "Quels sont les risques d’un lipofilling du visage ?",
        a: "Risques rares : kystes huileux (graisse non vascularisée), irrégularité de relief, asymétrie minime, hypocorrection (justifiant une retouche dans 10 à 15 % des cas). Le risque infectieux est exceptionnel grâce aux techniques modernes de purification.",
      },
      {
        q: "Faut-il refaire le lipofilling plusieurs fois ?",
        a: "Une seule séance suffit dans la majorité des cas. Une seconde séance peut être proposée à 6-12 mois en cas de besoin volumique persistant ou pour amplifier un résultat initialement modéré.",
      },
      {
        q: "Le lipofilling peut-il remplacer l’acide hyaluronique ?",
        a: "Ils ne se concurrencent pas, ils se complètent. L’acide hyaluronique offre précision et réversibilité sur petites zones (lèvres, sillons). Le lipofilling offre de la matière en quantité, durable, idéal pour les grandes zones (pommettes, tempes, ovale).",
      },
      {
        q: "Combien de temps avant de voir le résultat final ?",
        a: "L’aspect immédiat est faussement abondant à cause de l’œdème. À J+15, on voit la silhouette du résultat. À 3 mois, la part de graisse intégrée est stabilisée. À 6 mois, le résultat est définitif.",
      },
      {
        q: "Peut-on combiner lipofilling et lifting ?",
        a: "Oui, c’est l’association de référence pour traiter à la fois la perte de tonicité (lifting) et la perte de volume (lipofilling). Réalisés dans le même temps opératoire, ils offrent un résultat global rajeunissant et naturel.",
      },
    ],
    related: ["lifting-cervico-facial", "blepharoplastie", "acide-hyaluronique"],
  },
  {
    slug: "acide-hyaluronique",
    metaDescription:
      "Acide hyaluronique à Marrakech (Maroc) par le Dr Hannouni : comblement des rides, volumétrie, hydratation. Résultat naturel et réversible.",
    name: "Acide hyaluronique",
    category: "Médecine esthétique",
    teaser: "Corriger, volumiser, hydrater : sans bistouri, sans éviction.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Acide%20hyaluronique.png",
    hero: {
      eyebrow: "VI · Médecine esthétique",
      headline: "L’acide hyaluronique,",
      italicSuffix: "corriger sans transformer.",
      portrait: "result-b",
    },
    intro:
      "L’acide hyaluronique est l’outil le plus polyvalent de la médecine esthétique. Bien posé, il corrige avec subtilité, jamais avec excès.",
    presentation: [
      {
        title: "La règle d’or : la mesure",
        body:
          "Notre approche est minimaliste : nous ne posons que ce qui est strictement nécessaire pour rétablir un équilibre. Aucun visage ne doit porter la signature d’un produit.",
      },
    ],
    indications: [
      "Sillons nasogéniens, plis d’amertume",
      "Cernes creux (sillon naso-jugal)",
      "Pommettes, ovale du visage",
      "Lèvres · hydratation, contour, volume mesuré",
      "Nez médical (rhinoplastie sans bistouri légère)",
    ],
    meta: {
      duration: "30 à 45 min",
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
        duration: "20 à 30 min",
      },
      {
        step: "03",
        title: "Contrôle à 15 jours",
        body:
          "Évaluation du résultat à distance de l’œdème initial. Ajustement éventuel.",
      },
    ],
    results: [
      {
        label: "Acide hyaluronique · avant / après",
        before: `${RESULTS_BASE}/Acide%20hyaluronique%20AVANT.png`,
        after: `${RESULTS_BASE}/Acide%20hyaluronique%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte une injection d’acide hyaluronique à Marrakech ?",
        a: "Le tarif d’une séance d’acide hyaluronique se calcule par seringue (1 ml en général) et selon la zone traitée. Le devis est établi en consultation, après lecture des volumes et choix du produit (densité, réticulation adaptée à la zone).",
      },
      {
        q: "Combien de temps tient l’acide hyaluronique ?",
        a: "Selon la zone et le produit, la tenue est de 9 à 18 mois en moyenne. Les zones très mobiles (lèvres) tiennent moins longtemps (6 à 9 mois). Les zones structurelles (pommettes, ovale) peuvent durer 18 à 24 mois.",
      },
      {
        q: "L’injection est-elle douloureuse ?",
        a: "L’inconfort est modéré. Une crème anesthésiante est appliquée 30 minutes avant. Les produits modernes contiennent eux-mêmes un anesthésique local (lidocaïne). La sensation décrite est plutôt celle d’une pression, rarement d’une douleur.",
      },
      {
        q: "Quels sont les effets secondaires d’une injection d’acide hyaluronique ?",
        a: "Effets fréquents et transitoires : rougeur, gonflement, parfois ecchymose au point d’injection, régressant en 2 à 7 jours. Effets rares : nodule, asymétrie, infection. Effet grave très rare : occlusion vasculaire, dont le risque est minimisé par la technique à la canule.",
      },
      {
        q: "Peut-on reprendre une vie normale après l’injection ?",
        a: "Oui, l’éviction sociale est nulle. Les effets visibles (rougeur, gonflement modeste) régressent dans la journée ou le lendemain. Le maquillage est autorisé après 4 à 6 heures. Le sport intensif est à éviter pendant 24 heures.",
      },
      {
        q: "Le résultat est-il réversible ?",
        a: "Oui. L’acide hyaluronique peut être dissous par injection d’hyaluronidase, une enzyme qui dégrade le produit en quelques heures. C’est l’une des grandes sécurités de cette technique, comparée aux produits définitifs.",
      },
      {
        q: "Quelle différence entre acide hyaluronique et botox ?",
        a: "Ce sont deux outils complémentaires. L’acide hyaluronique apporte du volume et comble (sillons, pommettes, lèvres). Le botox détend les muscles et atténue les rides d’expression (front, lion, pattes d’oie). On peut les associer dans la même séance.",
      },
      {
        q: "À partir de quel âge faire de l’acide hyaluronique ?",
        a: "Pas d’âge précis, mais une logique d’indication. Avant 30 ans, l’usage se limite à des corrections ciblées (lèvres, harmonisation du nez médical). Entre 30 et 50 ans, il prévient et corrige. Après 50 ans, il complète souvent d’autres approches (lipofilling, lifting).",
      },
      {
        q: "Combien de temps avant de voir le résultat final ?",
        a: "Le résultat est visible immédiatement, parfois un peu accentué par l’œdème initial. Il se stabilise et s’affine entre J+7 et J+15. C’est à cette date qu’une éventuelle retouche peut être proposée.",
      },
      {
        q: "Peut-on faire de l’acide hyaluronique enceinte ou en allaitant ?",
        a: "Par principe de précaution, les injections sont déconseillées pendant la grossesse et l’allaitement, bien qu’aucune toxicité fœtale n’ait été démontrée. Nous reportons la séance après la fin de l’allaitement.",
      },
    ],
    related: ["botox", "lipofilling-du-visage", "blepharoplastie"],
  },
  {
    slug: "botox",
    metaDescription:
      "Botox à Marrakech (Maroc) par le Dr Hannouni : atténue les rides d'expression (front, lion, pattes d'oie) en préservant la mobilité du visage. RDV à Guéliz.",
    name: "Botox",
    category: "Médecine esthétique",
    teaser:
      "Atténuer les rides d’expression, préserver la mobilité du visage.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Botox.png",
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
        title: "Rides d’expression · pas rides cutanées",
        body:
          "Le botox ne traite pas les plis cutanés profonds (qui relèvent du lifting ou de l’AH). Il agit en amont, en relâchant les muscles à l’origine du pli.",
      },
    ],
    indications: [
      "Rides du lion (entre les sourcils)",
      "Rides frontales",
      "Pattes d’oie",
      "Bruxisme · masséters hypertrophiés",
      "Hyperhidrose axillaire ou palmaire",
    ],
    meta: {
      duration: "15 à 20 min",
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
    results: [
      {
        label: "Botox · avant / après",
        before: `${RESULTS_BASE}/Botox%20AVANT%20.png`,
        after: `${RESULTS_BASE}/Botox%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte une injection de botox à Marrakech ?",
        a: "Le tarif d’une séance de botox est défini en consultation et dépend des zones traitées (lion, front, pattes d’oie, et leurs associations). Le tarif inclut le produit, la consultation d’analyse et le contrôle à 15 jours.",
      },
      {
        q: "Combien de temps dure l’effet du botox ?",
        a: "Quatre à six mois en moyenne. L’effet décroît progressivement, sans effet rebond — c’est-à-dire que les rides ne reviennent pas plus marquées qu’avant. Avec des injections régulières, l’effet tend même à durer plus longtemps.",
      },
      {
        q: "L’injection de botox est-elle douloureuse ?",
        a: "Très peu. Les aiguilles utilisées sont extrêmement fines (32G). La sensation est celle d’une piqûre brève. Aucune anesthésie n’est nécessaire, mais une poche de glace peut être proposée pour les patients sensibles.",
      },
      {
        q: "Le visage va-t-il paraître figé après une injection de botox ?",
        a: "Non, pas avec un dosage juste. Notre approche privilégie une atténuation des rides d’expression, jamais une paralysie. L’expressivité reste préservée — c’est précisément la marque d’un botox bien dosé.",
      },
      {
        q: "Quels sont les effets secondaires du botox ?",
        a: "Effets fréquents et transitoires : rougeur, parfois ecchymose minime au point d’injection. Effets rares : céphalée passagère, sensation de pesanteur des paupières (en cas d’injection trop basse, transitoire), asymétrie corrigeable au contrôle de 15 jours.",
      },
      {
        q: "Combien de temps avant de voir le résultat ?",
        a: "Le botox commence à agir entre J+3 et J+5. Le résultat complet s’apprécie à J+15. C’est précisément le moment où une éventuelle retouche peut être proposée si un détail doit être affiné.",
      },
      {
        q: "À partir de quel âge faire du botox ?",
        a: "L’indication esthétique commence généralement vers 28-30 ans, lorsque les premières rides d’expression apparaissent. Avant cet âge, l’indication est plutôt curative (rides précoces marquées) ou fonctionnelle (bruxisme, hyperhidrose).",
      },
      {
        q: "Peut-on faire du botox enceinte ou en allaitant ?",
        a: "Non. Les injections de toxine botulique sont contre-indiquées pendant la grossesse et l’allaitement. Nous reportons systématiquement la séance après la fin de l’allaitement.",
      },
      {
        q: "À quelle fréquence faire des injections de botox ?",
        a: "En général, deux à trois séances par an suffisent pour maintenir un résultat constant. Espacer davantage est possible, mais l’effet s’estompe alors entre deux séances. À l’inverse, une injection plus fréquente que tous les 4 mois est rarement nécessaire.",
      },
      {
        q: "Quelle différence entre botox et acide hyaluronique ?",
        a: "Le botox détend les muscles à l’origine des rides d’expression (front, lion, pattes d’oie). L’acide hyaluronique comble les pertes de volume et les plis profonds (sillons, lèvres, pommettes). Souvent associés dans la même séance pour un résultat global.",
      },
    ],
    related: ["acide-hyaluronique", "blepharoplastie", "lipofilling-du-visage"],
  },
  {
    slug: "chirurgie-orthognatique",
    metaDescription:
      "Chirurgie orthognatique à Marrakech (Maroc) par le Dr Hannouni, chirurgien maxillo-facial : correction des bases osseuses, fonctionnelle et esthétique.",
    name: "Chirurgie orthognatique",
    category: "Maxillo-facial",
    teaser:
      "Corriger l’anatomie osseuse pour un visage fonctionnel et harmonieux.",
    image: "https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/Chirurgie%20orthognatique.png",
    hero: {
      eyebrow: "VIII · Maxillo-facial",
      headline: "La chirurgie orthognatique,",
      italicSuffix: "rétablir l’équilibre.",
      portrait: "surgery",
    },
    intro:
      "La chirurgie orthognatique corrige les anomalies de croissance des bases osseuses du visage. C’est une chirurgie morphologique, à la fois fonctionnelle et esthétique.",
    presentation: [
      {
        title: "Fonction d’abord, esthétique ensuite",
        body:
          "Une mauvaise occlusion compromet la mastication, la respiration, la phonation. La chirurgie orthognatique restaure d’abord la fonction. La transformation esthétique en découle naturellement.",
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
      "Apnées du sommeil d’origine anatomique",
      "Profil disharmonieux secondaire",
    ],
    meta: {
      duration: "3h à 5h",
      anesthesia: "Générale",
      hospitalization: "2 à 3 nuits",
      socialResume: "21 à 30 jours",
    },
    protocol: [
      {
        step: "01",
        title: "Analyse anatomique",
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
        duration: "3h à 5h",
      },
      {
        step: "04",
        title: "Suivi & finition orthodontique",
        body:
          "Hospitalisation 2-3 nuits, alimentation molle 6 semaines, suivi orthodontique de finition sur 6 à 12 mois.",
      },
    ],
    results: [
      {
        label: "Chirurgie orthognatique · avant / après",
        before: `${RESULTS_BASE}/Chirurgie%20orthognatique%20AVANT%20.png`,
        after: `${RESULTS_BASE}/Chirurgie%20orthognatique%20APRES.png`,
      },
    ],
    faq: [
      {
        q: "Combien coûte une chirurgie orthognatique au Maroc ?",
        a: "Le tarif d’une chirurgie orthognatique est défini en consultation, après bilan complet et concertation avec l’orthodontiste. Il inclut l’analyse 3D, l’hospitalisation, l’anesthésie générale, l’intervention et l’ensemble du suivi sur 6 à 12 mois.",
      },
      {
        q: "Y a-t-il des cicatrices visibles après une chirurgie orthognatique ?",
        a: "Non. Toutes les voies d’abord sont endo-buccales (à l’intérieur de la bouche). Aucune cicatrice cutanée n’est visible sur le visage ou le cou.",
      },
      {
        q: "Cette chirurgie est-elle prise en charge ?",
        a: "Oui, dans la grande majorité des cas, la chirurgie orthognatique entre dans le cadre d’une prise en charge médicale au titre du défaut fonctionnel (occlusion, mastication, phonation, apnées du sommeil). Le volet purement esthétique reste à part.",
      },
      {
        q: "L’intervention est-elle douloureuse ?",
        a: "Sous anesthésie générale, l’intervention est indolore. En post-opératoire, la sensation dominante est plutôt un engourdissement et une gêne à la mastication, traités par antalgiques classiques. La douleur véritable est exceptionnelle.",
      },
      {
        q: "Quels sont les risques d’une chirurgie orthognatique ?",
        a: "Risques rares mais réels : hypoesthésie de la lèvre inférieure ou du menton (régressant en plusieurs mois), récidive partielle, troubles articulaires temporo-mandibulaires, infection osseuse. Une planification 3D minutieuse minimise considérablement ces risques.",
      },
      {
        q: "Combien de temps faut-il pour la récupération complète ?",
        a: "Hospitalisation 2 à 3 nuits. Reprise sociale entre 21 et 30 jours. Alimentation molle pendant 6 semaines, normale à 2-3 mois. La consolidation osseuse complète demande 4 à 6 mois. Le suivi orthodontique de finition se poursuit jusqu’à 12 mois.",
      },
      {
        q: "Faut-il un suivi orthodontique avant et après ?",
        a: "Oui, c’est indispensable. Un suivi orthodontique de 12 à 18 mois précède la chirurgie pour aligner les arcades dentaires. Un suivi de finition de 6 à 12 mois lui succède pour parfaire l’occlusion. La chirurgie orthognatique est par essence une discipline d’équipe.",
      },
      {
        q: "Quand peut-on reprendre une alimentation normale ?",
        a: "Alimentation liquide les 10 premiers jours. Alimentation molle (purée, semoule, omelette) jusqu’à 6 semaines. Réintroduction progressive d’aliments tendres entre 6 et 10 semaines. Alimentation normale (croquant, viande ferme) à partir de 3 mois.",
      },
      {
        q: "Le résultat d’une chirurgie orthognatique est-il définitif ?",
        a: "Oui. Une fois la consolidation osseuse acquise (3 à 6 mois) et la finition orthodontique terminée, le résultat est définitif. C’est l’une des chirurgies les plus stables dans le temps en chirurgie maxillo-faciale.",
      },
      {
        q: "À partir de quel âge cette chirurgie peut-elle être réalisée ?",
        a: "Après la fin de la croissance maxillo-mandibulaire, généralement vers 17-18 ans. Avant cet âge, le potentiel de croissance résiduel peut compromettre la stabilité du résultat. Il n’y a en revanche pas de limite supérieure en l’absence de contre-indication médicale.",
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
