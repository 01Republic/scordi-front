import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useAlert} from '^hooks/useAlert';
import {userSocialGoogleApi} from '^api/social-google.api';
import {filterBlackList} from './features';
import {ReportLoadingStatus, reportLoadingStatus, reportState} from './atom';

export const GoogleAdminLoginButton = memo(function GoogleAdminLoginButton() {
    const googleOauthClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!;
    const setLoadingStatus = useSetRecoilState(reportLoadingStatus);
    const setReportData = useSetRecoilState(reportState);
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const {alert} = useAlert();

    const googleLoginSuccessHandler = (accessToken: string) => {
        setLoadingStatus(ReportLoadingStatus.Loading);
        const req = googleUsageReportApi.draft(accessToken);

        req.then((res) => {
            if (!res.data) return;
            const filteredReport = filterBlackList(res.data);
            setReportData(filteredReport);
        });

        req.catch((e) => {
            if ((e.response.data.code = 'Unauthorized')) {
                alert.error('회사 대표 계정으로 시도해주세요', '예시 : official@scordi.io');
            }
        });

        req.finally(() => setLoadingStatus(ReportLoadingStatus.Loaded));
    };

    return (
        <div
            className="tooltip--TastingGoogleButton tooltip tooltip-open tooltip-primary"
            data-tip="구글 워크스페이스 연동이 필요해요!"
        >
            <GoogleOAuthProvider clientId={googleOauthClientId}>
                <GoogleLoginBtn googleLoginOnSuccessFn={googleLoginSuccessHandler} />
            </GoogleOAuthProvider>
        </div>
    );
});
