import React, {memo} from 'react';
import {ListItem} from '^v3/V30ConnectsPage/DatasourceListSection/Layouts/ListItem';
import {GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {isWorkspaceDisConnectLoadingAtom, isWorkspaceSyncLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {OnboardingSkippedStore, SkippedStoreStatus} from '^v3/share/OnboardingFlow/SkipButton';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';
import {useCurrentOrg} from '^models/Organization/hook';
import {useAlert} from '^hooks/useAlert';
import {onboardingModalIsShow} from '^v3/share/OnboardingFlow/atom';

interface WorkspaceItemProps {
    lastSyncAccount: GoogleTokenDataDto;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isSyncLoading, setSyncLoading] = useRecoilState(isWorkspaceSyncLoadingAtom);
    const [isDisConnectLoading, setDisConnectLoading] = useRecoilState(isWorkspaceDisConnectLoadingAtom);
    const {reload: reloadCurrentOrg, currentOrg} = useCurrentOrg(orgId);
    const setIsShow = useSetRecoilState(onboardingModalIsShow);

    const {toast} = useToast();
    const {alert} = useAlert();
    const {lastSyncAccount} = props;

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
            currentOrg && store.add(currentOrg.id);

            reloadCurrentOrg();
            toast.success('삭제가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setDisConnectLoading(false));
    };

    return (
        <ListItem>
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
        </ListItem>
    );
});
