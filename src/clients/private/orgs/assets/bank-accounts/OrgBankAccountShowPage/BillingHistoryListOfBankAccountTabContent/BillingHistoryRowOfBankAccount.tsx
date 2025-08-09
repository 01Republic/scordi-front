import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import React, {memo, useState} from 'react';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {eventCut} from '^utils/event';
import {Dropdown} from '^v3/share/Dropdown';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {SubscriptionProfile} from '^models/Subscription/components';
import {BillingHistoryStatusTagUI, BillingHistoryTimestamp, PayAmount} from '^models/BillingHistory/components';
import {MoreHorizontal} from 'lucide-react';
import {useUpdateBankAccountBillingHistory, useUpdateCreditCardBillingHistory} from '^models/BillingHistory/hook';
import {UpdateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/UpdateBillingHistoryByManual.request.dto';
import {ManualBillingHistoryModal} from '^clients/private/_modals/ManualBillingHistoryModal';
import {errorToast} from '^api/api';
import {useIdParam, useOrgIdParam} from '^atoms/common';

interface BillingHistoryRowOfBankAccountProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
    onDelete: (id: number) => any;
}

export const BillingHistoryRowOfBankAccount = memo((props: BillingHistoryRowOfBankAccountProps) => {
    const {item: billingHistory, onSaved, onDelete} = props;
    const orgId = useOrgIdParam();
    const bankAccountId = useIdParam('bankAccountId');
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useUpdateBankAccountBillingHistory(orgId, bankAccountId, billingHistory.id);

    const update = debounce((dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .then(() => onSaved && onSaved())
            .catch(() => toast.success('문제가 발생했어요.'));
    }, 250);

    const onUpdateBillingManual = async (dto: UpdateBillingHistoryByManualRequestDto) => {
        if (!billingHistory.bankAccountId) return;

        await mutateAsync(dto)
            .then(() => toast.success('결제내역이 수정되었습니다.'))
            .then(() => onSaved && onSaved())
            .catch(errorToast);
    };

    return (
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

            {/*결제금액*/}
            <td>
                <PayAmount billingHistory={billingHistory} />
            </td>

            {/*연결된 구독*/}
            <td>{billingHistory.subscription && <SubscriptionProfile subscription={billingHistory.subscription} />}</td>

            {/*비고*/}
            <td>
                <AirInputText
                    defaultValue={billingHistory.memo || undefined}
                    onChange={async (memo) => {
                        if (billingHistory.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

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
                                        onDelete(billingHistory.id);
                                    }}
                                >
                                    삭제하기
                                </a>
                            </li>
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
                        </ul>
                    )}
                </Dropdown>
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
            </td>
        </tr>
    );
});
