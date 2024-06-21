import React, {memo} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';

interface CreditCardTableRowProps {
    creditCard: CreditCardDto;
}

export const CreditCardTableRow = memo((props: CreditCardTableRowProps) => {
    const {creditCard} = props;

    const company = creditCard.company;

    return (
        <tr>
            {/* 카드 프로필 */}
            <td>
                <CreditCardProfileOption2 item={creditCard} />
            </td>

            {/* 카드사 */}
            <td>
                {company ? (
                    <div className="text-14">
                        <span>
                            {company.clientType === CodefCustomerType.Personal && '개인'}
                            {company.clientType === CodefCustomerType.Business && '법인'}
                            {company.clientType === CodefCustomerType.All && '통합'}
                        </span>
                        <span className="text-12 mx-1">/</span>
                        <span>{company.displayName.replace('카드', '').trim()}</span>
                    </div>
                ) : (
                    <i className="text-gray-300">-</i>
                )}
            </td>

            {/* 팀 */}
            <td></td>

            {/* 소지자 */}
            <td></td>

            {/* 종류(신용/체크) */}
            <td></td>

            {/* 연결된 구독 수 (sortable) */}
            <td></td>

            {/* 연동 상태 */}
            <td></td>
        </tr>
    );
});
CreditCardTableRow.displayName = 'CreditCardTableRow';
