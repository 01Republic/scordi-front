import React from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {unitFormat} from '^utils/number';
import {useDashboardInvoiceAccountsSectionResult} from '^models/_dashboard/hook';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {DashboardSectionLayout} from '../DashboardSectionLayout';
import {InvoiceAccountEmptySection} from './InvoiceAccountEmptySection';
import {InvoiceAccountItem} from './InvoiceAccountItem';

export const InvoiceAccountsSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {data: dashboardInvoiceAccountsSectionResult, isLoading} = useDashboardInvoiceAccountsSectionResult(orgId);
    const {items = [], total} = dashboardInvoiceAccountsSectionResult || {};

    if (items.length === 0) return <InvoiceAccountEmptySection />;

    return (
        <DashboardSectionLayout
            title="청구서 메일"
            subTitle={`총 ${unitFormat(total?.billingHistoryCount, '건')}`}
            isLoading={isLoading}
        >
            <ul className="mb-10">
                {items.map((item) => (
                    <InvoiceAccountItem key={item.id} item={item} />
                ))}
            </ul>

            <LinkTo
                href={OrgInvoiceAccountListPageRoute.path(orgId)}
                text="전체보기"
                className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
            />
        </DashboardSectionLayout>
    );
};
