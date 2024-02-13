import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {HiMiniPlus} from 'react-icons/hi2';
import {userSocialGoogleApi} from '^api/social-google.api';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useCurrentOrg} from '^models/Organization/hook';
import {isWorkspaceConnectLoadingAtom} from '^v3/V30ConnectsPage/atom';

interface GoogleLoginButtonProps {
    isAddWorkspace?: boolean;
}
export const GoogleLoginButton = memo((props: GoogleLoginButtonProps) => {
    const setIsLoading = useSetRecoilState(isWorkspaceConnectLoadingAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: reloadCurrentOrg} = useCurrentOrg(orgId);
    const {alert} = useAlert();
    const {toast} = useToast();

    const {isAddWorkspace} = props;
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;

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

            setIsLoading(false);
        });
    };

    return (
        <>
            {isAddWorkspace && (
                <GoogleLoginBtn
                    about="admin"
                    googleLoginOnSuccessFn={googleLoginSuccessHandler}
                    className="!btn-md"
                    logoSize="w-4 h-4"
                    ButtonComponent={() => <AddButton />}
                />
            )}

            {!isAddWorkspace && <AddButton onClick={() => toast.info('최대 1개까지 등록 가능합니다.')} />}
        </>
    );
});

interface AddButtonProps {
    onClick?: () => any;
}

const AddButton = (props: AddButtonProps) => {
    const {onClick} = props;

    return (
        <button
            onClick={onClick}
            className="btn bg-gray-100 w-full flex justify-start items-center gap-3 border border-gray-300 text-sm text-gray-500 font-normal mb-3"
        >
            <HiMiniPlus size={20} /> Add
        </button>
    );
};
