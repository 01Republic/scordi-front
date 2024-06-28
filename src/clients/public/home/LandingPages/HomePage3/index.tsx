import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {useSetClientBrowser} from '^hooks/useClientBrowser';
import {InquiryModal} from '../HomePage2/InquiryModal';
import {WhatTimeWidget} from '../HomePage2/WhatTimeWidget';
import {LandingPageLayout} from '../LandingPageLayout';
import {Section4} from './Section4';
import {HomePageHeader} from './HomePageHeader';
import {CollectAppSection} from './CollectAppSection';
import {StatsSection} from './StatsSection';
import {Features} from './Features';
import {FAQ} from './FAQ';
import {Review} from './Review';

export const LandingHomePage3 = memo(() => {
    const {t} = useTranslation('publicMain');
    useSetClientBrowser();

    return (
        <LandingPageLayout pageName="HomePage" navBgBlur>
            <div className="relative z-[9]">
                <HomePageHeader />
                <CollectAppSection />
                <StatsSection />
                {/*<HomePageSection3 />*/}
                <Features />
                {/* 이외에도 더 많은 기능들을 준비하고 있어요 */}
                <Review />
                {/*안심하세요 우리가 우리의 첫 고객이다최고의제품으로 보답하겠다.*/}
                <FAQ />
                {/*<WhatTimeWidget />*/}
                <Section4 />
            </div>

            <InquiryModal />
        </LandingPageLayout>
    );
});
