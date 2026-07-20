export type Project = {
	slug: string;
	title: string;
	field: string;
	summary: string;
	image: string;
	imageAlt: string;
	href: string;
	demo?: string;
	tone: "bteb" | "amar" | "smd" | "soldering";
};

export const projects: Project[] = [
	{
		slug: "bteb-flow",
		title: "BTEB Flow",
		field: "Education product",
		summary:
			"Learning resources and practical tools for Bangladesh's technical education students.",
		image: "/assets/bteb-flow.png",
		imageAlt: "BTEB Flow student results portal",
		href: "https://github.com/Frazix12/btebflow",
		demo: "https://btebflow.vercel.app/",
		tone: "bteb",
	},
	{
		slug: "amar-hisab",
		title: "AmarHisab",
		field: "Finance product",
		summary:
			"An expense tracker with grocery-list management in one focused interface.",
		image: "/assets/amar-hisab.png",
		imageAlt: "AmarHisab Android expense tracker product page",
		href: "https://github.com/Frazix12/AmarHisab",
		tone: "amar",
	},
	{
		slug: "smd-rework-station",
		title: "SMD Rework Station",
		field: "Embedded system",
		summary:
			"PID heat control, airflow calibration, desktop tools, and a live web UI.",
		image: "/projects/smd-rework.jpeg",
		imageAlt: "SMD Rework Station control interface",
		href: "https://github.com/Frazix12/SMD-Rework-Station",
		demo: "https://smd-station.vercel.app/",
		tone: "smd",
	},
	{
		slug: "diy-soldering-station",
		title: "DIY Soldering Station",
		field: "Electronics",
		summary: "A practical Arduino Nano and ATmega8 soldering-iron station.",
		image: "/projects/soldering-station.jpg",
		imageAlt: "Completed DIY soldering station",
		href: "https://github.com/Frazix12/SolderingStation",
		tone: "soldering",
	},
];

export const capabilities = [
	"Web products",
	"APIs and systems",
	"Mobile",
	"IoT and electronics",
];

export const socialLinks = [
	{ label: "Email", href: "mailto:frazixgaming22@gmail.com", primary: true },
	{ label: "GitHub", href: "https://github.com/Frazix12", primary: false },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/irfan-nig",
		primary: false,
	},
	{
		label: "Facebook",
		href: "https://www.facebook.com/irfan.nig",
		primary: false,
	},
	{ label: "WhatsApp", href: "https://wa.me/irfan.nig", primary: false },
] as const;

export const testimonials: readonly [] = [];
