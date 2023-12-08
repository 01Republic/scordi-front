import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FcGoogle} from 'react-icons/fc';
import {SiNaver} from 'react-icons/si';
import {BsMicrosoftTeams} from 'react-icons/bs';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {currentOrgAtom} from '^models/Organization/atom';
import {userSocialGoogleApi} from '^api/social-google.api';
import {useAlert} from '^hooks/useAlert';
import {orgIdParamState} from '^atoms/common';
import {ConnectButton, GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/WorkspaceItem/Buttons';
import {gmailItemsLoadedAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';

interface WorkspaceItemProps {
    tool: ToolType;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const setIsLoaded = useSetRecoilState(gmailItemsLoadedAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();

    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const {tool} = props;

    if (!currentOrg) return <></>;

    const lastSyncAccount = currentOrg?.lastGoogleSyncHistory?.googleTokenData;

    const getLogo = (tool: ToolType) => {
        switch (tool) {
            case ToolType.google:
                return <FcGoogle size={28} />;
            case ToolType.microsoft:
                return <BsMicrosoftTeams size={26} className="text-indigo-500" />;
            case ToolType.naver:
                return <SiNaver size={22} className="text-green-500" />;
        }
    };

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
        <div className="flex justify-between px-5 border rounded-2xl mb-2 min-h-[74px] items-center">
            <p className="flex gap-3 self-center font-base">
                {getLogo(tool)} {tool}
            </p>

            {/*워크스페이스 연동된 상태*/}
            {tool === ToolType.google && currentOrg && <GoogleProfile lastSyncAccount={lastSyncAccount} />}

            {/*워크스페이스 연동 되지 않은 상태*/}
            {tool === ToolType.google && !currentOrg && (
                <GoogleLoginBtn
                    about="admin"
                    googleLoginOnSuccessFn={googleLoginSuccessHandler}
                    className="!btn-md"
                    logoSize="w-4 h-4"
                />
            )}

            {/*구글 외 연동하기 버튼*/}
            {tool !== ToolType.google && <ConnectButton />}
        </div>
    );
});
