import React, {memo} from 'react';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {UnsubscribeButton} from './UnsubscribeButton';

interface OrgScordiSubscriptionItemDropdownProps {
    scordiSubscription: ScordiSubscriptionDto;
    reload?: () => any;
}

export const OrgScordiSubscriptionItemDropdown = memo((props: OrgScordiSubscriptionItemDropdownProps) => {
    const {scordiSubscription, reload} = props;

    return (
        <MoreDropdown>
            <MoreDropdown.Content>
                <li>
                    <UnsubscribeButton scordiSubscription={scordiSubscription} onSuccess={() => reload && reload()} />
                </li>
            </MoreDropdown.Content>
        </MoreDropdown>
    );
});
OrgScordiSubscriptionItemDropdown.displayName = 'OrgScordiSubscriptionItemDropdown';
