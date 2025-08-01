import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MoreHorizontal} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {errorToast} from '^api/api';
import {eventCut} from '^utils/event';
import {currentUserAtom} from '^models/User/atom';
import {CreditCardDto} from '^models/CreditCard/type';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {
    SubscriptionDto,
    SubscriptionUsingStatus,
    SubscriptionUsingStatusValues,
    UpdateSubscriptionRequestDto,
} from '^models/Subscription/types';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {
    LatestPayAmount,
    MemberCount,
    NextComputedBillingDateText,
    PayMethodSelect,
    PayMethodSelectType,
    SubscriptionProfile,
    SubscriptionUsingStatusTag,
} from '^models/Subscription/components';
import {Dropdown} from '^v3/share/Dropdown';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {subscriptionApi} from '^models/Subscription/api';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {SubscriptionBillingCycleTypeValues} from '^models/Subscription/types/BillingCycleOptions';

interface SubscriptionTableRowProps {
    subscription: SubscriptionDto;
    onDelete: (subscription: SubscriptionDto) => any;
    reload: () => any;
    isChecked?: boolean;
    onCheck?: (checked: boolean) => any;
}

export const SubscriptionTableRow = memo((props: SubscriptionTableRowProps) => {
    const {subscription, onDelete, reload, isChecked, onCheck} = props;
    const currentUser = useRecoilValue(currentUserAtom);

    const _update = debounce(async (dto: UpdateSubscriptionRequestDto) => {
        return subscriptionApi
            .update(subscription.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => reload());
    }, 250);

    const showPagePath = OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    return (
        <tr onClick={() => console.log(subscription)}>
            <td className={`pr-1 pl-3 ${hoverBgColor}`}>
                <label className={`flex justify-center items-center`}>
                    <input
                        type="checkbox"
                        className="bg-white rounded checkbox checkbox-primary checkbox-xs"
                        checked={isChecked}
                        onChange={(e) => onCheck && onCheck(e.target.checked)}
                    />
                </label>
            </td>

            {/* 서비스 명 */}
            <td>
                <OpenButtonColumn href={showPagePath}>
                    <SubscriptionProfile subscription={subscription} className="gap-2 mr-2" />
                </OpenButtonColumn>
            </td>

            {/* 유/무료 */}
            {/*<td>*/}
            {/*    <IsFreeTierColumn subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* 상태 */}
            <td>
                <SelectColumn
                    value={subscription.usingStatus}
                    getOptions={async () => [...SubscriptionUsingStatusValues].reverse()}
                    onSelect={async (usingStatus: SubscriptionUsingStatus) => {
                        if (usingStatus === subscription.usingStatus) return;
                        return _update({usingStatus});
                    }}
                    ValueComponent={({value}) => <SubscriptionUsingStatusTag value={value} />}
                    contentMinWidth="240px"
                    optionListBoxTitle="사용 상태를 변경합니다"
                    inputDisplay={false}
                />
            </td>

            {/* 결제주기 */}
            <td>
                <SelectColumn
                    value={subscription.billingCycleType}
                    getOptions={async () => [...SubscriptionBillingCycleTypeValues]}
                    onSelect={async (billingCycleType) => {
                        if (billingCycleType === subscription.billingCycleType) return;
                        return _update({billingCycleType});
                    }}
                    ValueComponent={({value}) => <BillingCycleTypeTagUI value={value} short />}
                    contentMinWidth="240px"
                    optionListBoxTitle="결제주기를 변경합니다"
                    inputDisplay={false}
                />
            </td>

            {/* 과금방식: (TestBank: 연, 고정, 사용량, 크레딧, 1인당) */}
            {/*<td className="">*/}
            {/*    <PayingType subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* 결제금액 */}
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

            {/* 결제수단 */}
            <td className="py-0 pl-3">
                <PayMethodSelect
                    payMethodSelectType={PayMethodSelectType.BOTH}
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
            <td>
                <AirInputText
                    defaultValue={subscription.desc || undefined}
                    onChange={async (desc) => {
                        if (subscription.desc === desc) return;
                        return _update({desc});
                    }}
                />
            </td>

            {/* 담당자 */}
            {/*<td className="py-0 pl-5 w-40">*/}
            {/*    <MasterSelect subscription={subscription} onChange={reload} />*/}
            {/*</td>*/}

            {/* Actions */}
            <td className="cursor-pointer">
                <Dropdown placement="bottom-end" Trigger={() => <MoreHorizontal fontSize={20} />}>
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
