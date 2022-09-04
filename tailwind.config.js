const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["**/*.{ts,svg,html}"],
	theme: {
		extend: {
			colors: {
				ql: {
					pink: "#faedfa",
					purple: "#5f4e7a",
					darkRed: "#620043",
				},
				accent: colors.pink,
				neutral: colors.neutral,
			},
			fontFamily: {
				sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
