import React, {memo, useEffect} from 'react';
import {FindByGmailButton} from './FindByGmailButton';
import {WithChildren} from '^types/global.type';
import {useRecoilState, useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useOnResize} from '^hooks/useOnResize';
import {SummarySection} from '^components/pages/LandingPages/TastingPage/SummarySection';

export const TastingPageHeader = memo(({children}: WithChildren) => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);

    // Before

    if (!isLoaded) {
        return (
            <div>
                <div className="pt-6 sm:pt-14">
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
                                <p className="text-xl text-gray-500">
                                    카드 내역과 결제 영수증 인보이스{' '}
                                    <span className="block sm:inline-block">일일이 대조해서 찾지 마세요.</span> <br />
                                    <b className="text-gray-900">스코디로 딱 5초만에 확인할 수 있습니다.</b>
                                </p>

                                <div className="py-7">
                                    <FindByGmailButton />
                                </div>
                            </div>
                        </div>
                    </section>

                    {!(!isLoading && !isLoaded) ? children : <></>}
                </div>
            </div>
        );
    } else {
        // Loaded After
        return (
            <div>
                <div className="pt-6 sm:pt-14">
                    <section id="section-1" className="hero mb-3">
                        <div className="text-center w-[100vw]">
                            <div className="mb-10">
                                <h1 className="text-2xl md:text-4xl font-bold mb-5" style={{lineHeight: 1.3}}>
                                    보람님, 결제 내역이 도착했어요!
                                </h1>
                                {/*<h1 className="text-5xl mb-3">Find all your team subscription usage</h1>*/}
                                {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                                <p className="text-xl text-gray-500">
                                    카드 내역과 결제 영수증 인보이스{' '}
                                    <span className="block sm:inline-block">일일이 대조해서 찾지 마세요.</span> <br />
                                    <b className="text-gray-900">스코디로 딱 5초만에 확인할 수 있습니다.</b>
                                </p>

                                <div className="py-7">
                                    <SummarySection />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});
