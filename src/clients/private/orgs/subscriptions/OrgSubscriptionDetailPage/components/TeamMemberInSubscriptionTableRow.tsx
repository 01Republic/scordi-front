import React, {memo, useState} from 'react';
import {teamMemberApi, TeamMemberDto, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {TeamDto} from '^models/Team/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {intlDateLong, intlDateShort, yyyy_mm_dd} from '^utils/dateTime';
import {IsFreeTierColumn} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionUsingStatusTag} from '^models/Subscription/components';

interface TeamMemberInSubscriptionTableRowProps {
    teamMember: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
}

export const TeamMemberInSubscriptionTableRow = memo((props: TeamMemberInSubscriptionTableRowProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setIsLoading] = useState(false);
    const {teamMember, onClick, reload} = props;
    const showPagePath = OrgTeamMemberShowPageRoute.path(teamMember.organizationId, teamMember.id);
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    if (!subscription) return null;

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';
    const loadingStyle = isLoading ? 'opacity-50 pointer-events-none' : '';

    const update = async (dto: UpdateTeamMemberDto) => {
        return teamMemberApi
            .update(orgId, teamMember.id, {notes: dto.notes})
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => reload && reload());
    };

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={`${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(teamMember)}>
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
                {/* TODO 각 멤버의 구독 상태 어떻게 알지? */}
                <SubscriptionUsingStatusTag value={subscription.usingStatus} />
            </td>

            {/* 이메일 */}
            <td className={`${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 계정부여일 */}
            <td className={` ${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {/* TODO 각 멤버의 구독 상태 어떻게 알지? */}
                    {yyyy_mm_dd(new Date())}
                </p>
            </td>

            {/* 계정회수일 */}
            <td className={` ${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {/* TODO 각 멤버의 구독 상태 어떻게 알지? */}
                    {yyyy_mm_dd(new Date())}
                </p>
            </td>

            {/* 비고 */}
            <td
                className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`}
                onClick={() => onClick && onClick(teamMember)}
            >
                <AirInputText
                    defaultValue={teamMember.notes || undefined}
                    onChange={async (notes) => {
                        if (teamMember.notes === notes) return;
                        return update({notes});
                    }}
                />
            </td>
        </tr>
    );
});
TeamMemberInSubscriptionTableRow.displayName = 'TeamMemberTableRow';
