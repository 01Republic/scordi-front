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
import {Dropdown} from '^v3/share/Dropdown';
import {IoIosMore} from 'react-icons/io';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';

interface SubscriptionTableRowProps {
    subscription: SubscriptionDto;
    onDelete: (subscription: SubscriptionDto) => any;
    reload: () => any;
}

export const SubscriptionTableRow = memo((props: SubscriptionTableRowProps) => {
    const {subscription, onDelete, reload} = props;

    const showPagePath = OrgSubscriptionDetailPageRoute.resourcePath(subscription);

    return (
        <tr>
            {/* 서비스 명 */}
            <td>
                <OpenButtonColumn href={showPagePath}>
                    <SubscriptionProfile subscription={subscription} />
                </OpenButtonColumn>
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

            <td className="cursor-pointer">
                <Dropdown
                    placement="bottom-end"
                    Trigger={() => <IoIosMore fontSize={20} />}
                    Content={() => {
                        return (
                            <ul
                                className="dropdown-content menu p-0 shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[8rem]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                <li>
                                    <a
                                        className="p-2 text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 active:bg-red-100"
                                        onClick={() => onDelete(subscription)}
                                    >
                                        삭제하기
                                    </a>
                                </li>
                            </ul>
                        );
                    }}
                />
            </td>
        </tr>
    );
});
SubscriptionTableRow.displayName = 'SubscriptionTableRow';
