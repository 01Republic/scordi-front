import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {WelcomePage} from '^components/pages/LandingPages/WelcomePage';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {WelcomePage2} from '^components/pages/LandingPages/WelcomePage2';

export const SignWelcomePageRoute = pathRoute({
    pathname: '/sign/welcome',
    path: () => pathReplace(SignWelcomePageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
        // Will be passed to the page component as props
    },
});

export default function SignWelcomePage() {
    const router = useRouter();

    return <WelcomePage2 />;
}
