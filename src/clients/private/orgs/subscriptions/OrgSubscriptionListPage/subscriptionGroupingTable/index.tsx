import React, {memo, useState} from 'react';
import {ChevronDown, ChevronRight, MoreHorizontal} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {errorToast} from '^api/api';
import {eventCut} from '^utils/event';
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
import {ProductDto} from '^models/Product/type';
import {ProductProfile} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/subscriptionGroupingTable/ProductProfile';
import {CheckboxHandler, useCheckboxHandler} from '^hooks/useCheckboxHandler';

interface SubscriptionGroupingTableRowProps {
    product: ProductDto;
    onDelete: (subscription: SubscriptionDto) => any;
    reload: () => any;
    ch?: CheckboxHandler<SubscriptionDto>;
    isOpen?: boolean;
    toggleOpen: (id: number) => void;
}

export const SubscriptionGroupingTableRow = memo((props: SubscriptionGroupingTableRowProps) => {
    const {product, onDelete, reload, ch, isOpen, toggleOpen} = props;

    const _update = debounce(async (id: number, dto: UpdateSubscriptionRequestDto) => {
        return subscriptionApi
            .update(id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => reload());
    }, 250);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    return (
        <>
            <tr>
                <td className={`pr-1 pl-3 text-start ${hoverBgColor}`} colSpan={11}>
                    <button
                        type="button"
                        className="flex gap-2 justify-center items-center"
                        onClick={() => toggleOpen(product.id)}
                    >
                        {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                        <ProductProfile product={product} />
                    </button>
                </td>
            </tr>
            {isOpen &&
                product?.subscriptions?.map((subscription) => (
                    <tr key={`${product.id}-${subscription.id}`}>
                        <td />
                        <td className="pr-1 pl-3" colSpan={2}>
                            <div className="flex gap-3 items-center">
                                <label className={`flex justify-center items-center`}>
                                    <input
                                        type="checkbox"
                                        className="bg-white rounded checkbox checkbox-primary checkbox-xs min-w"
                                        checked={ch?.isChecked(subscription)}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            ch?.checkOne(subscription, e.target.checked);
                                        }}
                                    />
                                </label>
                                {/*/!* 서비스 명 *!/*/}
                                <OpenButtonColumn
                                    href={OrgSubscriptionDetailPageRoute.path(
                                        subscription.organizationId,
                                        subscription.id,
                                    )}
                                >
                                    <SubscriptionProfile subscription={subscription} className="gap-2 mr-2" />
                                </OpenButtonColumn>
                            </div>
                        </td>

                        {/*<td></td>*/}
                        {/* 상태 */}
                        <td>
                            <SelectColumn
                                value={subscription.usingStatus}
                                getOptions={async () => [...SubscriptionUsingStatusValues].reverse()}
                                onSelect={async (usingStatus: SubscriptionUsingStatus) => {
                                    if (usingStatus === subscription.usingStatus) return;
                                    return _update(subscription.id, {usingStatus});
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
                                    return _update(subscription.id, {billingCycleType});
                                }}
                                ValueComponent={({value}) => <BillingCycleTypeTagUI value={value} short />}
                                contentMinWidth="240px"
                                optionListBoxTitle="결제주기를 변경합니다"
                                inputDisplay={false}
                            />
                        </td>
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
                        {/*비고*/}
                        <td>
                            <AirInputText
                                defaultValue={subscription.desc || undefined}
                                onChange={async (desc) => {
                                    if (subscription.desc === desc) return;
                                    return _update(subscription.id, {desc});
                                }}
                            />
                        </td>

                        {/* 담당자 */}
                        {/*<td className="py-0 pl-5 w-40">*/}
                        {/*    <MasterSelect subscription={subscription} onChange={reload} />*/}
                        {/*</td>*/}

                        {/*Actions*/}
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
                ))}
        </>
    );
});
