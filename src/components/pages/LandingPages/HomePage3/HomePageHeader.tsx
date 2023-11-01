import React, {memo, useEffect} from 'react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {CTAButton} from '^components/pages/LandingPages/HomePage2/CTAButton';
import {UserLoginPageRoute} from '^pages/users/login';
import {useOnResize} from '^hooks/useOnResize';
import {HomePageCTAButton} from '^components/pages/LandingPages/HomePage/CTAButton';

export const HomePageHeader = memo(() => {
    const {isMobile} = useOnResize();
    const router = useRouter();
    const {t} = useTranslation('publicMain');

    useEffect(() => {
        if (isMobile) {
            window.addEventListener('scroll', (e) => {
                const img = document.querySelector('#mobile-swiping-image')!;
                const moveTarget = img.closest('div')!;
                const section = img.closest('section')!;
                const sectionRect = section.getClientRects()[0];
                if (sectionRect) {
                    const size = 'calc(750px - 100% + 4rem)';
                    moveTarget.style.right = sectionRect.bottom <= window.innerHeight ? size : '0';
                }
            });
        }
    }, [isMobile]);

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
                    className="pt-[8em] pb-6 sm:pt-[10em]"
                    style={{
                        backgroundImage: 'url(/home/202305/header-bg2.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <section id="section-1" className="hero mb-3">
                        <div className="text-center w-[100vw]">
                            <div className="mb-10">
                                <h1 className="text-5xl md:text-7xl font-bold mb-5 keep-all" style={{lineHeight: 1.3}}>
                                    막막한 우리회사 SaaS 관리 <br />
                                    <span className="text-scordi">클릭 한 번</span>에 끝내보세요
                                </h1>
                                <p className="text-[20px]">
                                    스코디는 IT 스타트업을 위한{' '}
                                    <span className="block sm:inline-block">
                                        <b>No.1 SaaS 관리 솔루션</b> 입니다.
                                    </span>
                                </p>

                                <div className="py-7">
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            className="btn btn-scordi sm:btn-lg normal-case shadow-lg"
                                            onClick={() => router.push(UserLoginPageRoute.path())}
                                        >
                                            시작하기
                                        </button>
                                        <CTAButton className="btn sm:btn-lg normal-case shadow-lg">
                                            데모 요청하기
                                        </CTAButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* pc */}
                    <section className="hidden md:flex justify-center container">
                        <div className="relative flex items-center justify-center">
                            <img
                                className="main-header-img sm:max-w-[80%] md:max-w-[70%]"
                                src="/images/landing/mockup1.png"
                                alt="service preview image"
                            />
                            <img
                                className="main-header-img-right sm:max-h-[24em] md:max-h-[24em] absolute"
                                src="/images/landing/mockup1-left.png"
                                alt="service preview image"
                            />
                        </div>
                    </section>

                    {/* mobile */}
                    <section className="flex md:hidden justify-center">
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
                        <p className="text-[18px] text-center mb-6 text-gray-600 font-semibold">
                            성장하고 있는 여러 고객사들과 함께하고 있습니다
                        </p>
                        <div className="grid grid-cols-2 sm:flex items-center justify-around">
                            <div className="main-header-featured-customers-logo">
                                <img
                                    style={{transform: 'scale(1.25)'}}
                                    src="/images/landing/featured-customer-logo/business-canvas.png"
                                    alt="Business Canvas"
                                />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img
                                    style={{transform: 'scale(3)'}}
                                    src="/images/landing/featured-customer-logo/teamsparta.png"
                                    alt="Team Sparta"
                                />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/peopet.png" alt="Peopet" />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img
                                    style={{transform: 'scale(1.25)'}}
                                    src="/images/landing/featured-customer-logo/testbank.png"
                                    alt="Testbank"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:flex items-center justify-around">
                            <div className="main-header-featured-customers-logo">
                                <img
                                    style={{transform: 'scale(0.8)'}}
                                    src="/images/landing/featured-customer-logo/phylaxis.png"
                                    alt="Phylaxis"
                                />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/teamcookie.png" alt="Team Cookie" />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img src="/images/landing/featured-customer-logo/devd.png" alt="DevD" />
                            </div>
                            <div className="main-header-featured-customers-logo">
                                <img
                                    style={{transform: 'scale(2.75)'}}
                                    src="/images/landing/featured-customer-logo/corca.png"
                                    alt="Corca"
                                />
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
