import React, {memo} from 'react';
import {TastingPageHeader} from '^tasting/TastingPageHeader';
import {TastingPageLoadedHeader} from '^tasting/TastingPageLoadedHeader';
import {EmptyTable} from '^tasting/EmptyTable';
import {EmailParsedTable} from '^tasting/EmailParsedTable';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {BetaServiceFooter} from '^clients/public/home/LandingPages/components';
import {TastingItemDetailModal} from '^tasting/TastingItemDetailModal';
import {AttachmentModal} from '^tasting/AttachmentModal';
import {InvoiceAppsModal} from '^tasting/InvoiceAppsModal';
import {LoadingProgressFullScreen} from '^tasting/index';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from '^tasting/pageAtoms';
import {useDraftResult} from '^tasting/hooks/useDraft';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import {LinkTo} from '^components/util/LinkTo';

export const InvoiceTrackerApp = memo(function InvoiceTrackerApp() {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {billingHistories, isEmpty} = useDraftResult();
    const router = useRouter();
    const {t} = useTranslation('publicTasting');

    if (isLoading) return <LoadingProgressFullScreen />;

    return (
        <>
            {!isLoaded ? <TastingPageHeader /> : <TastingPageLoadedHeader />}

            {isLoaded && isEmpty && <EmptyTable />}

            {isLoaded && !isEmpty && (
                <section className="container mb-24 px-4">
                    <div className="text-center">
                        <EmailParsedTable />
                    </div>
                </section>
            )}

            {/* CTA */}
            {isLoaded && (
                <div className="text-center mt-10 fixed sm:relative bottom-0 w-full left-0 p-4 z-20 sm:z-0 bg-white">
                    <LinkTo
                        href={SignPhoneAuthPageRoute.path()}
                        className="btn btn-scordi-500 btn-block btn-lg rounded-2xl shadow-xl"
                    >
                        {t('try_it_free_now')}
                    </LinkTo>
                </div>
            )}

            {/* Modals */}
            {isLoaded && <TastingItemDetailModal />}
            {isLoaded && <AttachmentModal />}
            {isLoaded && <InvoiceAppsModal />}
        </>
    );
});
