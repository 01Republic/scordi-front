import React, {memo, useEffect} from 'react';
import {HomePageCTAButton} from './CTAButton';
import {useOnResize} from '^hooks/useOnResize';

export const HomePageHeader = memo(() => {
    const {mobileView} = useOnResize();

    useEffect(() => {
        const img = document.querySelector('#mobile-swiping-image')!;
        const moveTarget = img.closest('div')!;
        const section = img.closest('section')!;

        if (mobileView) {
            window.addEventListener('scroll', (e) => {
                const sectionRect = section.getClientRects()[0];
                moveTarget.style.right = sectionRect.bottom <= window.innerHeight ? '120%' : '0';
            });
        }
    }, [mobileView]);

    return (
        <div
            style={{
                backgroundImage: 'url(/home/202305/header-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="py-6 sm:py-14"
                style={{
                    backgroundImage: 'url(/home/202305/header-bg2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <section id="section-1" className="hero mb-3">
                    <div className="text-center w-[100vw]">
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-6xl font-bold mb-5" style={{lineHeight: 1.3}}>
                                서비스 결제 내역 <br />
                                <span className="text-scordi">클릭 한 번</span>으로 확인하세요
                                {/*SaaS 관리 <br /> <span className="text-scordi">클릭 한 번</span>으로 끝내보세요*/}
                            </h1>
                            {/*<h1 className="text-5xl mb-3">Find all your team subscription usage</h1>*/}
                            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                            {/*<p className="text-xl text-gray-500">*/}
                            {/*    카드 내역과 결제 영수증 인보이스{' '}*/}
                            {/*    <span className="block sm:inline-block">일일이 대조해서 찾지 마세요.</span> <br />*/}
                            {/*    <b className="text-gray-900">스코디로 딱 5초만에 확인할 수 있습니다.</b>*/}
                            {/*</p>*/}

                            <div className="py-7">
                                <HomePageCTAButton />
                            </div>
                        </div>
                    </div>
                </section>

                {/* pc */}
                <section className="hidden md:flex justify-center container">
                    <img
                        className="sm:max-w-[80%] md:max-w-[80%]"
                        src="/home/202305/tasting/header-image.png"
                        alt="service preview image"
                    />
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
                                src="/home/202305/tasting/header-image.png"
                                alt="service preview image"
                                className="shadow-2xl"
                                style={{
                                    height: '450px',
                                    maxWidth: 'initial',
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
