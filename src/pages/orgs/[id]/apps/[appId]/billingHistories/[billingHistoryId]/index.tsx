import React from 'react';
import {useRouter} from 'next/router';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {pathReplace, pathRoute} from '^types/pageRoute.type';

export const BillingHistoryShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]',
    path: (orgId: number, appId: number, billingHistoryId: number) =>
        pathReplace(BillingHistoryShowPageRoute.pathname, {
            id: orgId,
            appId,
            billingHistoryId,
        }),
});

export default function BillingHistoryShowPage() {
    const router = useRouter();

    return (
        <div>
            <div>
                <p>BillingHistoryShowPage</p>
            </div>
        </div>
    );
}

BillingHistoryShowPage.getLayout = getOrgMainLayout;
