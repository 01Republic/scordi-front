import React, {memo} from 'react';
import {SetterOrUpdater, useRecoilValue} from 'recoil';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {orgIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {userSocialGoogleApi} from '^api/social-google.api';
import {googleOAuth} from '^config/environments';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {ApiError} from '^api/api';

interface WorkspaceConnectButtonProps {
    ButtonComponent: () => JSX.Element;
    setIsLoading: SetterOrUpdater<boolean>;
}

// 워크스페이스 연동 (= 로그인) 버튼입니다.
// 기존 구글 로그인 버튼이 아닌 다른 모양의 버튼을
// props로 받아 보여지도록 했습니다.

/** (구) 구독 불러오기 페이지에서 칸반형태의 연결방법들 중 워크스페이스 연결 */
export const WorkspaceConnectButton = memo((props: WorkspaceConnectButtonProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: reloadCurrentOrg} = useCurrentOrg(orgId);
    const {alert} = useAlert();
    const {toast} = useToast();
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;

    const {ButtonComponent, setIsLoading} = props;
    const googleLoginSuccessHandler = (accessToken: string) => {
        setIsLoading(true);

        const req = googleUsageReportApi.draft(accessToken);

        req.then((res) => {
            const reportData = res.data;

            googleUsageReportApi
                .save2({
                    organizationId: orgId,
                    syncedEmail: reportData.rawMetadata.syncedEmail,
                    workspaceName: reportData.workspaceName,
                    items: reportData.items,
                })
                .then(() => {
                    reloadCurrentOrg(); // 현재 조직 reload
                    alert.success({title: '연동이 완료되었습니다.'});
                })
                .catch((err) => toast.error(err.message))
                .finally(() => setIsLoading(false));
        });

        req.catch((e: ApiError) => {
            const apiErrObj = e.response?.data;
            if (apiErrObj?.code === 'Unauthorized') {
                alert.error('회사 대표 계정으로 시도해주세요', '', {
                    html: `
                    ex) official@scordi.io
                    `,
                });
            } else {
                alert.error('관리자 계정 연결이 필요해요', '회사 공식 메일로 워크스페이스를 연동해주세요');
            }

            setIsLoading(false);
        });
    };

    return (
        <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
            <GoogleLoginBtn
                about="admin"
                googleLoginOnSuccessFn={googleLoginSuccessHandler}
                className="!btn-md"
                logoSize="w-4 h-4"
                ButtonComponent={() => ButtonComponent && <ButtonComponent />}
            />
        </GoogleOAuthProvider>
    );
});
