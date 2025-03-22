import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, subscriptionIdParamState, useRouterIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {OrgSubscriptionDetailPage} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage';
import {ShowRoutingPage} from '^clients/private/_components/rest-pages/ShowPage/ShowRoutingPage';
import {SubscriptionDto} from '^models/Subscription/types';
import {OrgResponsePage} from '^clients/private/orgs/requests/OrgResponsePage';
import {useCurrentOrg} from '^models/Organization/hook';

export const OrgResponsePageRoute = pathRoute({
    pathname: '/orgs/[id]/requests/[requestId]/response',
    path: (orgId: number, requestId: number) =>
        pathReplace(OrgResponsePageRoute.pathname, {id: orgId, requestId: requestId}),
    // resourcePath: (resource: SubscriptionDto) => OrgResponsePageRoute.path(resource.organizationId, resource.id),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', requestId: '1'}}],
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
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return (
        // <ShowRoutingPage
        //     subjectIdParamKey="subscriptionId"
        //     subjectIdParamAtom={subscriptionIdParamState}
        //     subjectAtom={subscriptionSubjectAtom}
        //     endpoint={(subjectId) =>
        //         subscriptionApi.show(subjectId, {
        //             relations: [
        //                 'organization',
        //                 'teamMembers',
        //                 'vendorContracts',
        //                 'vendorContracts.vendorCompany',
        //                 'vendorContracts.vendorManager',
        //                 'invoiceAccounts',
        //                 'invoiceAccounts.googleTokenData',
        //                 'billingHistories',
        //                 'subscriptionSeats',
        //                 'bankAccount',
        //             ],
        //         })
        //     }
        // >
        <OrgResponsePage />
        // </ShowRoutingPage>
    );
}
