import React, {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {SubscriptionProfile} from '^models/Subscription/components';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import {BillingHistoryStatusTagUI, PayAmount, BillingHistoryTimestamp} from '^models/BillingHistory/components';
import {Dropdown} from '^v3/share/Dropdown';
import {eventCut} from '^utils/event';
import {MoreHorizontal} from 'lucide-react';
import {ManualBillingHistoryModal} from '^clients/private/_modals/ManualBillingHistoryModal';
import {UpdateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/UpdateBillingHistoryByManual.request.dto';
import {useUpdateCreditCardBillingHistory} from '^models/BillingHistory/hook';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {errorToast} from '^api/api';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';

interface BillingHistoryRowOfCreditCardProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
    onDelete: (id: number) => any;
}

export const BillingHistoryRowOfCreditCard = memo((props: BillingHistoryRowOfCreditCardProps) => {
    const {item: billingHistory, onSaved, onDelete} = props;
    const orgId = useOrgIdParam();
    const creditCardId = useIdParam('creditCardId');
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useUpdateCreditCardBillingHistory(orgId, creditCardId, billingHistory.id);

    const update = debounce((dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .then(() => onSaved && onSaved())
            .catch(() => toast.success('문제가 발생했어요.'));
    }, 250);

    const onUpdateBillingManual = async (dto: UpdateBillingHistoryByManualRequestDto) => {
        if (!billingHistory.creditCardId) return;

        await mutateAsync(dto)
            .then(() => toast.success('결제내역이 수정되었습니다.'))
            .then(() => onSaved && onSaved())
            .catch(errorToast);
    };

    return (
        <>
            <tr className="group text-14" data-id={billingHistory.id} onClick={() => console.log(billingHistory)}>
                {/*일시*/}
                <td>
                    <BillingHistoryTimestamp billingHistory={billingHistory} />
                </td>

                {/*상태*/}
                <td>
                    <BillingHistoryStatusTagUI billingHistory={billingHistory} />
                </td>

                {/*내용*/}
                <td className="text-12 max-w-sm whitespace-pre-wrap">{billingHistory.title}</td>

                {/*<td>{billingHistory.pageSubject}</td>*/}

                {/*결제금액*/}
                <td>
                    <PayAmount billingHistory={billingHistory} />
                </td>

                {/*연결된 구독*/}
                <td>
                    {billingHistory.subscription && (
                        <OpenButtonColumn
                            href={OrgSubscriptionDetailPageRoute.path(orgId, billingHistory.subscription.id)}
                        >
                            <SubscriptionProfile subscription={billingHistory.subscription} />
                        </OpenButtonColumn>
                    )}
                </td>

                {/*비고*/}
                <td className="max-w-52">
                    <AirInputText
                        defaultValue={billingHistory.memo || undefined}
                        onChange={async (memo) => {
                            if (billingHistory.memo === memo) return;
                            return update({memo});
                        }}
                    />
                </td>
                {/*<td>{yyyy_mm_dd_hh_mm(billingHistory.issuedAt)}</td>*/}
                {/*<td>{yyyy_mm_dd_hh_mm(billingHistory.createdAt)}</td>*/}

                {/* Actions */}
                <td className="cursor-pointer">
                    <Dropdown placement="bottom-end" Trigger={() => <MoreHorizontal fontSize={20} />}>
                        {({hide}) => (
                            <ul
                                className="dropdown-content menu p-0 shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[8rem]"
                                onClick={eventCut}
                            >
                                {billingHistory.connectMethod === 'MANUAL' && (
                                    <li>
                                        <a
                                            className="p-2 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                                            onClick={() => {
                                                hide();
                                                setIsOpen(true);
                                            }}
                                        >
                                            수정하기
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a
                                        className="p-2 text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 active:bg-red-100"
                                        onClick={() => {
                                            hide();
                                            onDelete(billingHistory.id);
                                        }}
                                    >
                                        삭제하기
                                    </a>
                                </li>
                            </ul>
                        )}
                    </Dropdown>
                </td>
                {isOpen && (
                    <ManualBillingHistoryModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        isLoading={isPending}
                        onUpdate={onUpdateBillingManual}
                        billingHistory={billingHistory}
                        creditCard={billingHistory?.creditCard || undefined}
                        bankAccount={billingHistory?.bankAccount || undefined}
                        subscription={billingHistory?.subscription}
                        readonly="결제수단"
                    />
                )}
            </tr>
        </>
    );
});
BillingHistoryRowOfCreditCard.displayName = 'BillingHistoryRowOfCreditCard';
