import React, {memo} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {
    AOSProvider,
    BetaServiceFooter,
    BetaUserApplyCTAButtonMobile,
    BetaUserApplyModal,
    USPSection,
    USPSectionCentered,
} from '^components/pages/LandingPages/components';
import {MainPageHeader} from './Header';
import {HeaderSubLine} from './HeaderSubLine';
import {MainPageCTAButton, MainPageCTAButtonMobile} from '^components/pages/LandingPages/202305/MainPage/CTAButton';
import {useRouter} from 'next/router';
import {TastingPageRoute} from '^pages/tasting';

export const LandingPage202305MainPage = memo(() => {
    const router = useRouter();

    return (
        <AOSProvider>
            <div className="bg-white">
                <LandingPageNavBar showLoginButton={false} className="p-4">
                    <button
                        onClick={() => router.push(TastingPageRoute.path())}
                        className="btn btn-sm btn-scordi-light-100 !text-scordi-500"
                    >
                        클로즈베타 사전신청
                    </button>
                </LandingPageNavBar>

                <MainPageHeader />
                <HeaderSubLine />

                <USPSectionCentered
                    title="SaaS, <span class='block md:inline'>전부 따로 관리하세요?<br /></span> 스코디에게 맡겨주세요"
                    showCTA={false}
                >
                    <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <img src="/home/202305/section-3-left.png" style={{maxHeight: '400px'}} />

                        <div className="btn btn-block rounded-full sm:btn-lg bg-gray-200 hover:bg-gray-200 shadow text-xl sm:text-2xl font-bold text-gray-400">
                            서비스마다 일일이 관리
                        </div>
                    </div>

                    <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <img src="/home/202305/section-3-right.png" style={{maxHeight: '400px'}} />

                        <div className="btn btn-block rounded-full sm:btn-lg bg-scordi-200 hover:bg-scordi-200 shadow text-xl sm:text-2xl font-bold text-scordi-600">
                            스코디가 한 번에 관리
                        </div>
                    </div>
                </USPSectionCentered>

                <div className="pt-20 pb-10 md:py-0">
                    <USPSection
                        imgUrl="/home/202305/section-4-image.png"
                        title="업무 효율성을 높여<br>시간과 비용 감소"
                        desc2="
                    얼마나 쓰고 있을지 고민 할 필요 없이<br>
                    클릭 한 번에 서비스를 이용하고 있는 구성원과 <br>
                    SaaS 지출 내역을 모두 확인 할 수 있어요
                    "
                        direct="right"
                        CTAButton={<MainPageCTAButton />}
                    />

                    <USPSection
                        imgUrl="/home/202305/section-5-image.png"
                        title="계정 연동과 해지도<br>똑똑하게 관리"
                        desc2="
                    일일이 초대하지 않고 신규 입사자 계정과 <br>
                    SaaS 정보만 입력하면 즉시 연동해요. <br>
                    퇴사시에는 모든 SaaS 권한이 해제되어 <br>
                    회사 데이터 보안까지 지킬 수 있어요.
                    "
                        direct="left"
                        CTAButton={<MainPageCTAButton />}
                    />
                </div>

                <USPSectionCentered
                    title="<span class='md:text-6xl'>클릭 한 번으로 <br />시작해보세요</span>"
                    desc1="자주 사용되지 않는 계정에 대한 비용, <span class='block md:inline'>직원 온보딩의 번거로움, <br /></span> 퇴사 후에도 데이터에 엑세스 할 수 있는 <span class='block md:inline'>보안 위험까지 해결하니까.</span><br /> <b class='text-xl md:text-lg'>SaaS 관리는 정말 어렵지만, <span class='block md:inline'>스코디와 함께라면 쉽습니다.</span></b>"
                    showCTA={true}
                    CTAButton={<MainPageCTAButton />}
                >
                    <div
                        className="text-center -mx-10 sm:mx-0"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
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

                <MainPageCTAButtonMobile />

                <BetaUserApplyModal />
            </div>
        </AOSProvider>
    );
});
