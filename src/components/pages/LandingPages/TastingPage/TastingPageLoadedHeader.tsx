import React, {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom, gmailProfileAtom} from './pageAtoms';
import {SummarySection2} from './SummarySection';
import {useRouter} from 'next/router';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {useTranslation} from 'next-i18next';
import {TastingPageLoadedHeaderMobile} from './TastingPageLoadedHeaderMobile';

export const TastingPageLoadedHeader = memo(({children}: WithChildren) => {
    const router = useRouter();
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const gmailProfile = useRecoilValue(gmailProfileAtom);
    const {t} = useTranslation('publicTasting');

    useEffect(() => {
        if (!gmailProfile) return;

        window.localStorage.setItem('scordi/tasting/gmailProfile', JSON.stringify(gmailProfile));
    }, [gmailProfile]);

    if (!isLoaded) return <div />;

    // Loaded After
    return (
        <div>
            <div className="pt-6 sm:pt-14">
                {/* PC */}
                <section id="section-1" className="hero mb-3 hidden sm:block">
                    <div className="text-center w-[100vw]">
                        <div className="mb-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-5" style={{lineHeight: 1.3}}>
                                {t('hey_payment_list_arrived', {name: gmailProfile?.name || ''})}
                                {/*{gmailProfile ? `${gmailProfile.name}님, ` : ''} 결제 내역이 도착했어요!*/}
                            </h1>
                            {/*<h1 className="text-5xl mb-3">Find all your team apps usage</h1>*/}
                            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                            <p className="text-lg text-gray-500">
                                {t('scordi_will_take_care')} <br />
                                {t('wanna_keep_tracking')} <br />
                                {t('click_the_button')}
                            </p>

                            <div className="py-7 mb-6">
                                <button
                                    className="btn btn-scordi-500 btn-lg rounded-2xl shadow-xl"
                                    onClick={() => {
                                        router.push(SignPhoneAuthPageRoute.path());
                                    }}
                                >
                                    {t('try_it_free_now')}
                                </button>
                            </div>

                            <div className="py-7">
                                <SummarySection2 />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile */}
                <div className="block sm:hidden pb-3 bg-gray-200">
                    <TastingPageLoadedHeaderMobile />
                </div>
            </div>
        </div>
    );
});
