import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {useCurrentOrg} from '^models/Organization/hook';
import {V3OrgConnectsPage} from 'src/components/pages/v3/V3OrgConnectsPage';

export const V3OrgConnectsPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/connects',
    path: (orgId: number) =>
        pathReplace(V3OrgConnectsPageRoute.pathname, {
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

    return <V3OrgConnectsPage />;
}
