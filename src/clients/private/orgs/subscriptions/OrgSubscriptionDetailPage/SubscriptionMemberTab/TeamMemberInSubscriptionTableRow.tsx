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
import Datepicker from 'react-tailwindcss-datepicker';
import {
    SubscriptionSeatDto,
    SubscriptionSeatStatus,
    UpdateSubscriptionSeatRequestDto,
} from '^models/SubscriptionSeat/type';
import {subscriptionApi} from '^models/Subscription/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {yyyy_mm_dd} from '^utils/dateTime';
import {debounce} from 'lodash';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {SubscriptionSeatStatusTag} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusTag';
import {MinusCircle} from 'lucide-react';

interface TeamMemberInSubscriptionTableRowProps {
    seat: SubscriptionSeatDto;
    onClick?: (seat: SubscriptionSeatDto) => any;
    reload: () => any;
    selected: boolean;
    onSelect: (selected: boolean) => any;
}

export const TeamMemberInSubscriptionTableRow = memo((props: TeamMemberInSubscriptionTableRowProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const [isLoading, setIsLoading] = useState(false);
    const {seat, onClick, reload, selected, onSelect} = props;

    const [seatDateValue, setSeatDateValue] = useState({
        startDate: seat.startAt || null,
        endDate: seat.finishAt || null,
    });

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
        const deleteConfirm = () => {
            return confirm2(
                `구독 연결을 해제할까요?`,
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>이 멤버가 구독에서 제외</b>됩니다. <br />
                    그래도 연결을 해제 하시겠어요?
                </span>,
                'warning',
            );
        };

        confirmed(deleteConfirm())
            .then(() => setIsLoading(true))
            .then(() => subscriptionApi.seatsApi.destroy(orgId, subscription.id, seat.id))
            .then(() => toast.success('삭제했습니다'))
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <tr className="group">
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => onSelect && onSelect(e.target.checked)}
                    className="w-4 h-4 focus:ring-0 cursor-pointer"
                />
            </td>
            {/* 이름 */}
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <OpenButtonColumn href={showPagePath}>
                    <div
                        className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}
                    >
                        <TeamMemberAvatar teamMember={teamMember} className="w-8 h-8" />
                        <div className="">
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
                <SelectColumn
                    value={seat.status}
                    getOptions={async () => [
                        SubscriptionSeatStatus.QUIT,
                        SubscriptionSeatStatus.NONE,
                        SubscriptionSeatStatus.PAID,
                        SubscriptionSeatStatus.FREE,
                    ]}
                    onSelect={async (status: SubscriptionSeatStatus) => {
                        if (status === seat.status) return;
                        return update({status});
                    }}
                    ValueComponent={SubscriptionSeatStatusTag}
                    contentMinWidth="240px"
                    optionListBoxTitle="상태를 변경합니다."
                    inputDisplay={false}
                />
            </td>

            {/* 이메일 */}
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 계정부여(예정)일 ~ 계정회수(예정)일 */}
            <td className={` ${hoverBgColor} ${loadingStyle}`}>
                <Datepicker
                    containerClassName="min-w-[220px] relative"
                    inputClassName="input px-1.5 py-1 rounded-md w-full input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center focus:bg-slate-100 focus:outline-1 focus:outline-offset-0 text-gray-400"
                    toggleClassName={`${seat.finishAt ? '' : 'hidden'}`}
                    toggleIcon={() => <MinusCircle />}
                    useRange={true}
                    placeholder={`${seat.startAt ? yyyy_mm_dd(seat.startAt) : ''} ~ ${
                        seat.finishAt ? yyyy_mm_dd(seat.finishAt) : ''
                    }`}
                    minDate={new Date()}
                    value={seatDateValue}
                    onChange={async (newValue) => {
                        if (!newValue?.startDate || !newValue?.endDate) return;
                        setSeatDateValue(newValue);
                        return update({startAt: newValue?.startDate, finishAt: newValue?.endDate});
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
                            <MinusCircle
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
