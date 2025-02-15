import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {confirm2} from '^components/util/dialog';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {CreditCardDto, UpdateCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {CreditCardProfileOption2, IsCreditCardTag} from '^models/CreditCard/components';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';

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
            .catch(() => toast.error('문제가 발생했어요.'))
            .finally(() => reload && reload());
    };

    const expiry = creditCard.decryptSign().expiry;

    return (
        <tr className="table-fixed">
            {/* 구독명 */}
            <td>
                <CreditCardProfileOption2 item={creditCard} />
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

            {/* 연동 상태 */}
            <td></td>
        </tr>
    );
});
