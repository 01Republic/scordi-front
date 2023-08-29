import React, {memo, useEffect} from 'react';
import {HomePageCTAButton} from './CTAButton';
import {useOnResize} from '^hooks/useOnResize';
import {useTranslation} from 'next-i18next';

export const HomePageHeader = memo(() => {
    const {mobileView} = useOnResize();
    const {t} = useTranslation('publicMain');

    useEffect(() => {
        if (mobileView) {
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
                                {t('headline.line1')} <br />
                                <span dangerouslySetInnerHTML={{__html: t('headline.line2')}} />
                                {/*SaaS 관리 <br /> <span className="text-scordi">클릭 한 번</span>으로 끝내보세요*/}
                            </h1>
                            {/*<h1 className="text-5xl mb-3">Find all your team apps usage</h1>*/}
                            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                            {/*<p className="text-xl text-gray-500">*/}
                            {/*    카드 내역과 결제 영수증 인보이스{' '}*/}
                            {/*    <span className="block sm:inline-block">일일이 대조해서 찾지 마세요.</span> <br />*/}
                            {/*    <b className="text-gray-900">스코디로 딱 5초만에 확인할 수 있습니다.</b>*/}
                            {/*</p>*/}

                            <div className="py-7">
                                {/*<div*/}
                                {/*    className="tooltip tooltip-open tooltip-primary tooltip-bottom"*/}
                                {/*    data-tip="아직 구글 검수중이에요! 🛠️"*/}
                                {/*>*/}
                                <HomePageCTAButton />
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </section>

                {/* pc */}
                <section className="hidden md:flex justify-center container">
                    <img className="sm:max-w-[80%] md:max-w-[70%]" src={t('image')!} alt="service preview image" />
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
            </div>
        </div>
    );
});
