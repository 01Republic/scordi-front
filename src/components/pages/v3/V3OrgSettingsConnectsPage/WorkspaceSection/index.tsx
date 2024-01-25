import React, {memo} from 'react';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {WorkspaceItem} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/WorkspaceItem';
import {SettingBodyPanel} from '^v3/V3OrgSettingsPage/desktop/SettingBodyPanel/SettingBodyPanel';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {FcGoogle} from 'react-icons/fc';
import {BsMicrosoftTeams} from 'react-icons/bs';
import {SiNaver} from 'react-icons/si';
import {GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {ConnectButton} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/ConnectButton';
import {GoogleLoginButton} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleLoginButton';
import {isDeleteLoadingAtom, isSyncLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';
import {LoadingButton} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/LoadingButton';
import {useToast} from '^hooks/useToast';

export const WorkspaceSection = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const isSyncLoading = useRecoilValue(isSyncLoadingAtom);
    const isDeleteLoading = useRecoilValue(isDeleteLoadingAtom);
    const {toast} = useToast();
    const lastSyncAccount = currentOrg?.lastGoogleSyncHistory?.googleTokenData;

    const onSuccess = () => window.location.reload();

    return (
        <SettingBodyPanel title="워크스페이스" className="mb-5">
            {/*구글 워크스페이스*/}
            <WorkspaceItem
                logo={<FcGoogle size={28} />}
                tool={ToolType.google}
                lastSyncAccount={lastSyncAccount}
                button={
                    lastSyncAccount ? (
                        isSyncLoading || isDeleteLoading ? (
                            <LoadingButton text={isSyncLoading ? '동기화 중' : '연동 해제 중'} />
                        ) : (
                            <GoogleProfile lastSyncAccount={lastSyncAccount} />
                        )
                    ) : (
                        <GoogleLoginButton onSuccess={onSuccess} />
                    )
                }
            />

            {/*마이크로소프트 Teams*/}
            <WorkspaceItem
                tool={ToolType.microsoft}
                logo={<BsMicrosoftTeams size={26} className="text-indigo-500" />}
                button={<ConnectButton onClick={() => toast.info('준비중입니다')} />}
            />

            {/*네이버 Works*/}
            <WorkspaceItem
                tool={ToolType.naver}
                logo={<SiNaver size={22} className="text-green-500" />}
                button={<ConnectButton onClick={() => toast.info('준비중입니다')} />}
            />
        </SettingBodyPanel>
    );
});
