import React, {memo} from 'react';
import {FindByGmailButton} from './FindByGmailButton';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {SummarySection2} from '^components/pages/LandingPages/TastingPage/SummarySection';
import {TypeAnimation} from 'react-type-animation';

export const TastingPageHeader = memo(() => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);

    // Before

    if (isLoading) return <TastingPageHeaderInLoading />;

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
            </div>
        </div>
    );
});

const TastingPageHeaderInLoading = memo(() => {
    return (
        <div>
            <div className="pt-6 sm:pt-14">
                <section id="section-1" className="hero mb-3">
                    <div className="text-center w-[100vw]">
                        <div className="mb-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-5 relative" style={{lineHeight: 1.3}}>
                                결제 내역을 불러오고 있어요
                                {/*SaaS 관리 <br /> <span className="text-scordi">클릭 한 번</span>으로 끝내보세요*/}
                                <TypeAnimation
                                    sequence={['.', 800, '..', 800, '...', 800]}
                                    repeat={Infinity}
                                    cursor={false}
                                    omitDeletionAnimation={true}
                                    style={{position: 'absolute'}}
                                />
                            </h1>
                            {/*<h1 className="text-5xl mb-3">Find all your team subscription usage</h1>*/}
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
