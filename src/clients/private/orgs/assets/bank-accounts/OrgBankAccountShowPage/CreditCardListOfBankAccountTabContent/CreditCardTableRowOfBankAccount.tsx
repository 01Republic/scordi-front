import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {confirm2, confirmed} from '^components/util/dialog';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {CreditCardDto, UpdateCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {CreditCardProfileOption2, IsCreditCardTag} from '^models/CreditCard/components';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {errorToast} from '^api/api';
import Tippy from '@tippyjs/react';
import {BsDashCircle} from '@react-icons/all-files/bs/BsDashCircle';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';

interface CreditCardTableRowOfBankAccountProps {
    creditCard: CreditCardDto;
    reload: () => any;
}

export const CreditCardTableRowOfBankAccount = memo((props: CreditCardTableRowOfBankAccountProps) => {
    const {creditCard, reload} = props;

    const update = async (dto: UpdateCreditCardDto) => {
        return creditCardApi
            .update(creditCard.organizationId, creditCard.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .then(() => reload && reload())
            .catch(() => toast.error('문제가 발생했어요.'));
    };

    const disconnect = async () => {
        const disconnectConfirm = () => {
            return confirm2(
                '카드 연결을 해제할까요?',
                <div>
                    <div className="bg-red-50 rounded-lg px-4 py-3 text-13">
                        <div className="text-14 font-semibold mb-2">
                            안심하세요 <span className="text-16">👋</span>️
                        </div>
                        <div>이 과정은 카드사나 금융거래정보 등 스코디 외부에 영향을 주지 않아요.</div>
                        <div>연결을 해제해도 다시 연결 할 수 있어요.</div>
                    </div>
                </div>,
                'warning',
            );
        };

        const {id, organizationId} = creditCard;
        return confirmed(disconnectConfirm())
            .then(() => creditCardApi.update(organizationId, id, {bankAccountId: null}))
            .then(() => toast.success('연결을 해제했어요.'))
            .then(() => reload())
            .catch(errorToast);
    };

    const expiry = creditCard.decryptSign().expiry;

    const showPagePath = OrgCreditCardShowPageRoute.path(creditCard.organizationId, creditCard.id);

    return (
        <tr className="table-fixed">
            {/* 카드명 */}
            <td>
                <OpenButtonColumn href={showPagePath}>
                    <CreditCardProfileOption2 item={creditCard} />
                </OpenButtonColumn>
            </td>

            {/* 종류(신용/체크) */}
            <td>
                <SelectColumn
                    value={creditCard.isCreditCard}
                    getOptions={async () => [true, false]}
                    onSelect={async (isCreditCard: boolean) => {
                        if (isCreditCard === creditCard.isCreditCard) return;
                        return update({isCreditCard});
                    }}
                    ValueComponent={IsCreditCardTag}
                    contentMinWidth="240px"
                    optionListBoxTitle="카드 종류"
                    inputDisplay={false}
                />
            </td>

            {/* 유효기간 */}
            <td className="text-14">
                {expiry ? (
                    <div className="flex items-center gap-0.5">
                        <div>{expiry.slice(0, 2)}</div>
                        <small>/</small>
                        <div>{expiry.slice(2, 4)}</div>
                    </div>
                ) : (
                    <div className="italic text-gray-400">-</div>
                )}
            </td>

            {/* 소지자 */}
            <td>
                <TeamMemberSelectColumn
                    compactView
                    defaultValue={creditCard.holdingMember || undefined}
                    onChange={async (holdingMember) => {
                        if (creditCard.holdingMemberId === holdingMember?.id) return;
                        return update({holdingMemberId: holdingMember?.id || null});
                    }}
                    optionListBoxTitle="소지자를 변경할까요?"
                    detachableOptionBoxTitle="현재 소지자"
                />
            </td>

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={creditCard.memo || undefined}
                    onChange={async (memo) => {
                        if (creditCard.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

            {/* Action */}
            <td>
                <div className="flex items-center justify-center">
                    <Tippy className="!text-12" content="연결 해제">
                        <button
                            className="relative text-red-300 hover:text-red-500 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                disconnect();
                            }}
                        >
                            <BsDashCircle className="" size={24} strokeWidth={0.3} />
                        </button>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
