import React, {memo, useState} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionUsingStatusTag} from '^models/Subscription/components';
import Datepicker from 'react-tailwindcss-datepicker';
import {SubscriptionSeatDto, UpdateSubscriptionSeatRequestDto} from '^models/SubscriptionSeat/type';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionUsingStatus} from '^models/Subscription/types';
import Tippy from '@tippyjs/react';
import {FiMinusCircle} from '^components/react-icons';
import {confirm2} from '^components/util/dialog';

interface TeamMemberInSubscriptionTableRowProps {
    seat: SubscriptionSeatDto;
    onClick?: (seat: SubscriptionSeatDto) => any;
    reload?: () => any;
}

export const TeamMemberInSubscriptionTableRow = memo((props: TeamMemberInSubscriptionTableRowProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setIsLoading] = useState(false);
    const {seat, onClick, reload} = props;

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';
    const loadingStyle = isLoading ? 'opacity-50 pointer-events-none' : '';

    if (!seat.teamMember) return null;

    const teamMember = seat.teamMember as TeamMemberDto;

    const showPagePath = OrgTeamMemberShowPageRoute.path(orgId, teamMember.id);
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    if (!subscription) return null;

    const update = async (dto: UpdateSubscriptionSeatRequestDto) => {
        setIsLoading(true);
        return subscriptionApi.seatsApi
            .update(orgId, subscription.id, seat.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => {
                setIsLoading(false);
                reload && reload();
            });
    };

    const usingStatus = seat.isPaid ? SubscriptionUsingStatus.PAID : SubscriptionUsingStatus.FREE;

    const onDelete = () => {
        confirm2(
            `구독 연결을 해제할까요?`,
            <span>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>이 멤버가 구독에서 제외</b>됩니다. <br />
                그래도 연결을 해제 하시겠어요?
            </span>,
            'warning',
        ).then((res) => {
            if (res.isConfirmed) {
                setIsLoading(true);
                subscriptionApi.seatsApi.destroy(orgId, subscription.id, seat.id).then(() => {
                    toast.success('삭제했습니다');
                    setIsLoading(false);
                    reload && reload();
                });
            }
        });
    };

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={`${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(seat)}>
                <OpenButtonColumn href={showPagePath}>
                    <div
                        className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}
                    >
                        <TeamMemberAvatar teamMember={teamMember} className="w-8 h-8" />
                        <div className="overflow-x-hidden">
                            <p className="truncate text-14">
                                <span>{teamMember.name}</span>
                            </p>
                        </div>
                    </div>
                </OpenButtonColumn>
            </td>

            {/* 팀 */}
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <TeamSelect teamMember={teamMember} onChange={() => reload && reload()} />
            </td>

            {/* 상태 */}
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <SubscriptionUsingStatusTag value={usingStatus} />
            </td>

            {/* 이메일 */}
            <td className={`${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(seat)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 계정부여일 */}
            <td className={` ${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(seat)}>
                <Datepicker
                    inputClassName="input px-1.5 py-1 rounded-md w-auto input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center focus:bg-slate-100 focus:outline-1 focus:outline-offset-0"
                    asSingle={true}
                    useRange={false}
                    value={{
                        startDate: seat.startAt || null,
                        endDate: seat.startAt || null,
                    }}
                    onChange={async (newValue) => {
                        if (seat.startAt === newValue?.startDate) return;
                        return update({startAt: newValue?.startDate});
                    }}
                />
            </td>

            {/* 계정회수일 */}
            <td className={` ${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(seat)}>
                <Datepicker
                    inputClassName="input px-1.5 py-1 rounded-md w-auto input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center focus:bg-slate-100 focus:outline-1 focus:outline-offset-0"
                    asSingle={true}
                    useRange={false}
                    value={{
                        startDate: seat.finishAt || null,
                        endDate: seat.finishAt || null,
                    }}
                    onChange={async (newValue) => {
                        if (seat.finishAt === newValue?.startDate) return;
                        return update({finishAt: newValue?.startDate});
                    }}
                />
            </td>

            {/* 비고 */}
            <td className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(seat)}>
                <AirInputText
                    defaultValue={seat.memo || undefined}
                    onChange={async (memo) => {
                        if (seat.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

            {/* 제외 */}
            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="이 구독에서 제외">
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
TeamMemberInSubscriptionTableRow.displayName = 'TeamMemberTableRow';
