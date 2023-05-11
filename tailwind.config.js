/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    ],
    theme: {
        truncate: {
            lines: {
                2: '2',
                3: '3',
            },
        },
        fontFamily: {
            sans: [
                'Pretendard',
                '-apple-system',
                'BlinkMacSystemFont',
                'system-ui',
                'Roboto',
                'Helvetica Neue',
                'Segoe UI',
                'Apple SD Gothic Neo',
                'Noto Sans KR',
                'Malgun Gothic',
                'sans-serif',
            ],
        },
        extend: {
            colors: {
                'brand-1': '#0066FF',
            },
            fontSize: {
                10: ['0.625rem', {lineHeight: '1rem'}],
                11: ['0.6875rem', {lineHeight: '1rem'}],
                12: ['0.75rem', {lineHeight: '1rem'}],
                13: ['0.8125rem', {lineHeight: '1.125rem'}],
                14: ['0.875rem', {lineHeight: '1.25rem'}],
                15: ['0.9375rem', {lineHeight: '1.375rem'}],
                16: ['1rem', {lineHeight: '1.5rem'}],
                17: ['1.0625rem', {lineHeight: '1.625rem'}],
                18: ['1.125rem', {lineHeight: '1.75rem'}],
                19: ['1.1875rem', {lineHeight: '1.875rem'}],
                20: ['1.25rem', {lineHeight: '1.75rem'}],
                24: ['1.5rem', {lineHeight: '2rem'}],
                28: ['1.75rem', {lineHeight: '2rem'}],
                30: ['1.875rem', {lineHeight: '2.25rem'}],
                32: ['2rem', {lineHeight: '2.75rem'}],
                36: ['2.25rem', {lineHeight: '2.5rem'}],
                48: ['3rem', {lineHeight: 1}],
                56: ['3.5rem', {lineHeight: '4.5rem'}],
                60: ['3.75rem', {lineHeight: 1}],
                72: ['4.5rem', {lineHeight: 1}],
                96: ['6rem', {lineHeight: 1}],
                128: ['8rem', {lineHeight: 1}],
            },
            screens: {
                sm: {min: '0px', max: '499px'},
                md: {min: '500px', max: '767px'},
                lg: {min: '768px', max: '1023px'},
                xl: {min: '1024px', max: '1280px'},
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            {
                v220728: {
                    primary: '#0066FF',
                    secondary: '#D926A9',
                    accent: '#1FB2A6',
                    neutral: '#f3f4f6',
                    'base-100': '#ffffff',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',
                },
            },
        ],
    },
};
