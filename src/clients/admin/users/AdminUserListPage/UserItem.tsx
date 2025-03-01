import {memo} from 'react';
import {FindAllUserByAdminDto, UserDto} from '^models/User/types';
import {Avatar} from '^components/Avatar';
import {zeroPad} from '^utils/dateTime';
import {useRouter} from 'next/router';
import {AdminUserPageRoute} from '^pages/admin/users/[id]';
import {LinkTo} from '^components/util/LinkTo';
import {userManageApi} from '^models/User/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';

interface UserItemProps {
    user: UserDto;
    fetchData: (params: FindAllUserByAdminDto) => any;
}

/**
 * TODO: [회원관리목록p / 회원 아이템] 회원 정보 펼치기 기능
 * TODO: [회원관리목록p / 회원 아이템] 모바일 회원 정보 펼치기 기능
 * TODO: [회원관리목록p / 회원 아이템] 회원관리 수정p 이동 기능
 */
export const UserItem = memo((props: UserItemProps) => {
    const router = useRouter();
    const {user, fetchData} = props;
    const {createdAt} = user;

    const detailPath = AdminUserPageRoute.path(user.id);
    const gotoDetailPage = () => router.push(AdminUserPageRoute.path(user.id));
    const onDelete = () => {
        confirmed(confirm2('사용자를 삭제하시겠습니까?'))
            .then(() => userManageApi.destroy(user.id))
            .then(() => router.reload())
            .catch(errorToast);
    };

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
                <div>
                    {user.isAdmin && (
                        <button
                            className="btn btn-xs !bg-red-200"
                            onClick={() => {
                                return fetchData({
                                    where: {isAdmin: true},
                                    page: 1,
                                    order: {id: 'DESC'},
                                });
                            }}
                        >
                            ADMIN
                        </button>
                    )}
                </div>
                <div className="hidden sm:block">
                    <p>
                        <span className="mr-1">가입일:</span>
                        {createdAt.getFullYear()}.{zeroPad(String(createdAt.getMonth() + 1))}.
                        {zeroPad(String(createdAt.getDate()))}
                    </p>
                </div>
                <div>
                    <div className="hidden sm:flex gap-1.5 items-center justify-between">
                        <LinkTo href={detailPath} text="상세" className="btn btn-sm btn-info" />
                        <button className="btn btn-sm btn-warning">수정</button>
                        <button className="btn btn-sm btn-error" onClick={() => onDelete()}>
                            삭제
                        </button>
                    </div>
                    <p className="sm:hidden relative -top-[1px]" onClick={gotoDetailPage}>{`>`}</p>
                </div>
            </div>
        </button>
    );
});
