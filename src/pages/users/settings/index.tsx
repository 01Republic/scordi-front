import {useRouter} from 'next/router';
import {UserEditPageRoute} from '^pages/users/edit';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav} from '^components/MobileTopNav';
import {removeToken} from '^api/api';
import {toast} from 'react-toastify';
import {UserLoginPageRoute} from '^pages/users/login';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const UserSettingsPageRoute = {
    pathname: '/users/settings',
    path: () => UserSettingsPageRoute.pathname,
};

const Settings = () => {
    const router = useRouter();
    const currentUser = useCurrentUser();

    const settingContents = [
        {name: '내 정보 수정', action: () => router.push(UserEditPageRoute.pathname)},
        {name: '등록한 서비스', action: () => router.push(OrgAppsIndexPageRoute.path(currentUser?.orgId))},
        {name: '피드백 보내기', action: () => window.open('https://oh8kq2gqq3y.typeform.com/to/ZF4C5sTK', '_blank')},
        {
            name: '로그아웃',
            action: () => {
                removeToken();
                toast.info('로그아웃 되었습니다.');
                router.push(UserLoginPageRoute.pathname);
            },
        },
    ];

    return (
        <>
            <MobileTopNav title={'설정'} />
            <div className={'px-[20px]'}>
                {settingContents.map((content, index) => (
                    <div key={index} onClick={content.action} className={'p-[20px] border-b'}>
                        <p className={'text-[15px]'}>{content.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

Settings.getLayout = getOrgMainLayout;

export default Settings;
