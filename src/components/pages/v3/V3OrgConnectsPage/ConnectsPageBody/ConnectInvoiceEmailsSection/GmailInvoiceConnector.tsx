import {memo, useEffect} from 'react';
import {Connectors, V3OrgConnectorDetailPageRoute} from '^pages/v3/orgs/[orgId]/connects/[connectorName]';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {useRouter} from 'next/router';

export const GmailInvoiceConnector = memo(function GmailInvoiceConnector() {
    const organizationId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {isLoading, result, search} = useInvoiceAccountListInConnector();

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;

        search(
            {
                relations: ['subscriptions', 'googleTokenData'],
                where: {organizationId},
                order: {id: 'DESC'},
            },
            false,
            true,
        );
    }, [router.isReady, organizationId]);

    const isConnected = result.pagination.totalItemCount !== 0;

    return (
        <ConnectMethodCard
            logo="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"
            title="Gmail"
            href={V3OrgConnectorDetailPageRoute.path(organizationId, Connectors.gmailInvoice)}
            connected={isConnected}
            isLoading={isLoading}
        />
    );
});
