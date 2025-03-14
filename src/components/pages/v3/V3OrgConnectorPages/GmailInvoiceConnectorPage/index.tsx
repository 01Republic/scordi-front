import React, {memo, useEffect} from 'react';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';
import {useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {SafeBadge} from '^v3/V3OrgConnectorPages/GoogleWorkspaceConnectorPage/GoogleWorkspaceBeforeConnectPage';
import {googleOAuth} from '^config/environments';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {GmailInvoiceBeforeConnectPage} from '^v3/V3OrgConnectorPages/GmailInvoiceConnectorPage/GmailInvoiceBeforeConnectPage';
import {GmailInvoiceConnectedListPage} from '^v3/V3OrgConnectorPages/GmailInvoiceConnectorPage/GmailInvoiceConnectedListPage';
import {GmailInvoiceConnectingPage} from '^v3/V3OrgConnectorPages/GmailInvoiceConnectorPage/GmailInvoiceConnectingPage';
import {
    BillingHistoryDetailModalInAppShow,
    NewBillingHistoryModalInAppShow,
    SubscriptionDetailModal,
} from '^v3/V3OrgAppsPage/_localModals';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {InvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal';
import {ArrowLeft, AtSign, Book, FileText} from 'lucide-react';

export const GmailInvoiceConnectorPage = memo(function GmailInvoiceConnectorPage() {
    const organizationId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const accountCode = useRecoilValue(connectInvoiceAccountCodeAtom);
    const {result, search} = useInvoiceAccountListInConnector();

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;

        search({
            relations: ['subscriptions', 'googleTokenData'],
            where: {organizationId},
            order: {id: 'DESC'},
        });
    }, [organizationId]);

    const {items, pagination} = result;

    return (
        <V3MainLayout
            activeTabIndex={LNBIndex.Connects}
            modals={[
                SubscriptionDetailModal,
                BillingHistoryDetailModalInAppShow,
                NewBillingHistoryModalInAppShow,
                TeamMemberShowModal,
                AccountListModal,
                InvoiceAccountSelectModal,
            ]}
        >
            <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
                {accountCode ? (
                    <GmailInvoiceConnectingPage />
                ) : pagination.totalItemCount === 0 ? (
                    <GmailInvoiceBeforeConnectPage />
                ) : (
                    <GmailInvoiceConnectedListPage />
                )}
            </GoogleOAuthProvider>
        </V3MainLayout>
    );
});
