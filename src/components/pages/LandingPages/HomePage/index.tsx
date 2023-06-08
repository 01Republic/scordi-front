import React, {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {
    AOSProvider,
    BetaServiceFooter,
    BetaUserApplyCTAButton,
    BetaUserApplyModal,
    HeadTag,
    USPSection,
    USPSectionCentered,
} from '../components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {HomePageHeader} from './Header';
import {HeaderSubLine} from '^components/pages/LandingPages/HomePage/HeaderSubLine';
import {HomePageSection3} from '^components/pages/LandingPages/HomePage/Section3';
import {HomePageCTAButton, HomePageCTAButton2} from './CTAButton';
import {getGoogleAccessTokenByCode, googleAuthForGmail} from '^api/tasting.api';
import {TastingPageRoute} from '^pages/tasting';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {gmailAccessTokenDataAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useTranslation} from 'next-i18next';

type LandingV2HomePageProps = {} & WithChildren;

export const LandingV2HomePage = memo((props: LandingV2HomePageProps) => {
    const router = useRouter();
    const [accessTokenData, setAccessTokenData] = useRecoilState(gmailAccessTokenDataAtom);
    const {t} = useTranslation('publicMain');

    useEffect(() => {
        if (accessTokenData) return;

        const code = router.query.code as string | undefined;
        if (!code) return;

        getGoogleAccessTokenByCode(code).then(async (tokenData) => {
            if (!tokenData) return;
            setAccessTokenData(tokenData);
            await router.push(TastingPageRoute.path());
        });
    }, [router.isReady]);

    return (
        <AOSProvider>
            <HeadTag />
            <div className="bg-white">
                <LandingPageNavBar showLoginButton={false} fluid={true} />

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
