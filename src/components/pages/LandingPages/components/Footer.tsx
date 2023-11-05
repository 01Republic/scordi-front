import React, {HTMLAttributeAnchorTarget, memo, useEffect, useState} from 'react';
import Image from 'next/image';
import {useTranslation} from 'next-i18next';
import {Channels} from '^components/pages/LandingPages/components/Footer/Channels';
import {FooterBottom} from '^components/pages/LandingPages/components/Footer/FooterBottom';

export const BetaServiceFooter2 = memo(() => {
    return (
        <footer className="footer p-10 text-neutral-content">
            <div>
                <Image
                    src="/logo-transparent.png"
                    alt="Scordi logo"
                    width={50}
                    height={50}
                    className="relative top-1 mr-1"
                />
                <p className="font-bold text-lg">01Republic, Inc</p>
                <p>Copyright © 2023 - All right reserved</p>
            </div>
            <div>
                <p className="footer-title">
                    상호: (주) 제로원리퍼블릭 <br />
                    대표자: 김용현 <br />
                    주소: 서울특별시 강남구 영동대로85길 34, 9층 907호 <br />
                    전화번호: 010-2482-4541 <br />
                    사업자등록번호: 227-86-02683 <br />
                </p>
            </div>
        </footer>
    );
});

export const BetaServiceFooter = memo(() => {
    const {t} = useTranslation('publicFooter');

    return (
        <>
            <footer className="footer py-10 text-neutral-content pb-[100px]">
                <div className="container px-4 sm:px-0">
                    <div className="md:flex w-full">
                        <div className="mr-auto">
                            <div className="mb-4">
                                <img
                                    src="/images/logo/scordi/01republic/png/long-black.png"
                                    alt="01Republic, Inc."
                                    className="h-[1.5rem]"
                                    loading="lazy"
                                />
                            </div>

                            <address className="mb-4" style={{fontStyle: 'normal'}}>
                                <p className="text-[13px] leading-[20px] whitespace-pre-wrap text-gray-500">
                                    {t('companyName')} <br />
                                    {t('regNo.label')} : {t('regNo.value')} | {t('ceo.label')} : {t('ceo.value')} <br />
                                    {/*전화번호 : 010-2482-4541 | 통신판매업 신고번호 : 제2020-서울강남-01164호 사업자정보*/}
                                    {/*확인 <br />*/}
                                    {t('tel.label')} : {t('tel.value')} | {t('contact.label')} : {t('contact.value')}{' '}
                                    <br />
                                    {t('address')} <br />
                                </p>
                            </address>
                        </div>

                        {/* 푸터에 추가 열 들어가는거 형태 잡아뒀어서 코드 지우지 않고 주석처리 해둡니다. */}
                        {/*<div className="min-w-[240px]">*/}
                        {/*    <div className="pt-[24px] sm:pt-0 pb-[30px]">*/}
                        {/*        <p className="text-[15px] font-semibold mb-[16px]">{t('terms.heading')}</p>*/}
                        {/*        <ul className="menu gap-2 text-[13px] text-gray-500">*/}
                        {/*            <TermLinkItem*/}
                        {/*                href="https://api.scordi.io/terms/serviceUsageTerm-v20221101-1.txt"*/}
                        {/*                name={t('terms.serviceUsage')}*/}
                        {/*            />*/}
                        {/*            <TermLinkItem*/}
                        {/*                href="https://api.scordi.io/terms/개인정보처리방침-v20221101-1.html"*/}
                        {/*                name={t('terms.privacy')}*/}
                        {/*            />*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <Channels />
                    </div>
                </div>
            </footer>
            <FooterBottom />
        </>
    );
});
