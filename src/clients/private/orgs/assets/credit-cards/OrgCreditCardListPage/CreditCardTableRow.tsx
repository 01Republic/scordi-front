import React, {memo} from 'react';
import {CreditCardDto, CreditCardUsingStatus, UpdateCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {IsCreditCardTag, IsPersonalTag, UsingStatusTag} from '^models/CreditCard/components';
import {padStart} from 'lodash';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';

interface CreditCardTableRowProps {
    creditCard: CreditCardDto;
    reload?: () => any;
}

export const CreditCardTableRow = memo((props: CreditCardTableRowProps) => {
    const {creditCard, reload} = props;

    const update = async (dto: UpdateCreditCardDto) => {
        const {id, organizationId: orgId} = creditCard;
        return creditCardApi
            .update(orgId, id, dto)
            .then(() => toast.success('수정했습니다'))
            .catch(() => toast.error('문제가 발생했습니다'))
            .finally(() => reload && reload());
    };

    const company = creditCard.company;

    return (
        <tr>
            {/* 카드 프로필 */}
            <td>
                <CreditCardProfileOption2 item={creditCard} />
            </td>

            {/* 상태 (editable, sortable) */}
            <td>
                <SelectColumn
                    value={creditCard.usingStatus}
                    getOptions={async () => [
                        CreditCardUsingStatus.UnDef,
                        CreditCardUsingStatus.NoUse,
                        CreditCardUsingStatus.InUse,
                        CreditCardUsingStatus.Expired,
                    ]}
                    onSelect={async (usingStatus: CreditCardUsingStatus) => {
                        if (usingStatus === creditCard.usingStatus) return;
                        return update({usingStatus});
                    }}
                    ValueComponent={UsingStatusTag}
                    contentMinWidth="240px"
                    optionListBoxTitle="사용 상태를 변경합니다"
                    inputDisplay={false}
                />
            </td>

            {/* 카드사 */}
            <td>
                {company ? (
                    <div className="text-14">
                        <span>{company.displayName.replace('카드', '').trim()}</span>
                    </div>
                ) : (
                    <i className="text-gray-300">-</i>
                )}
            </td>

            {/* 구분(법인/개인) */}
            <td>
                <SelectColumn
                    value={creditCard.isPersonal}
                    getOptions={async () => [true, false]}
                    onSelect={async (isPersonal: boolean) => {
                        if (isPersonal === creditCard.isPersonal) return;
                        return update({isPersonal});
                    }}
                    ValueComponent={IsPersonalTag}
                    contentMinWidth="240px"
                    optionListBoxTitle="카드 구분"
                    inputDisplay={false}
                />
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
                {creditCard.expireMonth && creditCard.expireYear ? (
                    <div>
                        {creditCard.expireYear}-{padStart(creditCard.expireMonth.toString(), 2, '0')}
                    </div>
                ) : (
                    <div className="italic text-gray-400">-</div>
                )}
            </td>

            {/* 소지자 */}
            <td>
                <TeamMemberSelectColumn
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
CreditCardTableRow.displayName = 'CreditCardTableRow';
