import React, {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {UserAvatar} from '^v3/share/UserAvatar';

interface MembershipTableRowProps {
    member: MembershipDto;
}

export const MembershipTableRow = memo((props: MembershipTableRowProps) => {
    const {member} = props;
    const {user} = member;

    if (!member) return <></>;

    return (
        <tr>
            {/* 이름 */}
            <td>
                <div className="flex gap-2.5 items-center">
                    {user && <UserAvatar user={user} />}
                    <div>
                        <p className="text-sm font-semibold flex gap-2 items-center">
                            <span>{user ? user.name : member.invitedEmail}</span>
                        </p>
                        <p className="block text-xs font-normal text-gray-400">
                            {user ? user.email : member.invitedEmail}
                        </p>
                    </div>
                </div>
            </td>

            {/* 팀 */}
            <td></td>

            {/* 권한 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{member.level.toLowerCase()}</p>
            </td>
            {/* 상태 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{member.approvalStatus.toLowerCase()}</p>
            </td>
        </tr>
    );
});
