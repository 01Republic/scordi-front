import React, {memo} from 'react';
import toast from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {MoreHorizontal} from 'lucide-react';
import {debounce} from 'lodash';
import {eventCut} from '^utils/event';
import {errorToast} from '^api/api';
import {OpenButtonColumn} from '^_components/table/OpenButton';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {
    BillingCycleTypeTagUI,
    LastPaidAt,
    LatestPayAmount,
    MemberCount,
    PayMethodSelect,
    PayMethodSelectType,
    SubscriptionProfile,
    SubscriptionUsingStatusTag,
} from '^models/Subscription/components';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {
    SubscriptionDto,
    SubscriptionUsingStatus,
    SubscriptionUsingStatusValues,
    UpdateSubscriptionRequestDto,
} from '^models/Subscription/types';
import {Dropdown} from '^v3/share/Dropdown';
import {CreditCardDto} from '^models/CreditCard/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {subscriptionApi} from '^models/Subscription/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {useRemoveSubscription} from '^models/Subscription/hook';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {SubscriptionBillingCycleTypeValues} from '^models/Subscription/types/BillingCycleOptions';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {MasterSelect} from '^components/pages/v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/MasterProfile/MasterSelect';
import {visibleColumnsState} from '../atom';
import {allColumnIds, ColumnId} from '../tableColums';

interface GroupedSubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
    isChecked?: boolean;
    onCheck?: (checked: boolean) => any;
}

export const GroupedSubscriptionTableRow = memo((props: GroupedSubscriptionTableRowProps) => {
    const {subscription, reload, isChecked, onCheck} = props;
    const {mutate: deleteSubscription} = useRemoveSubscription(subscription.id);
    const visible = useRecoilValue(visibleColumnsState);
    const visibleSet = new Set(visible);

    const onDelete = () => {
        const deleteConfirm = () => {
            return confirm2(
                '구독을 삭제할까요?',
                <div className="text-16">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
                'warning',
            );
        };

        confirmed(deleteConfirm(), '삭제 취소')
            .then(() => deleteSubscription())
            .then(() => toast.success('구독을 삭제했어요.'))
            .catch(errorToast);
    };

    const _update = debounce(async (id: number, dto: UpdateSubscriptionRequestDto) => {
        return subscriptionApi
            .update(id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => reload());
    }, 250);

    const teams = (subscription.teamMembers || []).flatMap((member) => member.teams || []);
    const team = teams[0];

    const row: Record<ColumnId, () => React.ReactNode> = {
        checkBox: () => <td />,

        subscriptionName: () => (
            <td colSpan={2}>
                <div className="flex gap-3 items-center">
                    <label className={`flex justify-center items-center`}>
                        <input
                            type="checkbox"
                            className="bg-white rounded checkbox checkbox-primary checkbox-xs min-w"
                            defaultChecked={isChecked}
                            onChange={(e) => onCheck && onCheck(e.target.checked)}
                        />
                    </label>

                    {/*/!* 서비스 명 *!/*/}
                    <OpenButtonColumn
                        href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                    >
                        <SubscriptionProfile subscription={subscription} className="gap-2 mr-2" />
                    </OpenButtonColumn>
                </div>
            </td>
        ),

        // 팀
        team: () => (
            <td>
                <div className="flex items-center">{team && <TeamTag id={team.id} name={team.name} />}</div>
            </td>
        ),

        // 상태
        status: () => (
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
        ),

        // 결제주기
        billingCycle: () => (
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
        ),

        // 유/무료
        // "payingType : () =>  <td className="">
        //           <PayingType subscription={subscription} onChange={reload} />
        //       </td>,

        // 결제금액
        amount: () => (
            <td className="text-right">
                <LatestPayAmount subscription={subscription} />
            </td>
        ),

        // 최근결제일
        lastPaidAt: () => (
            <td className="text-right">
                <LastPaidAt subscription={subscription} />
            </td>
        ),

        // 사용인원
        memberCount: () => (
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>
        ),

        // 결제수단
        payMethod: () => (
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
        ),

        // 담당자
        master: () => (
            <td className="py-0 pl-3">
                <MasterSelect subscription={subscription} onChange={reload} />
            </td>
        ),

        // 비고
        note: () => (
            <td>
                <AirInputText
                    defaultValue={subscription.desc || undefined}
                    onChange={async (desc) => {
                        if (subscription.desc === desc) return;
                        return _update(subscription.id, {desc});
                    }}
                />
            </td>
        ),

        // actions
        actions: () => (
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
                                        onDelete();
                                    }}
                                >
                                    삭제하기
                                </a>
                            </li>
                        </ul>
                    )}
                </Dropdown>
            </td>
        ),
    };

    return (
        <tr>
            {allColumnIds
                .filter((id) => visibleSet.has(id))
                .map((id) => (
                    <React.Fragment key={id}>{row[id]()}</React.Fragment>
                ))}
        </tr>
    );
});
GroupedSubscriptionTableRow.displayName = 'GroupedSubscriptionTableRow';
