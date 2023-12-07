import {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const SubscriptionListTab = memo(function SubscriptionListTab() {
    return (
        <MobileSection.Item className="border-b-0 grow">
            <MobileSection.Padding></MobileSection.Padding>
        </MobileSection.Item>
    );
});
