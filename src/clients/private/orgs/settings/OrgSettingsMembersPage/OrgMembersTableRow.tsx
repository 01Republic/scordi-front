import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {TeamMemberTag} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Members/TeamMemberTag';
import {toast} from 'react-toastify';
import {confirm2} from '^components/util/dialog';
import {UserDto} from '^models/User/types';
import {MembershipDto, t_membershipLevel} from '^models/Membership/types';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {UserProfile} from '^models/User/components/UserProfile';
import {WithChildren} from '^types/global.type';
import {MembershipLevelDropdown} from './MembershipLevelDropdown';
import {MembershipMoreDropdown} from './MembershipMoreDropdown';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Avatar} from '^components/Avatar';

interface TeamMemberTableRowProps {
    membership?: MembershipDto;
    onClick?: (membership: MembershipDto) => any;
    reload?: () => any;
}

export const OrgMembersTableRow = memo((props: TeamMemberTableRowProps) => {
    const {membership, onClick, reload} = props;

    if (!membership) return null;

    const {user} = membership;
    const showPagePath = membership.teamMember
        ? OrgTeamMemberShowPageRoute.path(membership.organizationId, membership.teamMember.id)
        : '#';

    return (
        <tr className="group">
            {/* 이름 */}
            <TD onClick={() => onClick && onClick(membership)}>
                <OpenButtonColumn href={showPagePath}>
                    {user ? (
                        <UserProfile
                            user={user}
                            Avatar={() => <UserAvatar src={user.profileImgUrl} alt={user.name} className="w-9 h-9" />}
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <UserAvatar
                                alt={membership.invitedEmail || ''}
                                fallbackLetter={(membership.invitedEmail || '')[0]}
                                className="w-9 h-9"
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-400 relative top-[-1px]">
                                    {membership.invitedEmail}
                                </p>
                            </div>
                        </div>
                    )}
                </OpenButtonColumn>
            </TD>

            {/* 권한 */}
            <TD onClick={() => onClick && onClick(membership)}>
                <MembershipLevelDropdown membership={membership} reload={reload} />
            </TD>

            <TD className="">
                <div className="flex items-center justify-end gap-4">
                    <div className="text-13 text-gray-500">{!membership.userId ? '초대 수락 대기중...' : ''}</div>
                    <MembershipMoreDropdown membership={membership} reload={reload} />
                </div>
            </TD>
        </tr>
    );
});
OrgMembersTableRow.displayName = 'TeamMembersTableRow';

interface TDProps extends WithChildren {
    className?: string;
    onClick?: () => any;
}

const TD = memo((props: TDProps) => {
    const {className = '', onClick, children} = props;

    return (
        <td className={`px-2 cursor-pointer group-hover:bg-gray-100/50 transition-all ${className}`} onClick={onClick}>
            {children}
        </td>
    );
});
