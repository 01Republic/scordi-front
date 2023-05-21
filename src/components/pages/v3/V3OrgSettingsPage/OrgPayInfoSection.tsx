import React, {memo} from 'react';
import {EditFormSection} from '^v3/share/EditFormSection';
import {InputText} from '^v3/V3OrgSettingsPage/InputText';
import {useRouter} from 'next/router';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {V3OrgSettingsBillingPageRoute} from '^pages/v3/orgs/[orgId]/settings/billing';

export const OrgPayInfoSection = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const onEditButtonClick = () => {
        router.push(V3OrgSettingsBillingPageRoute.path(orgId));
    };

    return (
        <EditFormSection
            title="결제"
            editMode={false}
            editButton={{
                text: '설정',
                onClick: onEditButtonClick,
            }}
        >
            <InputText label="구독중인 플랜" defaultValue={`scordi 무료 체험`} editable={false} />
            <InputText label="다음 결제일" defaultValue={`-`} editable={false} />
        </EditFormSection>
    );
});
