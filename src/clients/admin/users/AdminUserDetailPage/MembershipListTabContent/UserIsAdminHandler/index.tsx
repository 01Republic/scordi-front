import {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {adminUserDetail} from '^admin/users/AdminUserDetailPage';
import {userManageApi} from '^models/User/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {debounce} from 'lodash';

interface UserIsAdminHandlerProps {
    reload?: () => any;
}

export const UserIsAdminHandler = memo((props: UserIsAdminHandlerProps) => {
    const {reload} = props;
    const [user, setUser] = useRecoilState(adminUserDetail);
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return <></>;

    const toggle = debounce((isAdmin: boolean) => {
        if (user.isAdmin === isAdmin) return;
        if (!confirm(`관리자 권한을 ${isAdmin ? '부여' : '제거'} 할까요?`)) return;

        setIsLoading(true);
        userManageApi
            .update(user.id, {isAdmin})
            .then(() => userManageApi.show(user.id))
            .then((res) => setUser(res.data))
            .then(() => toast.success('변경 완료!'))
            .then(reload)
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, 500);

    return (
        <div>
            {user.isAdmin ? (
                <button
                    className={`btn btn-sm !bg-red-200 text-red-600 !border-red-400 ${isLoading ? 'loading' : ''}`}
                    onClick={() => toggle(false)}
                >
                    관리자 권한 제거
                </button>
            ) : (
                <button className={`btn btn-sm btn-scordi ${isLoading ? 'loading' : ''}`} onClick={() => toggle(true)}>
                    관리자 권한 부여
                </button>
            )}
        </div>
    );
});
UserIsAdminHandler.displayName = 'UserIsAdminHandler';
