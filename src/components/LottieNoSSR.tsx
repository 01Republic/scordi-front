import dynamic from 'next/dynamic';
import {DotLottieReactProps} from '@lottiefiles/dotlottie-react';
import {memo} from 'react';

export const LottieNoSSR = memo(
    dynamic<DotLottieReactProps>(() => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact), {
        ssr: false,
    }),
);

export const LOTTIE_SRC = {
    SECURITY_SHIELD_FOR_CERT: 'https://lottie.host/8c19c94c-ca36-442d-b83f-f39e2dbbaf1b/sF9j9NcRar.lottie',
    CLAP: 'https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie',
    LOADING_BUBBLE_SWIPE: '/images/lottie/loading-bubble-swipe.lottie',
    LOADING_SEARCHING: '/images/lottie/loading-searching.lottie',
};
