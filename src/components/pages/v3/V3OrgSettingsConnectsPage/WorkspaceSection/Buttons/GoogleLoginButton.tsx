import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {gmailItemsLoadedAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {userSocialGoogleApi} from '^api/social-google.api';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';

export const GoogleLoginButton = memo(() => {
    const setIsLoaded = useSetRecoilState(gmailItemsLoadedAtom);
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();

    const googleLoginSuccessHandler = (accessToken: string) => {
        setIsLoaded(true);

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
                .then(() => alert.success({title: '연동이 완료되었습니다.'}))
                .finally(() => setIsLoaded(false));
        });

        req.catch((e) => {
            if ((e.response.data.code = 'Unauthorized')) {
                alert.error('회사 대표 계정으로 시도해주세요', '', {
                    html: `
                    ex) official@scordi.io
                    `,
                });
            } else {
                alert.error('관리자 계정 연결이 필요해요', '회사 공식 메일로 워크스페이스를 연동해주세요');
            }

            setIsLoaded(false);
        });
    };

    return (
        <GoogleLoginBtn
            about="admin"
            googleLoginOnSuccessFn={googleLoginSuccessHandler}
            className="!btn-md"
            logoSize="w-4 h-4"
        />
    );
});
