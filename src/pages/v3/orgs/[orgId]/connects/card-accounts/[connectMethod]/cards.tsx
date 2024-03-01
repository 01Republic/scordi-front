import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {V3OrgConnectedCardListPage} from '^v3/V3OrgConnectedCardListPage';

export const V3OrgConnectedCardListPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards',
    path: (orgId: number, connectMethod: string) =>
        pathReplace(V3OrgConnectedCardListPageRoute.pathname, {
            orgId,
            connectMethod,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', connectMethod: '현대카드'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.'org-home'
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);
    if (!orgId || isNaN(orgId)) return <></>;

    return <V3OrgConnectedCardListPage />;
}
