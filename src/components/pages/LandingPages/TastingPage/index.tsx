import React, {memo} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {TastingPageProps} from '^pages/tasting';
import {EmailParsedTable} from './EmailParsedTable';
import {AOSProvider, BetaServiceFooter, HeadTag} from '../components';
import {TastingPageHeader} from './TastingPageHeader';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from './pageAtoms';
import {TastingPageLoadedHeader} from './TastingPageLoadedHeader';

export const TastingPage = memo((props: TastingPageProps) => {
    const isLoading = useRecoilValue(gmailItemsLoadingAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);

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
                </section>

                <BetaServiceFooter />
            </div>
        </AOSProvider>
    );
});
