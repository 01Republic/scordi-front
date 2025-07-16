import React, {memo} from 'react';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import Tippy from '@tippyjs/react';
import {confirm2} from '^components/util/dialog';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {
    SubscriptionProfile,
    PayMethodSelect,
    LatestPayAmount,
    MemberCount,
    SubscriptionUsingStatusTag,
    SubscriptionInvoiceAccounts,
} from '^models/Subscription/components';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {MinusCircle} from 'lucide-react';
import {useUpdateSubscription} from '^models/Subscription/hook';

interface TeamMemberSubscriptionTableRowProps {
    teamMember: TeamMemberDto;
    subscription: SubscriptionDto;
    reload: () => any;
}

export const TeamMemberSubscriptionTableRow = memo((props: TeamMemberSubscriptionTableRowProps) => {
    const {teamMember, subscription, reload} = props;
    const {mutateAsync} = useUpdateSubscription();

    const update = (dto: UpdateSubscriptionRequestDto) => {
        mutateAsync({subscriptionId: subscription.id, data: dto})
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.error('문제가 발생했어요.'));
    };

    const disconnect = async () => {
        const isConfirmed = await confirm2(
            '구독 연결을 해제할까요?',
            <span>
                이 작업은 취소할 수 없습니다. <br />
                <b>이용 구독에서 제외</b>됩니다. <br />
                그래도 연결을 해제 하시겠어요?
            </span>,
            'warning',
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;
        await teamMemberApi.subscriptions.disconnect(teamMember.id, subscription.id);
        toast.success('연결을 해제했어요.');
        reload();
    };

    const showPagePath = OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id);

    return (
        <tr onClick={() => console.log(subscription)}>
            {/* 서비스 명 */}
            <td>
                <OpenButtonColumn href={showPagePath}>
                    <SubscriptionProfile subscription={subscription} />
                </OpenButtonColumn>
            </td>

            {/* 유/무료 */}
            {/*<td>*/}
            {/*    <IsFreeTierColumn subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* 상태 */}
            <td>
                <SubscriptionUsingStatusTag
                    value={subscription.usingStatus}
                    className="no-selectable !cursor-default"
                />
            </td>

            {/* 결제금액 */}
            <td className="text-right">
                <LatestPayAmount subscription={subscription} />
            </td>

            {/* 결제주기 */}
            {/*<td>*/}
            {/*    <BillingCycleTypeColumn subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* 과금방식: (TestBank: 연, 고정, 사용량, 크레딧, 1인당) */}
            {/*<td className="">*/}
            {/*    <PayingType subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* 연결된 결제수단 */}
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

            {/* 연결된 청구서 수신 메일 */}
            <td>
                <SubscriptionInvoiceAccounts subscription={subscription} />
            </td>

            {/* 사용인원 */}
            {/*<td className="text-center">*/}
            {/*    <MemberCount subscription={subscription} />*/}
            {/*</td>*/}

            {/* 다음 결제일 */}
            {/*<td className="text-right">*/}
            {/*    <NextPaymentDate nextPayDate={nextPayDate} />*/}
            {/*</td>*/}

            {/* 담당자 */}
            {/*<td className="py-0 pl-5 w-40">*/}
            {/*    <MasterSelect subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

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

            {/* Actions */}
            <td>
                <div className="flex items-center justify-center">
                    <Tippy className="!text-12" content="구독 제외하기">
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
                </div>
            </td>
        </tr>
    );
});
TeamMemberSubscriptionTableRow.displayName = 'TeamMemberSubscriptionTableRow';
