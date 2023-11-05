import React, {memo, useEffect} from 'react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {CTAButton} from '^components/pages/LandingPages/HomePage2/CTAButton';
import {UserLoginPageRoute} from '^pages/users/login';
import {useOnResize} from '^hooks/useOnResize';
import {HomePageCTAButton} from '^components/pages/LandingPages/HomePage/CTAButton';
import {downloadScordiProposal} from '^components/pages/LandingPages/HomePage3/links';

export const HomePageHeader = memo(() => {
    const {isMobile} = useOnResize();
    const router = useRouter();
    const {t} = useTranslation('publicMain');

    // useEffect(() => {
    //     if (isMobile) {
    //         window.addEventListener('scroll', (e) => {
    //             const img = document.querySelector('#mobile-swiping-image')!;
    //             const moveTarget = img.closest('div')!;
    //             const section = img.closest('section')!;
    //             const sectionRect = section.getClientRects()[0];
    //             if (sectionRect) {
    //                 const size = 'calc(750px - 100% + 4rem)';
    //                 moveTarget.style.right = sectionRect.bottom <= window.innerHeight ? size : '0';
    //             }
    //         });
    //     }
    // }, [isMobile]);

    return (
        <>
            <div
                className="relative"
                style={{
                    backgroundImage: 'url(/home/202305/header-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="pt-[4em] pb-6"
                    style={{
                        backgroundImage: 'url(/home/202305/header-bg2.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <section id="section-1" className="hero mb-3">
                        <div className="text-center w-[100vw]">
                            <div className="mb-10">
                                <h1 className="text-4xl md:text-6xl font-bold mb-5 keep-all" style={{lineHeight: 1.3}}>
                                    우리 회사 SaaS 관리 <br />
                                    <span className="text-scordi">클릭 하나</span>로 끝내보세요
                                </h1>
                                <p className="text-[20px] leading-snug">
                                    스코디로 <b>한 눈에 확인</b>하고{' '}
                                    <span className="block sm:inline-block">
                                        <b>한 번에 관리</b>할 수 있어요.
                                    </span>
                                </p>

                                <div className="pt-7">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-[14px] sm:gap-4">
                                        <CTAButton className="btn btn-scordi normal-case shadow-lg w-[11em] text-[18px] sm:w-auto sm:btn-lg">
                                            도입 문의하기
                                        </CTAButton>
                                        <button
                                            className="btn normal-case shadow-lg w-[11em] text-[18px] sm:w-auto sm:btn-lg"
                                            onClick={() => downloadScordiProposal()}
                                        >
                                            소개서 전달받기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* pc */}
                    <section className="flex justify-center container">
                        <div className="relative flex items-center justify-center">
                            <img
                                className="main-header-img max-w-[90%] md:max-w-[70%]"
                                src="/images/landing/mockup-main-screen.png"
                                alt="service preview image"
                            />
                            <img
                                className="hidden md:inline-block main-header-img-left max-h-[13em] absolute"
                                src="/images/landing/mockup-notifications.png"
                                alt="notifications preview"
                            />
                            <img
                                className="hidden md:inline-block main-header-img-right max-h-[13em] absolute"
                                src="/images/landing/mockup-using-members.png"
                                alt="using members preview"
                            />
                        </div>
                    </section>

                    {/* mobile */}
                    <section className="hidden justify-center">
                        <div
                            className="hide-scrollbar"
                            style={{
                                // height: '450px',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                className="!pb-20"
                                style={{
                                    height: '100%',
                                    padding: '0 2rem',
                                    width: 'fit-content',
                                    position: 'relative',
                                    // right: '100%',
                                    right: '0',
                                    transition: 'all 800ms ease-in-out',
                                }}
                            >
                                <img
                                    id="mobile-swiping-image"
                                    src={t('image')!}
                                    alt="service preview image"
                                    style={{
                                        height: '450px',
                                        maxWidth: 'initial',
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    <section id="Featured LOGO" className="container max-w-[960px] py-4 sm:py-16 mt-8">
                        <p className="text-[20px] leading-[28px] text-center mb-6 text-gray-600 font-semibold">
                            성장하는 팀의 똑똑한 관리자들은 <span className="block sm:inline">이미 쓰고 있어요</span>
                        </p>
                        <div className="grid grid-cols-2 sm:flex items-center justify-around">
                            <div className="main-header-featured-customers-logo">
                                <img
                                    src="/images/landing/featured-customer-logo/business-canvas-2.png"
                                    alt="Business Canvas"
                                />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img
                                    style={{transform: 'scale(0.8)'}}
                                    src="/images/landing/featured-customer-logo/teamsparta-2.png"
                                    alt="Team Sparta"
                                />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/peopet-2.png" alt="Peopet" />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/testbank-2.png" alt="Testbank" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:flex items-center justify-around">
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/phylaxis-2.png" alt="Phylaxis" />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/teamcookie-2.png" alt="Team Cookie" />
                            </div>
                            {/*<div className="main-header-featured-customers-logo">*/}
                            {/*    <img src="/images/landing/featured-customer-logo/devd.png" alt="DevD" />*/}
                            {/*</div>*/}
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/corca-2.png" alt="Corca" />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/whattime-2.png" alt="Wattime" />
                            </div>
                        </div>
                    </section>
                </div>

                <div
                    className="w-full absolute bottom-0"
                    style={{
                        height: 'calc(1.5rem + 4rem + 4rem)',
                        background: 'linear-gradient(180deg, transparent, white 90%, white)',
                    }}
                />
            </div>

            {/* English IDEA */}
            {/*<section*/}
            {/*    className="py-[60px] sm:py-[60px] flex items-center justify-center"*/}
            {/*    style={{minHeight: 'calc(100vh * 1/3)'}}*/}
            {/*>*/}
            {/*    <div className="flex flex-col gap-6 sm:gap-12">*/}
            {/*        /!* title *!/*/}
            {/*        <div className="text-center flex flex-col gap-[1.5em]">*/}
            {/*            <h1 className="text-[32px] sm:text-[4em] leading-[1.2em]">*/}
            {/*                /!*SaaS Management <br /> for IT Startup*!/*/}
            {/*                /!*SaaS Manager <br /> for growing startup*!/*/}
            {/*                /!*SaaS Management <br /> Just in One-click*!/*/}
            {/*                Manage all your SaaS <br /> in one place*/}
            {/*            </h1>*/}
            {/*            <p className="text-[20px]">*/}
            {/*                /!*Scordi is the best way to <b>discover + optimize + automate</b> SaaS management for IT startups*!/*/}
            {/*                /!*Scordi is the best way to automate <b>SaaS spend + account management</b>*!/*/}
            {/*                /!*Start <b>discover + optimize + automate</b> SaaS management with Scordi*!/*/}
            {/*                No.1 SaaS management solution for IT startups*/}
            {/*            </p>*/}
            {/*        </div>*/}

            {/*        /!* cta button *!/*/}
            {/*        <div className="flex items-center justify-center gap-2">*/}
            {/*            <button*/}
            {/*                className="btn btn-scordi sm:btn-lg normal-case"*/}
            {/*                onClick={() => router.push(UserLoginPageRoute.path())}*/}
            {/*            >*/}
            {/*                Start now*/}
            {/*            </button>*/}
            {/*            <CTAButton className="btn sm:btn-lg normal-case">Request Demo</CTAButton>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    );
});
