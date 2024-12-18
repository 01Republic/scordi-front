import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {errorToast} from '^api/api';
import {eventCut} from '^utils/event';
import {IoIosMore} from 'react-icons/io';
import {Dropdown} from '^v3/share/Dropdown';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {
    SubscriptionProfile,
    PayMethodSelect,
    MemberCount,
    SubscriptionUsingStatusTag,
    LatestPayAmount,
    NextComputedBillingDateText,
} from '^models/Subscription/components';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {subscriptionApi} from '^models/Subscription/api';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';

interface SubscriptionTableRowProps {
    subscription: SubscriptionDto;
    onDelete: (subscription: SubscriptionDto) => any;
    reload: () => any;
}

export const SubscriptionTableRow = memo((props: SubscriptionTableRowProps) => {
    const {subscription, onDelete, reload} = props;

    const update = debounce((dto: UpdateSubscriptionRequestDto) => {
        const {id, organizationId: orgId} = subscription;
        return subscriptionApi
            .update(id, dto)
            .then(() => toast.success('수정했습니다'))
            .catch(errorToast)
            .finally(() => reload());
    }, 250);

    const showPagePath = OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id);

    return (
        <tr>
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

            {/* 결제주기 */}
            <td>
                <BillingCycleTypeTagUI
                    value={subscription.billingCycleType}
                    className="no-selectable !cursor-default"
                    short
                />
            </td>

            {/* 과금방식: (TestBank: 연, 고정, 사용량, 크레딧, 1인당) */}
            {/*<td className="">*/}
            {/*    <PayingType subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* 결제금액 */}
            <td className="text-right">
                <LatestPayAmount subscription={subscription} currencyChangeable />
            </td>

            {/* 갱신일 */}
            <td className="text-right">
                <NextComputedBillingDateText subscription={subscription} />
            </td>

            {/* 사용인원 */}
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>

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
            <td>
                <AirInputText
                    defaultValue={subscription.desc || undefined}
                    onChange={async (desc) => {
                        if (subscription.desc === desc) return;
                        return update({desc});
                    }}
                />
            </td>

            {/* 담당자 */}
            {/*<td className="py-0 pl-5 w-40">*/}
            {/*    <MasterSelect subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* Actions */}
            <td className="cursor-pointer">
                <Dropdown placement="bottom-end" Trigger={() => <IoIosMore fontSize={20} />}>
                    {({hide}) => (
                        <ul
                            className="dropdown-content menu p-0 shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[8rem]"
                            onClick={eventCut}
                        >
                            <li>
                                <a
                                    className="p-2 text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 active:bg-red-100"
                                    onClick={() => {
                                        hide();
                                        onDelete(subscription);
                                    }}
                                >
                                    삭제하기
                                </a>
                            </li>
                        </ul>
                    )}
                </Dropdown>
            </td>
        </tr>
    );
});
SubscriptionTableRow.displayName = 'SubscriptionTableRow';
