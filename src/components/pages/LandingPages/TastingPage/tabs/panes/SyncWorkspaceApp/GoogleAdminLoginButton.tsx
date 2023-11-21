import {memo} from 'react';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {userSocialGoogleApi} from '^api/social-google.api';
import {useSetRecoilState} from 'recoil';
import {reportState} from '../../atom';
import {ReportDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report.dto';
import {useAlert} from '^hooks/useAlert';

export const GoogleAdminLoginButton = memo(function GoogleAdminLoginButton() {
    const googleOauthClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!;
    const setReportData = useSetRecoilState(reportState);
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const {alert} = useAlert();

    const lowBlackList = blackList.map((item) => {
        return item.toLowerCase();
    });

    const filterBlackList = (reportList: ReportDto) => {
        if (!reportList) return;

        reportList.items.forEach((item) => {
            const apps = item.apps;

            item.apps = apps.filter((app) => {
                const appName = app.appName.toLowerCase();
                return !lowBlackList.includes(appName);
            });
        });

        setReportData(reportList);

        return reportList;
    };

    const googleLoginSuccessHandler = async (accessToken: string) => {
        return await googleUsageReportApi
            .draft(accessToken)
            .then((res) => {
                filterBlackList(res.data);
            })
            .catch((e) => {
                if ((e.response.data.code = 'Unauthorized')) {
                    alert.error('회사 대표 계정으로 시도해주세요', '예시 : official@scordi.io');
                }
            });
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

const blackList = [
    'Scordi with admin api',
    'Google Chrome',
    'Scordi Dev',
    'Scordi-google-admin-test',
    'WOOWACON 2023',
    'iOS',
    'My Files',
    'iOS Account Manager',
    'Google Drive for desktop',
    'macOS',
    'Android device',
    'SAMSUNG Account',
    'Google APIs Explorer',
];
