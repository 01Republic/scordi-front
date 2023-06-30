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
    const setDraftAccount = useSetRecoilState(draftAccountAtom);
    const setGmailItems = useSetRecoilState(gmailItemsAtom);
    const setIsLoading = useSetRecoilState(gmailItemsLoadingAtom);
    const setIsLoaded = useSetRecoilState(gmailItemsLoadedAtom);
    const {accessTokenData} = useGoogleAccessTokenCallback(TastingPageRoute.path());

    useEffect(() => {
        if (!accessTokenData) return;

        setIsLoading(true);

        const gmailAgent = new GmailAgent(accessTokenData);

        gmailAgent.getProfile().then(async (userData) => {
            const tokenData = gmailAgent.accessTokenData;
            setGmailProfile(userData);
            const draftAccount = await draftInvoiceAccount({
                email: userData.email,
                image: userData.picture,
                tokenData: {
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                    expireAt: tokenData.expires_in,
                },
                gmailQueryOptions: getDraftInvoiceAccountFromTo(),
            }).then((res) => res.data);

            const emails = draftAccount.invoiceApps
                .map((invoiceApp) => {
                    return invoiceApp.billingHistories
                        .map((history) => {
                            const email = history.emailContent;
                            if (!email) return;
                            email.metadata.date = new Date(email.metadata.date);
                            return email;
                        })
                        .filter((e) => !!e) as GmailItem[];
                })
                .flat();
            setDraftAccount(draftAccount);
            setGmailItems(emails);

            setIsLoading(false);
            setIsLoaded(true);
        });
    }, [accessTokenData]);

    return <Page />;
}
