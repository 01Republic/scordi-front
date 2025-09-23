import React, {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {MoreHorizontal} from 'lucide-react';
import {eventCut} from '^utils/event';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {UpdateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/UpdateBillingHistoryByManual.request.dto';
import {BillingHistoryDto, BillingHistoryStatus, UpdateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useDestroyBillingHistory, useUpdateSubscriptionBillingHistory} from '^models/BillingHistory/hook';
import {lpp, yyyy_mm_dd} from '^utils/dateTime';
import {Dropdown} from '^v3/share/Dropdown';
import {BillingHistoryStatusTagUI, PayAmount} from '^models/BillingHistory/components';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {BillingHistoryAttachmentShowButton} from '^clients/private/_components/button/BillingHistoryAttachmentShowButton';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {ManualBillingHistoryModal} from '^clients/private/_modals/ManualBillingHistoryModal';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {AbroadPayAmount} from '^models/BillingHistory/components/AbroadPayAmount';

interface SubscriptionBillingHistoriesTableRowProps {
    billingHistory: BillingHistoryDto;
    reload?: () => any;
    isChecked?: boolean;
    onCheck?: (checked: boolean) => any;
}

export const SubscriptionBillingHistoriesTableRow = memo((props: SubscriptionBillingHistoriesTableRowProps) => {
    const {billingHistory, reload, isChecked, onCheck} = props;
    const {organizationId} = billingHistory;
    const [isOpen, setIsOpen] = useState(false);

    const update = async (dto: UpdateBillingHistoryRequestDto) => {
        const {id, organizationId: orgId} = billingHistory;
        return appBillingHistoryApi
            .updateV2(id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .then(() => reload && reload())
            .catch(() => toast.error('문제가 발생했어요.'));
    };

    const {mutateAsync, isPending} = useUpdateSubscriptionBillingHistory(
        billingHistory.subscriptionId!,
        billingHistory.id,
    );

    const {mutateAsync: destroyBillingHistory} = useDestroyBillingHistory();

    const onUpdateBillingManual = async (dto: UpdateBillingHistoryByManualRequestDto) => {
        if (!billingHistory.subscriptionId) return;

        await mutateAsync(dto)
            .then(() => toast.success('결제내역이 수정되었습니다.'))
            .catch(errorToast);
    };

    const onDelete = (id: number) => {
        const deleteConfirm = () => {
            return confirm2(
                '결제내역을 삭제할까요?',
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
            .then(() => destroyBillingHistory(id))
            .then(() => toast.success('결제내역을 삭제했어요.'))
            .catch(errorToast);
    };

    return (
        <tr className="group" onClick={() => console.log(billingHistory)}>
            {/* 체크박스 */}
            <td className="pl-3 pr-1">
                <label className={`flex items-center justify-center`}>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs rounded bg-white"
                        defaultChecked={isChecked}
                        onChange={(e) => onCheck && onCheck(e.target.checked)}
                    />
                </label>
            </td>
            {/* 카드 프로필 */}
            <td className={'text-14'}>{lpp(billingHistory.paidAt || billingHistory.issuedAt, 'P')}</td>

            {/* 상태 */}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>

            {/* 결제금액 */}
            <td className={'text-14'}>
                <PayAmount billingHistory={billingHistory} />
            </td>

            {/* 청구금액 */}
            <td className={'text-14'}>
                <AbroadPayAmount billingHistory={billingHistory} />
            </td>

            {/* 연결된 결제수단 */}
            <td>
                {billingHistory.creditCard ? (
                    <OpenButtonColumn
                        href={OrgCreditCardShowPageRoute.path(organizationId, billingHistory.creditCard.id)}
                    >
                        <CreditCardProfileCompact item={billingHistory.creditCard} />
                    </OpenButtonColumn>
                ) : billingHistory.bankAccount ? (
                    <OpenButtonColumn
                        href={OrgCreditCardShowPageRoute.path(organizationId, billingHistory.bankAccount.id)}
                    >
                        <BankAccountProfileCompact item={billingHistory.bankAccount} />
                    </OpenButtonColumn>
                ) : (
                    <EmptyValue />
                )}
            </td>

            {/* 연결된 청구서 수신 메일 */}
            <td>
                {billingHistory.invoiceApp?.invoiceAccount ? (
                    <OpenButtonColumn
                        href={OrgInvoiceAccountShowPageRoute.path(
                            organizationId,
                            billingHistory.invoiceApp?.invoiceAccount.id,
                        )}
                    >
                        <InvoiceAccountProfileCompact invoiceAccount={billingHistory.invoiceApp?.invoiceAccount} />
                    </OpenButtonColumn>
                ) : (
                    <EmptyValue />
                )}
            </td>

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={billingHistory.memo || undefined}
                    onChange={async (memo) => {
                        if (billingHistory.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

            {/* 청구서 보기 */}
            <td>
                <BillingHistoryAttachmentShowButton billingHistory={billingHistory} />
            </td>

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
                    readonly="구독"
                />
            )}
        </tr>
    );
});
SubscriptionBillingHistoriesTableRow.displayName = 'SubscriptionBillingHistoriesTableRow';
