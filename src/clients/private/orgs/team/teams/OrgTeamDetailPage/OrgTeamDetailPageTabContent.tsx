import React, {memo} from 'react';
import {TeamMembersListPage} from './Members/TeamMembersListPage';
import {TeamSubscriptionsListPage} from './Subscriptions/TeamSubscriptionsListPage';
import {TeamPaymentsListPage} from './Payments/TeamPaymentsListPage';
import {TeamInvoicesListPage} from './Invoices/TeamInvoicesListPage';

export enum TabName {
    members = 'members',
    subscriptions = 'subscriptions',
    payments = 'payments',
    invoices = 'invoices',
}

export interface OrgTeamDetailPageTabContentCommonProps {
    reload: () => any;
}

interface OrgTeamDetailPageTabContentProps extends OrgTeamDetailPageTabContentCommonProps {
    tab: TabName;
}

export const OrgTeamDetailPageTabContent = memo((props: OrgTeamDetailPageTabContentProps) => {
    const {tab, ...res} = props;

    if (tab === TabName.members) return <TeamMembersListPage {...res} />;
    if (tab === TabName.subscriptions) return <TeamSubscriptionsListPage {...res} />;
    if (tab === TabName.payments) return <TeamPaymentsListPage {...res} />;
    if (tab === TabName.invoices) return <TeamInvoicesListPage {...res} />;
    return <TeamMembersListPage {...res} />;
});
