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
import {MainPageCTAButton} from '^components/pages/LandingPages/202305/MainPage/CTAButton';

export const LandingPage202305MainPage = memo(() => {
    return (
        <AOSProvider>
            <div className="bg-white">
                <LandingPageNavBar showLoginButton={false} className="p-4">
                    <button className="btn btn-sm btn-scordi-light-100 !text-scordi-500">클로즈베타 사전신청</button>
                </LandingPageNavBar>

                <MainPageHeader />
                <HeaderSubLine />

                <USPSectionCentered
                    title="복잡하게 SaaS 관리 하고 있지는 않으신가요? <br />스코디로 생산성을 높여보세요"
                    showCTA={false}
                >
                    <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <img src="/home/202305/section-3-left.png" style={{maxHeight: '400px'}} />

                        <div className="btn btn-block rounded-full btn-lg bg-gray-200 hover:bg-gray-200 shadow text-2xl font-bold text-gray-400">
                            서비스마다 일일이 관리
                        </div>
                    </div>

                    <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <img src="/home/202305/section-3-right.png" style={{maxHeight: '400px'}} />

                        <div className="btn btn-block rounded-full btn-lg bg-scordi-200 hover:bg-scordi-200 shadow text-2xl font-bold text-scordi-600">
                            스코디가 한 번에 관리
                        </div>
                    </div>
                </USPSectionCentered>

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

                <USPSectionCentered
                    title="<span class='text-6xl'>클릭 한 번으로 <br />시작해보세요</span>"
                    desc1="자주 사용되지 않는 계정에 대한 비용, 지원 온보딩의 번거로움, <br /> 퇴사 후에도 데이터에 엑세스 할 수 있는 보안 위험까지 해결하니까. <br /> <b>SaaS 관리는 정말 어렵지만, 스코디와 함께라면 쉽습니다.</b>"
                    showCTA={true}
                    CTAButton={<MainPageCTAButton />}
                >
                    <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <img src="/home/202305/section-6-image.svg" />
                    </div>
                </USPSectionCentered>

                <BetaServiceFooter />

                <BetaUserApplyCTAButtonMobile />

                <BetaUserApplyModal />
            </div>
        </AOSProvider>
    );
});
