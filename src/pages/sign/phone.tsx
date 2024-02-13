import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {BetaSignPhoneAuthPage2} from '^components/pages/LandingPages/BetaSignPhoneAuthPage/v2';

export const SignPhoneAuthPageRoute = pathRoute({
    pathname: '/sign/phone',
    path: () => pathReplace(SignPhoneAuthPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
        // Will be passed to the page component as props
    },
});

export default function SignPhoneAuthPage() {
    return <BetaSignPhoneAuthPage2 />;
}
