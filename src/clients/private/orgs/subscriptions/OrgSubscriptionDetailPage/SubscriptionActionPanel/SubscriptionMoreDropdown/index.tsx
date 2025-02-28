import {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {ChangeUsingStatusItem} from './ChangeUsingStatusItem';
import {DeleteSubscriptionItem} from './DeleteSubscriptionItem';

export const SubscriptionMoreDropdown = memo(function SubscriptionMoreDropdown() {
    return (
        <MoreDropdown>
            <ChangeUsingStatusItem />
            <DeleteSubscriptionItem />
        </MoreDropdown>
    );
});
