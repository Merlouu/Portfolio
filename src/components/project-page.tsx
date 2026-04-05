"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectContent } from "@/lib/portfolio-content";

export default function ProjectPage({ project }: { project: ProjectContent }) {
  const isFinance = project.slug === "finance";
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const [galleryIndexes, setGalleryIndexes] = useState<Record<string, number>>({});

  const changeGalleryImage = (galleryId: string, total: number, direction: "prev" | "next") => {
    setGalleryIndexes((current) => {
      const activeIndex = current[galleryId] ?? 0;
      const nextIndex =
        direction === "next"
          ? (activeIndex + 1) % total
          : (activeIndex - 1 + total) % total;

      return { ...current, [galleryId]: nextIndex };
    });
  };

  const galleryGroups =
    isFinance
      ? [
          {
            title: "Projet finance actuel",
            note: "Une interface plus concrete pour exposer la logique, l'analytique et la prise de decision.",
            items: project.gallery.filter((item) => item.title.startsWith("Projet finance |")),
          },
          {
            title: "Socle initial Google Sheets",
            note: "Une premiere base utile pour trader, stocker la data, calculer et suivre, mais lourde a maintenir.",
            items: project.gallery.filter((item) => item.title.startsWith("Socle initial |")),
          },
        ]
      : [{ title: "", note: "", items: project.gallery }];

  const financeQuickFacts = isFinance
    ? [
        {
          title: "Projet actuel",
          text: project.phases?.[0]?.description ?? "",
        },
        {
          title: "Avant",
          text: project.phases?.[1]?.description ?? "",
        },
        {
          title: "Point fort",
          text: "BDD, analytique, execution automatique, supervision et maintenance dans une meme logique.",
        },
        {
          title: "Ce qui change",
          text: "Moins de lecture spreadsheet, plus de lisibilite sur la chaine data -> signal -> ordre -> suivi.",
        },
      ]
    : [];
  const contextPanels = project.pillars.slice(0, 3);
  const approachPanels = project.pillars.length > 3 ? project.pillars.slice(3) : [];
  const summarySentences = project.summary
    .split(". ")
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .map((sentence) => (sentence.endsWith(".") ? sentence : `${sentence}.`));
  const financeSummaryPreview = isFinance ? summarySentences.slice(0, 2) : [];
  const financeSummaryDetails = isFinance ? summarySentences.slice(2) : [];

  return (
    <main className={`site-shell project-shell theme-${project.palette}`}>
      <header className="site-header">
        <div className="site-brand-block">
          <Link href="/" className="site-brand">
            Portfolio
          </Link>
          <p className="site-kicker">{project.shortLabel}</p>
        </div>

        <nav className="site-nav" aria-label="Navigation principale">
          <Link href="/" className="nav-link">
            Accueil
          </Link>
          <Link
            href="/projects/finance"
            className={`nav-link ${project.slug === "finance" ? "is-active" : ""}`}
          >
            Finance
          </Link>
          <Link
            href="/projects/restaurants"
            className={`nav-link ${project.slug === "restaurants" ? "is-active" : ""}`}
          >
            Restaurants
          </Link>
          <Link
            href="/projects/vandewalle-safran"
            className={`nav-link ${project.slug === "vandewalle-safran" ? "is-active" : ""}`}
          >
            Encours
          </Link>
        </nav>

        <div className="site-actions">
          <a href="#galerie" className="header-action">
            Voir les &eacute;crans
          </a>
        </div>
      </header>

      <header className="project-hero">
        <div className="project-hero-copy">
          <nav className="breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <span>{project.name}</span>
          </nav>

          <p className="eyebrow">{project.shortLabel}</p>
          <h1>{project.name}</h1>
          <p className="lead">{project.tagline}</p>
          <p className="hero-note">{isFinance ? project.challenge : project.heroNote}</p>

          <div className="hero-meta">
            <div>
              <span>R&ocirc;le</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span>Pour qui</span>
              <p>{project.audience}</p>
            </div>
          </div>

          <div className="hero-summary-panel">
            <span>Pr&eacute;sentation</span>
            {isFinance ? (
              <>
                <div className="hero-summary-list">
                  {financeSummaryPreview.map((sentence) => (
                    <p key={sentence}>{sentence}</p>
                  ))}
                </div>
                {financeSummaryDetails.length ? (
                  <details className="hero-summary-details">
                    <summary>Voir le détail</summary>
                    <div className="hero-summary-list hero-summary-list-detail">
                      {financeSummaryDetails.map((sentence) => (
                        <p key={sentence}>{sentence}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
              </>
            ) : (
              <p>{project.summary}</p>
            )}
          </div>
        </div>

        <aside className="project-hero-card">
          <div className="spotlight-card">
            <div className="spotlight-media">
              <Image
                src={project.spotlight.image}
                alt={project.spotlight.imageAlt}
                fill
                priority
                quality={100}
                sizes="(max-width: 1100px) 100vw, 36vw"
              />
            </div>
            <div className="spotlight-copy">
              <p className="eyebrow">Vue d&apos;ensemble</p>
              <h2>{project.spotlight.title}</h2>
              <p>{project.spotlight.description}</p>
            </div>
          </div>

          {project.metrics.map((metric) => (
            <article key={metric.value} className="metric-card">
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </aside>
      </header>

      <section className="project-section-nav">
        <a href="#contexte" className="section-tab">
          Contexte
        </a>
        <a href="#approche" className="section-tab">
          Approche
        </a>
        <a href="#architecture" className="section-tab">
          Architecture
        </a>
        {project.telegramChannels && !isFinance ? (
          <a href="#telegram" className="section-tab">
            Telegram
          </a>
        ) : null}
        {project.flow ? (
          <a href="#flux" className="section-tab">
            Flux
          </a>
        ) : null}
        <a href="#galerie" className="section-tab">
          Galerie
        </a>
        <a href="#impact" className="section-tab">
          Impact
        </a>
      </section>

      <section id="contexte" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Contexte</p>
            <h2>Le besoin &agrave; l&apos;origine du projet.</h2>
          </div>
          <p className="section-note">{project.challenge}</p>
        </div>

        {isFinance ? (
          <div className="compact-panel-grid">
            {financeQuickFacts.map((item) => (
              <article key={item.title} className="info-panel compact-panel">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        ) : null}

        <div className={`pillar-grid ${isFinance ? "pillar-grid-compact" : ""}`}>
          {contextPanels.map((pillar) => (
            <article key={pillar.title} className="info-panel">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      {approachPanels.length ? (
      <section id="approche" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Approche</p>
            <h2>Les principaux axes du projet.</h2>
          </div>
          <p className="section-note">Une lecture simple des choix de conception et d&apos;usage.</p>
        </div>

        {isFinance ? (
          <details className="fold-panel" open={false}>
            <summary>Afficher les briques compl&eacute;mentaires</summary>
            <div className={`pillar-grid pillar-grid-compact fold-panel-grid`}>
              {approachPanels.map((pillar) => (
                <article key={pillar.title} className="info-panel">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </details>
        ) : (
          <div className={`pillar-grid ${isFinance ? "pillar-grid-compact" : ""}`}>
            {approachPanels.map((pillar) => (
              <article key={pillar.title} className="info-panel">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      ) : null}

      {project.phases && !isFinance ? (
        <section className="section-block">
          <div className="section-head split-head">
            <div>
              <p className="eyebrow">Evolution</p>
            <h2>Du socle initial au projet actuel.</h2>
            </div>
            <p className="section-note">
              Une lecture claire de la cause initiale et de l&apos;evolution.
            </p>
          </div>

          <div className="pillar-grid">
            {project.phases.map((phase) => (
              <article key={phase.title} className="info-panel">
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section id="architecture" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2>Architecture et circulation de l&apos;information.</h2>
          </div>
          <p className="section-note">Une vue d&apos;ensemble du fonctionnement du systeme.</p>
        </div>

        {isFinance ? (
          <details className="fold-panel" open={false}>
            <summary>Afficher l&apos;architecture du systeme</summary>
            <div className="pillar-grid pillar-grid-compact fold-panel-grid">
              {project.architecture.map((item) => (
                <article key={item.title} className="info-panel">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </details>
        ) : (
          <div className={`pillar-grid ${isFinance ? "pillar-grid-compact" : ""}`}>
            {project.architecture.map((item) => (
              <article key={item.title} className="info-panel">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {project.telegramChannels && !isFinance ? (
        <section id="telegram" className="section-block section-anchor">
          <div className="section-head split-head">
            <div>
              <p className="eyebrow">Telegram</p>
              <h2>Des canaux distincts selon le type d&apos;information.</h2>
            </div>
            <p className="section-note">
              Une diffusion separee selon les usages : signal, execution et supervision.
            </p>
          </div>

          <div className="pillar-grid">
            {project.telegramChannels.map((item) => (
              <article key={item.title} className="info-panel">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {project.flow ? (
        <section id="flux" className="section-block section-anchor">
          <div className="section-head split-head">
            <div>
              <p className="eyebrow">Flux</p>
              <h2>{project.flow.title}</h2>
            </div>
            <p className="section-note">{project.flow.description}</p>
          </div>

          {isFinance ? (
            <details className="fold-panel" open={false}>
              <summary>Afficher la boucle detaillee du moteur</summary>
              <div className="flow-grid fold-panel-grid">
                {project.flow.steps.map((step, index) => (
                  <article key={step.label} className="flow-card">
                    <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.label}</h3>
                    <p>{step.detail}</p>
                  </article>
                ))}
              </div>
            </details>
          ) : (
            <div className="flow-grid">
              {project.flow.steps.map((step, index) => (
                <article key={step.label} className="flow-card">
                  <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.label}</h3>
                  <p>{step.detail}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section id="galerie" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Galerie</p>
            <h2>
              {project.slug === "finance"
                ? "Comparatif visuel entre le socle initial et le projet actuel."
                : "Quelques ecrans et vues de pilotage."}
            </h2>
          </div>
          <p className="section-note">
            {project.slug === "finance"
              ? "La separation montre ce qui relevait du socle initial Google Sheets et ce qui appartient aujourd&apos;hui au projet finance."
              : "Des captures pour illustrer la logique, les usages et la structure du projet."}
          </p>
        </div>

        {galleryGroups.map((group, groupIndex) => (
          <div
            key={group.title || "default"}
            className={`gallery-group ${group.title === "Projet finance actuel" ? "gallery-group-featured" : ""}`}
          >
            {group.title ? (
              <div className="gallery-group-head">
                <p className="eyebrow">{group.title}</p>
                <p className="section-note">{group.note}</p>
              </div>
            ) : null}

            <div className="gallery-grid">
              {group.items.map((item, index) => {
                const normalizedTitle = item.title
                  .replace(/^Socle initial \| /, "")
                  .replace(/^Projet finance \| /, "");
                const galleryId = `gallery-${project.slug}-${groupIndex}-${index}`;
                const allImages = [
                  { image: item.image, imageAlt: item.imageAlt },
                  ...(item.extraImages ?? []),
                ];
                const activeIndex = galleryIndexes[galleryId] ?? 0;
                const activeGalleryImage = allImages[activeIndex];

                return (
                  <article key={item.title} className="gallery-card">
                    <div className="gallery-media-stack">
                      <div className="gallery-media-shell">
                        <button
                          type="button"
                          className="gallery-media gallery-media-button"
                          onClick={() =>
                            setActiveImage({
                              src: activeGalleryImage.image,
                              alt: activeGalleryImage.imageAlt,
                              title: normalizedTitle,
                            })
                          }
                          aria-label={`Agrandir ${item.title}`}
                        >
                          <Image
                            src={activeGalleryImage.image}
                            alt={activeGalleryImage.imageAlt}
                            width={1600}
                            height={900}
                            unoptimized
                            priority={groupIndex === 0 && index < 2}
                            sizes="(max-width: 1100px) 100vw, 33vw"
                            className="gallery-inline-image"
                          />
                        </button>

                        {allImages.length > 1 ? (
                          <>
                            <button
                              type="button"
                              className="gallery-arrow gallery-arrow-prev"
                              onClick={() => changeGalleryImage(galleryId, allImages.length, "prev")}
                              aria-label={`Voir l'image precedente de ${normalizedTitle}`}
                            >
                              &lsaquo;
                            </button>
                            <button
                              type="button"
                              className="gallery-arrow gallery-arrow-next"
                              onClick={() => changeGalleryImage(galleryId, allImages.length, "next")}
                              aria-label={`Voir l'image suivante de ${normalizedTitle}`}
                            >
                              &rsaquo;
                            </button>
                            <div className="gallery-dots" aria-hidden="true">
                              {allImages.map((_, dotIndex) => (
                                <span
                                  key={`${galleryId}-dot-${dotIndex}`}
                                  className={`gallery-dot ${dotIndex === activeIndex ? "is-active" : ""}`}
                                />
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="gallery-copy">
                      <h3>{normalizedTitle}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section id="impact" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Impact</p>
            <h2>Ce que le projet apporte.</h2>
          </div>
          <p className="section-note">Les effets concrets recherches a travers ce projet.</p>
        </div>

        <div className="outcome-panel">
          {project.outcomes.map((outcome) => (
            <div key={outcome} className="outcome-item">
              <span className="project-dot" />
              <p>{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Base technique</p>
            <h2>Technologies et briques principales.</h2>
          </div>
          <p className="section-note">Les principaux outils mobilises.</p>
        </div>

        <div className="stack-row">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {activeImage ? (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={() => setActiveImage(null)}
        >
          <div className="lightbox-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveImage(null)}
              aria-label="Fermer l'image agrandie"
            >
              Fermer
            </button>
            <div className="lightbox-media">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={1800}
                height={1200}
                unoptimized
                sizes="100vw"
                className="lightbox-image"
              />
            </div>
            <div className="lightbox-caption">
              <p className="eyebrow">Agrandissement</p>
              <h3>{activeImage.title}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
