export const appEnv = process.env.NODE_ENV! as 'development' | 'production' | 'test' | 'staging';
export const serviceHost = process.env.NEXT_PUBLIC_SERVICE_HOST!;

// 인라인 주석이 제거되지 않는 별 개 희한한 이슈가 있어서
// 인라인 주석을 제거하는 간단한 함수를 만들었습니다.
// 환경변수를 process.env 에서 뽑아냈을 때에는, 아묻따 이 함수로 감싸주시면 됩니다.
const xxx = (envVariable?: string): string => `${envVariable}`.split('#')[0].trim();

export const termsUrl = {
    // 서비스 이용약관
    serviceUsage: `${xxx(process.env.NEXT_PUBLIC_BASE_API)}/terms/serviceUsageTerm-v20221101-1.txt`,

    // 개인정보처리방침
    privacy: `${xxx(process.env.NEXT_PUBLIC_BASE_API)}/terms/개인정보처리방침-v20221101-1.html`,
};

export const googleOAuth = {
    loginClient: {
        id: xxx(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_LOGIN_CLIENT_ID),
        secret: xxx(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_LOGIN_CLIENT_SECRET),
    },
    gmailClient: {
        id: xxx(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_GMAIL_CLIENT_ID),
        secret: xxx(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_GMAIL_CLIENT_SECRET),
    },
    adminClient: {
        id: xxx(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ADMIN_CLIENT_ID),
        secret: xxx(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ADMIN_CLIENT_SECRET),
    },
};
export const vapidPublicKey = xxx(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
export const channelTalkEnv = {
    pluginKey: xxx(process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY),
    accessSecret: xxx(process.env.NEXT_PUBLIC_CHANNEL_TALK_ACCESS_SECRET),
};
export const crawlerSign = xxx(process.env.NEXT_PUBLIC_CRAWLER_SIGN_SECRET as string);
export const cardSign = xxx(process.env.NEXT_PUBLIC_CARD_SIGN_KEY as string);
export const networkSignKey = xxx(process.env.NEXT_PUBLIC_CARD_SIGN_KEY as string);

export const ga_id = xxx('G-3N0EEGXZ8D');
export const gtm_id = xxx('GTM-5RWDTWQF');
export const measuredApiKey = xxx(process.env.NEXT_PUBLIC_MEASURED_API_KEY as string);
export const stepByKey = xxx(process.env.NEXT_PUBLIC_STEPBY_KEY as string);

export const zero1_republic_workspace_id = 10;

export const tossPaymentsKey = {
    clientKey: xxx(process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY),
};
