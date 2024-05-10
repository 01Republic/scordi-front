import {memo} from 'react';
import {ConnectSubscriptionsLayout} from '^clients/private/_layouts/ConnectSubscriptionsLayout';
import {ContentFunnels} from './ContentFunnels';

export const OrgSubscriptionConnectsPage = memo(function OrgSubscriptionConnectsPage() {
    return (
        <ConnectSubscriptionsLayout>
            <ContentFunnels />
        </ConnectSubscriptionsLayout>
    );
});
