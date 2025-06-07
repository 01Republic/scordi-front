import dynamic from 'next/dynamic';
import {DotLottieReact, DotLottieReactProps} from '@lottiefiles/dotlottie-react';
import {memo} from 'react';

export const LOTTIE_SRC = {
    SECURITY_SHIELD_FOR_CERT: '/images/lottie/security-shield-for-cert.lottie',
    CLAP: '/images/lottie/clap.lottie',
    LOADING_BUBBLE_SWIPE: '/images/lottie/loading-bubble-swipe.lottie',
    LOADING_SEARCHING: '/images/lottie/loading-searching.lottie',
};

/**
 * 임시 로띠 이미지 (src: remote-url)
 * ---
 * 로띠 이미지 주소가 **CDN 형태의 원격지 URL** 이라면,
 * lazy loading 을 하도록 LottieNoSSR 을 사용합니다.
 * - 로띠 이미지 주소는 가급적 URL 대신, 파일을 다운받아 그 경로를 넣으세요.
 * - 그리고 Lottie 컴포넌트를 사용하세요.
 */
export const LottieNoSSR = memo(
    dynamic<DotLottieReactProps>(() => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact), {
        ssr: false,
    }),
);

/**
 * 정식 로띠 이미지 (src: file-path)
 * ---
 * 로띠 이미지 주소가 **파일경로 형태의 문자열** 이라면,
 * eager loading 을 하도록 Lottie 을 사용합니다.
 * - 테스트가 끝나고 어떤 이미지를 사용할지 정했다면, 해당 이미지를 /images/lottie 디렉토리로 다운받아주세요.
 * - 그리고 Lottie 컴포넌트를 사용하세요.
 */
export const Lottie = (props: DotLottieReactProps) => <DotLottieReact {...props} />;
