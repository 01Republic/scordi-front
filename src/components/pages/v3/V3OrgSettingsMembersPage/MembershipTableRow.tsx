import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MembershipDto} from '^models/Membership/type';
import {UserAvatar} from '^v3/share/UserAvatar';

interface MembershipTableRowProps {
    membership: MembershipDto;
}

export const MembershipTableRow = memo((props: MembershipTableRowProps) => {
    const {membership} = props;
    const {user} = membership;

    return (
        <tr>
            {/* 이름 */}
            <td>
                <div className="flex gap-2.5 items-center">
                    <UserAvatar user={user} />
                    <div>
                        <p className="text-sm font-semibold flex gap-2 items-center">
                            <span>{user.name}</span>
                            {/*<span className="badge badge-sm badge-primary">승인</span>*/}
                        </p>
                        <p className="block text-xs font-normal text-gray-400">{user.email}</p>
                    </div>
                </div>
            </td>

            {/* 팀 */}
            <td></td>

            {/* 권한 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{membership.level.toLowerCase()}</p>
            </td>

            {/* 상태 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{membership.approvalStatus.toLowerCase()}</p>
            </td>
        </tr>
    );
});
