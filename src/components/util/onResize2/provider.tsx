import {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {isMobileAtom, MOBILE_BREAKPOINT} from './atom';

/**
 * resize event handler 를 컴포넌트별로 제각각 등록하는 bubbling 문제를 해결합니다.
 * recoil root 에 등록하여 resize event handler 를 앱에서 한 번만 등록하고,
 * 나머지 구체 컴포넌트에서는 useOnResize2() 훅을 통해 recoil state 만 활용하는 방식입니다.
 *
 * 현재, _app.tsx 에 등록되어 있으므로, 다른 곳에 별도로 Provider 를 삽입할 필요는 없습니다.
 */
export const OnResizeProvider = memo(() => {
    const setIsMobile = useSetRecoilState(isMobileAtom);

    const resizeHandler = () => {
        const width = window.innerWidth;
        setIsMobile(width < MOBILE_BREAKPOINT);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return <></>;
});
