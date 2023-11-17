import React, {memo} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';

export const SubscriptionsSection = memo(function SubscriptionsSection() {
    return (
        <Section title={`구독 현황`}>
            <Panel></Panel>
        </Section>
    );
});
