import {memo} from 'react';
import {UserDto} from '^types/user.type';
import {Avatar} from '^components/Avatar';
import {zeroPad} from '^utils/dateTime';
import {useRouter} from 'next/router';
import {AdminUserPageRoute} from '^pages/admin/users/[id]';

interface UserItemProps {
    user: UserDto;
}

/**
 * TODO: [회원관리목록p / 회원 아이템] 회원 정보 펼치기 기능
 * TODO: [회원관리목록p / 회원 아이템] 모바일 회원 정보 펼치기 기능
 * TODO: [회원관리목록p / 회원 아이템] 회원관리 수정p 이동 기능
 * TODO: [회원관리목록p / 회원 아이템] 회원관리 삭제 기능
 */
export const UserItem = memo((props: UserItemProps) => {
    const router = useRouter();
    const {user} = props;
    const {createdAt} = user;

    const gotoDetailPage = () => router.push(AdminUserPageRoute.path(user.id));

    return (
        <button className="btn btn-lg btn-block no-animation !bg-neutral gap-2 items-center justify-between border rounded-lg normal-case">
            <div>
                <div className="flex gap-2 items-center">
                    <Avatar src={user.profileImgUrl} className="w-[32px]" />
                    <div className="text-left">
                        <p>
                            <span className="mr-1">{user.name}</span>
                            <span className="text-xs text-gray-500">(#{user.id})</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="mr-1">{user.email}</span>
                            <span>/ {user.phone || '전화번호가 입력되지 않음'}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="hidden sm:block">
                    <p>
                        <span className="mr-1">가입일:</span>
                        {createdAt.getFullYear()}.{zeroPad(String(createdAt.getMonth() + 1))}.
                        {zeroPad(String(createdAt.getDate()))}
                    </p>
                </div>
                <div>
                    <div className="hidden sm:flex gap-1.5 items-center justify-between">
                        <button className="btn btn-sm btn-info" onClick={gotoDetailPage}>
                            상세
                        </button>
                        <button className="btn btn-sm btn-warning">수정</button>
                        <button className="btn btn-sm btn-error">삭제</button>
                    </div>
                    <p className="sm:hidden relative -top-[1px]" onClick={gotoDetailPage}>{`>`}</p>
                </div>
            </div>
        </button>
    );
});
