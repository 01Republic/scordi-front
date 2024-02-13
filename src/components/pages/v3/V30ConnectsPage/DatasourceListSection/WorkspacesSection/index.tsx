import React, {memo} from 'react';
import {HiOutlineInbox} from 'react-icons/hi2';
import {ListContainer} from '^v3/V30ConnectsPage/DatasourceListSection/Layouts/ListContainer';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {useToast} from '^hooks/useToast';
import {GoogleLoginButton} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleLoginButton';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {OnboardingSkippedStore, SkippedStoreStatus} from '^v3/share/OnboardingFlow/SkipButton';
import {orgIdParamState} from '^atoms/common';
import {isWorkspaceDisConnectLoadingAtom, isWorkspaceSyncLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';
import {useCurrentOrg} from '^models/Organization/hook';
import {useAlert} from '^hooks/useAlert';
import {onboardingModalIsShow} from '^v3/share/OnboardingFlow/atom';

export const WorkspacesSection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isSyncLoading, setSyncLoading] = useRecoilState(isWorkspaceSyncLoadingAtom);
    const [isDisConnectLoading, setDisConnectLoading] = useRecoilState(isWorkspaceDisConnectLoadingAtom);
    const {reload: reloadCurrentOrg, currentOrg} = useCurrentOrg(orgId);
    const setIsShow = useSetRecoilState(onboardingModalIsShow);
    const {toast} = useToast();
    const {alert} = useAlert();

    const lastSyncAccount = currentOrg?.lastGoogleSyncHistory?.googleTokenData;

    const onClick = () => {
        if (lastSyncAccount) return toast.info('최대 1개까지 등록 가능합니다.');
    };

    const onSync = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        setSyncLoading(true);
        const req = organizationConnectGoogleWorkspaceApi.sync(orgId);
        req.then(() => {
            reloadCurrentOrg();
            toast.success('동기화가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setSyncLoading(false));
    };
    const onDisConnect = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        const req = alert.destroy({
            title: '연동을 해제하시겠습니까?',
            onConfirm: () => organizationConnectGoogleWorkspaceApi.disconnect(orgId),
        });

        setDisConnectLoading(true);
        req.then((res) => {
            if (!res) return;

            const store = new OnboardingSkippedStore(SkippedStoreStatus.WorkspaceSkip);
            setIsShow(false);
            store.add(currentOrg.id);

            reloadCurrentOrg();
            toast.success('삭제가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setDisConnectLoading(false));
    };

    return (
        <ListContainer
            title="Workspace"
            listCount={1}
            Icon={() => <HiOutlineInbox size={20} />}
            onClickAddButton={() => onClick()}
            isShowAddButton={false}
            className="border-r"
        >
            <GoogleLoginButton isAddWorkspace={!lastSyncAccount || false} />

            {lastSyncAccount && (
                <li className="flex justify-between items-center border rounded-box p-3">
                    <GoogleProfile lastSyncAccount={lastSyncAccount} />
                    {lastSyncAccount && (
                        <MoreDropdown
                            onSync={onSync}
                            onDelete={onDisConnect}
                            isSyncLoading={isSyncLoading}
                            isDisConnectLoading={isDisConnectLoading}
                            className="self-center"
                        />
                    )}
                </li>
            )}
        </ListContainer>
    );
});
