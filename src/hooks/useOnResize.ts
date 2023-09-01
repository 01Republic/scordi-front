import {memo, useEffect, useState} from 'react';
import {atom, useRecoilState} from 'recoil';

// 스코디 내에서 주요 모바일구분 사이즈는
// Tailwind 및 DaisyUI 에서 사용하고 있는 sm 사이즈를 기준으로 합니다.
// 화면 사이즈를 통해 모바일 인식이 필요한 경우,
// 다른 UI 에서 "sm:xxx" 클래스를 사용하는 것과 호환 되도록 하기 위해
// 640px 을 Breakpoint 값으로 사용합니다.
const MOBILE_BREAKPOINT = 640;

const isMobileAtom = atom({
    key: 'isMobileAtom/legacyVersion',
    default: false,
});

export function useOnResize() {
    const [isMobile, setIsMobile] = useRecoilState(isMobileAtom);

    const resizeHandler = () => {
        const width = window.innerWidth;
        setIsMobile(width < MOBILE_BREAKPOINT);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return {isMobile};
}
