export type Project = {
	slug: string;
	title: string;
	field: string;
	summary: string;
	image: string;
	imageAlt: string;
	href: string;
	demo?: string;
	tone: "lime" | "lilac" | "coral" | "navy";
	gridClass: string;
};

export const projects: Project[] = [
	{
		slug: "bteb-flow",
		title: "BTEB Flow",
		field: "Education product",
		summary:
			"Learning resources and practical tools for Bangladesh's technical education students.",
		image: "/projects/bteb-flow.png",
		imageAlt: "BTEB Flow routine interface",
		href: "https://github.com/Frazix12/btebflow",
		demo: "https://btebflow.vercel.app/",
		tone: "lime",
		gridClass: "md:col-span-7 md:row-span-2",
	},
	{
		slug: "amar-hisab",
		title: "AmarHisab",
		field: "Finance product",
		summary:
			"An expense tracker with grocery-list management in one focused interface.",
		image: "/projects/amar-hisab.png",
		imageAlt: "AmarHisab expense dashboard",
		href: "https://github.com/Frazix12/AmarHisab",
		tone: "lilac",
		gridClass: "md:col-span-5",
	},
	{
		slug: "smd-rework-station",
		title: "SMD Rework Station",
		field: "Embedded system",
		summary:
			"PID heat control, airflow calibration, desktop tools, and a live web UI.",
		image: "/projects/smd-rework.png",
		imageAlt: "SMD Rework Station control interface",
		href: "https://github.com/Frazix12/SMD-Rework-Station",
		demo: "https://smd-station.vercel.app/",
		tone: "coral",
		gridClass: "md:col-span-3",
	},
	{
		slug: "diy-soldering-station",
		title: "DIY Soldering Station",
		field: "Electronics",
		summary: "A practical Arduino Nano and ATmega8 soldering-iron station.",
		image: "/projects/soldering-station.jpg",
		imageAlt: "Completed DIY soldering station",
		href: "https://github.com/Frazix12/SolderingStation",
		tone: "navy",
		gridClass: "md:col-span-2",
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
