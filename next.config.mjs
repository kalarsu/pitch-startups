const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            }
        ]
    },
    experimental: {
        ppr: 'incremental',
    },
    devIndicators: {
        setAppIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: "bottom-right",
    },
};

export default nextConfig;
