import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {publicPageRequires} from '^types/utils/18n.type';
import {BetaSignSignPage} from '^clients/public/home/LandingPages/BetaSignSignPage';

export const BetaSignSocialPageRoute = pathRoute({
    pathname: '/sign/social',
    path: () => pathReplace(BetaSignSocialPageRoute.pathname, {}),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
        // Will be passed to the page component as props
    },
});

export default function BetaSignSocialPage() {
    const router = useRouter();

    return <BetaSignSignPage />;
}
