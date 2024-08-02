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
import {confirm2} from '^components/util/dialog';

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

    const showPagePath = OrgCreditCardShowPageRoute.path(creditCard.organizationId, creditCard.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const onDelete = () => {
        confirm2(`결제수단 연결 해제`, `${creditCard.name} 연결을 해제 할까요?`, 'warning').then((res) => {
            if (res.isConfirmed) {
                creditCardApi.teamsApi.destroy(creditCard.id, teamId).then(() => {
                    toast.success('삭제했습니다');
                    reload && reload();
                });
            }
        });
    };

    return (
        <tr className={`${hoverBgColor} group`}>
            {/* 카드 프로필 */}
            <td className={`${hoverBgColor}`}>
                <OpenButtonColumn href={showPagePath}>
                    <CreditCardProfileOption2 item={creditCard} />
                </OpenButtonColumn>
            </td>

            {/* 소지자 */}
            <td className={`${hoverBgColor}`}>
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
