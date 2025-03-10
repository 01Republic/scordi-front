import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {QuickButton} from './QuickButton';
import {LayoutGrid} from 'lucide-react';

export const AddSubscriptionButton = memo(function AddSubscriptionButton() {
    const orgId = useRecoilValue(orgIdParamState);

    if (!orgId || isNaN(orgId)) return <></>;

    return (
        <QuickButton text="구독 추가" Icon={() => <LayoutGrid />} url={OrgSubscriptionSelectPageRoute.path(orgId)} />
    );
});
