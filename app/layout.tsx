import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
	src: "./fonts/clash-display.woff2",
	variable: "--font-clash-display",
	weight: "200 700",
});

const generalSans = localFont({
	src: "./fonts/general-sans.woff2",
	variable: "--font-general-sans",
	weight: "200 700",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://irfu.ami.bd"),
	title: "Irfan Hossain — Full-Stack Developer",
	description:
		"Irfan Hossain builds web products, backend systems, mobile experiences, IoT, and electronics from Dhaka, Bangladesh.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${clashDisplay.variable} ${generalSans.variable} ${geistMono.variable} antialiased`}
		>
			<body>{children}</body>
		</html>
	);
}
