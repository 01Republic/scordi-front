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

export const TastingPage = memo(() => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const router = useRouter();
    const {t} = useTranslation('publicTasting');

    return (
        <AOSProvider>
            <HeadTag />
            <div id="TastingPage" className="bg-white">
                <LandingPageNavBar showLoginButton={false} fluid={true} />

                {!isLoaded ? <TastingPageHeader /> : <TastingPageLoadedHeader />}

                <section className="container mb-24">
                    <div className="text-center">
                        <EmailParsedTable />
                    </div>

                    {isLoaded && (
                        <div className="text-center mt-10">
                            <button
                                className="btn btn-scordi-500 btn-lg rounded-2xl shadow-xl"
                                onClick={() => {
                                    router.push(SignPhoneAuthPageRoute.path());
                                }}
                            >
                                {t('try_it_free_now')}
                            </button>
                        </div>
                    )}
                </section>

                <BetaServiceFooter />
            </div>
        </AOSProvider>
    );
});
