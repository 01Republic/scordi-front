import {orgIdParamState} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {OrgPaymentMethodSection} from './OrgPaymentMethodSection';
import {OrgPaymentsSection} from './OrgPaymentsSection';
import {OrgPlanSection} from './OrgPlanSection';

export const OrgSettingsPaymentPage = memo(function () {
    const orgId = useRecoilValue(orgIdParamState);
    const {t} = useTranslation('workspaceSettings');

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: t('menu.subscription-payment'),
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
