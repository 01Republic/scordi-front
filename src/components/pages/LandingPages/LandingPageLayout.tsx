import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {BetaServiceFooter, HeadTag} from '^components/pages/LandingPages/components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

type LandingPageLayoutProps = {
    pageName: string;
    hideFooter?: boolean;
} & WithChildren;

export const LandingPageLayout = memo((props: LandingPageLayoutProps) => {
    const {pageName, hideFooter = false, children} = props;

    return (
        <>
            <HeadTag />
            <div id={pageName.replace(/\s/g, '-')} className="bg-white">
                <LandingPageNavBar showLoginButton={false} fluid={true} />
                {children}
                {!hideFooter && <BetaServiceFooter />}
            </div>
        </>
    );
});
