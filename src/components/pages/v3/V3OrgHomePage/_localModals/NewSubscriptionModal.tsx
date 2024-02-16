import {memo} from 'react';
import {NewSubscriptionModalGroup} from '^v3/share/modals/NewSubscriptionModalManually/NewSubscriptionModalGroup';
import {useDashboardSubscriptions} from '^models/Subscription/hook';

export const NewSubscriptionModalInDashBoard = memo(() => {
    const {reload: reloadDashboardSubscriptions} = useDashboardSubscriptions();

    return <NewSubscriptionModalGroup onCreate={reloadDashboardSubscriptions} />;
});
