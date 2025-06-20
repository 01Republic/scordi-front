import React, {memo} from 'react';
import {LayoutGrid} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {QuickButton} from './QuickButton';

export const AddSubscriptionButton = memo(function AddSubscriptionButton() {
    const orgId = useOrgIdParam();

    return (
        <QuickButton
            text="구독 추가"
            Icon={() => <LayoutGrid />}
            url={OrgSubscriptionConnectionPageRoute.path(orgId)}
        />
    );
});
