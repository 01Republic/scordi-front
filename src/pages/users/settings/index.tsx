import {useRouter} from "next/router"
import {UserEditPageRoute} from "^pages/users/edit";
import {getOrgMainLayout} from "^layouts/org/mainLayout";
import {MobileTopNav} from "^components/MobileTopNav";

export const UserSettingsPageRoute = {
    pathname: '/users/settings',
    path: () => UserSettingsPageRoute.pathname,
}

const Settings = () => {
    const router = useRouter()

    const settingContents = [
        {name: '내 정보 수정', action: () => router.push(UserEditPageRoute.pathname)},
        {name: '등록한 서비스', action: () => null},
        {name: '피드백 보내기', action: () => null},
        {name: '로그아웃', action: () => null},
    ]

    return (
        <>
            <MobileTopNav title={'설정'}/>
            <div className={'px-[20px]'}>
                {settingContents.map((content, index) => (
                    <div key={index} onClick={content.action}
                         className={'p-[20px] border-b'}
                    >
                        <p className={'text-[15px]'}>{content.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

Settings.getLayout = getOrgMainLayout;

export default Settings