/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        container: {
            center: true,
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: [{
            v220728: {
                "primary": "#0066FF",
                "secondary": "#D926A9",
                "accent": "#1FB2A6",
                "neutral": "#f3f4f6",
                "base-100": "#ffffff",
                "info": "#3ABFF8",
                "success": "#36D399",
                "warning": "#FBBD23",
                "error": "#F87272",
            },
        }]
    }
}
