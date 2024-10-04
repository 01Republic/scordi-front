import {LandingPageNavBar} from '^components/lab/landing-page-components';
import React, {memo} from 'react';
import {ErrorFooter} from './ErrorFooter';
import {useOrganization} from '^models/Organization/hook';
import {ErrorTopbar} from './ErrorTopbar';

interface ErrorlayoutProps {
    children: React.ReactNode;
}

export const Errorlayout = memo(({children}: ErrorlayoutProps) => {
    const org = useOrganization();
    return (
        <div className="relative min-h-screen flex flex-col">
            <LandingPageNavBar />

            <div className="flex-grow flex items-center justify-center">{children}</div>
            <ErrorFooter />
        </div>
    );
});
