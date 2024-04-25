import React, {memo} from 'react';
import {
    AOSProvider,
    BetaServiceFooter,
    BetaUserApplyModal,
    HeadTag,
    USPSection,
    USPSectionCentered,
} from '../components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {HomePageHeader} from './Header';
import {HeaderSubLine} from '^clients/public/home/LandingPages/HomePage/HeaderSubLine';
import {HomePageSection3} from '^clients/public/home/LandingPages/HomePage/Section3';
import {HomePageCTAButton, HomePageCTAButton2} from './CTAButton';
import {TastingPageRoute} from '^pages/tasting';
import {useGoogleAccessTokenCallback} from '^hooks/useGoogleAccessToken';
import {useTranslation} from 'next-i18next';

export const LandingV2HomePage = memo(() => {
    const {t} = useTranslation('publicMain');
    useGoogleAccessTokenCallback(TastingPageRoute.path());

    return (
        <AOSProvider>
            <HeadTag />
            <div className="bg-white">
                <LandingPageNavBar showLoginButton={true} fluid={true} />

                <HomePageHeader />
                <HeaderSubLine />
                <HomePageSection3 />

                <div className="py-16 md:py-0">
                    <USPSection
                        imgUrl={t('section4.image')}
                        title={t('section4.title')}
                        desc2={t('section4.desc2')!}
                        imgWidth="50%"
                        direct="right"
                        CTAButton={<HomePageCTAButton2 text={t('section4.cta')!} />}
                    />

                    <USPSection
                        imgUrl={t('section5.image')}
                        title={t('section5.title')}
                        desc2={t('section5.desc2')!}
                        imgWidth="50%"
                        direct="left"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />
                </div>

                <USPSectionCentered
                    title={t('section6.title')!}
                    desc1={t('section6.desc1')!}
                    showCTA={true}
                    CTAButton={<HomePageCTAButton />}
                >
                    <div
                        className="text-center -mx-10 sm:mx-0"
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    >
                        <img src={t('section6.imagePc')!} className="hidden sm:block" />
                        <img
                            src={t('section6.imageMobile')!}
                            className="block sm:hidden w-full"
                            style={{objectFit: 'cover', minHeight: '300px'}}
                        />
                    </div>
                </USPSectionCentered>

                <BetaServiceFooter />

                <BetaUserApplyModal />
            </div>
        </AOSProvider>
    );
});
