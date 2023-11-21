import {memo} from 'react';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {userSocialGoogleApi} from '^api/social-google.api';
import {ReportList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportList';
import {useRecoilState} from 'recoil';
import {reportState} from '../../atom';

export const GoogleAdminLoginButton = memo(function GoogleAdminLoginButton() {
    const googleOauthClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!;
    const [reportData, setReportData] = useRecoilState(reportState);

    const googleLoginSuccessHandler = async (accessToken: string) => {
        // TODO: 관리자 권한 아닐시 return

        return await userSocialGoogleApi.draft(accessToken).then((res) => {
            setReportData(res.data);
        });
    };

    return (
        <>
            <div
                className="tooltip--TastingGoogleButton tooltip tooltip-open tooltip-primary"
                data-tip="구글 워크스페이스 연동이 필요해요!"
            >
                <GoogleOAuthProvider clientId={googleOauthClientId}>
                    <GoogleLoginBtn googleLoginOnSuccess={googleLoginSuccessHandler} />
                </GoogleOAuthProvider>
            </div>
            {reportData && <ReportList reports={reportData} />}
        </>
    );
});
