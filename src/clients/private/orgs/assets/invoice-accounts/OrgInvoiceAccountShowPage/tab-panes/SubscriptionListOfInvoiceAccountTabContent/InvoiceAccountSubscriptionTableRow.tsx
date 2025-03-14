import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import {errorToast} from '^api/api';
import {yyyy_mm_dd} from '^utils/dateTime';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {confirm2, confirmed} from '^components/util/dialog';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {
    SubscriptionProfile,
    BillingCycleTypeTagUI,
    PayMethodSelect,
    LatestPayAmount,
} from '^models/Subscription/components';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {useCurrentInvoiceAccount} from '../../atom';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {MinusCircle} from 'lucide-react';

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
            .then(() => reload && reload())
            .catch(() => toast.error('문제가 발생했어요.'));
    };

    const disconnect = async () => {
        if (!currentInvoiceAccount) return;
        const invoiceAccountId = currentInvoiceAccount.id;
        const disconnectConfirm = () => {
            return confirm2(
                '구독 연결을 해제할까요?',
                <p>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>청구서 메일에서 제외</b>됩니다. <br />
                    그래도 연결을 해제 하시겠어요?
                </p>,
                'warning',
            );
        };

        return confirmed(disconnectConfirm())
            .then(() => invoiceAccountApi.subscriptionsApi.destroy(invoiceAccountId, subscription.id))
            .then(() => toast.success('연결을 해제했어요.'))
            .then(() => reload())
            .catch(errorToast);
    };

    if (!currentInvoiceAccount) return <></>;

    const {nextComputedBillingDate} = subscription;

    return (
        <tr>
            {/* 서비스명 */}
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
                        return typeof value === 'string' ? (
                            <p>{value}</p>
                        ) : value instanceof CreditCardDto ? (
                            <CreditCardProfileCompact item={value} />
                        ) : (
                            <BankAccountProfileCompact item={value} />
                        );
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
                                    <MinusCircle className="" size={24} strokeWidth={0.3} />
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
