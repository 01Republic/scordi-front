import React, {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {AOSProvider, BetaServiceFooter, HeadTag, USPSection, USPSectionCentered} from '../components';
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

type LandingV2HomePageProps = {} & WithChildren;

export const LandingV2HomePage = memo((props: LandingV2HomePageProps) => {
    const router = useRouter();
    const [accessTokenData, setAccessTokenData] = useRecoilState(gmailAccessTokenDataAtom);

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
                        imgUrl="/home/202305/tasting/section-4.png"
                        title="똑같은 출금 내역은 그만! <br> 클릭 한 번으로 고민 해결"
                        desc2="
                        전부 다 카드사로 찍혀있을 때, 어디서 결제 된 건지 <br>
                        몰랐던 적 있었다면 스코디로 5초만에 확인 하세요."
                        direct="right"
                        CTAButton={<HomePageCTAButton2 text="지금 무료로 시작하기" />}
                    />

                    <USPSection
                        imgUrl="/home/202305/tasting/section-5.png"
                        title="청구 이메일 계정이 <br> 여러 개여도 걱정 끝!"
                        desc2="결제내역 받아보는 메일 주소를 모두 등록하면 <br> 일일이 메일함 찾을 필요 없이 확인할 수 있어요.
                    "
                        direct="left"
                        CTAButton={<HomePageCTAButton2 text="5초만에 결제 내역 확인" />}
                    />
                </div>

                <USPSectionCentered
                    title="<span class='md:text-6xl !leading-snug'>클릭 한 번으로 <br />시작해보세요</span>"
                    desc1="
                    <span class='text-lg md:text-2xl !leading-snug'>
                        카드 내역과 결제 영수증 인보이스,<br />
                        일일이 대조해서 서비스 지출항목 찾지 마세요.<br />
                        <b>스코디로 5초만에 확인할 수 있습니다.</b>
                    </span>
                    "
                    showCTA={true}
                    CTAButton={<HomePageCTAButton />}
                >
                    <div
                        className="text-center -mx-10 sm:mx-0"
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    >
                        <img src="/home/202305/section-6-image.svg" className="hidden sm:block" />
                        <img
                            src="/home/list.svg"
                            className="block sm:hidden w-full"
                            style={{objectFit: 'cover', minHeight: '300px'}}
                        />
                    </div>
                </USPSectionCentered>

                <BetaServiceFooter />
            </div>
        </AOSProvider>
    );
});
