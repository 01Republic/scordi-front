import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useOrgIdParam, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {OrgSubscriptionListPage} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage';

export const OrgSubscriptionListPageRoute = pathRoute({
    pathname: '/orgs/[id]/subscriptions',
    path: (orgId: number) => pathReplace(OrgSubscriptionListPageRoute.pathname, {id: orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function Page() {
    useRouterIdParamState('id', orgIdParamState);
    const orgId = useOrgIdParam();
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgSubscriptionListPage />;
}
