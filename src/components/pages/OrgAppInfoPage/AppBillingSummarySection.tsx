import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {useApplication} from '^hooks/useApplications';
import {useRouter} from 'next/router';
import {MobileSection} from '^components/v2/MobileSection';
import {useBillingHistories} from '^hooks/useBillingHistories';
import {MobileGrid} from '^components/v2/MobileGridSection';

const sumOf = (arr: number[]) => arr.reduce((acc, a) => acc + a, 0);

type AppBillingSummarySectionProps = {} & WithChildren;

export const AppBillingSummarySection = memo((props: AppBillingSummarySectionProps) => {
    const router = useRouter();
    const applicationId = Number(router.query.appId);
    const {application} = useApplication(applicationId);
    const {
        data: histories,
        isLoading,
        pagination,
    } = useBillingHistories(
        {
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        },
        [applicationId],
    );

    if (!application || isLoading) return <></>;

    const totalItemCount = pagination.totalItemCount;
    const totalPrice = sumOf(histories.map((h) => h.paidAmount));

    return (
        <MobileGrid.Section className="mb-3">
            <MobileGrid.Column>
                <MobileGrid.KeyValue label="결제 횟수" value={`${totalItemCount}건`} />
            </MobileGrid.Column>
            <MobileGrid.Column line={false}>
                <MobileGrid.KeyValue label="총 금액" value={`- US$${totalPrice}`} />
            </MobileGrid.Column>
        </MobileGrid.Section>
    );
});
