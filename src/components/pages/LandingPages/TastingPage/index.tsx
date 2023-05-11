import React, {memo} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {TastingPageProps} from '^pages/tasting';
import {EmailParsedTable} from './EmailParsedTable';
import {AOSProvider, HeadTag} from '../components';
import {TastingPageHeader} from './TastingPageHeader';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom, gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
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
            </div>
        </AOSProvider>
    );
});
