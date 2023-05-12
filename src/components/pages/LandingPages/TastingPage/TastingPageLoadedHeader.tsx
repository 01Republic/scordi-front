import React, {memo, useEffect} from 'react';
import {FindByGmailButton} from './FindByGmailButton';
import {WithChildren} from '^types/global.type';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    gmailItemsLoadedAtom,
    gmailItemsLoadingAtom,
    gmailProfileAtom,
} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useOnResize} from '^hooks/useOnResize';
import {SummarySection2} from '^components/pages/LandingPages/TastingPage/SummarySection';

export const TastingPageLoadedHeader = memo(({children}: WithChildren) => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const gmailProfile = useRecoilValue(gmailProfileAtom);

    if (!isLoaded) return <div />;

    // Loaded After
    return (
        <div>
            <div className="pt-6 sm:pt-14">
                <section id="section-1" className="hero mb-3">
                    <div className="text-center w-[100vw]">
                        <div className="mb-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-5" style={{lineHeight: 1.3}}>
                                {gmailProfile ? `${gmailProfile.name}님, ` : ''} 결제 내역이 도착했어요!
                            </h1>
                            {/*<h1 className="text-5xl mb-3">Find all your team subscription usage</h1>*/}
                            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                            <p className="text-lg text-gray-500">
                                번거로우셨던 비용 관리는 스코디에게 맡겨주세요. <br />
                                서비스 결제 내역을 저장하고, 날짜를 설정하여 보고 싶으시다면 <br />
                                아래 버튼을 눌러 무료 체험을 신청해주세요.
                            </p>

                            <div className="py-7 mb-6">
                                <button className="btn btn-scordi-500 rounded-2xl shadow-xl">
                                    지금 바로 무료 체험하기
                                </button>
                            </div>

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
