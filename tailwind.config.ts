import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				mytheme_one: {
					primary: "#11841E",
					// secondary: "#0d2149",
					secondary: "#57737A",
					accent: "#85BDBF",
					neutral: "#143109",
					"base-100": "#002E2C",
					"base-200": "#3F6C51",
					"base-300": "#587168",
				},
			},
		],
	},
};
export default config;
