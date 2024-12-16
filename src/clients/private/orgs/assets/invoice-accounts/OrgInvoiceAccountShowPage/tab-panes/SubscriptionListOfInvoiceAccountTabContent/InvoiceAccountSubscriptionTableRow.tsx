import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {toast} from 'react-hot-toast';
import {BsDashCircle} from 'react-icons/bs';
import {yyyy_mm_dd} from '^utils/dateTime';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {confirm2} from '^components/util/dialog';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {
    SubscriptionProfile,
    IsFreeTierTagUI,
    BillingCycleTypeTagUI,
    PayMethodSelect,
    LatestPayAmount,
} from '^models/Subscription/components';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {useCurrentInvoiceAccount} from '../../atom';

interface InvoiceAccountSubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const InvoiceAccountSubscriptionTableRow = memo((props: InvoiceAccountSubscriptionTableRowProps) => {
    const {subscription, reload} = props;
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    const update = async (dto: UpdateSubscriptionRequestDto) => {
        return subscriptionApi
            .update(subscription.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.error('문제가 발생했어요.'))
            .finally(() => reload && reload());
    };

    const disconnect = async () => {
        if (!currentInvoiceAccount) return;
        const invoiceAccountId = currentInvoiceAccount.id;

        const isConfirmed = await confirm2(
            '구독 연결을 해제할까요?',
            <p>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>청구서 메일에서 제외</b>됩니다. <br />
                그래도 연결을 해제 하시겠어요?
            </p>,
            'warning',
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        await invoiceAccountApi.subscriptionsApi.destroy(invoiceAccountId, subscription.id);
        toast.success('연결을 해제했어요.');
        reload();
    };

    if (!currentInvoiceAccount) return <></>;

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

            {/*결제금액*/}
            <td className="text-right">
                <LatestPayAmount subscription={subscription} />
            </td>

            {/* 갱신일 */}
            <td className="text-14">
                {nextComputedBillingDate && yyyy_mm_dd(new Date(`${nextComputedBillingDate} `))}
            </td>

            {/*소지자*/}
            {/*<td>*/}
            {/*    {subscription.master ? (*/}
            {/*        <TeamMemberProfileCompact item={subscription.master} />*/}
            {/*    ) : (*/}
            {/*        <div className="relative">*/}
            {/*            <div className="invisible">*/}
            {/*                <TeamMemberProfileOption item={subscription.master} />*/}
            {/*            </div>*/}
            {/*            <div className="absolute inset-0 flex items-center text-12 text-gray-300">*/}
            {/*                <span>비어있음</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</td>*/}

            {/* 결제수단 */}
            <td className="pl-3 py-0">
                <PayMethodSelect
                    subscription={subscription}
                    onChange={reload}
                    ValueComponent={(props) => {
                        const {value} = props;
                        return typeof value === 'string' ? <p>{value}</p> : <CreditCardProfileCompact item={value} />;
                    }}
                />
            </td>

            {/* 비고 */}
            {/*<td>*/}
            {/*    {subscription.master ? (*/}
            {/*        <TeamMemberProfileCompact item={subscription.master} />*/}
            {/*    ) : (*/}
            {/*        <div className="relative">*/}
            {/*            <div className="invisible">*/}
            {/*                <TeamMemberProfileOption item={subscription.master} />*/}
            {/*            </div>*/}
            {/*            <div className="absolute inset-0 flex items-center text-12 text-gray-300">*/}
            {/*                <span>비어있음</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</td>*/}

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
                    {currentInvoiceAccount.isManuallyCreated && (
                        <Tippy className="!text-12" content="구독 제외">
                            <div>
                                <button
                                    className="relative text-red-300 hover:text-red-500 transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        return disconnect();
                                    }}
                                >
                                    <BsDashCircle className="" size={24} strokeWidth={0.3} />
                                </button>
                            </div>
                        </Tippy>
                    )}
                </div>
            </td>
        </tr>
    );
});
InvoiceAccountSubscriptionTableRow.displayName = 'InvoiceAccountSubscriptionTableRow';
