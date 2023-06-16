import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {TastingPage as Page} from '^components/pages/LandingPages/TastingPage';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';

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
    return <Page />;
}
