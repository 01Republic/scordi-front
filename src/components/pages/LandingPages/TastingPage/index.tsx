import React, {memo} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {EmailParsedTable} from './EmailParsedTable';
import {AOSProvider, BetaServiceFooter, HeadTag} from '../components';
import {TastingPageHeader} from './TastingPageHeader';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from './pageAtoms';
import {TastingPageLoadedHeader} from './TastingPageLoadedHeader';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import {TypeAnimation} from 'react-type-animation';
import {ChannelTalkHideStyle} from '^components/lib/channel-talk/ChannelTalkHideStyle';
import {TastingItemDetailModal} from './TastingItemDetailModal';
import {AttachmentModal} from './AttachmentModal';
import {InvoiceAppsModal} from './InvoiceAppsModal';

export const TastingPage = memo(() => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const router = useRouter();
    const {t} = useTranslation('publicTasting');

    return (
        <AOSProvider>
            <HeadTag />
            <ChannelTalkHideStyle />
            <div id="TastingPage" className="bg-white">
                <LandingPageNavBar showLoginButton={false} fluid={true} />

                {isLoading ? (
                    <LoadingProgressFullScreen />
                ) : (
                    <>
                        {!isLoaded ? <TastingPageHeader /> : <TastingPageLoadedHeader />}

                        <section className="container mb-24 px-4">
                            <div className="text-center">{isLoaded && <EmailParsedTable />}</div>

                            {isLoaded && (
                                <div className="text-center mt-10 fixed sm:relative bottom-0 w-full left-0 p-4 sm:p-0 z-20 sm:z-0 bg-white">
                                    <button
                                        className="btn btn-scordi-500 btn-block btn-lg rounded-2xl shadow-xl"
                                        onClick={() => {
                                            router.push(SignPhoneAuthPageRoute.path());
                                        }}
                                    >
                                        {t('try_it_free_now')}
                                    </button>
                                </div>
                            )}
                        </section>

                        {isLoaded && <BetaServiceFooter />}
                    </>
                )}

                {isLoaded && <TastingItemDetailModal />}
                {isLoaded && <AttachmentModal />}
                {isLoaded && <InvoiceAppsModal />}
            </div>
        </AOSProvider>
    );
});

export const LoadingProgressFullScreen = memo(() => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-center">
            <div className="flex flex-col items-center pb-[50px] sm:pb-[150px]">
                <div className="loadingio-spinner-spinner-cb6o2gc2by">
                    <div className="ldio-pcdc4ae6leg">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                {/*<p className="text-center">Loading ...</p>*/}

                <p className="text-center text-xl text-gray-500">
                    <span className="inline-block">늘어가는 우리 팀 구독 서비스</span> <br />
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
                    <span className="block text-xl text-gray-900 font-semibold">스코디가 대신 해드릴게요</span>
                </p>
            </div>
        </div>
    );
});
