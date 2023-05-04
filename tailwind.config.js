/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	purge: [
		"./src/**/*.{js,jsx,ts,tsx}", //esto también es una forma de englobar subdirectorios
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", `sans-serif`],
				montserrat: ["Montserrat", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
			screens: {
				'cel': '320px',
			},
			backgroundImage: {
				'backgroundManga': "url('../assets/images/lect.png')"
			},
		},
	},
	variants: {},
	plugins: [],
};
