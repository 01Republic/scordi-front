import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {CreditCardDto, CreditCardUsingStatus, UpdateCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {IsCreditCardTag, IsPersonalTag, UsingStatusTag} from '^models/CreditCard/components';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import Tippy from '@tippyjs/react';
import {FiMinusCircle} from '^components/react-icons';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {teamCreditCardApi} from '^models/TeamCreditCard/api';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';

interface TeamPaymentTableRowProps {
    creditCard?: CreditCardDto;
    reload?: () => any;
}

export const TeamPaymentTableRow = memo((props: TeamPaymentTableRowProps) => {
    const teamId = useRecoilValue(teamIdParamState);
    const {creditCard, reload} = props;

    if (!creditCard) return null;

    const update = async (dto: UpdateCreditCardDto) => {
        const {id, organizationId: orgId} = creditCard;
        return creditCardApi
            .update(orgId, id, dto)
            .then(() => toast.success('수정했습니다'))
            .catch(() => toast.error('문제가 발생했습니다'))
            .finally(() => reload && reload());
    };

    const company = creditCard.company;
    const expiry = creditCard.decryptSign().expiry;

    const showPagePath = OrgCreditCardShowPageRoute.path(creditCard.organizationId, creditCard.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const onDelete = () => {
        creditCardApi.teamsApi.destroy(creditCard.id, teamId).then(() => reload && reload());
    };

    return (
        <tr className={`${hoverBgColor} group`}>
            {/* 카드 프로필 */}
            <td>
                <OpenButtonColumn href={showPagePath}>
                    <CreditCardProfileOption2 item={creditCard} />
                </OpenButtonColumn>
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
                {/*{creditCard.expireMonth && creditCard.expireYear ? (*/}
                {/*    <div>*/}
                {/*        {creditCard.expireYear}-{padStart(creditCard.expireMonth.toString(), 2, '0')}*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div className="italic text-gray-400">-</div>*/}
                {/*)}*/}
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

            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="이 팀에서 제거">
                        <div>
                            <FiMinusCircle
                                fontSize={24}
                                className="text-red-500 opacity-30 group-hover:opacity-100 transition-all cursor-pointer btn-animation"
                                onClick={onDelete}
                            />
                        </div>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
TeamPaymentTableRow.displayName = 'TeamPaymentTableRow';
