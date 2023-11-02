import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {
    AOSProvider,
    BetaServiceFooter,
    HeadTag,
    USPSection2,
    USPSectionCentered,
} from '^components/pages/LandingPages/components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {HomePageCTAButton, HomePageCTAButton2} from '^components/pages/LandingPages/HomePage/CTAButton';
import {HomePageSection3} from '^components/pages/LandingPages/HomePage/Section3';
import {InquiryModal} from '^components/pages/LandingPages/HomePage2/InquiryModal';
import {WhatTimeWidget} from '^components/pages/LandingPages/HomePage2/WhatTimeWidget';
import {Section4} from './Section4';
import {HomePageHeader} from './HomePageHeader';
import {CollectAppSection} from './CollectAppSection';
import {StatsSection} from './StatsSection';
import {Features} from './Features';
import {FAQ} from './FAQ';
import {Review} from './Review';

export const LandingHomePage3 = memo(() => {
    const {t} = useTranslation('publicMain');

    return (
        <AOSProvider>
            <HeadTag />

            <div className="bg-white relative z-10">
                <LandingPageNavBar showLoginButton={true} sticky bgBlur />

                <HomePageHeader />
                <CollectAppSection />
                <StatsSection />
                {/*<HomePageSection3 />*/}
                <Features />
                {/* 이외에도 더 많은 기능들을 준비하고 있어요 */}
                <Review />
                {/*안심하세요 우리가 우리의 첫 고객이다최고의제품으로 보답하겠다.*/}
                <FAQ />
                <WhatTimeWidget />
                <Section4 />
                <BetaServiceFooter />
            </div>

            <InquiryModal />
        </AOSProvider>
    );
});
