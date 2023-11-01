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

export const LandingHomePage3 = memo(() => {
    const {t} = useTranslation('publicMain');

    return (
        <AOSProvider>
            <HeadTag />

            <div className="bg-white">
                <LandingPageNavBar showLoginButton={true} sticky bgBlur />

                <HomePageHeader />
                <CollectAppSection />
                <StatsSection />

                <HomePageSection3 />

                <div className="py-16 md:py-0">
                    {/* 간단하고 쉬운 연동 */}
                    <USPSection2
                        label="간단하고 쉬운 연동"
                        imgUrl={t('section4.image')}
                        title={`모든 앱을 찾아드려요`}
                        desc1={
                            <span>
                                클릭 한 번에 그 동안 잊고있던 앱까지 빠짐없이!{' '}
                                <span className="block">우리 회사에서 사용하는 모든 앱을 찾고 동기화하세요</span>
                            </span>
                        }
                        desc2={
                            <ul>
                                <li>🚩 세상에서 가장 빠른 원 클릭 연동</li>
                                <li>🚩 주기적인 업데이트 & 동기화</li>
                                <li>🚩 잠재적인 위험 방지</li>
                            </ul>
                        }
                        imgWidth="50%"
                        direct="right"
                        CTAButton={<HomePageCTAButton2 text={t('section4.cta')!} />}
                    />

                    {/* 구독현황 홈/분석 */}
                    <USPSection2
                        label="구독현황 홈 & 분석"
                        imgUrl={t('section5.image')}
                        title={<span>누가, 무엇을, 얼마에 쓰는지 구독 현황을 한눈에!</span>}
                        desc1={<span>더 쉽게 파악하고, 필요한 조치를 확인하세요</span>}
                        desc2={
                            <ul>
                                <li>🚩 대시보드와 분석</li>
                                <li>🚩 팀별, 멤버별 서비스 이용현황</li>
                                <li>🚩 서비스별 결제수단 관리</li>
                            </ul>
                        }
                        imgWidth="50%"
                        direct="left"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />

                    {/* 결제내역 */}
                    <USPSection2
                        label="결제내역"
                        imgUrl={t('section5.image')}
                        title={<span></span>}
                        desc1={<span></span>}
                        desc2={<span></span>}
                        imgWidth="50%"
                        direct="right"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />

                    {/* 일정과 알림 */}
                    <USPSection2
                        label="일정과 알림"
                        imgUrl={t('section5.image')}
                        title={`신경쓰지 않아도, 놓칠 수 없도록!`}
                        desc1={
                            <span>
                                서비스별로 천차만별인 정책들부터,{' '}
                                <span className="block">주요 변경에 따른 알림까지.</span>
                                <span className="block">스코디가 지켜드릴게요!</span>
                            </span>
                        }
                        desc2={
                            <ul>
                                <li>🚩 서비스 의사결정 어드바이저</li>
                                <li>🚩 업데이트 소식 알림</li>
                                <li>🚩 이상한 사용 패턴 탐지 & 위험 알림</li>
                            </ul>
                        }
                        imgWidth="50%"
                        direct="left"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />

                    {/* 계정 */}
                    <USPSection2
                        label="계정 & 보안"
                        imgUrl={t('section5.image')}
                        title={`가장 민감한 계정 공유도! 안전하고 손쉽게 관리하세요`}
                        desc1={
                            <span>
                                퇴사자로 인한 비밀번호 변경, 권한 제어..{' '}
                                <span className="block">노션과 엑셀로는 충분하지 않으니까</span>
                            </span>
                        }
                        desc2={
                            <ul>
                                <li>🚩 계정 자동완성 확장프로그램</li>
                                <li>🚩 사용자별 공유 권한 설정</li>
                                <li>🚩 비밀번호 변경과 유지관리도 한 번에</li>
                            </ul>
                        }
                        imgWidth="50%"
                        direct="right"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />

                    {/* 멤버 */}
                    <USPSection2
                        label="멤버"
                        imgUrl={t('section5.image')}
                        title={<span></span>}
                        desc1={<span></span>}
                        desc2={<span></span>}
                        imgWidth="50%"
                        direct="left"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />

                    {/* 자동화 */}
                    <USPSection2
                        label="자동화"
                        imgUrl={t('section5.image')}
                        title={`필요한 조치도 일일이 들어가지 않고 한 곳에서!`}
                        desc1={<span></span>}
                        desc2={<span></span>}
                        imgWidth="50%"
                        direct="right"
                        CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
                    />
                </div>

                {/* 이외에도 더 많은 기능들을 준비하고 있어요 */}

                {/*후기 & 샤라웃*/}
                {/*안심하세요 우리가 우리의 첫 고객이다최고의제품으로 보답하겠다.*/}
                {/*Faq*/}

                <WhatTimeWidget />

                <Section4 />

                <BetaServiceFooter />
            </div>

            <InquiryModal />
        </AOSProvider>
    );
});
