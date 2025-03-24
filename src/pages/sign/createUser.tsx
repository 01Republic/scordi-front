import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {SignCreateUserAuthPage} from 'src/clients/public/home/LandingPages/SignAuthPage/SignCreateUserAuthPage';

export const SignAuthCreateUserPageRoute = pathRoute({
    pathname: '/sign/createUser',
    path: () => pathReplace(SignAuthCreateUserPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
    },
});

export default function CreateUserAuthPage() {
    return <SignCreateUserAuthPage />;
}
