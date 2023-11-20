import React, {memo} from 'react';
import {TastingPageHeader} from '^components/pages/LandingPages/TastingPage/TastingPageHeader';
import {TastingPageLoadedHeader} from '^components/pages/LandingPages/TastingPage/TastingPageLoadedHeader';
import {EmptyTable} from '^components/pages/LandingPages/TastingPage/EmptyTable';
import {EmailParsedTable} from '^components/pages/LandingPages/TastingPage/EmailParsedTable';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {TastingItemDetailModal} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal';
import {AttachmentModal} from '^components/pages/LandingPages/TastingPage/AttachmentModal';
import {InvoiceAppsModal} from '^components/pages/LandingPages/TastingPage/InvoiceAppsModal';
import {LoadingProgressFullScreen} from '^components/pages/LandingPages/TastingPage';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useDraftResult} from '^components/pages/LandingPages/TastingPage/hooks/useDraft';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';

export const InvoiceTrackerApp = memo(function InvoiceTrackerApp() {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {billingHistories, isEmpty} = useDraftResult();
    const router = useRouter();
    const {t} = useTranslation('publicTasting');

    return (
        <>
            {isLoading ? (
                <LoadingProgressFullScreen />
            ) : (
                <>
                    {!isLoaded ? <TastingPageHeader /> : <TastingPageLoadedHeader />}
                    {isLoaded && isEmpty ? (
                        <EmptyTable />
                    ) : (
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
                    )}

                    {isLoaded && <BetaServiceFooter />}
                </>
            )}
            {isLoaded && <TastingItemDetailModal />}
            {isLoaded && <AttachmentModal />}
            {isLoaded && <InvoiceAppsModal />}
        </>
    );
});
