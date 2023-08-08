import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {AOSProvider, BetaServiceFooter, HeadTag} from '../components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {HomePageHeader} from './HomePageHeader';
import {Section1} from './Section1';
import {Section2} from './Section2';
import {Section3a} from './Section3a';
import {Section3b} from './Section3b';
import {Section4} from './Section4';

export const LandingHomePage2 = memo(() => {
    const {t} = useTranslation('publicMain');

    return (
        <AOSProvider>
            <HeadTag />

            <div className="bg-white">
                <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 bg-white z-10" />

                <HomePageHeader />

                <Section1 />
                <Section2 />
                <div id="product-section"></div>
                <Section3a />
                <Section3b />
                <Section4 />

                <BetaServiceFooter />
            </div>
        </AOSProvider>
    );
});
