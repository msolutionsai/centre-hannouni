export const clinic = {
  name: "Centre du Docteur Hannouni",
  shortName: "Dr Hannouni",
  tagline: "La chirurgie esthétique, un art scientifique.",
  doctor: {
    fullName: "Dr Hannouni Youssef",
    title: "Chirurgien esthétique & maxillo-facial",
    experience: "20 ans d’expérience",
  },
  address: {
    line1: "1er Étage, Numéro 11",
    line2: "13 bis Immeuble, Avenue Moulay Rachid",
    city: "Guéliz, Marrakech 40000",
    country: "Maroc",
  },
  phoneDisplay: "05 24 45 77 00",
  phoneE164: "+212524457700",
  whatsapp: "+212524457700",
  email: "contact@centre-hannouni.ma",
  hours: [
    { day: "Lundi à Vendredi", hours: "09h00 à 19h00" },
    { day: "Lun. à Ven. · sur rendez-vous", hours: "20h00 à 23h30" },
    { day: "Samedi", hours: "09h00 à 13h00" },
    { day: "Dimanche", hours: "Sur rendez-vous" },
  ],
  mapsQuery: "Dr+Hannouni+Youssef+Marrakech+Gueliz",
};

export const nav = [
  { label: "Accueil", href: "/#top" },
  { label: "Interventions", href: "/#interventions" },
  { label: "Le Centre", href: "/#centre" },
  { label: "Dr Hannouni", href: "/#praticien" },
  { label: "Contact", href: "/#rendez-vous" },
];

export const credibilityItems = [
  { label: "20 ans d’expérience", detail: "au service de la face" },
  { label: "Faculté de Casablanca", detail: "Lauréat · 1999" },
  { label: "Université Bordeaux 2", detail: "Victor Segalen · DU" },
  { label: "Microchirurgie", detail: "Laboratoire d’anatomie · Bordeaux" },
  { label: "Chirurgie des lambeaux", detail: "Diplôme universitaire" },
  { label: "Guéliz · Marrakech", detail: "Normes internationales" },
];

export const centreFeatures = [
  {
    title: "Une structure aux normes internationales",
    body:
      "Un plateau technique conforme aux standards médicaux locaux et internationaux, pensé pour la précision du geste chirurgical et la sérénité des patients.",
  },
  {
    title: "Technologies modernes",
    body:
      "Lasers, dispositifs d’imagerie et équipements de pointe intégrés à une pratique chirurgicale et esthétique de haut niveau.",
  },
  {
    title: "Un accompagnement humain",
    body:
      "Un personnel paramédical qualifié, discret et bienveillant, pour une prise en charge aussi rigoureuse qu’attentive, de la première consultation au suivi.",
  },
  {
    title: "Confort & discrétion",
    body:
      "Tous les éléments de confort et de bien-être ont été intégrés à la structure : une expérience feutrée, protégée, à la hauteur de nos patients.",
  },
];

export const expertiseAreas = [
  {
    num: "01",
    name: "Médecine esthétique",
    lead: "Rajeunir sans marquer.",
    body:
      "Un éventail de soins non invasifs pour préserver la fraîcheur du visage et corriger les signes du temps avec subtilité.",
    items: [
      "Botox",
      "Acide hyaluronique · comblement & volumétrie",
      "Hyaluronidase",
      "Dermabrasion",
      "Lasers",
      "Fils tenseurs",
      "PRP",
      "Mésothérapie",
    ],
  },
  {
    num: "02",
    name: "Chirurgie plastique réparatrice",
    lead: "Restaurer avec rigueur.",
    body:
      "Une démarche chirurgicale précise pour réparer la peau, les tissus et les cicatrices, avec une attention extrême au détail.",
    items: [
      "Chirurgie cutanée & correction des cicatrices",
      "Chirurgie des tumeurs cutanées",
      "Autogreffes de peau",
      "Expansion cutanée",
    ],
  },
  {
    num: "03",
    name: "Chirurgie esthétique du visage",
    lead: "L’équilibre, sans artifice.",
    body:
      "Une chirurgie esthétique centrée sur l’harmonie du visage et de son expression, jamais sur l’exagération.",
    items: [
      "Rhinoplastie",
      "Génioplastie",
      "Lipofilling du visage",
      "Oreilles décollées",
      "Blépharoplastie",
      "Lifting cervico-facial",
      "Lifting temporal · centro-facial · fronto-temporal",
      "Lifting de la lèvre supérieure",
    ],
  },
  {
    num: "04",
    name: "Chirurgie orthognatique",
    lead: "Réaligner la structure.",
    body:
      "Une chirurgie des bases osseuses du visage pour rétablir une occlusion correcte et l’équilibre anatomique de la face.",
    items: [
      "Analyse anatomique de la face",
      "Chirurgie maxillaire & mandibulaire",
      "Coordination orthodontiste / chirurgien",
      "Suivi post-opératoire intégré",
    ],
  },
  {
    num: "05",
    name: "Rhinoplastie",
    lead: "L’art du nez, silencieusement.",
    body:
      "Une expertise dédiée à la rhinoplastie, esthétique et fonctionnelle, pour un résultat naturel, personnalisé, sans signature visible.",
    items: [
      "Rhinoplastie esthétique",
      "Rhinoplastie fonctionnelle",
      "Rhinoplastie secondaire",
      "Approche ultrasonique",
    ],
  },
];

export const interventionsHighlight = [
  {
    name: "Rhinoplastie",
    sub: "Chirurgie du nez",
    teaser:
      "Une approche millimétrée pour un nez en harmonie avec l’ensemble du visage.",
  },
  {
    name: "Lifting cervico-facial",
    sub: "Chirurgie du visage",
    teaser:
      "Redessiner l’ovale et le cou sans altérer l’identité du visage.",
  },
  {
    name: "Blépharoplastie",
    sub: "Chirurgie des paupières",
    teaser: "Rouvrir le regard, discrètement et durablement.",
  },
  {
    name: "Génioplastie",
    sub: "Chirurgie du menton",
    teaser: "Rééquilibrer le profil par une correction précise du menton.",
  },
  {
    name: "Lipofilling du visage",
    sub: "Volumétrie",
    teaser:
      "Restaurer les volumes avec la propre graisse du patient : naturel absolu.",
  },
  {
    name: "Acide hyaluronique",
    sub: "Médecine esthétique",
    teaser:
      "Corriger, volumiser, hydrater : sans bistouri, sans éviction.",
  },
  {
    name: "Botox",
    sub: "Médecine esthétique",
    teaser:
      "Atténuer les rides d’expression, préserver la mobilité du visage.",
  },
  {
    name: "Chirurgie orthognatique",
    sub: "Maxillo-facial",
    teaser:
      "Corriger l’anatomie osseuse pour un visage fonctionnel et harmonieux.",
  },
];

export const whyUs = [
  {
    num: "01",
    title: "Une expertise rare",
    body:
      "Chirurgie esthétique, plastique, réparatrice et maxillo-faciale : une double lecture, médicale et anatomique, de la face.",
  },
  {
    num: "02",
    title: "Une démarche scientifique",
    body:
      "Diagnostic méthodique, planification rigoureuse, suivi rapproché. La chirurgie est un art ; son exercice, une discipline.",
  },
  {
    num: "03",
    title: "Un résultat naturel",
    body:
      "Nous refusons les signatures visibles. Nos résultats se remarquent à leur discrétion, pas à leur évidence.",
  },
  {
    num: "04",
    title: "Une écoute sincère",
    body:
      "Une consultation approfondie, une recommandation honnête, y compris quand l’intervention n’est pas la bonne réponse.",
  },
  {
    num: "05",
    title: "Un centre discret",
    body:
      "Une structure feutrée en plein cœur de Guéliz : confidentialité totale, confort irréprochable.",
  },
  {
    num: "06",
    title: "Un suivi intégré",
    body:
      "De la première consultation aux contrôles post-opératoires, un accompagnement unique, pensé, calibré, humain.",
  },
];

export const testimonials = [
  {
    body:
      "Un professionnalisme rare. Le Dr Hannouni a pris le temps de tout m’expliquer, de m’écouter, et le résultat de ma rhinoplastie est exactement celui que j’espérais : naturel, en harmonie avec mon visage.",
    author: "S. B.",
    source: "Patiente · Rhinoplastie",
  },
  {
    body:
      "Accueil irréprochable, équipe discrète, cabinet parfaitement tenu. On se sent entre de très bonnes mains dès la première visite. Je recommande sans la moindre hésitation.",
    author: "L. M.",
    source: "Patiente · Blépharoplastie",
  },
  {
    body:
      "J’ai consulté plusieurs praticiens avant de choisir le Dr Hannouni. Sa rigueur scientifique et sa franchise ont fait toute la différence. Résultat parfait, suivi impeccable.",
    author: "K. A.",
    source: "Patient · Lifting cervico-facial",
  },
  {
    body:
      "Le centre respire la sérénité. Tout est pensé pour le confort du patient, de l’accueil au suivi post-opératoire. Un vrai standing, à la hauteur de l’expertise du Dr Hannouni.",
    author: "N. R.",
    source: "Patiente · Lipofilling",
  },
];

export const interventionOptions = [
  "Consultation esthétique",
  "Rhinoplastie",
  "Lifting cervico-facial",
  "Blépharoplastie",
  "Génioplastie",
  "Lipofilling du visage",
  "Oreilles décollées",
  "Chirurgie orthognatique",
  "Botox",
  "Acide hyaluronique",
  "PRP / Mésothérapie",
  "Lasers",
  "Fils tenseurs",
  "Chirurgie réparatrice",
  "Autre / À préciser",
];

export const countryOptions = [
  "Maroc",
  "France",
  "Belgique",
  "Suisse",
  "Canada",
  "Espagne",
  "Royaume-Uni",
  "États-Unis",
  "Émirats Arabes Unis",
  "Autre",
];
