import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import AOS from 'aos';
import {AOSProvider} from '^clients/public/home/LandingPages/components';
import {AccessibleUserProvider} from './AccessibleUserProvider';

interface BaseLayoutProps extends WithChildren {
    outOfWorkspace?: boolean;
}

export const BaseLayout = memo((props: BaseLayoutProps) => {
    const {outOfWorkspace = false, children} = props;

    useEffect(() => {
        AOS.init({duration: 300});
    }, []);

    return (
        <AOSProvider>
            {outOfWorkspace ? children : <AccessibleUserProvider>{children}</AccessibleUserProvider>}
        </AOSProvider>
    );
});
BaseLayout.displayName = 'BaseLayout';
