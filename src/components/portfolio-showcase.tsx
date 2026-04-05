import Image from "next/image";
import Link from "next/link";
import { profileContent, projects } from "@/lib/portfolio-content";

const financeProject = projects.find((project) => project.slug === "finance");
const restaurantsProject = projects.find((project) => project.slug === "restaurants");

export default function PortfolioShowcase() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-brand-block">
          <Link href="/" className="site-brand">
            Portfolio
          </Link>
          <p className="site-kicker">{profileContent.title}</p>
        </div>

        <nav className="site-nav" aria-label="Navigation principale">
          <a href="#about" className="nav-link">
            A propos
          </a>
          <a href="#skills" className="nav-link">
            Competences
          </a>
          <a href="#projects" className="nav-link">
            Projets
          </a>
        </nav>

        <div className="site-actions">
          <a href="mailto:merlin.debrais@gmail.com" className="header-action">
            Me contacter
          </a>
        </div>
      </header>

      <section className="home-hero home-hero-premium">
        <div className="home-hero-copy">
          <p className="eyebrow">Accueil</p>
          <h1>{profileContent.name}</h1>
          <h2 className="hero-title">{profileContent.title}</h2>
          <p className="hero-subtitle">{profileContent.subtitle}</p>
          <p className="lead">{profileContent.intro}</p>
          <p className="hero-contact">{profileContent.contact}</p>

          <div className="hero-actions">
            <a href="#projects" className="project-link">
              Voir mes projets
            </a>
            <a
              href="/cv-merlin-debrais.pdf"
              className="project-link ghost-link"
              target="_blank"
              rel="noreferrer"
            >
              Telecharger mon CV
            </a>
            <a href="mailto:merlin.debrais@gmail.com" className="project-link ghost-link">
              Me contacter
            </a>
          </div>
        </div>

        <aside className="home-side-card home-visual-stage">
          <div className="hero-stage-head">
            <p className="eyebrow">Selection</p>
            <h2>Des projets qui montrent la logique, la structure et l'execution.</h2>
          </div>

          <div className="hero-stage-grid">
            {financeProject ? (
              <article className="hero-shot hero-shot-primary">
                <div className="hero-shot-media">
                  <Image
                    src={financeProject.spotlight.image}
                    alt={financeProject.spotlight.imageAlt}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 1100px) 100vw, 30vw"
                  />
                </div>
                <div className="hero-shot-copy">
                  <span className="panel-chip">Finance</span>
                  <h3>{financeProject.spotlight.title}</h3>
                </div>
              </article>
            ) : null}

            {restaurantsProject ? (
              <article className="hero-shot hero-shot-secondary">
                <div className="hero-shot-media">
                  <Image
                    src={restaurantsProject.spotlight.image}
                    alt={restaurantsProject.spotlight.imageAlt}
                    fill
                    quality={100}
                    sizes="(max-width: 1100px) 100vw, 20vw"
                  />
                </div>
                <div className="hero-shot-copy">
                  <span className="panel-chip">Restaurants</span>
                  <h3>{restaurantsProject.spotlight.title}</h3>
                </div>
              </article>
            ) : null}

            {financeProject?.gallery[1] ? (
              <article className="hero-shot hero-shot-detail">
                <div className="hero-shot-media">
                  <Image
                    src={financeProject.gallery[1].image}
                    alt={financeProject.gallery[1].imageAlt}
                    fill
                    quality={100}
                    sizes="(max-width: 1100px) 100vw, 18vw"
                  />
                </div>
                <div className="hero-shot-copy">
                  <span className="panel-chip">Backtest</span>
                  <h3>{financeProject.gallery[1].title}</h3>
                </div>
              </article>
            ) : null}
          </div>

          <div className="hero-mini-stats">
            <div>
              <strong>2025-2027</strong>
              <span>Alternance Business Analyst &amp; Forecaster</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>References pilotees en prevision mensuelle</span>
            </div>
            <div>
              <strong>1 300+</strong>
              <span>References suivies pour la fiabilisation MRP</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Univers projets presentes avec une lecture metier et systeme</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="home-project-strip section-anchor" aria-label="Acces rapide projets">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`home-project-tile theme-${project.palette}`}
          >
            <span className="eyebrow">{project.shortLabel}</span>
            <strong>{project.name}</strong>
            <span>{project.tagline}</span>
          </Link>
        ))}
      </section>

      <section id="about" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">A propos</p>
            <h2>Un profil oriente performance, structuration et utilite concrete.</h2>
          </div>
          <p className="section-note">
            Une approche centree sur les flux, la donnee, la fiabilite et la mise en place
            d'outils reellement exploitables.
          </p>
        </div>

        <div className="about-panel">
          {profileContent.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="skills" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Competences</p>
            <h2>Des competences organisees par domaine d'application.</h2>
          </div>
          <p className="section-note">Analyse, operations, digitalisation et gestion de projet.</p>
        </div>

        <div className="skills-grid">
          {profileContent.skills.map((group) => (
            <article key={group.title} className="skill-card">
              <h3>{group.title}</h3>
              <div className="skill-chip-row">
                {group.items.map((item) => (
                  <span key={item} className="panel-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-block section-anchor">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Projets</p>
            <h2>Deux projets pour illustrer la logique, les outils et la structuration.</h2>
          </div>
          <p className="section-note">
            Une lecture detaillee de deux univers : finance et operations.
          </p>
        </div>

        <div className="project-link-grid">
          {projects.map((project) => (
            <article key={project.slug} className={`project-link-card theme-${project.palette}`}>
              <p className="eyebrow">{project.shortLabel}</p>
              <h3>{project.name}</h3>
              <p>{project.tagline}</p>
              <div className="card-preview-list">
                {project.gallery.slice(0, 3).map((item) => (
                  <span key={item.title} className="panel-chip">
                    {item.title}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="project-link">
                Ouvrir le projet
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
