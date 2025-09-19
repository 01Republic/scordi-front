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

        config.resolve.fallback = {
            fs: false,
            net: false,
            dns: false,
            child_process: false,
            tls: false,
        };

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
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
            // 전체이미지를 허용했으나 vercel 이미지최적화에서 막히는 경우의 도메인은 직접등록
            {
                protocol: 'https',
                hostname: 'elements.envato.com',
            },
        ],
    },
    i18n,
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/blog',
                    destination: 'https://inblog.ai/01republic-scordi-saas',
                },
                {
                    source: '/blog/:path*',
                    destination: 'https://inblog.ai/01republic-scordi-saas/:path*',
                },
                {
                    source: '/robots.txt',
                    destination: 'https://inblog.ai/01republic-scordi-saas/robots.txt',
                },
                {
                    source: '/_inblog/:path*',
                    destination: 'https://inblog.ai/01republic-scordi-saas/_inblog/:path*',
                },
            ],
        };
    },
    async redirects() {
        const records = [];
        if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
            records.push({
                source: '/',
                destination: 'https://www.scordi.io/',
                permanent: true,
            });
        }
        return [...records];
    },
};

if (process.env.NEXT_PUBLIC_APP_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'staging') {
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
