import React, {memo} from 'react';
import {LayoutGrid} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {QuickButton} from './QuickButton';
import {useTranslation} from 'next-i18next';

export const AddSubscriptionButton = memo(function AddSubscriptionButton() {
    const orgId = useOrgIdParam();
    const {t} = useTranslation('dashboard');

    return (
        <QuickButton
            text={t('quickButtons.addSubscription')}
            Icon={() => <LayoutGrid />}
            url={OrgSubscriptionConnectionPageRoute.path(orgId)}
        />
    );
});
