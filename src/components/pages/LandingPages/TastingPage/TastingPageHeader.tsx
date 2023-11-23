import React, {memo} from 'react';
import {FindByGmailButton} from './FindByGmailButton';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {SummarySection2} from '^components/pages/LandingPages/TastingPage/SummarySection';
import {TypeAnimation} from 'react-type-animation';
import {useTranslation} from 'next-i18next';
import {GoogleComplianceDisclosureTag} from '^components/GoogleCompliance';

export const TastingPageHeader = memo(() => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const {t} = useTranslation('publicTasting');

    // Before

    if (isLoading) return <TastingPageHeaderInLoading />;

    return (
        <div>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            <div
                                className="absolute w-[50%] h-[100%] right-0 bottom-0"
                                style={{
                                    backgroundImage:
                                        'url(https://i.pinimg.com/originals/b1/7d/21/b17d21020e6a6374ce0637918c844d18.gif)',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    // transform: 'scale(1.2)',
                                }}
                            />

                            <h1
                                className="text-3xl md:text-6xl font-bold mb-8 relative"
                                style={{lineHeight: 1.3}}
                                dangerouslySetInnerHTML={{__html: t('InvoiceTrackerApp.title')}}
                            />
                            {/*<h1 className="text-5xl mb-3">Find all your team apps usage</h1>*/}
                            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                            <p className="text-2xl text-gray-500 mb-8 relative" style={{lineHeight: 1.7}}>
                                {t('InvoiceTrackerApp.subtitle1')}{' '}
                                <span className="block sm:inline-block">{t('InvoiceTrackerApp.subtitle2')}</span> <br />
                                <b className="text-gray-900">{t('InvoiceTrackerApp.subtitle3')}</b>
                            </p>

                            <div className="py-7 relative">
                                <FindByGmailButton />
                                <GoogleComplianceDisclosureTag />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});

const TastingPageHeaderInLoading = memo(() => {
    const {t} = useTranslation('publicTasting');

    return (
        <div>
            <div className="pt-6 sm:pt-14">
                <section id="section-1" className="hero mb-3">
                    <div className="text-center w-[100vw]">
                        <div className="mb-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-5 relative" style={{lineHeight: 1.3}}>
                                {t('loading_payment_list')}
                                {/*SaaS 관리 <br /> <span className="text-scordi">클릭 한 번</span>으로 끝내보세요*/}
                                <TypeAnimation
                                    sequence={['.', 800, '..', 800, '...', 800]}
                                    repeat={Infinity}
                                    cursor={false}
                                    omitDeletionAnimation={true}
                                    style={{position: 'absolute'}}
                                />
                            </h1>
                            {/*<h1 className="text-5xl mb-3">Find all your team apps usage</h1>*/}
                            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}

                            <p className="text-xl text-gray-500 hidden">
                                <span className="block sm:inline-block">늘어가는 우리 팀 구독 서비스</span> <br />
                                <TypeAnimation
                                    sequence={[
                                        '매달 정리하는 서비스 결제',
                                        1500,
                                        '누가 어느 서비스를 사용하는지',
                                        1500,
                                        '입사자와 퇴사자가 생겼을 때',
                                        1500,
                                        '공유된 계정과 접근권한 관리까지',
                                        1500,
                                    ]}
                                    wrapper="b"
                                    className="text-2xl text-scordi-500"
                                    repeat={Infinity}
                                />
                                {/*<span className="block sm:inline-block">하나로 모아보세요.</span>*/}
                                <span className="block text-xl text-gray-900 font-semibold">
                                    스코디가 대신 해드릴게요
                                </span>
                            </p>

                            <div className="py-7">
                                <SummarySection2 />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
