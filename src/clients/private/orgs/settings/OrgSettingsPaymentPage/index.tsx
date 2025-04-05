import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgPlanSection} from './OrgPlanSection';
import {OrgPaymentMethodSection} from './OrgPaymentMethodSection';
import {OrgPaymentsSection} from './OrgPaymentsSection';

export const OrgSettingsPaymentPage = memo(function () {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '구독 및 결제',
                active: true,
                href: OrgSettingsPaymentPageRoute.path(orgId),
            }}
            ignoreCardWrap
        >
            {/*현재 플랜 정보*/}
            <OrgPlanSection orgId={orgId} />

            {/*카드 정보*/}
            <OrgPaymentMethodSection orgId={orgId} />

            {/*결제 내역*/}
            <OrgPaymentsSection orgId={orgId} />
        </OrgSettingsLayout>
    );
});
