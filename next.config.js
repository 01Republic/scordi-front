const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')], // 2. sassOptions 옵션 추가
    },
}

module.exports = nextConfig
