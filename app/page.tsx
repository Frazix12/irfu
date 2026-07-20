import { Fragment } from "react";
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

const heroLines = [
	"I build digital products".split(" "),
	"and physical systems.".split(" "),
];
const identityLines = [
	"From screen to circuit,".split(" "),
	"I build the systems".split(" "),
	"between.".split(" "),
];
const identityLabel = identityLines.flat().join(" ");

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
					Irfan Hossain · Dhaka, Bangladesh
				</p>
				<h1
					id="hero-title"
					aria-label={heroLines.flat().join(" ")}
					data-cursor="EXPLORE"
					data-cursor-icon="→"
					data-cursor-mode="text"
				>
					{heroLines.map((line, lineIndex) => (
						<Fragment key={line.join(" ")}>
							<span className="hero-line">
								{line.map((word, wordIndex) => (
									<span
										className="title-word-mask"
										key={`${lineIndex}-${word}`}
									>
										<span data-opening-word>
											{word}
											{wordIndex < line.length - 1 ? " " : null}
										</span>
									</span>
								))}
							</span>
							{lineIndex < heroLines.length - 1 ? " " : null}
						</Fragment>
					))}
				</h1>
				<div className="hero-actions" data-opening-actions>
					<Link
						className="button button-light"
						href={socialLinks[0].href}
						data-cursor="HIRE"
						data-cursor-icon="↗"
					>
						Hire Me
					</Link>
					<Link
						className="button button-outline"
						href="#work"
						data-cursor="VIEW"
						data-cursor-icon="↓"
					>
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
			<div className="identity-stage" data-identity-stage>
				<div className="identity-progress" aria-hidden="true">
					<span data-identity-progress />
				</div>
				<p className="scene-caption">
					One practice across software and hardware
				</p>
				<h2
					id="identity-title"
					aria-label={identityLabel}
					data-cursor="STORY"
					data-cursor-icon="T"
					data-cursor-mode="text"
				>
					{identityLines.map((line, lineIndex) => (
						<span data-identity-line key={line.join(" ")}>
							{line.map((word, wordIndex) => (
								<span data-identity-word key={`${lineIndex}-${word}`}>
									{word}
									{wordIndex < line.length - 1 ? " " : null}
								</span>
							))}
						</span>
					))}
				</h2>
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
				<h2
					id="work-title"
					data-cursor="ARCHIVE"
					data-cursor-icon="04"
					data-cursor-mode="text"
				>
					Four projects. One practice.
				</h2>
			</header>
			<div className="project-scenes">
				{projects.map((project, index) => (
					<article
						className={`project-scene tone-${project.tone}`}
						data-project-scene
						data-project-slug={project.slug}
						key={project.slug}
					>
						<div className="project-scene-copy">
							<p className="scene-caption">{project.field}</p>
							<h3
								data-cursor="PROJECT"
								data-cursor-icon={String(index + 1).padStart(2, "0")}
								data-cursor-mode="text"
							>
								{project.title}
							</h3>
							<p>{project.summary}</p>
							<ProjectLinks project={project} />
						</div>
						<Link
							className="project-scene-media"
							href={project.demo ?? project.href}
							target="_blank"
							rel="noreferrer"
							aria-label={`View ${project.title}`}
							data-cursor="VIEW"
							data-cursor-icon="↗"
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
			<h2
				id="fields-title"
				data-cursor="FIELDS"
				data-cursor-icon="+"
				data-cursor-mode="text"
			>
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
			<h2
				id="contact-title"
				data-cursor="HELLO"
				data-cursor-icon="@"
				data-cursor-mode="text"
			>
				Let&apos;s build what comes next.
			</h2>
			<Link
				className="button button-dark"
				href={socialLinks[0].href}
				data-cursor="HIRE"
				data-cursor-icon="↗"
			>
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
			<address className="contact-location">Dhaka, Bangladesh</address>
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
			<div className="footer-links">
				<nav aria-label="Footer navigation">
					<Link href="#work">Work</Link>
					<Link href="#about">About</Link>
					<Link href="#contact">Contact</Link>
				</nav>
				<nav aria-label="Footer social links">
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
			</div>
		</footer>
	);
}

export default function Home() {
	return (
		<MotionRoot>
			<Link className="skip-link" href="#main">
				Skip to content
			</Link>
			<main id="main" className="cinematic-page" tabIndex={-1}>
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
