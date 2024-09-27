import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {MoneySimpleRounded} from '^models/Money/components/money.simple-rounded';
import {yyyy_mm_dd} from '^utils/dateTime';
import {TeamMemberProfileCompact, TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import Tippy from '@tippyjs/react';
import {BsDashCircle} from 'react-icons/bs';
import {confirm2} from '^components/util/dialog';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';

interface InvoiceAccountSubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const InvoiceAccountSubscriptionTableRow = memo((props: InvoiceAccountSubscriptionTableRowProps) => {
    const {subscription, reload} = props;

    const disconnect = async () => {
        const isConfirmed = await confirm2(
            '이 계정과 연결을 해제할까요?',
            '구독이 삭제되는건 아니니 안심하세요',
            'warning',
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;
        // await subscriptionApi.update(subscription.id, {creditCardId: null});
        toast.success('연결을 해제했어요');
        reload();
    };

    const {nextComputedBillingDate} = subscription;

    return (
        <tr>
            {/* 서비스 명 */}
            <td>
                <SubscriptionProfile subscription={subscription} />
            </td>

            {/* 구독상태 */}
            {/*<td>*/}
            {/*    <MemberCount subscription={subscription} />*/}
            {/*</td>*/}

            {/* 결제주기 */}
            <td>
                {/* 유/무료 확인해서 */}
                {subscription.isFreeTier ? (
                    // 무료라면 무료 태그를 출력
                    <IsFreeTierTagUI value={subscription.isFreeTier} />
                ) : (
                    // 유료라면 결제주기 태그를 출력
                    <BillingCycleTypeTagUI value={subscription.billingCycleType} short />
                )}
            </td>

            {/*최신 청구액*/}
            <td>
                <MoneySimpleRounded money={subscription.currentBillingAmount || undefined} />
            </td>

            {/* 갱신일 */}
            <td className="text-14">
                {nextComputedBillingDate && yyyy_mm_dd(new Date(`${nextComputedBillingDate} `))}
            </td>

            {/*담당자*/}
            <td>
                {subscription.master ? (
                    <TeamMemberProfileCompact item={subscription.master} />
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

            {/* Action */}
            <td>
                <div className="flex items-center justify-center">
                    <Tippy className="!text-12" content="안써요">
                        <button
                            className="relative text-red-300 hover:text-red-500 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                disconnect();
                            }}
                        >
                            <BsDashCircle className="" size={24} strokeWidth={0.3} />
                        </button>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
InvoiceAccountSubscriptionTableRow.displayName = 'InvoiceAccountSubscriptionTableRow';
