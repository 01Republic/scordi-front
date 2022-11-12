import { useRouter } from "next/router";
import {DefaultButton} from "^components/Button";
import {AddServicePageRoute} from "^pages/apps/add/[id]/index";
import { AppSearchPageRoute } from "^pages/apps/search";

export const NotificationPageRoute = {
    pathname: '/apps/add/notification',
    path: () => NotificationPageRoute.pathname,
}

const NotificationPage = () => {
    const router = useRouter();

    return (
        <>
            <div className={'px-[20px] py-[40px]'}>
                <h2>알림 신청 완료</h2>
                <p>
                    작업이 완료되면 바로 알려드릴게요! <br/>
                    조금만 기다려 주세요.
                </p>
                <DefaultButton text={'다른 서비스 연동하기'} onClick={() => router.replace(AppSearchPageRoute.pathname)}/>
            </div>
        </>
    )
}

export default NotificationPage