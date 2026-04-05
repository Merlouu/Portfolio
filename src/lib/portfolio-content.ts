export type ProjectContent = {
  slug: string;
  name: string;
  shortLabel: string;
  tagline: string;
  summary: string;
  challenge: string;
  role: string;
  audience: string;
  heroNote: string;
  palette: "finance" | "restaurants" | "industry";
  metrics: { value: string; label: string }[];
  pillars: { title: string; description: string }[];
  architecture: { title: string; description: string }[];
  phases?: { title: string; description: string }[];
  telegramChannels?: { title: string; description: string }[];
  flow?: {
    title: string;
    description: string;
    steps: { label: string; detail: string }[];
  };
  outcomes: string[];
  stack: string[];
  spotlight: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  gallery: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    extraImages?: {
      image: string;
      imageAlt: string;
    }[];
  }[];
};

export const profileContent = {
  name: "Merlin Debrais",
  title: "Business Analyst & Forecaster Supply Chain",
  subtitle: "Supply Chain - Data - Forecasting - Digitalisation - Decision Systems",
  intro:
    "J'analyse les flux, structure la donnée et développe des outils concrets pour améliorer le pilotage, la visibilité et la prise de décision.",
  about: [
    "Actuellement Business Analyst & Forecaster Supply Chain en alternance chez CBA Meubles, et en Master Gestion de la production, logistique, achats à l'INSA, je développe des projets à l'intersection de la supply chain, de la donnée et de la digitalisation.",
    "Mon parcours m'a amené à travailler sur des sujets concrets de prévision, pilotage de la performance, automatisation, reporting et transformation de processus.",
    "Chez CBA Meubles, j'ai aussi travaillé sur l'analyse des stocks morts, l'archivage et le suivi automatisé des stocks, le scraping des prix clients avec alertes, ainsi que l'analyse des clients et de leur CA N-1 pour mieux cadrer les demandes de prévision.",
    "J'aime construire des solutions utiles : comprendre un besoin métier, fiabiliser les données, structurer un système de pilotage, puis concevoir un outil réellement exploitable.",
    "Mon objectif est d'évoluer vers des fonctions à plus forte portée stratégique, mêlant analyse, aide à la décision, transformation digitale et performance opérationnelle.",
  ],
  contact: "Merlin Debrais, Valenciennes - Lille - Paris - merlin.debrais@gmail.com - 06 43 67 30 80 - linkedin.com/in/merlin-debrais-141b03226",
  skills: [
    {
      title: "Analyse & pilotage",
      items: [
        "Business Analysis",
        "Forecasting",
        "KPI & reporting",
        "Aide à la décision",
        "Analyse de flux",
        "Amelioration continue",
        "Analyse portefeuille clients",
      ],
    },
    {
      title: "Supply Chain & operations",
      items: [
        "Gestion operationnelle",
        "Stocks / productions",
        "Approvisionnement",
        "Pilotage mensuel",
        "Fin de vie produits",
        "Coordination operationnelle",
      ],
    },
    {
      title: "Data & digitalisation",
      items: [
        "Excel / VBA",
        "SQL / MySQL",
        "Power BI / Power Query / Pivot",
        "Python",
        "Google Sheets / Apps Script",
        "API / alertes prix",
        "Dashboarding",
        "Structuration de bases de données",
      ],
    },
    {
      title: "Gestion de projet",
      items: [
        "Cadrage du besoin",
        "Recueil metier",
        "Developpement d'outils",
        "Automatisation",
        "Mise en production",
        "Suivi de performance",
      ],
    },
  ],
};

export const projects: ProjectContent[] = [
  {
    slug: "vandewalle-safran",
    name: "Van De Walle x Safran Seats",
    shortLabel: "Encours",
    tagline:
      "Digitalisation du suivi des encours entre Van De Walle et Safran Seats pour rendre les demandes plus visibles, plus tracables et plus fluides.",
    summary:
      "Projet realise en stage chez Van De Walle pour structurer le suivi des encours avec Safran Seats. L'objectif etait de sortir d'un fonctionnement trop dependant des echanges manuels et de donner aux equipes un outil simple pour creer, modifier, traiter et suivre les demandes en cours.",
    challenge:
      "Rendre un flux inter-entreprises plus lisible et plus reactif, avec une meilleure visibilite sur l'etat des demandes, les actions en attente et le traitement des encours.",
    role:
      "Cadrage du besoin, structuration fonctionnelle et conception d'un outil de suivi concret pour les equipes operationnelles.",
    audience:
      "Equipes Van De Walle et interlocuteurs Safran Seats impliques dans le suivi et le traitement des encours.",
    heroNote:
      "Un projet de stage centré sur les encours, la traçabilité des demandes et la fluidité du suivi inter-entreprises.",
    palette: "industry",
    metrics: [
      { value: "1 outil", label: "Creation, modification et traitement regroupes dans un meme flux." },
      { value: "Trace", label: "Historique et etats plus faciles a suivre." },
      { value: "Flux", label: "Lecture plus lisible des demandes en cours." },
    ],
    pillars: [
      {
        title: "Centraliser",
        description:
          "Regrouper les demandes, leur statut et les actions associees dans une interface unique.",
      },
      {
        title: "Tracer",
        description:
          "Suivre clairement les encours, les modifications et l'avancement des traitements.",
      },
      {
        title: "Fluidifier",
        description:
          "Reduire la dependance aux echanges disperses et rendre le flux plus simple a piloter.",
      },
    ],
    architecture: [
      {
        title: "Tableau de bord",
        description:
          "Le dashboard offre une vue immediate sur les demandes, leur avancement et les points de blocage du flux.",
      },
      {
        title: "Workflow de demande",
        description:
          "Le parcours utilisateur couvre la creation, la modification et le traitement des demandes dans une meme logique applicative.",
      },
      {
        title: "Circulation de l'information",
        description:
          "Chaque demande suit un cycle clair : creation, mise a jour, traitement puis suivi dans le dashboard pour garder une vision partagee des encours.",
      },
    ],
    outcomes: [
      "Une meilleure visibilite sur les encours entre Van De Walle et Safran Seats.",
      "Un suivi plus simple des demandes et de leur avancement.",
      "Une base plus claire pour reduire les frictions administratives et accelerer le traitement.",
    ],
    stack: ["Google Sheets", "Apps Script", "HTML/CSS", "Workflow metier", "Dashboard"],
    spotlight: {
      title: "Un dashboard pour suivre les encours et piloter les demandes",
      description:
        "Le projet met en scene un flux concret : voir les demandes, comprendre leur statut et agir dessus sans sortir de l'outil.",
      image: "/project-media/vandw-safran-dashboard.png",
      imageAlt: "Dashboard du projet Van De Walle x Safran Seats",
    },
    gallery: [
      {
        title: "Dashboard des encours",
        description:
          "Une vue centrale pour lire rapidement les demandes en cours et leur avancement.",
        image: "/project-media/vandw-safran-dashboard.png",
        imageAlt: "Dashboard du projet encours Van De Walle x Safran Seats",
      },
      {
        title: "Vue de demonstration",
        description:
          "Une vue d'ensemble du fonctionnement de l'outil et de la logique de navigation.",
        image: "/project-media/vandw-safran-demo.png",
        imageAlt: "Vue de demonstration du projet encours",
      },
      {
        title: "Creation d'une demande",
        description:
          "Le formulaire de creation structure la saisie pour lancer le traitement des encours.",
        image: "/project-media/vandw-safran-create-request.png",
        imageAlt: "Creation d'une demande sur le projet encours",
      },
      {
        title: "Modification d'une demande",
        description:
          "Les mises a jour sont integrees au meme flux pour garder une trace claire des evolutions.",
        image: "/project-media/vandw-safran-edit-request.png",
        imageAlt: "Modification d'une demande sur le projet encours",
      },
      {
        title: "Traitement d'une demande",
        description:
          "L'outil accompagne la resolution des demandes et le suivi de leur traitement jusqu'a cloture.",
        image: "/project-media/vandw-safran-process-request.png",
        imageAlt: "Traitement d'une demande sur le projet encours",
      },
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    shortLabel: "Finance",
    tagline:
      "D'un socle initial Google Sheets vers un système de trading structuré, analytique, assisté par l'IA, supervisé et capable d'exécuter automatiquement.",
    summary:
      "Le socle initial reposait sur Google Sheets, des APIs et des automatisations pour collecter la data de marché, suivre le trading et produire des analyses. Il était utile, mais lourd à maintenir et trop spreadsheet dans sa lecture. Le projet actuel reprend cette base dans un système plus clair : BDD, analytique assistée par l'IA, exécution automatique, supervision temps réel, contrôle du risque et maintenance avec détection d'anomalies, erreurs et recommandations de correction. Un module Operator relié à Telegram permet aussi d'intervenir à distance.",
    challenge:
      "Faire évoluer un socle initial utile mais lourd à maintenir vers un système clair, capable de stocker, analyser, exécuter et superviser.",
    role:
      "Analyse produit, structuration fonctionnelle et traduction d'une logique spreadsheet vers un système de trading supervisé orienté exécution.",
    audience:
      "Profils trading, pilotage quantitatif ou supervision produit ayant besoin de comprendre rapidement ce que voit le moteur et comment une recommandation est produite.",
    heroNote:
      "Un socle initial spreadsheet pour trader et analyser, puis un système plus robuste pour stocker, lire, décider, exécuter, superviser et assister la maintenance.",
    palette: "finance",
    metrics: [
      { value: "2 versions", label: "Socle initial spreadsheet puis systeme structure pour gagner en lisibilite." },
      { value: "Data", label: "Runs, positions, ordres, fills et historique centralises." },
      { value: "Auto", label: "Execution automatique sous parametres, limites et controles." },
    ],
    phases: [
      {
        title: "Projet finance actuel",
        description:
          "Le projet actuel transforme le socle initial en systeme de trading supervise, avec BDD, analytique, execution automatique, journalisation et supervision du risque.",
      },
      {
        title: "Avant : socle initial Google Sheets",
        description:
          "Le socle initial permettait deja de collecter, calculer et suivre, mais restait lourd a maintenir, plus abstrait et moins lisible sur la chaine complete.",
      },
    ],
    pillars: [
      {
        title: "Stocker",
        description:
          "Centraliser les donnees de marche, runs, positions, ordres, fills, anomalies et sorties de calcul.",
      },
      {
        title: "Analyser",
        description:
          "Transformer la data en indicateurs, probabilites, regime, modeles, scoring et vues d'aide a la decision, tout en enrichissant le scan du systeme.",
      },
      {
        title: "Executer",
        description:
          "Passer automatiquement les ordres quand les conditions, filtres, limites et controles du moteur sont reunis.",
      },
      {
        title: "Surveiller",
        description:
          "Detecter les anomalies, remonter les erreurs, qualifier les incidents et proposer des pistes de correction pour les algos et le programme.",
      },
      {
        title: "Telecommander",
        description:
          "Piloter certaines actions a distance via Telegram, avec un Operator relie a un agent IA pour demander des modifications, des corrections ou des interventions.",
      },
    ],
    architecture: [
      {
        title: "Stockage et historisation",
        description:
          "Collecte et historisation des donnees de marche, runs, decisions, ordres, fills, positions et snapshots pour rejouer et expliquer les decisions.",
      },
      {
        title: "Couche analytique",
        description:
          "Probabilites, scoring, regime, modeles et briques d'IA transforment la data stockee en lecture exploitable et en aide a la decision.",
      },
      {
        title: "Algo d'execution",
        description:
          "L'algorithme passe les ordres automatiquement selon des parametres definis : filtres, seuils, exposition, sizing, stops, cooldowns et limites de securite.",
      },
      {
        title: "Supervision",
        description:
          "Le terminal regroupe auto trader, logs, base, maintenance, analytics et historique pour suivre l'execution, surveiller le moteur et intervenir si besoin.",
      },
      {
        title: "Maintenance assistee",
        description:
          "Les briques d'IA et d'analyse servent aussi a scanner le systeme, detecter les anomalies, qualifier les erreurs et orienter les corrections sur les algos et le runtime.",
      },
      {
        title: "Operator et telecommande",
        description:
          "Un module Operator relie au bot Telegram permet de lancer des demandes de correction, de maintenance ou d'action a distance, avec transmission vers un agent IA.",
      },
    ],
    telegramChannels: [
      {
        title: "Telegram signaux",
        description:
          "Canal dédié à la diffusion des signaux exploitables issus du moteur : contexte de marché, direction, score, zones et niveau de confiance.",
      },
      {
        title: "Telegram execution",
        description:
          "Canal dedie au suivi de l'automate une fois le signal valide : entree, sortie, blocage, cooldown, invalidation ou protection.",
      },
      {
        title: "Telegram supervision",
        description:
          "Canal de supervision pour remonter les evenements utiles : erreurs, watchdog, blocages, desynchronisation, conditions anormales ou resume de performance.",
      },
      {
        title: "Telegram maintenance",
        description:
          "Canal de maintenance pour remonter les anomalies detectees, les erreurs systeme et les recommandations de correction utiles au pilotage du programme.",
      },
      {
        title: "Telegram telecommande",
        description:
          "Bot Telegram de telecommande pour consulter l'etat du systeme, piloter certains usages a distance et transmettre des demandes d'action ou de correction.",
      },
    ],
    flow: {
      title: "Boucle de decision du terminal",
      description:
        "La lecture du systeme devient simple quand on suit la chaine complete de la collecte de donnees jusqu'a l'ordre execute puis supervise.",
      steps: [
        {
          label: "Market Data",
          detail: "Flux entrants, prix, volume, volatilite et contexte multi-actifs.",
        },
        {
          label: "Engine",
          detail: "Calcul des scores, du regime, des probabilites, des zones, des modeles IA et des filtres de contexte.",
        },
        {
          label: "Signals",
          detail: "Generation des recommandations, des seuils de travail et des conditions d'entree ou de sortie.",
        },
        {
          label: "Execution",
          detail: "Auto trader, passage d'ordres, blocage, cooldown, validation ou protection selon les regles et parametres actifs.",
        },
        {
          label: "Analytics",
          detail: "Retour dans les vues en direct, l'historique des trades, les backtests, les snapshots et les raisons de sortie.",
        },
        {
          label: "Maintenance",
          detail: "Detection des anomalies, qualification des erreurs, scan du programme et recommandations de correction pour les algos et le runtime.",
        },
        {
          label: "Operator",
          detail: "Relais de pilotage connecte a Telegram pour envoyer des demandes de modification, de correction ou d'intervention a distance vers un agent IA.",
        },
        {
          label: "Telegram",
          detail: "Diffusion des alertes, confirmations et informations de supervision vers des canaux dedies.",
        },
      ],
    },
    outcomes: [
      "Une architecture capable de centraliser la data, les decisions et l'historique d'execution dans une meme console.",
      "Une lecture du marche enrichie par des modeles et du scoring assistes par l'IA.",
      "Une execution automatique plus lisible, plus controlable et mieux encadree par le risque.",
      "Une supervision plus utile grace a la detection d'anomalies, aux alertes d'erreur et aux recommandations de correction.",
      "Une couche Operator et Telegram qui permet de piloter, demander des corrections et suivre le systeme a distance.",
      "Un systeme plus credible et plus explicite que le socle initial pour lire, agir et superviser.",
    ],
    stack: [
      "Algo trading",
      "BDD SQLite",
      "Terminal web",
      "IA / modeles",
      "Detection d'anomalies",
      "Moteur de scoring",
      "APIs d'orchestration",
      "Operator / Telegram",
      "Supervision runtime",
      "Backtesting",
      "Visualisation analytique",
    ],
    spotlight: {
      title: "D'une logique spreadsheet a un systeme qui expose la data, la decision, l'execution et la supervision",
      description:
        "Le terminal reprend la logique du socle initial dans une forme plus claire, avec une base de donnees, une couche analytique enrichie par des modeles d'IA, un auto trader et des vues de supervision qui rendent la logique du moteur lisible, pilotable et maintenable.",
      image: "/project-media/finance-analytics-autotrader.png",
      imageAlt: "Vue analytique du projet finance",
    },
    gallery: [
      {
        title: "Socle initial | Dashboard Google Sheets",
        description:
          "Premier socle du projet : un dashboard Google Sheets pour consolider les données, les indicateurs et le suivi global.",
        image: "/project-media/finance-google-sheets-dashboard.png",
        imageAlt: "Dashboard Google Sheets du socle initial finance",
      },
      {
        title: "Socle initial | Suivi hebdomadaire automatise",
        description:
          "Le socle initial utilisait deja des feuilles structurees et automatisees pour organiser le suivi, les rythmes d'analyse et les calculs utiles.",
        image: "/project-media/finance-google-sheets-weekly.png",
        imageAlt: "Suivi hebdomadaire Google Sheets du projet finance",
      },
      {
        title: "Socle initial | Suivi SPOT et lecture des positions",
        description:
          "Les feuilles de suivi SPOT rendaient les positions et les informations de marche consultables, mais la lecture restait encore tres spreadsheet.",
        image: "/project-media/finance-google-sheets-spot.png",
        imageAlt: "Feuille Google Sheets de suivi SPOT",
      },
      {
        title: "Socle initial | Suivi CFD et organisation des flux",
        description:
          "La logique de suivi CFD montrait deja la richesse de l'information, avec le besoin d'une interface plus concrete pour mieux l'exploiter.",
        image: "/project-media/finance-google-sheets-cfd.png",
        imageAlt: "Feuille Google Sheets de suivi CFD",
      },
      {
        title: "Socle initial | Calculatrices et sous-jacents automatisees",
        description:
          "Certaines feuilles servaient de brique de calcul et d'automatisation pour structurer les sous-jacents et les derivees utiles a la decision.",
        image: "/project-media/finance-google-sheets-calculators.png",
        imageAlt: "Calculatrices automatisees Google Sheets",
      },
      {
        title: "Projet finance | Accueil Auto Traders",
        description:
          "Vue d'accueil du système actuel, avec lecture immédiate de l'état du moteur, des positions, du PnL, des logs et de la supervision.",
        image: "/project-media/finance-home-auto-traders.png",
        imageAlt: "Accueil Auto Traders du projet finance",
      },
      {
        title: "Projet finance | BDD",
        description:
          "Vue de la base de données qui structure l'historisation des runs, décisions, ordres, fills, positions, anomalies et snapshots analytiques.",
        image: "/project-media/finance-bdd.png",
        imageAlt: "Base de données du projet finance",
      },
      {
        title: "Projet finance | Analytics et supervision en direct",
        description:
          "La vue analytics centralise le regime, le score, la performance, les temps de detention, les causes de sortie, les bloqueurs du moteur et les lectures issues des modeles.",
        image: "/project-media/finance-analytics-autotrader.png",
        imageAlt: "Dashboard analytique finance",
      },
      {
        title: "Projet finance | Maintenance et surveillance",
        description:
          "Les modules de maintenance et de supervision servent a detecter les anomalies, remonter les erreurs runtime et orienter les actions correctives sur les algos et le programme.",
        image: "/project-media/finance-maint.png",
        imageAlt: "Maintenance et surveillance du projet finance",
      },
      {
        title: "Projet finance | Operator et bot Telegram de telecommande",
        description:
          "Le module Operator est relie au bot Telegram de telecommande pour transmettre des demandes de modification, de correction ou d'intervention a distance vers un agent IA, puis suivre et piloter le systeme depuis n'importe ou.",
        image: "/project-media/finance-operator.png",
        imageAlt: "Module Operator connecte a Telegram",
        extraImages: [
          {
            image: "/project-media/finance-telegram-telecommande.png",
            imageAlt: "Bot Telegram de telecommande du projet finance",
          },
        ],
      },
      {
        title: "Projet finance | Backtest et validation de strategie",
        description:
          "La presence du backtest confirme une architecture dans laquelle le signal peut etre rejoue sur historique. La strategie est mesuree et comparee.",
        image: "/project-media/finance-backtest.png",
        imageAlt: "Ecran de backtest du projet finance",
      },
      {
        title: "Projet finance | Projection probabiliste BTC",
        description:
          "La vue BTC Proba donne une lecture directionnelle, un niveau de confiance et une prediction a court terme produite par les modeles du systeme.",
        image: "/project-media/finance-btc-proba.png",
        imageAlt: "Vue de probabilites BTC",
      },
      {
        title: "Projet finance | Cartographie des zones",
        description:
          "Les zones d'achat et de vente ajoutent une structure operationnelle au signal.",
        image: "/project-media/finance-btc-prob2a3.png",
        imageAlt: "Comparaison de scenarios BTC",
      },
      {
        title: "Projet finance | Modele de correlation ADA / BTC",
        description:
          "Le modele ADA croise correlation, beta, volatilite et divergence RSI.",
        image: "/project-media/finance-ada.png",
        imageAlt: "Visualisation 3D ADA",
      },
      {
        title: "Projet finance | Vue avancee pour arbitrage",
        description:
          "Les vues avancees completent la decision avec une lecture plus dense des ordres, des zones et des modeles.",
        image: "/project-media/finance-adavol.png",
        imageAlt: "Deuxieme visualisation 3D ADA",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    shortLabel: "Restaurants",
    tagline: "Un projet universitaire centré sur les bénéficiaires, les distributions et la gestion des stocks.",
    summary:
      "Projet universitaire construit autour d'un cas d'usage de restauration solidaire, avec un objectif simple : structurer une application lisible pour le suivi des beneficiaires, des distributions et des stocks.",
    challenge:
      "Concevoir une interface coherente pour plusieurs modules lies entre eux, sans perdre la lisibilite des flux ni la coherence de navigation.",
    role: "Structuration fonctionnelle, cadrage des ecrans et traduction d'un besoin universitaire en application exploitable.",
    audience: "Jury, enseignants et utilisateurs ayant besoin de comprendre rapidement la logique de suivi metier.",
    heroNote:
      "Une demonstration universitaire orientee beneficiaires, distributions, stocks et pilotage operationnel.",
    palette: "restaurants",
    metrics: [
      { value: "3 blocs", label: "Beneficiaires, distributions et stocks relies dans un meme projet." },
      { value: "Distrib.", label: "Vision plus claire des distributions et de leur creation." },
      { value: "Stocks", label: "Gestion plus lisible des produits et des mouvements." },
    ],
    pillars: [
      {
        title: "Organiser",
        description: "Rendre la navigation et les modules plus lisibles pour comprendre rapidement le systeme.",
      },
      {
        title: "Tracer",
        description: "Conserver un historique utile sur les beneficiaires, distributions et mouvements de stock.",
      },
      {
        title: "Coordonner",
        description: "Faciliter le suivi metier dans une demonstration coherente et exploitable.",
      },
    ],
    architecture: [
      {
        title: "Noyau metier",
        description:
          "Le projet structure les operations autour des objets utiles au cas d'usage : beneficiaires, distributions, produits, stocks et reporting.",
      },
      {
        title: "API et workflows",
        description:
          "Les routes applicatives centralisent la saisie, la recherche et les calculs sans disperser la logique metier dans chaque page.",
      },
      {
        title: "Circulation de l'information",
        description:
          "Les donnees entrent par les modules metier, sont consolidees dans la base, puis redistribuees vers les ecrans de consultation, de distribution et de stock.",
      },
    ],
    outcomes: [
      "Vision plus claire des parcours beneficiaires et des distributions.",
      "Structuration plus propre des donnees metier dans un cadre universitaire.",
      "Base solide pour demontrer la logique applicative, la navigation et la gestion des flux.",
    ],
    stack: ["Next.js", "Prisma", "SQLite", "Workflows metier"],
    spotlight: {
      title: "Un dashboard universitaire pour relier beneficiaires, distributions et stock",
      description:
        "Les nouveaux ecrans montrent une application plus credible visuellement, avec un tableau de bord central et des modules metier lisibles.",
      image: "/project-media/restaurants-dashboard.png",
      imageAlt: "Dashboard du projet restaurants",
    },
    gallery: [
      {
        title: "Page d'accueil du projet",
        description:
          "L'ecran d'accueil pose la hierarchie entre les types de compte : Admin, Manager, Volunteer et Beneficiary, avec une lecture claire des acces selon le role.",
        image: "/project-media/restaurants-home.png",
        imageAlt: "Page d'accueil du projet restaurants",
      },
      {
        title: "Dashboard et prevision",
        description:
          "Un dashboard de pilotage pour lire les informations clefs, suivre l'activite et soutenir une logique de prevision plus exploitable.",
        image: "/project-media/restaurants-dashboard.png",
        imageAlt: "Dashboard et prevision du projet restaurants",
      },
      {
        title: "Gestion des beneficiaires",
        description:
          "Le module beneficiaires rend la consultation et l'organisation des profils plus lisibles.",
        image: "/project-media/restaurants-beneficiaries-1.png",
        imageAlt: "Premier ecran beneficiaires du projet restaurants",
      },
      {
        title: "Suivi beneficiaires et recherche",
        description:
          "Une vue complementaire du module met en avant le suivi, la recherche et la consultation plus detaillee.",
        image: "/project-media/restaurants-beneficiaries-2.png",
        imageAlt: "Second ecran beneficiaires du projet restaurants",
      },
      {
        title: "Tableau des distributions",
        description:
          "Le module distributions structure les operations et rend le suivi des campagnes plus simple a lire.",
        image: "/project-media/restaurants-distribution.png",
        imageAlt: "Tableau des distributions du projet restaurants",
      },
      {
        title: "Creation d'une distribution",
        description:
          "L'ecran de creation montre la logique de saisie et de structuration du flux de distribution.",
        image: "/project-media/restaurants-distribution-create.png",
        imageAlt: "Creation d'une distribution dans le projet restaurants",
      },
      {
        title: "Gestion des stocks",
        description:
          "Le module stock rend visibles les produits, les mouvements et l'etat du suivi pour le pilotage quotidien.",
        image: "/project-media/restaurants-stocks.png",
        imageAlt: "Gestion des stocks du projet restaurants",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

