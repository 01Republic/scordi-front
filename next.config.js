const path = require('path');
const {withSentryConfig} = require('@sentry/nextjs');
const {i18n} = require('./next-i18next.config');

/** @types {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')], // 2. sassOptions 옵션 추가
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [
            'localhost',
            'picsum.photos',
            'assets.stickpng.com',
            'w7.pngwing.com',
            'toppng.com',
            'upload.wikimedia.org',
            'via.placeholder.com',
        ],
    },
    i18n,
};

if (process.env.APP_ENV === 'production') {
    // Injected content via Sentry wizard below
    module.exports = withSentryConfig(
        nextConfig,
        {
            // For all available options, see:
            // https://github.com/getsentry/sentry-webpack-plugin#options

            // Suppresses source map uploading logs during build
            silent: true,

            org: '01republic',
            project: 'scordi-front',
        },
        {
            // For all available options, see:
            // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

            // Upload a larger set of source maps for prettier stack traces (increases build time)
            widenClientFileUpload: true,

            // Transpiles SDK to be compatible with IE11 (increases bundle size)
            transpileClientSDK: true,

            // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
            tunnelRoute: '/monitoring',

            // Hides source maps from generated client bundles
            hideSourceMaps: true,

            // Automatically tree-shake Sentry logger statements to reduce bundle size
            disableLogger: true,
        },
    );
} else {
    module.exports = nextConfig;
}
