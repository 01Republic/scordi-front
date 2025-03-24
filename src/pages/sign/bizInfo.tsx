import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {OrganizationBizInfoPage} from '^clients/public/home/LandingPages/SignAuthPage/SignBizInfo';

export const SignBizInfoPageRoute = pathRoute({
    pathname: '/sign/bizInfo',
    path: () => pathReplace(SignBizInfoPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
    },
});

export default function BizInfoAuthPage() {
    return <OrganizationBizInfoPage />;
}
