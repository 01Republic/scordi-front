import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {useTossPaymentAuthCallback} from '^hooks/useTossPayments';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgPlanSection} from './OrgPlanSection';
import {OrgPaymentMethodSection} from './OrgPaymentMethodSection';
import {OrgPaymentsSection} from './OrgPaymentsSection';

export const OrgSettingsPaymentPage = memo(function () {
    const orgId = useRecoilValue(orgIdParamState);
    useTossPaymentAuthCallback(orgId);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '결제 관리',
                active: true,
                href: OrgSettingsPaymentPageRoute.path(orgId),
            }}
        >
            <div className={'text-xl font-bold my-4'}>구독 및 결제</div>

            {/*현재 플랜 정보*/}
            <OrgPlanSection orgId={orgId} />

            {/*카드 정보*/}
            <OrgPaymentMethodSection orgId={orgId} />

            {/*결제 환불 내역*/}
            <OrgPaymentsSection orgId={orgId} />
        </OrgSettingsLayout>
    );
});
