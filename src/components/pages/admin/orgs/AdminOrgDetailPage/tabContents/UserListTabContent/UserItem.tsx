import {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {CardTableTR} from '^admin/share';
import {UserDto} from '^types/user.type';

interface UserItemProps {
    user: UserDto;
    orgId: number;
    borderBottom?: boolean;
}

export const UserItem = memo((props: UserItemProps) => {
    const {user, orgId} = props;

    const membership = (user.memberships || []).find((m) => m.organizationId === orgId);

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
                <button className="btn btn-sm btn-primary">보기</button>
                <button className="btn btn-sm btn-warning">수정</button>
                <button className="btn btn-sm btn-error">삭제</button>
            </div>
        </CardTableTR>
    );
});
