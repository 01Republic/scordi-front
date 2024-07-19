import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {MoneySimpleRounded} from '^models/Money/components/money.simple-rounded';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {MemberCount} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';

interface CreditCardSubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const CreditCardSubscriptionTableRow = memo((props: CreditCardSubscriptionTableRowProps) => {
    const {subscription, reload} = props;

    return (
        <tr>
            {/* 서비스 명 */}
            <td>
                <SubscriptionProfile subscription={subscription} />
            </td>

            {/* 사용인원 */}
            <td>
                <MemberCount subscription={subscription} />
            </td>

            {/*과금*/}
            <td>
                {/* 유/무료 확인해서 */}
                {subscription.isFreeTier ? (
                    // 무료라면 무료 태그를 출력
                    <IsFreeTierTagUI value={subscription.isFreeTier} />
                ) : (
                    // 유료라면 결제주기 태그를 출력
                    <BillingCycleTypeTagUI value={subscription.billingCycleType} />
                )}
            </td>

            {/*최신 결제금액*/}
            <td>
                <MoneySimpleRounded money={subscription.currentBillingAmount || undefined} />
            </td>

            {/*담당자*/}
            <td>
                {subscription.master ? (
                    <TeamMemberProfileOption item={subscription.master} />
                ) : (
                    <div className="relative">
                        <div className="invisible">
                            <TeamMemberProfileOption item={subscription.master} />
                        </div>
                        <div className="absolute inset-0 flex items-center text-12 text-gray-300">
                            <span>비어있음</span>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
});
CreditCardSubscriptionTableRow.displayName = 'CreditCardSubscriptionTableRow';
