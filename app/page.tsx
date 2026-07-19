import Image from "next/image";
import Link from "next/link";
import { CubeUnicorn } from "@/components/cube-unicorn";
import { MotionRoot } from "@/components/portfolio-motion";
import {
	capabilities,
	projects,
	socialLinks,
	type Project,
} from "@/lib/portfolio";

const heroWords = "I build digital products and physical systems.".split(" ");
const identityWords =
	"From screen to circuit, I build the systems between.".split(" ");

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
				<Link className="button button-light nav-hire" href={socialLinks[0].href}>
					Hire Me
				</Link>
			</nav>
		</header>
	);
}

function OpeningScene() {
	return (
		<section
			className="opening-scene"
			id="top"
			aria-labelledby="hero-title"
			data-opening
		>
			<div className="opening-copy">
				<p className="scene-caption" data-opening-caption>
					Full-Stack Developer · Dhaka, Bangladesh
				</p>
				<h1 id="hero-title">
					{heroWords.map((word, index) => (
						<span className="title-word-mask" key={word}>
							<span data-opening-word>
								{word}
								{index < heroWords.length - 1 ? " " : null}
							</span>
						</span>
					))}
				</h1>
				<div className="hero-actions" data-opening-actions>
					<Link className="button button-light" href={socialLinks[0].href}>
						Hire Me
					</Link>
					<Link className="button button-outline" href="#work">
						Selected Work
					</Link>
				</div>
			</div>
			<div className="opening-visual" data-opening-visual>
				<CubeUnicorn />
			</div>
			<p className="scroll-prompt" aria-hidden="true">
				Scroll to enter
			</p>
		</section>
	);
}

function IdentityScene() {
	return (
		<section
			className="identity-scene"
			id="about"
			aria-labelledby="identity-title"
			data-identity
		>
			<p className="scene-caption">One practice across software and hardware</p>
			<h2 id="identity-title" aria-label={identityWords.join(" ")}>
				{identityWords.map((word, index) => (
					<span data-identity-word key={`${word}-${index}`}>
						{word}{" "}
					</span>
				))}
			</h2>
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

function ProjectSequence() {
	return (
		<section
			className="project-sequence"
			id="work"
			aria-labelledby="work-title"
			data-project-sequence
		>
			<header className="sequence-intro">
				<p className="scene-caption">Selected work</p>
				<h2 id="work-title">Four projects. One practice.</h2>
			</header>
			<div className="project-scenes">
				{projects.map((project) => (
					<article
						className={`project-scene tone-${project.tone}`}
						data-project-scene
						data-project-slug={project.slug}
						key={project.slug}
					>
						<div className="project-scene-copy">
							<p className="scene-caption">{project.field}</p>
							<h3>{project.title}</h3>
							<p>{project.summary}</p>
							<ProjectLinks project={project} />
						</div>
						<Link
							className="project-scene-media"
							href={project.demo ?? project.href}
							target="_blank"
							rel="noreferrer"
							aria-label={`View ${project.title}`}
						>
							<Image
								src={project.image}
								alt={project.imageAlt}
								fill
								sizes="(max-width: 767px) 100vw, 58vw"
								data-project-media
							/>
						</Link>
					</article>
				))}
			</div>
		</section>
	);
}

function FieldMontage() {
	return (
		<section className="field-montage" aria-labelledby="fields-title">
			<p className="scene-caption">Built across disciplines</p>
			<h2 id="fields-title">
				Products that move between pixels and physical systems.
			</h2>
			<div className="field-track" data-field-track>
				{capabilities.map((capability) => (
					<span key={capability}>{capability}</span>
				))}
			</div>
		</section>
	);
}

function ContactScene() {
	return (
		<section
			className="contact-scene"
			id="contact"
			aria-labelledby="contact-title"
			data-contact
		>
			<p className="scene-caption">
				Available for internships and freelance projects.
			</p>
			<h2 id="contact-title">Let&apos;s build what comes next.</h2>
			<Link className="button button-dark" href={socialLinks[0].href}>
				Hire Me
			</Link>
			<nav className="contact-links" aria-label="Contact and social links">
				{socialLinks.slice(1).map((link) => (
					<Link
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noreferrer"
					>
						{link.label}
					</Link>
				))}
			</nav>
		</section>
	);
}

function SiteFooter() {
	return (
		<footer className="site-footer">
			<div>
				<Link className="footer-name" href="#top">
					Irfan Hossain
				</Link>
				<p>Full-Stack Developer · Dhaka, Bangladesh</p>
			</div>
			<Link href="#top">Back to top</Link>
		</footer>
	);
}

export default function Home() {
	return (
		<MotionRoot>
			<a className="skip-link" href="#main">
				Skip to content
			</a>
			<SiteNav />
			<main id="main" className="cinematic-page">
				<OpeningScene />
				<IdentityScene />
				<ProjectSequence />
				<FieldMontage />
				<ContactScene />
			</main>
			<SiteFooter />
		</MotionRoot>
	);
}
