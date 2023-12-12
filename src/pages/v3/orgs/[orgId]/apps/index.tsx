import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgAppsPage} from '^v3/V3OrgAppsPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';

export const V3OrgAppsPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/apps',
    path: (orgId: number) =>
        pathReplace(V3OrgAppsPageRoute.pathname, {
            orgId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
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
    if (!orgId) return <></>;

    return <V3OrgAppsPage />;
}
