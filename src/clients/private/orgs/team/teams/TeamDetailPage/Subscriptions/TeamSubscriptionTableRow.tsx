import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {
    BillingCycleTypeColumn,
    IsFreeTierColumn,
    LatestPayAmount,
    MasterSelect,
    MemberCount,
    PayingType,
    PayMethodSelect,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';

interface SubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const SubscriptionTableRow = memo((props: SubscriptionTableRowProps) => {
    const {subscription, reload} = props;

    return (
        <tr>
            {/* 서비스 명 */}
            <td>
                <SubscriptionProfile subscription={subscription} />
            </td>

            {/* 사용인원 */}
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={undefined}
                    onChange={async (memo) => {
                        console.log(memo);
                    }}
                />
            </td>
        </tr>
    );
});
SubscriptionTableRow.displayName = 'SubscriptionTableRow';
