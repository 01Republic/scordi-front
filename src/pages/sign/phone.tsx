import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {BetaSignPhoneAuthPage} from '^components/pages/LandingPages/BetaSignPhoneAuthPage';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';

export const SignPhoneAuthPageRoute = pathRoute({
    pathname: 'sign/phone',
    path: () => pathReplace(SignPhoneAuthPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
        // Will be passed to the page component as props
    },
});

export default function SignPhoneAuthPage() {
    const router = useRouter();

    return <BetaSignPhoneAuthPage />;
}
