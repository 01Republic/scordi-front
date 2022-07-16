/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            soeun: {
                "primary": "#20C997",
                "primary-focus": "#12B886",
                "primary-content": "#ffffff",
                "secondary": "#1d1f2b",
                "secondary-content": "#ffffff",
                "accent": "#ef4444",
                "accent-content": "#ffffff",
                "neutral": "#3D4451",
                "neutral-content": "#ffffff",
                "base-100": "#ffffff",
            },
        }]
    }
}