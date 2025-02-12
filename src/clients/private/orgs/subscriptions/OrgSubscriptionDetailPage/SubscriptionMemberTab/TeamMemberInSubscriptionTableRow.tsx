import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {orgIdParamState} from '^atoms/common';
import {errorToast} from '^api/api';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionUsingStatusTag} from '^models/Subscription/components';
import Datepicker from 'react-tailwindcss-datepicker';
import {SubscriptionSeatDto, UpdateSubscriptionSeatRequestDto} from '^models/SubscriptionSeat/type';
import {subscriptionApi} from '^models/Subscription/api';
import {FiMinusCircle} from '^components/react-icons';
import {confirm2} from '^components/util/dialog';
import {yyyy_mm_dd} from '^utils/dateTime';
import {debounce} from 'lodash';

interface TeamMemberInSubscriptionTableRowProps {
    seat: SubscriptionSeatDto;
    onClick?: (seat: SubscriptionSeatDto) => any;
    reload: () => any;
}

export const TeamMemberInSubscriptionTableRow = memo((props: TeamMemberInSubscriptionTableRowProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const [isLoading, setIsLoading] = useState(false);
    const {seat, onClick, reload} = props;

    if (!seat.teamMember || !subscription) return null;

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';
    const loadingStyle = isLoading ? 'opacity-50 pointer-events-none' : '';

    const teamMember = seat.teamMember as TeamMemberDto;

    const showPagePath = OrgTeamMemberShowPageRoute.path(orgId, teamMember.id);

    const update = debounce(async (dto: UpdateSubscriptionSeatRequestDto) => {
        setIsLoading(true);
        return subscriptionApi.seatsApi
            .update(orgId, subscription.id, seat.id, dto)
            .then(() => reload())
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, 500);

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
            <td className={`${hoverBgColor} ${loadingStyle}`}>
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
                <SubscriptionUsingStatusTag value={seat.status} />
            </td>

            {/* 이메일 */}
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 계정부여일 */}
            <td className={` ${hoverBgColor} ${loadingStyle}`}>
                <Datepicker
                    inputClassName="input px-1.5 py-1 rounded-md w-auto input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center focus:bg-slate-100 focus:outline-1 focus:outline-offset-0 text-gray-400"
                    toggleClassName={`${seat.finishAt ? '' : 'hidden'}`}
                    toggleIcon={() => <FiMinusCircle />}
                    asSingle={true}
                    useRange={false}
                    placeholder={seat.startAt ? yyyy_mm_dd(seat.startAt) : '-'}
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
            <td className={` ${hoverBgColor} ${loadingStyle}`}>
                <Datepicker
                    inputClassName="input px-1.5 py-1 rounded-md w-auto input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center focus:bg-slate-100 focus:outline-1 focus:outline-offset-0 text-gray-400"
                    toggleClassName={`${seat.finishAt ? '' : 'hidden'}`}
                    toggleIcon={() => <FiMinusCircle />}
                    asSingle={true}
                    useRange={false}
                    placeholder={seat.finishAt ? yyyy_mm_dd(seat.finishAt) : '-'}
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
