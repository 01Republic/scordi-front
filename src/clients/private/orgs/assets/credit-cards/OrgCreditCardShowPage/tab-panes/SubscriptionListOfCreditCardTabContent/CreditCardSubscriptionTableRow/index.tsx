import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import {BsDashCircle} from 'react-icons/bs';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {
    IsFreeTierTagUI,
    SubscriptionProfile,
    LatestPayAmount,
    BillingCycleTypeTagUI,
    NextComputedBillingDateText,
    MemberCount,
} from '^models/Subscription/components';
import {subscriptionApi} from '^models/Subscription/api';
import {confirm2} from '^components/util/dialog';
import {useCurrentCodefCard} from '../../../atom';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';

interface CreditCardSubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const CreditCardSubscriptionTableRow = memo((props: CreditCardSubscriptionTableRowProps) => {
    const {subscription, reload} = props;
    const {isManuallyCreated} = useCurrentCodefCard();

    const update = async (dto: UpdateSubscriptionRequestDto) => {
        return subscriptionApi
            .update(subscription.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.error('문제가 발생했어요.'))
            .finally(() => reload && reload());
    };

    const disconnect = async () => {
        const isConfirmed = await confirm2(
            '구독 연결을 해제할까요?',
            <p>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>결제수단에서 제외</b>됩니다. <br />
                그래도 연결을 해제 하시겠어요?
            </p>,
            'warning',
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;
        await subscriptionApi.update(subscription.id, {creditCardId: null});
        toast.success('연결을 해제했어요.');
        reload();
    };

    const {nextComputedBillingDate} = subscription;

    return (
        <tr className="table-fixed">
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

            {/*결제금액*/}
            <td className="text-right">
                <LatestPayAmount subscription={subscription} />
            </td>

            {/* 갱신일 */}
            <td className="text-right">
                <NextComputedBillingDateText subscription={subscription} />
            </td>

            {/* 사용인원 */}
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={subscription.desc || undefined}
                    onChange={async (desc) => {
                        if (subscription.desc === desc) return;
                        return update({desc});
                    }}
                />
            </td>

            {/* Action */}
            <td>
                <div className="flex items-center justify-center">
                    {isManuallyCreated && (
                        <Tippy className="!text-12" content="구독 제외">
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
                    )}
                </div>
            </td>
        </tr>
    );
});
CreditCardSubscriptionTableRow.displayName = 'CreditCardSubscriptionTableRow';
