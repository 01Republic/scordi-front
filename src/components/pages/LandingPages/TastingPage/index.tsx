import React, {Fragment, memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {AOSProvider, BetaServiceFooter, HeadTag} from '../components';
import {TypeAnimation} from 'react-type-animation';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {navTabIndex, TastingTabs} from './tabs/atom';
import {SyncWorkspaceApp} from './tabs/panes/SyncWorkspaceApp';
import {InvoiceTrackerApp} from './tabs/panes/InvoiceTrackerApp';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useOnResize2} from '^components/util/onResize2';

export const TastingPage = memo(() => {
    const [tabIndex, setTabIndex] = useRecoilState(navTabIndex);
    const isInvoiceTrackerLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isInvoiceTrackerLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {isMobile} = useOnResize2();

    useEffect(() => {
        if (isInvoiceTrackerLoading || isInvoiceTrackerLoaded) {
            setTabIndex(TastingTabs.InvoiceTracker);
        }
    }, [isInvoiceTrackerLoading, isInvoiceTrackerLoaded]);

    const tabs = [
        {label: '구독찾기', Component: SyncWorkspaceApp},
        {label: '비용조회', Component: InvoiceTrackerApp},
    ];

    const TabContentComponent = tabs[tabIndex]?.Component || Fragment;

    return (
        <AOSProvider>
            <HeadTag />
            {isMobile && <ChannelTalkHideStyle />}
            <div id="TastingPage" className="bg-white">
                <LandingPageNavBar showLoginButton={true} fluid={true} />

                <div className="pt-6 sm:pt-[100px]">
                    <div className="container px-4">
                        <ul className="flex gap-8 text-3xl font-semibold">
                            {tabs.map((tab, i) => (
                                <li
                                    key={i}
                                    onClick={() => setTabIndex(i)}
                                    className={`flex items-center gap-2 ${
                                        tabIndex === i ? 'text-gray-700' : 'text-gray-400'
                                    } hover:text-gray-700 cursor-pointer transition-all`}
                                >
                                    <div className={tabIndex === i ? 'underline underline-offset-[14px]' : ''}>
                                        {tab.label}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <TabContentComponent />

                <br />
                <br />
                <br />
                <hr />
                <BetaServiceFooter />
            </div>
        </AOSProvider>
    );
});

export const LoadingProgressFullScreen = memo(() => {
    return (
        <div
            className="fixed top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-center"
            style={{
                zIndex: 1,
                backdropFilter: 'blur(10px)',
            }}
        >
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
