import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AOSProvider, BetaServiceFooter, HeadTag} from '^clients/public/home/LandingPages/components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

interface LandingPageLayoutProps extends WithChildren {
    pageName: string;
    navBgBlur?: boolean;
    hideNav?: boolean;
    hideFooter?: boolean;
    className?: string;
}

export const LandingPageLayout = memo((props: LandingPageLayoutProps) => {
    const {pageName, navBgBlur = false, hideNav = false, hideFooter = false, className = '', children} = props;

    return (
        <AOSProvider>
            <HeadTag />
            <div className={`bg-white ${className}`}>
                <div id={pageName.replace(/\s/g, '-')} className="bg-white">
                    {!hideNav && (
                        <LandingPageNavBar showLoginButton={true} sticky className="z-20" bgBlur={navBgBlur} />
                    )}
                    {children}
                    {!hideFooter && <BetaServiceFooter />}
                </div>
            </div>
        </AOSProvider>
    );
});
