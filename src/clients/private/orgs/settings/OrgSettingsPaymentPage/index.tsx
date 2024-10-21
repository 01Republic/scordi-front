import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgPlanSection} from './OrgPlanSection';
import {OrgPaymentMethodSection} from './OrgPaymentMethodSection';
import {OrgPaymentsSection} from './OrgPaymentsSection';
import {useTossPaymentAuthCallback} from '^hooks/useTossPayments';

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

            <OrgPlanSection orgId={orgId} />
            <OrgPaymentMethodSection orgId={orgId} />
            <OrgPaymentsSection orgId={orgId} />
        </OrgSettingsLayout>
    );
});
