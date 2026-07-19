import Image from "next/image";
import Link from "next/link";
import { CubeUnicorn } from "@/components/cube-unicorn";
import { MotionRoot } from "@/components/portfolio-motion";
import {
  capabilities,
  projects,
  socialLinks,
  testimonials,
  type Project,
} from "@/lib/portfolio";

function SiteNav() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="#top" aria-label="Irfan Hossain, home">
          Irfan Hossain
        </Link>
        <div className="nav-links">
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <div>
            <Link href="#work">Work</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </details>
        <Link
          className="button button-primary nav-hire"
          href={socialLinks[0].href}
        >
          Hire Me
        </Link>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">Full-Stack Developer · Dhaka, Bangladesh</p>
      <h1 id="hero-title" className="max-w-6xl">I build digital products and physical systems.</h1>
      <div className="hero-actions">
        <Link className="button button-primary" href={socialLinks[0].href}>
          Hire Me
        </Link>
        <Link className="button button-secondary" href="#work">
          Selected Work
        </Link>
      </div>
      <CubeUnicorn />
    </section>
  );
}

function CapabilityMarquee() {
  return (
    <section className="capability-strip" aria-label="Fields of work">
      <div className="marquee-track">
        {[...capabilities, ...capabilities].map((capability, index) => (
          <span
            key={`${capability}-${index}`}
            aria-hidden={index >= capabilities.length}
          >
            {capability}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      <Link href={project.href} target="_blank" rel="noreferrer">
        Repository <span aria-hidden="true">↗</span>
      </Link>
      {project.demo ? (
        <Link href={project.demo} target="_blank" rel="noreferrer">
          Live product <span aria-hidden="true">↗</span>
        </Link>
      ) : null}
    </div>
  );
}

function ProjectBento({ projects }: { projects: Project[] }) {
  return (
    <section className="chapter" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title">Products built across screens and circuits.</h2>
      </div>
      <div className="project-bento grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 grid-flow-dense">
        {projects.map((project) => (
          <article
            className={`project-card tone-${project.tone} ${project.gridClass}`}
            key={project.slug}
          >
            <Link
              className="project-media media-link"
              href={project.demo ?? project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                data-project-media
              />
            </Link>
            <div className="project-copy">
              <p className="eyebrow">{project.field}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FieldStatement() {
  return (
    <section
      className="field-statement"
      id="about"
      aria-labelledby="about-title"
    >
      <p className="eyebrow">From interface to hardware</p>
      <h2 id="about-title">
        I take ideas from screen{" "}
        <span className="inline-image">
          <Image src="/projects/bteb-flow.png" alt="" fill sizes="160px" />
        </span>{" "}
        to circuit{" "}
        <span className="inline-image">
          <Image
            src="/projects/soldering-station.jpg"
            alt=""
            fill
            sizes="160px"
          />
        </span>{" "}
        and build the systems between.
      </h2>
      <p className="field-copy">
        Full-Stack Developer building scalable software, intuitive experiences,
        embedded systems, and IoT products.
      </p>
    </section>
  );
}

function ProjectAccordion({ projects }: { projects: Project[] }) {
  return (
    <div className="project-accordion" aria-label="Explore projects by field">
      {projects.map((project, index) => (
        <details
          className={`accordion-item tone-${project.tone}`}
          key={project.slug}
          open={index === 0}
        >
          <summary>
            <span>{project.field}</span>
            <strong>{project.title}</strong>
          </summary>
          <div className="accordion-copy">
            <p>{project.summary}</p>
            <Link href={project.href} target="_blank" rel="noreferrer">
              Explore project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}

function ProjectStack({ projects }: { projects: Project[] }) {
  return (
    <section
      className="chapter project-stories"
      aria-labelledby="stories-title"
    >
      <div className="section-heading">
        <p className="eyebrow">How the work takes shape</p>
        <h2 id="stories-title">
          One practice, from product decisions to precise control.
        </h2>
      </div>
      <ProjectAccordion projects={projects} />
      <div className="project-stack" data-stack>
        {projects.map((project) => (
          <article
            className={`stack-card tone-${project.tone}`}
            data-stack-card
            key={project.slug}
          >
            <div className="stack-copy">
              <p className="eyebrow">{project.field}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ProjectLinks project={project} />
            </div>
            <div className="stack-media">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 55vw"
                data-project-media
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialStructure() {
  return testimonials.length ? <section aria-label="Testimonials" /> : null;
}

function ContactSection({ links }: { links: typeof socialLinks }) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">
        Available for internships and freelance projects.
      </p>
      <h2 id="contact-title">Have something worth building?</h2>
      <p>Let&apos;s make the product, system, or prototype real.</p>
      <Link className="button button-primary" href={links[0].href}>
        Hire Me
      </Link>
    </section>
  );
}

function SiteFooter({ links }: { links: typeof socialLinks }) {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-name" href="#top">
          Irfan Hossain
        </Link>
        <p>Full-Stack Developer · Dhaka, Bangladesh</p>
      </div>
      <nav aria-label="Social links">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.label === "Email" ? undefined : "_blank"}
            rel={link.label === "Email" ? undefined : "noreferrer"}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}

export default function Home() {
  return (
    <MotionRoot>
      <main className="w-full max-w-full overflow-x-hidden">
        <SiteNav />
        <Hero />
        <CapabilityMarquee />
        <ProjectBento projects={projects} />
        <FieldStatement />
        <ProjectStack projects={projects} />
        <TestimonialStructure />
        <ContactSection links={socialLinks} />
        <SiteFooter links={socialLinks} />
      </main>
    </MotionRoot>
  );
}
