import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {BetaServiceFooter} from '^clients/public/home/LandingPages/components';

interface ErrorLayoutProps extends WithChildren {}

export const ErrorLayout = memo((props: ErrorLayoutProps) => {
    const {children} = props;

    return (
        <div className="relative min-h-screen flex flex-col">
            <LandingPageNavBar />
            <div className="flex-grow flex items-center justify-center py-12">{children}</div>
            <BetaServiceFooter />
        </div>
    );
});
