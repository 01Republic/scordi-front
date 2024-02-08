import {useRouter} from 'next/router';
import {UserEditPageRoute} from '^pages/users/edit';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav} from '^components/MobileTopNav';
import {removeToken} from '^api/api';
import {UserLoginPageRoute} from '^pages/users/login';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {useCurrentUser} from '^models/User/hook';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {useToast} from '^hooks/useToast';

export const UserSettingsPageRoute = {
    pathname: '/users/settings',
    path: () => UserSettingsPageRoute.pathname,
};

const Settings = () => {
    const router = useRouter();
    const {currentUser} = useCurrentUser();
    const {toast} = useToast();
    if (!currentUser) return <></>;

    const settingContents = [
        {name: '내 정보 수정', action: () => router.push(UserEditPageRoute.pathname)},
        {
            name: '연동한 서비스',
            action: () => router.push(OrgAppIndexPageRoute.path(currentUser.lastSignedOrgId)),
        },
        {name: '피드백 보내기', action: () => window.open('https://oh8kq2gqq3y.typeform.com/to/ZF4C5sTK', '_blank')},
        {
            name: '이용약관',
            action: () => window.open('https://api.payplo.me:8080/terms/serviceUsageTerm-v20221101-1.txt', '_blank'),
        },
        {
            name: '개인정보 처리방침',
            action: () =>
                window.open(
                    'https://api.payplo.me:8080/terms/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8-v20221101-1.html',
                    '_blank',
                ),
        },
        {
            name: '로그아웃',
            action: () => {
                removeToken();
                window.location.assign(UserLoginPageRoute.pathname);
                toast.success('로그아웃 되었습니다.');
            },
        },
    ];

    return (
        <OrgMobileLayout>
            <MobileTopNav title={'설정'} />
            <div className={'px-[20px]'}>
                {settingContents.map((content, index) => (
                    <div key={index} onClick={content.action} className={'p-[20px] border-b'}>
                        <p className={'text-[15px]'}>{content.name}</p>
                    </div>
                ))}
            </div>
        </OrgMobileLayout>
    );
};

export default Settings;
