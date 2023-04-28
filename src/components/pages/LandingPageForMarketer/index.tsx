import React, {memo, useEffect} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

import AOS from 'aos';
import 'aos/dist/aos.css';
import {LandingPageForMarketerHeader} from './Header';
import {USPSection} from './USPSection';
import {LandingPageForMarketerCTAButton, LandingPageForMarketerCTAButtonMobile} from './CTAButton';
import {LandingPageForMarketerFooter} from './Footer';
import {LandingPageForMarketerModal} from './Modal';
import {MarqueeMoving} from '^components/pages/LandingPageForMarketer/MarqueeMoving';

export const LandingPageForMarketer = memo(() => {
    useEffect(() => {
        AOS.init({duration: 750});
    }, []);

    return (
        <div className="bg-white">
            <LandingPageNavBar fluid={true} showLoginButton={false} className="p-4" />

            <LandingPageForMarketerHeader />

            <section className="py-10 flex flex-col gap-6 overflow-hidden">
                {/*<h2*/}
                {/*    className="text-4xl font-bold pt-8 pb-4 text-center"*/}
                {/*    data-aos="fade-up"*/}
                {/*    data-aos-anchor-placement="center-bottom"*/}
                {/*>*/}
                {/*    !!!*/}
                {/*</h2>*/}

                <MarqueeMoving
                    imageUrls={[
                        '/logo/services/meta-business.png',
                        '/logo/services/appsflyer.png',
                        '/logo/services/amplitude.png',
                        '/logo/services/google-ads.png',
                        '/logo/services/slack.png',
                        '/logo/services/naver-ads.png',
                        '/logo/services/mixpannel.png',
                        '/logo/services/braze.png',
                    ]}
                />

                <MarqueeMoving
                    imageUrls={[
                        '/logo/services/adobe.png',
                        '/logo/services/semrush.png',
                        '/logo/services/sensor-tower.png',
                        '/logo/services/mail-chimp.png',
                        '/logo/services/giftishow-biz.png',
                        '/logo/services/stibee.png',
                        '/logo/services/ppurio.png',
                        '/logo/services/dable.png',
                    ]}
                    reverse={true}
                />
            </section>

            <div className="hero bg-base-200 md:min-h-[80vh]">
                <div className="hero-content text-center w-full max-w-full px-10">
                    <div className="w-full py-16 md:py-20">
                        <h1
                            className="text-3xl md:text-5xl font-bold mb-10"
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                        >
                            흩어진 비용을 한 곳에서
                        </h1>
                        <div className="flex justify-center mb-10">
                            <img
                                src="https://framerusercontent.com/images/Ec3vV3pbJwNMgKpP6kGUOuWbe6E.png?scale-down-to=1024"
                                className="md:w-[60%] mx-auto"
                                data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom"
                            />
                        </div>
                        <p
                            className="mb-6 text-lg md:text-xl font-light text-gray-500"
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                        >
                            스코디는 로그인 즉시,{' '}
                            <span className="block md:inline-block">곧바로 마케팅 예산 소진 내역을 보여드립니다.</span>
                            <br />
                            광고 관리자 페이지에 일일이 로그인부터,{' '}
                            <span className="block md:inline-block">비용 복사 후 엑셀에 붙여넣기까지..</span>
                            <br />
                            번거로운 운영 작업 없이{' '}
                            <span className="block md:inline-block">매체별 광고비를 1분만에 확인하세요.</span>
                        </p>
                    </div>
                </div>
            </div>

            <USPSection
                imgUrl="https://framerusercontent.com/images/h5uwiBXnbceRoz8qlm7h2QEWB7U.png?scale-down-to=1024"
                imgWidth="60%"
                title="클릭 한 번으로<br> <span class='text-scordi'>부가세</span>까지 확인"
                desc1="vat 금액이 포함되지 않은 경우가 있어,<br> 실제 비용 소진 내역과 <span class='block md:inline-block'>다르게 기입하고 있지 않으셨나요?</span>"
                desc2="부가세 포함/제외에 따른 <span class='block md:inline-block'>소진 내역을 즉시 확인하고<br></span> 똑똑하게 광고비를 관리해요."
                direct="right"
                bgGray={false}
            />
            <USPSection
                imgUrl="https://framerusercontent.com/images/YViG6JTwUnYeOQ3r3kvTn1CDwo.png"
                imgWidth="60%"
                title="자동으로 <span class='text-scordi'>환율</span>까지 <span class='block md:inline-block'>계산하여 예산관리</span>"
                desc2="글로벌 매체를 집행 할 때, <span class='block md:inline-block'>사용된 달러를 원화로 변환하여 입력하는</span> 번거로움까지 단번에 해결해드려요."
                direct="left"
                bgGray={false}
            />
            <USPSection
                imgUrl="https://framerusercontent.com/images/qCVYWuOMXVxC3qm64XYA8ctw.png?scale-down-to=512"
                imgWidth="50%"
                title="<span class='text-scordi'>매출 증가</span>를 위한,<br> 적절한 마케팅 예산배정"
                desc1="월 할당된 예산대비 <span class='block md:inline-block'>실제로 얼만큼 소진했는지 공유하여,<br></span> 매체별로 마케팅 예산을 <span class='block md:inline-block'>한꺼번에 조율할 수 있도록 도와드려요.</span>"
                desc2="단순 매체 비용 내역 통합이 아닌 <span class='block md:inline-block'>정보까지 연동되어<br></span> 편리한 비용 관리가 가능해요."
                direct="right"
                bgGray={true}
            />

            <div className="hero bg-scordi-light-300">
                <div className="hero-content text-center w-full max-w-full px-8">
                    <div className="w-full py-20" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <h1 className="text-3xl md:text-5xl font-bold mb-10 leading-snug">
                            예산 관리, <br /> <span className="text-scordi">스코디</span>에게 맡기고 고객에만 집중하세요
                        </h1>
                        <LandingPageForMarketerCTAButton reverseColor={true} useArrow={true} mobileShow={true} />
                    </div>
                </div>
            </div>

            <LandingPageForMarketerFooter />

            <LandingPageForMarketerCTAButtonMobile />

            <LandingPageForMarketerModal />
        </div>
    );
});
