import {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {CardTableTR} from '^admin/share';
import {UserDto} from '^models/User/types';
import {LinkTo} from '^components/util/LinkTo';
import {AdminUserPageRoute} from '^pages/admin/users/[id]';

interface UserItemProps {
    user: UserDto;
    orgId: number;
    borderBottom?: boolean;
}

export const UserItem = memo((props: UserItemProps) => {
    const {user, orgId} = props;

    const membership = (user.memberships || []).find((m) => m.organizationId === orgId);
    const detailPath = AdminUserPageRoute.path(user.id);

    return (
        <CardTableTR gridClass="grid-cols-5">
            {/* image, profile */}
            <div>
                <div className="flex gap-2 items-center">
                    <Avatar src={user.profileImgUrl} className="w-[32px]" />
                    <p className="text-left whitespace-nowrap">
                        <span className="text-xs text-gray-500 mr-1">(#{user.id})</span>
                        <span className="">{user.name}</span>
                    </p>
                </div>
            </div>

            {/* membership level */}
            <div>{membership?.level}</div>

            {/* 가입일시 */}
            <div>
                <span className="whitespace-nowrap">{user.createdAt.toLocaleString()}</span>
            </div>

            {/* 수정일시 */}
            <div>
                <span className="whitespace-nowrap">{user.updatedAt.toLocaleString()}</span>
            </div>

            {/* actions */}
            <div className="flex gap-2 items-center">
                <LinkTo href={detailPath} text="보기" className="btn btn-sm btn-info" />
                <button className="btn btn-sm btn-warning">수정</button>
                <button className="btn btn-sm btn-error">삭제</button>
            </div>
        </CardTableTR>
    );
});
