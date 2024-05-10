import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import AOS from 'aos';
import {AOSProvider} from '^clients/public/home/LandingPages/components';

interface BaseLayoutProps extends WithChildren {
    //
}

export const BaseLayout = memo((props: BaseLayoutProps) => {
    const {children} = props;

    useEffect(() => {
        AOS.init({duration: 300});
    }, []);

    return <AOSProvider>{children}</AOSProvider>;
});
BaseLayout.displayName = 'BaseLayout';
