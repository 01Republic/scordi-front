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

            {/* 유/무료 */}
            <td>
                <IsFreeTierColumn subscription={subscription} onChange={reload} />
            </td>

            {/* 상태 */}
            {/*<td className="">*/}
            {/*    <SubscriptionStatus subscription={subscription} reload} />*/}
            {/*</td>*/}

            {/* 결제주기 */}
            <td>
                <BillingCycleTypeColumn subscription={subscription} onChange={reload} />
            </td>

            {/* 과금방식: (TestBank: 연, 고정, 사용량, 크레딧, 1인당) */}
            <td className="">
                <PayingType subscription={subscription} onChange={reload} />
            </td>

            {/* 결제수단 */}
            <td className="pl-3 py-0">
                <PayMethodSelect subscription={subscription} onChange={reload} />
            </td>

            {/* 사용인원 */}
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>

            {/* 최신 결제금액 */}
            <td className="text-right">
                <LatestPayAmount subscription={subscription} />
            </td>

            {/* 다음 결제일 */}
            {/*<td className="text-right">*/}
            {/*    <NextPaymentDate nextPayDate={nextPayDate} />*/}
            {/*</td>*/}

            {/* 담당자 */}
            <td className="py-0 pl-5 w-40">
                <MasterSelect subscription={subscription} onChange={reload} />
            </td>

            {/* Actions */}
            {/*<td></td>*/}
        </tr>
    );
});
SubscriptionTableRow.displayName = 'SubscriptionTableRow';
