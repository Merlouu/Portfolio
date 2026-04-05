import Image from "next/image";

const impactStats = [
  { value: "500+", label: "références pilotées en prévision mensuelle" },
  { value: "1 300+", label: "références suivies pour la fiabilisation MRP" },
  { value: "-65%", label: "temps de maintenance réduit sur un reporting VBA" },
];

const projects = [
  {
    featured: true,
    title: "Système de trading supervisé et aide à la décision",
    context:
      "Projet construit en deux temps : un socle initial sur Google Sheets, puis un système plus structuré pour stocker, analyser, exécuter et superviser.",
    problem:
      "La première version fonctionnait, mais demandait trop d'entretien et restait difficile à lire entre donnée, signal, ordre et supervision.",
    solution:
      "Construction d'une console unifiée avec base de données, analytique et scoring IA, exécution automatique, contrôle du risque, supervision et maintenance assistée.",
    result:
      "Lecture plus nette du marché, décisions mieux tracées, exécution automatique plus lisible et système plus facile à surveiller et faire évoluer.",
    tools: ["Algo trading", "BDD", "IA", "Backtesting", "Détection d'anomalies", "Supervision"],
    cta: "/projects/finance",
    ctaLabel: "Voir le projet",
    media: {
      src: "/project-media/finance-home-auto-traders.png",
      alt: "Accueil Auto Traders du projet finance",
    },
  },
  {
    title: "Analyses supply chain et pilotage décisionnel chez CBA Meubles",
    context:
      "Travaux menés pendant mon alternance chez CBA Meubles, dans un environnement supply chain avec besoin d'outils de décision plus fiables sur la prévision, les stocks, les clients et les signaux marché.",
    problem:
      "Plusieurs sujets restaient dispersés ou traités manuellement : stocks morts, archivage, suivi automatisé, contrôle des prix clients et arbitrage des demandes de prévision.",
    solution:
      "Développement d'analyses ciblées et d'outils de pilotage sur les stocks morts, l'archivage et le suivi automatisé des stocks, le scraping des prix clients avec alertes promotions, et l'analyse des clients sur leur CA N-1 pour filtrer les demandes de prévision.",
    result:
      "Pilotage rendu plus lisible sur 500+ références en prévision mensuelle et 1 300+ références suivies, avec des arbitrages davantage fondés sur la donnée et le poids réel des clients ou des articles.",
    tools: ["Forecasting", "MRP", "Stocks", "API", "Alertes", "Analyse client"],
    cta: "#contact",
    ctaLabel: "Me contacter",
  },
  {
    title: "Automatisation du reporting de performance commercial supply chain",
    context:
      "Projet mené pendant mon alternance chez CBA Meubles pour automatiser sous VBA le reporting de performance commerciale supply chain.",
    problem:
      "La maintenance quotidienne du reporting demandait environ 1h30, avec un processus lourd et répétitif, initialement porté par seulement 1 à 2 utilisateurs.",
    solution:
      "Conception d'une automatisation VBA pour fiabiliser le reporting, réduire les manipulations manuelles et ouvrir le process à 5 utilisateurs : 1 skill head, 1 mid, 2 nouveaux utilisateurs et moi côté automatisation.",
    result:
      "Passage d'environ 1h30 de maintenance journalière à 30 à 50 minutes, soit un gain de temps de l'ordre de 45 à 65 % selon l'usage, avec un process plus transmissible et moins dépendant d'un nombre réduit de personnes.",
    tools: ["VBA", "Reporting", "Performance commerciale", "Supply chain", "Transmission process"],
    cta: "#contact",
    ctaLabel: "Discuter du projet",
  },
  {
    title: "Suivi des encours Van De Walle x Safran Seats",
    context:
      "Projet de stage centré sur le suivi des encours entre Van De Walle et Safran Seats, avec un besoin clair de visibilité et de fluidité dans les demandes.",
    problem:
      "Le flux dépendait trop d'échanges dispersés, avec une lecture insuffisante de l'état réel des demandes en cours.",
    solution:
      "Conception d'un outil de suivi permettant de créer, modifier, traiter et piloter les demandes dans une logique unique.",
    result:
      "Traçabilité renforcée des encours, meilleure visibilité sur l'avancement et centralisation des actions dans un même outil de suivi.",
    tools: ["Google Sheets", "Apps Script", "Workflow metier", "Dashboard", "HTML/CSS"],
    cta: "/projects/vandewalle-safran",
    ctaLabel: "Voir le projet",
    media: {
      src: "/project-media/vandw-safran-dashboard.png",
      alt: "Dashboard du projet encours Van De Walle x Safran Seats",
    },
  },
  {
    title: "Pilotage terrain, hygiene et stocks",
    context:
      "Projet universitaire conçu pour structurer un environnement de restauration solidaire avec suivi des bénéficiaires, distributions et stocks.",
    problem: "Des données terrain utiles mais difficiles à consolider pour le pilotage quotidien.",
    solution:
      "Structuration des workflows autour des bénéficiaires, des distributions et de la gestion des stocks dans une interface claire.",
    result:
      "Vision plus lisible des opérations, navigation plus simple entre les modules et suivi plus cohérent.",
    tools: ["Next.js", "Prisma", "SQLite", "Workflows metier", "Reporting"],
    cta: "/projects/restaurants",
    ctaLabel: "Voir le projet",
    media: {
      src: "/project-media/restaurants-dashboard.png",
      alt: "Dashboard du projet universitaire restaurants",
    },
  },
];

const capabilities = [
  "Business analysis",
  "Supply chain",
  "Forecasting",
  "KPI et reporting",
  "Structuration de la donnée",
  "Automatisation",
  "SQL",
  "Power BI",
  "Google Apps Script",
  "Conception de processus",
];

const method = [
  "Comprendre le besoin terrain et les points de friction",
  "Structurer la donnée et clarifier les flux utiles",
  "Concevoir une solution simple, exploitable et mesurable",
  "Mesurer l'impact sur le temps, la fiabilité et la décision",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f5ef_0%,#f3f0e6_24%,#fcfbf7_58%,#ffffff_100%)] text-slate-900">
      <div className="w-full px-4 pb-14 pt-3 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 xl:px-10 2xl:px-12">
        <header className="sticky top-0 z-20 mb-6 rounded-[1.6rem] border border-slate-200/70 bg-white/90 px-4 py-4 shadow-[0_18px_44px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.2em] text-white">
                MD
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Portfolio
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2rem]">
                  Merlin Debrais
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600 sm:text-[15px]">
                  Business Analyst | Supply Chain | Forecasting | Digitalisation
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500 sm:text-xs">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1">
                    Valenciennes - Lille - Paris
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1">
                    <span className="inline-flex h-5 min-w-[2rem] items-center justify-center rounded-full bg-slate-950 px-1.5 text-[10px] font-semibold tracking-[0.18em] text-white">
                      INSA
                    </span>
                    Master GPLA | Ingénierie de la chaîne logistique
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
                <a
                  href="#about"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-slate-200 bg-white px-3.5 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  À propos
                </a>
                <a
                  href="#projects"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-slate-200 bg-white px-3.5 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Projets
                </a>
                <a
                  href="#tools"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-slate-200 bg-white px-3.5 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Outils
                </a>
                <a
                  href="https://www.linkedin.com/in/merlin-debrais-141b03226/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                    <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9h4v12H3zm7 0h3.83v1.64h.06c.53-1 1.84-2.06 3.79-2.06C21.2 8.58 22 10.87 22 14.07V21h-4v-6.15c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V21h-4z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="mailto:merlin.debrais@gmail.com"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Me contacter
                </a>
                <a
                  href="/cv-merlin-debrais.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  CV PDF
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 pb-12 pt-5 xl:grid-cols-[1.2fr_0.8fr] xl:items-start xl:gap-8 xl:pb-16">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-800">
              Profil hybride business + data + opérations
            </p>
            <h1 className="max-w-5xl text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-slate-950">
              Je transforme des besoins métiers en solutions concrètes pour la supply chain, la data et la décision.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              J&apos;analyse, structure et améliore les flux opérationnels pour rendre la donnée
              plus fiable, les processus plus lisibles et la décision plus efficace.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Business Analyst &amp; Forecaster Supply Chain en alternance chez CBA Meubles,
              actuellement en Master Gestion de la production, logistique, achats à l&apos;INSA.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Voir mes projets
              </a>
              <a
                href="/cv-merlin-debrais.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Télécharger mon CV
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:max-w-3xl xl:grid-cols-4">
              {impactStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.35rem] border border-slate-200 bg-white/90 px-4 py-4 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.22)]"
                >
                  <p className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200 bg-white/78 p-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.3)] backdrop-blur sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-800">
              Positionnement
            </p>
            <h2 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[1.75rem]">
              Entre terrain, pilotage et digitalisation.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Je conçois des outils utiles, pas des slides décoratives. Mon angle reste constant :
              réduire la friction, fiabiliser l&apos;information et rendre l&apos;exécution plus
              solide.
            </p>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Ce que je fais
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Structurer les flux, fiabiliser la donnée, automatiser les tâches et rendre la
                  décision plus exploitable.
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Comment
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Analyse métier, outils de pilotage, automatisation, reporting, analytique et
                  logique système.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section id="about" className="border-t border-slate-200/80 py-14 sm:py-16 lg:py-20">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
              À propos
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              De l&apos;analyse à l&apos;exécution.
            </h2>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Je développe des projets à la croisée de la supply chain, de la data et de
                l&apos;automatisation. Mon objectif est simple : transformer des opérations
                complexes en solutions concrètes, mesurables et utiles sur le terrain comme au
                niveau décisionnel.
              </p>
              <p className="text-base leading-7 text-slate-500">
                Mon angle n&apos;est pas de montrer une liste d&apos;outils. Je cherche à démontrer ma
                capacité à comprendre un problème, structurer l&apos;information, concevoir un
                système de pilotage et le traduire en exécution.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {method.map((step, index) => (
                <div
                  key={step}
                  className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-[0_16px_50px_-32px_rgba(15,23,42,0.38)]"
                >
                  <p className="text-sm font-semibold text-sky-800">0{index + 1}</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-slate-200/80 py-14 sm:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
              Projets à impact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Projets concrets, résultats lisibles.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Chaque projet est présenté avec le même fil conducteur : problème, solution,
              résultat. L&apos;objectif est de montrer une logique de travail, pas d&apos;empiler des
              captures.
            </p>
          </div>

          <div className="grid gap-5 2xl:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className={`overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_75px_-38px_rgba(15,23,42,0.32)] ${project.featured ? "2xl:col-span-2" : ""}`}
              >
                {project.media ? (
                  <div className="group relative h-44 overflow-hidden border-b border-slate-200 bg-slate-100 sm:h-52 lg:h-56">
                    <Image
                      src={project.media.src}
                      alt={project.media.alt}
                      fill
                      className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 1279px) 100vw, 50vw"
                    />
                  </div>
                ) : null}

                <div className="p-6 sm:p-7">
                  <h3 className="text-[1.38rem] font-semibold tracking-[-0.03em] text-slate-950 sm:text-[1.55rem]">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">{project.context}</p>

                  <div className="mt-5 space-y-3.5 text-sm leading-7 text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-950">Problème :</span>{" "}
                      {project.problem}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-950">Solution :</span>{" "}
                      {project.solution}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-950">Résultat :</span>{" "}
                      {project.result}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {project.tools.length} briques clés
                    </p>
                    <a
                      href={project.cta}
                      className="inline-flex items-center rounded-full border border-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white"
                    >
                      {project.ctaLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="tools"
          className="grid gap-8 border-t border-slate-200/80 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
              Outils
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Une stack au service du résultat.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {capabilities.map((capability) => (
              <span
                key={capability}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_36px_-28px_rgba(15,23,42,0.35)]"
              >
                {capability}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200/80 py-14 sm:py-16 lg:py-20">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.8)] sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                  Contact
                </p>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Je recherche des opportunités où la data, les processus et la décision créent
                  un avantage opérationnel concret.
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Email :</span>{" "}
                  <a className="transition hover:text-white" href="mailto:merlin.debrais@gmail.com">
                    merlin.debrais@gmail.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">CV :</span>{" "}
                  <a
                    className="transition hover:text-white"
                    href="/cv-merlin-debrais.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ouvrir le PDF
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">LinkedIn :</span>{" "}
                  <a
                    className="transition hover:text-white"
                    href="https://www.linkedin.com/in/merlin-debrais-141b03226/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    merlin-debrais-141b03226
                  </a>
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="mailto:merlin.debrais@gmail.com"
                    className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    Envoyer un email
                  </a>
                  <a
                    href="/cv-merlin-debrais.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
                  >
                    Consulter le CV
                  </a>
                  <a
                    href="https://www.linkedin.com/in/merlin-debrais-141b03226/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
                  >
                    Voir LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

