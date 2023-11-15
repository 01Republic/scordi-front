import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, subscriptionIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {V3OrgAppShowPage} from '^v3/V3OrgAppShowPage';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useRouter} from 'next/router';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';

export const V3OrgAppShowPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/apps/[appId]',
    path: (orgId: number, appId: number) =>
        pathReplace(V3OrgAppShowPageRoute.pathname, {
            orgId,
            appId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', appId: '1'}}],
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

export default function Page() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const appId = useRouterIdParamState('appId', subscriptionIdParamState);
    useCurrentOrg(orgId);
    const {loadCurrentSubscription} = useCurrentSubscription();
    const {search: loadCurrentHistories} = useBillingHistoriesV3();

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || !appId) return;
        loadCurrentSubscription(orgId, appId);

        loadCurrentHistories({
            where: {subscriptionId: appId, organizationId: orgId},
            order: {issuedAt: 'DESC'},
        });
    }, [router.isReady, orgId, appId]);

    if (!orgId || !appId) return <></>;

    return <V3OrgAppShowPage />;
}
