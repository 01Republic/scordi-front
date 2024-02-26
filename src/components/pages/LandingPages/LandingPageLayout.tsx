import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AOSProvider, BetaServiceFooter, HeadTag} from '^components/pages/LandingPages/components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

type LandingPageLayoutProps = {
    pageName: string;
    navBgBlur?: boolean;
    hideFooter?: boolean;
    className?: string;
} & WithChildren;

export const LandingPageLayout = memo((props: LandingPageLayoutProps) => {
    const {pageName, navBgBlur = false, hideFooter = false, className = '', children} = props;

    return (
        <AOSProvider>
            <HeadTag />
            <div className={`bg-white ${className}`}>
                <div id={pageName.replace(/\s/g, '-')} className="bg-white">
                    <LandingPageNavBar showLoginButton={true} sticky className="z-20" bgBlur={navBgBlur} />
                    {children}
                    {!hideFooter && <BetaServiceFooter />}
                </div>
            </div>
        </AOSProvider>
    );
});
