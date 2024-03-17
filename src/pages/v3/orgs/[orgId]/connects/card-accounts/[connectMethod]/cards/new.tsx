import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {codefAccountIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {V3OrgConnectNewCodefCardListPage} from '^v3/V3OrgConnectNewCodefCardListPage';

export const V3OrgConnectNewCardListPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards/new',
    path: (orgId: number, codefAccountId: number) =>
        pathReplace(V3OrgConnectNewCardListPageRoute.pathname, {
            orgId,
            connectMethod: codefAccountId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', connectMethod: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home', // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const codefAccountId = useRouterIdParamState('connectMethod', codefAccountIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;
    if (!codefAccountId || isNaN(codefAccountId)) return <></>;

    return <V3OrgConnectNewCodefCardListPage />;
}