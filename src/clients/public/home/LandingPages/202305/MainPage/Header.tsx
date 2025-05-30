import React, {memo} from 'react';
import Image from 'next/image';
import {MainPageCTAButton} from './CTAButton';

export const MainPageHeader = memo(() => {
    return (
        <div
            style={{
                backgroundImage: 'url(/home/202305/header-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="pt-6 sm:pt-14"
                style={{
                    backgroundImage: 'url(/home/202305/header-bg2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <section id="section-1" className="hero mb-3">
                    <div className="hero-content text-center">
                        <div className="">
                            <h1 className="text-3xl md:text-6xl font-bold" style={{lineHeight: 1.3}}>
                                SaaS 관리 <br /> <span className="text-scordi">클릭 한 번</span>으로 끝내보세요
                            </h1>

                            <div className="py-7">
                                <MainPageCTAButton mobileShow={true} aos={false} />
                            </div>

                            {/*/!* pc *!/*/}
                            {/*<p className="text-2xl py-6 hidden md:block" style={{lineHeight: 1.7}}>*/}
                            {/*    잘 사용되지 않는 계정에 대한 비용, 직원 온보딩의 번거로움,*/}
                            {/*    <br />*/}
                            {/*    민감한 데이터에 액세스할 수 있는 퇴사자 까지.*/}
                            {/*    <br />*/}
                            {/*    <b>SaaS 관리는 정말 어렵지만, Scordi와 함께라면 쉽습니다.</b>*/}
                            {/*</p>*/}
                            {/*/!* mobile *!/*/}
                            {/*<p className="text-lg py-6 block md:hidden" style={{lineHeight: 1.7}}>*/}
                            {/*    잘 사용되지 않는 계정에 대한 비용,*/}
                            {/*    <br /> 직원 온보딩의 번거로움,*/}
                            {/*    <br />*/}
                            {/*    민감한 데이터에 액세스할 수 있는 퇴사자 까지.*/}
                            {/*    <br />*/}
                            {/*    <br />*/}
                            {/*    <b>*/}
                            {/*        SaaS 관리는 정말 어렵지만,*/}
                            {/*        <br /> 스코디와 함께라면 쉽습니다.*/}
                            {/*    </b>*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </section>

                {/* pc */}
                <section className="hidden md:flex justify-center pb-20 container">
                    <img src="/home/202305/header-image.png" alt="service preview image" />
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
                                transition: 'all 200ms ease',
                            }}
                        >
                            <img
                                src="/home/202305/header-image.png"
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
