import {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {AdminInfoPanel} from '../../share/panels/AdminInfoPanel';
import {useRecoilValue} from 'recoil';
import {adminUserDetail} from './index';

export const UserBasicInfoPanel = memo(() => {
    const user = useRecoilValue(adminUserDetail);

    if (!user) return <></>;

    return (
        <AdminInfoPanel
            // title="세부 정보"
            items={[
                {label: 'id', value: user.id},
                {label: 'name', value: user.name},
                {label: 'email', value: user.email},
                {label: 'phone', value: user.phone},
                {label: 'profileImgUrl', value: <Avatar src={user.profileImgUrl} className="w-[32px]" />},
                {label: 'createdAt', value: new Date(user.createdAt).toLocaleString()},
            ]}
        />
    );
});
