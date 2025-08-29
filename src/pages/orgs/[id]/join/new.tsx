import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {JoinNewPage} from '^clients/public/userAuth/JoinPage/JoinNewPage';

export const OrgJoinNewPageRoute = pathRoute({
    pathname: '/orgs/[id]/join/new',
    path: (orgId: number) => pathReplace(OrgJoinNewPageRoute.pathname, {id: orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            'publicTasting',
        ])),
        // Will be passed to the page component as props
    },
});

export default function CreateUserAuthPage() {
    return <JoinNewPage />;
}
