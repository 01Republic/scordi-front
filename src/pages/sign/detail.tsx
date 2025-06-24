import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {SignDetailAuthPage} from '^clients/public/home/UsersAuth/UserSignUpPage/SignDetail';

export const SignUserDetailRoute = pathRoute({
    pathname: '/sign/detail',
    path: () => pathReplace(SignUserDetailRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
    },
});

export default function SignUserDetailAuthPage() {
    return <SignDetailAuthPage />;
}
