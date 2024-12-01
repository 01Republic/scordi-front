import React, {memo, useState} from 'react';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {MembershipDto} from '^models/Membership/types';
import {MembershipLevelDropdown} from '^models/Membership/components';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {UserProfile} from '^models/User/components/UserProfile';
import {WithChildren} from '^types/global.type';
import {MembershipMoreDropdown} from './MembershipMoreDropdown';

interface TeamMemberTableRowProps {
    membership?: MembershipDto;
    onClick?: (membership: MembershipDto) => any;
    reload?: () => any;
}

export const OrgMembersTableRow = memo((props: TeamMemberTableRowProps) => {
    const {membership, onClick, reload} = props;
    const [isLoading, setIsLoading] = useState(false);

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
                    {isLoading ? (
                        <div className="btn btn-sm !bg-white !border-none loading text-13 !text-gray-500">
                            <span className="font-[400]">이메일 전송중...</span>
                        </div>
                    ) : (
                        <div className="text-13 text-gray-500">{!membership.userId ? '초대 수락 대기중...' : ''}</div>
                    )}
                    <MembershipMoreDropdown membership={membership} reload={reload} setIsLoading={setIsLoading} />
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
