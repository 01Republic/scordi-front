import React, {memo, useEffect} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

import AOS from 'aos';
import 'aos/dist/aos.css';
import {LandingPageForMarketerHeader} from './Header';
import {USPSection} from './USPSection';
import {LandingPageForMarketerCTAButton, LandingPageForMarketerCTAButtonMobile} from './CTAButton';
import {LandingPageForMarketerFooter} from './Footer';
import {LandingPageForMarketerModal} from './Modal';

export const LandingPageForMarketer = memo(() => {
    useEffect(() => {
        AOS.init({duration: 1000});
    }, []);

    return (
        <>
            <LandingPageNavBar fluid={true} showLoginButton={false} className="p-4" />

            <LandingPageForMarketerHeader />

            <div className="hero bg-base-200 sm:min-h-[80vh]">
                <div className="hero-content text-center w-full max-w-full px-10">
                    <div className="w-full py-16 sm:py-20" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-10">고객은 기다리지 않습니다</h1>
                        <div className="flex justify-center mb-10">
                            <img
                                src="https://framerusercontent.com/images/Ec3vV3pbJwNMgKpP6kGUOuWbe6E.png?scale-down-to=1024"
                                className="sm:w-[60%] mx-auto"
                            />
                        </div>
                        <p className="mb-6 sm:text-xl font-light text-gray-500">
                            기다림이 길어질수록 고객은 하나둘씩 이탈합니다. <br />
                            리캐치는 고객이 구매 문의를 넣는 즉시, <br />
                            곧바로 미팅으로 연결합니다. <br />
                            문의 확인부터, 팀원 배정, 미팅 일정 조율까지… <br />
                            번거롭고 긴 프로세스로 고객을 경쟁사에 뺏기지 마세요.
                        </p>
                    </div>
                </div>
            </div>

            <USPSection
                imgUrl="https://framerusercontent.com/images/h5uwiBXnbceRoz8qlm7h2QEWB7U.png?scale-down-to=1024"
                imgWidth="60%"
                title="클릭 한 번으로<br> 부가세까지 확인"
                desc1="vat 금액이 포함되지 않은 경우가 있어,<br> 실제 비용 소진 내역과 다르게 기입하고 있지 않으셨나요?"
                desc2="부가세 포함/제외에 따른 소진 내역을 즉시 확인하여<br> 똑똑하게 광고비를 관리해요."
                direct="right"
            />
            <USPSection
                imgUrl="https://framerusercontent.com/images/YViG6JTwUnYeOQ3r3kvTn1CDwo.png"
                imgWidth="60%"
                title="자동으로 환율까지 계산하여 예산 관리"
                desc2="글로벌 매체를 집행 할 때, 사용된 달러를 원화로 변환하여 입력하는 번거로움까지 단번에 해결해드려요."
                direct="left"
            />
            <USPSection
                imgUrl="https://framerusercontent.com/images/qCVYWuOMXVxC3qm64XYA8ctw.png?scale-down-to=512"
                imgWidth="50%"
                title="매출 증가를 위한 투자비용,<br> 적절한 마케팅 예산 배정"
                desc1="월 할당된 예산대비 실제로 어느 정도 비용을 소진했는지 공유하여,<br> 매체별로 마케팅 예산을 한꺼번에 조율할 수 있도록 도와드려요."
                desc2="단순 매체 비용 내역 통합이 아닌 정보까지 연동되어<br> 편리한 비용 관리가 가능해요."
                direct="right"
            />

            <div className="hero bg-primary-content">
                <div className="hero-content text-center w-full max-w-full px-8">
                    <div className="w-full py-20" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-10 leading-snug">
                            예산 관리, <br /> <span className="text-primary">스코디</span>에게 맡기고 고객에만
                            집중하세요
                        </h1>
                        <LandingPageForMarketerCTAButton reverseColor={true} useArrow={true} mobileShow={true} />
                    </div>
                </div>
            </div>

            <LandingPageForMarketerFooter />

            <LandingPageForMarketerCTAButtonMobile />

            <LandingPageForMarketerModal />
        </>
    );
});
