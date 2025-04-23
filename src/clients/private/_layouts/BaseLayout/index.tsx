import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import AOS from 'aos';
import {AOSProvider} from '^clients/public/home/LandingPages/components';
import {AccessibleUserProvider} from './AccessibleUserProvider';
import {useRouter} from 'next/router';

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
        }
    }, [route.isReady]);

    return (
        <AOSProvider>
            {outOfWorkspace ? children : <AccessibleUserProvider>{children}</AccessibleUserProvider>}
        </AOSProvider>
    );
});
BaseLayout.displayName = 'BaseLayout';
