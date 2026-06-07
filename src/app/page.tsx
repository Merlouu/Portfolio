import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  category: "Professionnel" | "Personnel" | "Universitaire";
  status: string;
  summary: string;
  role: string;
  impact: string;
  tools: string[];
  href: string;
  image?: { src: string; alt: string };
  confidential?: boolean;
  featured?: boolean;
};

const impactStats = [
  { value: "500+", label: "références pilotées en prévision" },
  { value: "1 300+", label: "références suivies pour le MRP" },
  { value: "-65%", label: "de maintenance sur un reporting" },
];

const projects: Project[] = [
  {
    title: "CarrerJob AI",
    category: "Personnel",
    status: "MVP full-stack",
    summary:
      "Un copilote carrière qui analyse le profil, recueille les préférences, score les offres et prépare des candidatures personnalisées.",
    role: "Conception produit, architecture full-stack et workflow IA.",
    impact: "Un parcours unifié du CV à la candidature, avec validation humaine.",
    tools: ["React", "FastAPI", "Supabase", "Anthropic API"],
    href: "/projects/carrerjob",
    image: {
      src: "/project-media/carrerjob-offres.png",
      alt: "Offres recommandées dans CarrerJob AI",
    },
    featured: true,
  },
  {
    title: "Disponibilité produit fini & taux de service",
    category: "Professionnel",
    status: "Outil opérationnel",
    summary:
      "Un pilotage hebdomadaire des commandes, stocks et capacités de réponse sur la semaine en cours, S+1 et S+2.",
    role: "Cadrage métier, Power Query, calculs, filtres et reporting.",
    impact:
      "Actualisation en moins de 15 minutes avec vues articles, classes produits, global et Top 5 clients.",
    tools: ["Power Query", "Forecasting", "Stocks", "Taux de service"],
    href: "/projects/disponibilite-produit-fini",
    image: {
      src: "/project-media/cba-disponibilite-dashboard.svg",
      alt: "Dashboard anonymisé de disponibilité produit fini",
    },
    confidential: true,
    featured: true,
  },
  {
    title: "Système de trading supervisé",
    category: "Personnel",
    status: "En développement",
    summary:
      "Une console pour centraliser la donnée de marché, l'analyse, l'exécution automatique, le risque et la supervision.",
    role: "Architecture fonctionnelle, automatisation et aide à la décision.",
    impact: "Une chaîne plus lisible entre donnée, signal, ordre et suivi.",
    tools: ["BDD", "IA", "Backtesting", "Supervision"],
    href: "/projects/finance",
    image: {
      src: "/project-media/finance-home-auto-traders.png",
      alt: "Console du projet finance",
    },
    featured: true,
  },
  {
    title: "Analyses supply chain & pilotage décisionnel",
    category: "Professionnel",
    status: "Alternance",
    summary:
      "Prévision, stocks morts, suivi automatisé, alertes prix et analyse du portefeuille clients.",
    role: "Business analysis, forecasting et conception d'outils de pilotage.",
    impact: "500+ références pilotées et 1 300+ références suivies.",
    tools: ["Forecasting", "MRP", "Stocks", "Analyse client"],
    href: "#contact",
  },
  {
    title: "Automatisation du reporting supply chain",
    category: "Professionnel",
    status: "Alternance",
    summary:
      "Automatisation VBA d'un reporting de performance commerciale auparavant lourd à maintenir.",
    role: "Développement, fiabilisation et transmission du processus.",
    impact: "Maintenance ramenée de 1h30 à 30-50 minutes et usage étendu à 5 personnes.",
    tools: ["VBA", "Reporting", "Automatisation"],
    href: "#contact",
  },
  {
    title: "Suivi des encours Van De Walle × Safran Seats",
    category: "Professionnel",
    status: "Stage",
    summary:
      "Un outil unique pour créer, modifier, traiter et suivre les demandes en cours.",
    role: "Cadrage, conception fonctionnelle et développement.",
    impact: "Davantage de visibilité, de traçabilité et de fluidité dans le traitement.",
    tools: ["Apps Script", "Google Sheets", "Workflow"],
    href: "/projects/vandewalle-safran",
  },
  {
    title: "Pilotage terrain, hygiène & stocks",
    category: "Universitaire",
    status: "Projet universitaire",
    summary:
      "Une application de gestion des bénéficiaires, distributions, contrôles et stocks.",
    role: "Structuration des données, workflows et tableaux de bord.",
    impact: "Une vision cohérente des opérations et des responsabilités.",
    tools: ["Next.js", "Prisma", "SQLite"],
    href: "/projects/restaurants",
  },
];

const projectGroups = [
  {
    name: "Professionnels",
    description: "Des outils utilisés pour fiabiliser les opérations et la décision.",
    projects: projects.filter((project) => project.category === "Professionnel"),
  },
  {
    name: "Personnels",
    description: "Des produits construits pour explorer l'IA, la data et l'automatisation.",
    projects: projects.filter((project) => project.category === "Personnel"),
  },
  {
    name: "Universitaire",
    description: "Un projet collectif pour structurer des opérations terrain.",
    projects: projects.filter((project) => project.category === "Universitaire"),
  },
];

const capabilities = [
  "Business analysis",
  "Supply chain",
  "Forecasting",
  "KPI & reporting",
  "Power Query / Power BI",
  "SQL",
  "Automatisation",
  "Conception produit",
];

const journey = [
  {
    date: "2022 — 2025",
    logo: "IUT",
    logoClass: "bg-blue-700 text-white",
    type: "Formation",
    title: "BUT Management de la logistique et des transports",
    organization: "IUT d'Orléans",
    text: "Parcours Supply Chain connectée · diplôme Bac+3.",
  },
  {
    date: "2023 — 2025",
    logo: "EXP",
    logoClass: "bg-slate-800 text-white",
    type: "Expériences",
    title: "Immersion, gestion d'entrepôt et digitalisation",
    organization: "Hutchinson · MNH · Transports Van De Walle",
    text: "Découverte des opérations, expression des besoins ERP, optimisation des flux et outil collaboratif avec Safran Seats.",
  },
  {
    date: "2025 — aujourd'hui",
    logo: "CBA",
    logoClass: "bg-[#173f72] text-white",
    type: "Alternance",
    title: "Business Analyst & Forecaster Supply Chain",
    organization: "CBA Meubles",
    text: "Forecasting, MRP, analyses portefeuille, automatisation et pilotage de la performance.",
  },
  {
    date: "2025 — 2027",
    logo: "INSA",
    logoClass: "bg-red-700 text-white",
    type: "Formation",
    title: "Master GPLA · Ingénierie de la chaîne logistique",
    organization: "INSA Hauts-de-France",
    text: "Bac+4 en cours · entrée en année Bac+5 en septembre 2026.",
  },
];

const futureRoadmap = [
  {
    date: "Septembre 2026",
    status: "En attente",
    title: "Apprenti Ingénieur Data · Industrie 4.0",
    text: "Objectif : approfondir la data industrielle, l'automatisation et les systèmes de décision appliqués aux opérations.",
  },
  {
    date: "Septembre 2027",
    status: "Ouvert aux projets",
    title: "France · Union européenne · Monde",
    text: "Business analysis, supply chain data, transformation digitale, data products et performance opérationnelle.",
  },
];

function ProjectLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f5ef_0%,#f3f0e6_24%,#fcfbf7_58%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-14 pt-3 sm:px-6 lg:px-8 xl:px-10">
        <header className="mb-6 rounded-[1.35rem] border border-slate-200/70 bg-white/90 px-4 py-3 shadow-[0_18px_44px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:sticky sm:top-0 sm:z-20 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xs font-semibold tracking-[0.18em] text-white">
                MD
              </div>
              <div>
                <p className="font-semibold tracking-[-0.02em] text-slate-950">Merlin Debrais</p>
                <p className="text-xs text-slate-500">Étudiant INSA · Business Analyst · Supply Chain Data</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-xs" aria-label="Navigation principale">
              <a href="#projects" className="rounded-full px-3 py-2 font-medium text-slate-600 hover:bg-slate-100">Projets</a>
              <a href="#roadmap" className="rounded-full px-3 py-2 font-medium text-slate-600 hover:bg-slate-100">Roadmap</a>
              <a href="#contact" className="rounded-full px-3 py-2 font-medium text-slate-600 hover:bg-slate-100">Contact</a>
              <a
                href="/cv-merlin-debrais.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-950 px-4 py-2.5 font-semibold text-white hover:bg-slate-800"
              >
                CV PDF
              </a>
            </nav>
          </div>
        </header>

        <section className="grid gap-8 pb-14 pt-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-center xl:pb-20">
          <div>
            <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800">
              Business + data + opérations
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(2.5rem,5.4vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950">
              Je transforme la donnée en décisions et outils opérationnels.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Étudiant en Ingénierie de la chaîne logistique à l&apos;INSA Hauts-de-France,
              actuellement en Bac+4 et Business Analyst &amp; Forecaster Supply Chain en alternance.
            </p>
            <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-800">
                  Aujourd&apos;hui
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  Master GPLA · Bac+4
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  INSA Hauts-de-France · Ingénierie de la chaîne logistique
                </p>
              </div>
              <div className="rounded-2xl border border-red-100 bg-red-50/70 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-red-700">
                  Septembre 2026
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  Entrée en Bac+5
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Deuxième année du Master · diplomation prévue en 2027
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Voir mes projets
              </a>
              <a href="mailto:merlin.debrais@gmail.com" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400">
                Me contacter
              </a>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {impactStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Link href="/projects/carrerjob" className="group overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 p-3 text-white shadow-[0_30px_80px_-38px_rgba(15,23,42,0.7)]">
            <div className="flex items-center justify-between gap-4 px-2 pb-3 pt-1">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300">Projet à découvrir</p>
                <h2 className="mt-1 text-lg font-semibold">CarrerJob AI</h2>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-slate-300">MVP full-stack</span>
            </div>
            <div className="relative aspect-[8/5] overflow-hidden rounded-[1.2rem]">
              <Image
                src="/project-media/carrerjob-offres.png"
                alt="Offres recommandées dans CarrerJob AI"
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
                sizes="(max-width: 1279px) 100vw, 42vw"
              />
            </div>
            <p className="px-2 pb-2 pt-4 text-sm leading-6 text-slate-300">
              Comprendre le profil, prioriser les offres et préparer une candidature personnalisée.
            </p>
          </Link>
        </section>

        <section id="projects" className="border-t border-slate-200/80 py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800">Sélection</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
              Trois cas qui résument ma manière de travailler.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Comprendre le besoin, structurer les données, construire puis mesurer l&apos;impact.
            </p>
          </div>

          <div className="mt-9 grid gap-5 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.title} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_22px_60px_-42px_rgba(15,23,42,0.35)]">
                {project.image ? (
                  <div className="relative h-48 overflow-hidden border-b border-slate-200 bg-slate-100">
                    <Image src={project.image.src} alt={project.image.alt} fill className="object-cover object-top" sizes="(max-width: 1279px) 100vw, 33vw" />
                    {project.confidential ? (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-900">
                        Données anonymisées
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em]">
                    <span className="text-sky-800">{project.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{project.status}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
                  <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm leading-6">
                    <div>
                      <dt className="font-semibold text-slate-950">Mon rôle</dt>
                      <dd className="text-slate-600">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-950">Impact</dt>
                      <dd className="text-slate-600">{project.impact}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tools.slice(0, 3).map((tool) => (
                      <span key={tool} className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-700">{tool}</span>
                    ))}
                  </div>
                  <ProjectLink href={project.href} className="mt-6 inline-flex rounded-full border border-slate-900 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-slate-950 hover:text-white">
                    Voir le projet
                  </ProjectLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200/80 py-12 sm:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800">Tous les projets</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
              Une lecture claire par contexte.
            </h2>
          </div>
          <div className="space-y-10">
            {projectGroups.map((group) => (
              <div key={group.name} className="grid gap-5 lg:grid-cols-[0.28fr_0.72fr]">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{group.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">{group.description}</p>
                </div>
                <div className="grid gap-3">
                  {group.projects.map((project) => (
                    <ProjectLink key={project.title} href={project.href} className="group grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-[0_18px_50px_-38px_rgba(15,23,42,0.35)] sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-slate-950">{project.title}</h4>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">{project.status}</span>
                          {project.confidential ? (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-800">Anonymisé</span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{project.impact}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 transition group-hover:text-slate-950">Ouvrir →</span>
                    </ProjectLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="roadmap" className="border-t border-slate-200/80 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800">
                Parcours &amp; roadmap
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
                D&apos;où je viens, où je vais.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Une trajectoire entre logistique, supply chain, data et transformation industrielle.
              </p>
              <a
                href="https://www.linkedin.com/in/merlin-debrais-141b03226/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400"
              >
                Parcours complet sur LinkedIn
              </a>
            </div>

            <div>
              <div className="grid gap-3">
                {journey.map((item) => (
                  <article
                    key={`${item.date}-${item.title}`}
                    className="grid gap-4 rounded-[1.35rem] border border-slate-200 bg-white p-4 sm:grid-cols-[64px_1fr_auto] sm:items-center"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-[11px] font-bold tracking-[0.08em] shadow-sm ${item.logoClass}`}
                      aria-hidden="true"
                    >
                      {item.logo}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-800">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-400">{item.organization}</span>
                      </div>
                      <h3 className="mt-1 font-semibold tracking-[-0.02em] text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 sm:text-right">{item.date}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Prochaines étapes
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {futureRoadmap.map((item) => (
                    <article
                      key={item.date}
                      className="rounded-[1.4rem] border border-slate-200 bg-slate-950 p-5 text-white"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-sky-300">{item.date}</p>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                            item.status === "En attente"
                              ? "bg-amber-300/15 text-amber-200"
                              : "bg-emerald-300/15 text-emerald-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 border-t border-slate-200/80 py-12 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800">Compétences</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950">Les moyens, pas la finalité.</h2>
          </div>
          <div className="flex flex-wrap content-start gap-2.5">
            {capabilities.map((capability) => (
              <span key={capability} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">{capability}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200/80 py-12 sm:py-16">
          <div className="grid gap-8 rounded-[1.75rem] bg-slate-950 px-6 py-8 text-white sm:px-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Contact</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Parlons supply chain, data et transformation opérationnelle.
              </h2>
              <p className="mt-4 text-sm text-slate-400">Valenciennes · Lille · Paris</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:merlin.debrais@gmail.com" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Envoyer un email</a>
              <a href="https://www.linkedin.com/in/merlin-debrais-141b03226/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">LinkedIn</a>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-slate-400">
            Portfolio mis à jour en juin 2026 · Les cas sensibles sont anonymisés.
          </p>
        </section>
      </div>
    </main>
  );
}
