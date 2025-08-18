import Tippy from '@tippyjs/react';
import {errorToast} from '^api/api';
import {orgIdParamState} from '^atoms/common';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionSeatStatusTag} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusTag';
import {MultiCalender} from '^components/ui/calenders/MultiCalender';
import {useUpdateSubscriptionSeat} from '^models/SubscriptionSeat/hook';
import {
    SubscriptionSeatDto,
    SubscriptionSeatStatus,
    UpdateSubscriptionSeatRequestDto,
} from '^models/SubscriptionSeat/type';
import {TeamMemberDto} from '^models/TeamMember';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {MinusCircle} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';

interface TeamMemberInSubscriptionTableRowProps {
    seat: SubscriptionSeatDto;
    onClick?: (seat: SubscriptionSeatDto) => any;
    reload: () => any;
    selected: boolean;
    onSelect: (selected: boolean) => any;
    onDelete: () => any;
}

export const TeamMemberInSubscriptionTableRow = memo((props: TeamMemberInSubscriptionTableRowProps) => {
    const {t} = useTranslation('subscription');
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const [isLoading, setIsLoading] = useState(false);
    const {seat, onClick, reload, selected, onSelect, onDelete} = props;
    const {mutateAsync: updateSubscriptionSeat} = useUpdateSubscriptionSeat();

    if (!seat.teamMember || !subscription) return null;

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';
    const loadingStyle = isLoading ? 'opacity-50 pointer-events-none' : '';

    const teamMember = seat.teamMember as TeamMemberDto;

    const showPagePath = OrgTeamMemberShowPageRoute.path(orgId, teamMember.id);

    const update = (dto: UpdateSubscriptionSeatRequestDto) => {
        setIsLoading(true);

        updateSubscriptionSeat({orgId, subscriptionId: subscription.id, id: seat.id, dto})
            .then(() => toast.success(t('detail.toast.saveSuccess')))
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
                    optionListBoxTitle={t('detail.memberTable.changeStatus') as string}
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
            <td className={`flex items-center text-gray-400 justify-between gap-2 ${hoverBgColor} ${loadingStyle}`}>
                <MultiCalender
                    startAt={seat.startAt || null}
                    finishAt={seat.finishAt || null}
                    onChange={({startAt, finishAt}) => update({startAt, finishAt})}
                    textHover="group-hover:text-scordi-300"
                />
                {(seat.startAt || seat.finishAt) && (
                    <button type="button" onClick={() => update({startAt: null, finishAt: null})}>
                        <MinusCircle />
                    </button>
                )}
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
                    <Tippy content={t('detail.memberTable.excludeFromSubscription')}>
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
