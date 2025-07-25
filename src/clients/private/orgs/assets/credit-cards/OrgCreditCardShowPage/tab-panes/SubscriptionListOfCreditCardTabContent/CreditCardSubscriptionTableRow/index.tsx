import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {
    SubscriptionProfile,
    LatestPayAmount,
    BillingCycleTypeTagUI,
    NextComputedBillingDateText,
    MemberCount,
} from '^models/Subscription/components';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {MinusCircle} from 'lucide-react';

interface CreditCardSubscriptionTableRowProps {
    subscription: SubscriptionDto;
    isManuallyCreated: boolean;
    reload: () => any;
}

export const CreditCardSubscriptionTableRow = memo((props: CreditCardSubscriptionTableRowProps) => {
    const {subscription, isManuallyCreated, reload} = props;

    const update = async (dto: UpdateSubscriptionRequestDto) => {
        return subscriptionApi
            .update(subscription.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .then(() => reload && reload())
            .catch(() => toast.error('문제가 발생했어요.'));
    };

    const disconnect = async () => {
        const disconnectConfirm = () => {
            return confirm2(
                '구독 연결을 해제할까요?',
                <p>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>결제수단에서 제외</b>됩니다. <br />
                    그래도 연결을 해제 하시겠어요?
                </p>,
                'warning',
            );
        };

        return confirmed(disconnectConfirm())
            .then(() => subscriptionApi.update(subscription.id, {creditCardId: null}))
            .then(() => toast.success('연결을 해제했어요.'))
            .then(() => reload())
            .catch(errorToast);
    };

    const {nextComputedBillingDate} = subscription;

    return (
        <tr className="table-fixed">
            {/* 서비스 명 */}
            <td>
                <OpenButtonColumn
                    href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                >
                    <SubscriptionProfile subscription={subscription} />
                </OpenButtonColumn>
            </td>

            {/* 구독상태 */}
            {/*<td>*/}
            {/*    <MemberCount subscription={subscription} />*/}
            {/*</td>*/}

            {/* 결제주기 */}
            <td>
                <BillingCycleTypeTagUI value={subscription.billingCycleType} short />
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
                                <MinusCircle className="" size={24} strokeWidth={0.3} />
                            </button>
                        </Tippy>
                    )}
                </div>
            </td>
        </tr>
    );
});
CreditCardSubscriptionTableRow.displayName = 'CreditCardSubscriptionTableRow';
