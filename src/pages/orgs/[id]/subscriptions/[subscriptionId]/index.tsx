import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, subscriptionIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {OrgSubscriptionDetailPage} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage';
import {SubscriptionDto} from '^models/Subscription/types';

export const OrgSubscriptionDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/subscriptions/[subscriptionId]',
    path: (orgId: number, subscriptionId: number) =>
        pathReplace(OrgSubscriptionDetailPageRoute.pathname, {id: orgId, subscriptionId: subscriptionId}),
    resourcePath: (resource: SubscriptionDto) =>
        OrgSubscriptionDetailPageRoute.path(resource.organizationId, resource.id),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {id: '1', subscriptionId: '1'}}],
//     fallback: true,
// });
//
// export const getStaticProps = async ({locale}: any) => ({
//     props: {
//         // Will be passed to the page component as props
//         ...(await serverSideTranslations(locale, [
//             ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
//         ])),
//     },
// });

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const subscriptionId = useRouterIdParamState('subscriptionId', subscriptionIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId) || isNaN(subscriptionId)) return <></>;

    return <OrgSubscriptionDetailPage />;
}
