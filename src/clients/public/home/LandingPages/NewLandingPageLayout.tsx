import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AOSProvider, HeadTag} from '^clients/public/home/LandingPages/components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {Footer} from '^clients/private/_layouts/_shared/Footer';

interface NewLandingPageLayoutProps extends WithChildren {
    pageName: string;
    navBgBlur?: boolean;
    hideNav?: boolean;
    hideFooter?: boolean;
    className?: string;
}

export const NewLandingPageLayout = memo((props: NewLandingPageLayoutProps) => {
    const {pageName, navBgBlur = false, hideNav = false, hideFooter = true, className = '', children} = props;

    return (
        <AOSProvider>
            <HeadTag />
            <div className={`bg-white ${className}`}>
                <div id={pageName.replace(/\s/g, '-')} className="bg-white h-dvh">
                    {!hideNav && (
                        <LandingPageNavBar showLoginButton={true} sticky className="z-20" bgBlur={navBgBlur} />
                    )}
                    <div
                        className="flex-1 flex items-center justify-center "
                        style={{
                            height: `calc(100vh - ${hideNav ? '0px' : '56px'} - ${hideFooter ? '0px' : '136px'})`,
                        }}
                    >
                        {children}
                    </div>
                    {!hideFooter && <Footer />}
                </div>
            </div>
        </AOSProvider>
    );
});
