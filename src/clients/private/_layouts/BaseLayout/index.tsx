import {realisticFire} from '^clients/private/orgs/home/OrgDashboardPage/ConfettiEffect';
import {AOSProvider} from '^clients/public/home/LandingPages/components';
import {WithChildren} from '^types/global.type';
import AOS from 'aos';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {AccessibleUserProvider} from './AccessibleUserProvider';

interface BaseLayoutProps extends WithChildren {
    outOfWorkspace?: boolean;
}

export const BaseLayout = memo((props: BaseLayoutProps) => {
    const {outOfWorkspace = false, children} = props;
    const route = useRouter();

    useEffect(() => {
        AOS.init({duration: 300});
    }, []);

    useEffect(() => {
        if (window && typeof window === 'object') {
            if (route.query.closeWindowOnReady) window.close();
            if (route.query.confetti) {
                realisticFire();
                const {confetti: _, ...restQuery} = route.query;
                route.replace({query: restQuery});
            }
        }
    }, [route.isReady]);

    return (
        <AOSProvider>
            {outOfWorkspace ? children : <AccessibleUserProvider>{children}</AccessibleUserProvider>}
        </AOSProvider>
    );
});
BaseLayout.displayName = 'BaseLayout';
