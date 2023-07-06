import React, {useEffect} from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {TastingPage as Page} from '^components/pages/LandingPages/TastingPage';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {useGoogleAccessTokenCallback} from '^hooks/useGoogleAccessToken';
import {GmailAgent, GmailItem} from '^api/tasting.api';
import {useSetRecoilState} from 'recoil';
import {
    draftAccountAtom,
    gmailItemsAtom,
    gmailItemsLoadedAtom,
    gmailItemsLoadingAtom,
    gmailProfileAtom,
} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {draftInvoiceAccount} from '^api/invoiceAccount.api';
import {getDraftInvoiceAccountFromTo} from '^types/invoiceAccount.type';
import {useTranslation} from 'next-i18next';
import {useDraft} from '^components/pages/LandingPages/TastingPage/hooks/useDraft';

export const TastingPageRoute = pathRoute({
    pathname: '/tasting',
    path: () => pathReplace(TastingPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires, 'publicTasting'])),
        // Will be passed to the page component as props
    },
});

export default function TastingPage() {
    const setGmailProfile = useSetRecoilState(gmailProfileAtom);
    const setIsLoading = useSetRecoilState(gmailItemsLoadingAtom);
    const {fetchDraftAccount} = useDraft();
    const {accessTokenData} = useGoogleAccessTokenCallback(TastingPageRoute.path());
    // const {t} = useTranslation('publicTasting');

    useEffect(() => {
        if (!accessTokenData) return;

        setIsLoading(true);

        const gmailAgent = new GmailAgent(accessTokenData);

        gmailAgent.getProfile().then(async (userData) => {
            const tokenData = gmailAgent.accessTokenData;
            setGmailProfile(userData);

            await fetchDraftAccount({
                email: userData.email,
                image: userData.picture,
                tokenData: {
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                    expireAt: tokenData.expires_in,
                },
                gmailQueryOptions: getDraftInvoiceAccountFromTo(),
            });
        });
    }, [accessTokenData]);

    return <Page />;
}
