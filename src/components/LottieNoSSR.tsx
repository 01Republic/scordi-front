import dynamic from 'next/dynamic';
import {DotLottieReactProps} from '@lottiefiles/dotlottie-react';
import {memo} from 'react';

export const LottieNoSSR = memo(
    dynamic<DotLottieReactProps>(() => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact), {
        ssr: false,
    }),
);
