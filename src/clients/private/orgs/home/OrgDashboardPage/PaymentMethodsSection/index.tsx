import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {currencyFormat} from '^utils/number';
import {useDashboardCreditCardsSectionResultDto} from '^models/_dashboard/hook';
import {DashboardSectionLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardSectionLayout';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {LinkTo} from '^components/util/LinkTo';
import {PaymentMethodEmptySection} from './PaymentMethodEmptySection';
import {PaymentMethodItem} from './PaymentMethodItem';

export const PaymentMethodsSection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {data: dashboardCreditCardsSectionResult, isLoading} = useDashboardCreditCardsSectionResultDto(orgId);
    const {items = [], total} = dashboardCreditCardsSectionResult || {};

    if (items.length === 0) return <PaymentMethodEmptySection />;

    return (
        <DashboardSectionLayout
            title="결제수단"
            subTitle={currencyFormat(total?.payAmountSum || 0)}
            isLoading={isLoading}
        >
            <ul className="mb-10">
                {items.map((item) => (
                    <PaymentMethodItem key={item.id} item={item} />
                ))}
            </ul>

            <LinkTo
                href={OrgCreditCardListPageRoute.path(orgId)}
                text="전체보기"
                className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
            />
        </DashboardSectionLayout>
    );
});
