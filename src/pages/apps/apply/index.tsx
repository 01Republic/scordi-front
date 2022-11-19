import { useRouter } from "next/router";
import {DefaultButton} from "^components/Button";
import {AppSearchPageRoute} from "^pages/apps/search";

export const ApplyPageRoute = {
    pathname: '/apps/apply',
    path: () => ApplyPageRoute.pathname,
}

const ApplyPage = () => {
    const router = useRouter();

    return (
        <div className={'px-[20px] py-[140px]'}>
            <div className={'text-center space-y-8 mb-20'}>
                <h2>알림신청완료!</h2>
                <p>
                    작업이 완료되면 바로 알려드릴게요!<br/>
                    조금만 기다려주세요.
                </p>
            </div>
            <DefaultButton text={'다른 서비스 연동하기'} onClick={() => router.push(AppSearchPageRoute.pathname)}/>
        </div>
    )
}

export default ApplyPage