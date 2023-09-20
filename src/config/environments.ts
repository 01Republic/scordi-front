export const appEnv = process.env.NODE_ENV! as 'development' | 'production' | 'test' | 'staging';
export const serviceHost = process.env.NEXT_PUBLIC_SERVICE_HOST!;

export const channelTalkEnv = {
    pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY!,
    accessSecret: process.env.NEXT_PUBLIC_CHANNEL_TALK_ACCESS_SECRET!,
};
export const termsUrl = {
    // 서비스 이용약관
    serviceUsage: `${process.env.NEXT_PUBLIC_BASE_API}/terms/serviceUsageTerm-v20221101-1.txt`,

    // 개인정보처리방침
    privacy: `${process.env.NEXT_PUBLIC_BASE_API}/terms/개인정보처리방침-v20221101-1.html`,
};

export const crawlerSign = process.env.NEXT_PUBLIC_CRAWLER_SIGN_SECRET as string;
