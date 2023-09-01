import {useRecoilValue} from 'recoil';
import {isMobileAtom} from './atom';

export function useOnResize2() {
    const isMobile = useRecoilValue(isMobileAtom);

    return {isMobile, isDesktop: !isMobile};
}
