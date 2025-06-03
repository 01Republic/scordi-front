import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import AOS from 'aos';
import {AOSProvider} from '^clients/public/home/LandingPages/components';
import {AccessibleUserProvider} from './AccessibleUserProvider';
import {useRouter} from 'next/router';

export interface BaseLayoutProps extends WithChildren {
    /**
     * 워크스페이스 확인 여부
     * @default true
     * @description true 인 경우, 현재 워크스페이스에 접속한 사용자에 관련한 정보(currentOrg, currentUser, currentMembership)를 체크합니다.
     */
    workspace?: boolean;
}

/**
 * 기본 레이아웃
 * --
 * 서비스 내의 모든 영역에 적용되는 공통 로직만을 공유하며, 그 외 어떠한 UI 도 입혀지지 않은 상태의 빈 레이아웃입니다.
 */
export const BaseLayout = memo((props: BaseLayoutProps) => {
    const {workspace = true, children} = props;
    const route = useRouter();

    useEffect(() => {
        AOS.init({duration: 300});
    }, []);

    useEffect(() => {
        if (window && typeof window === 'object') {
            if (route.query.closeWindowOnReady) window.close();
        }
    }, [route.isReady]);

    return (
        <AOSProvider>{workspace ? <AccessibleUserProvider>{children}</AccessibleUserProvider> : children}</AOSProvider>
    );
});
BaseLayout.displayName = 'BaseLayout';
