import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {isDeleteLoadingAtom, isSyncLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';
import {OnboardingSkippedStore, SkippedStoreStatus} from '^v3/share/OnboardingFlow/SkipButton';
import {onboardingModalIsShow} from '^v3/share/OnboardingFlow/atom';
import {useCurrentOrg} from '^models/Organization/hook';
import {useAlert} from '^hooks/useAlert';

interface WorkspaceItemProps {
    tool: ToolType;
    logo: JSX.Element;
    button: JSX.Element;
    lastSyncAccount?: GoogleTokenDataDto | undefined;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const setSyncLoading = useSetRecoilState(isSyncLoadingAtom);
    const setDeleteLoading = useSetRecoilState(isDeleteLoadingAtom);
    const setIsShow = useSetRecoilState(onboardingModalIsShow);
    const {search: loadCurrentOrg, currentOrg} = useCurrentOrg(orgId);
    const {alert} = useAlert();
    const {toast} = useToast();
    const {tool, logo, button, lastSyncAccount} = props;

    if (!currentOrg) return <></>;

    const onSync = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        setSyncLoading(true);
        const req = organizationConnectGoogleWorkspaceApi.sync(orgId);
        req.then(() => {
            loadCurrentOrg();
            toast.success('연동이 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.message));
        req.finally(() => setSyncLoading(false));
    };
    const onDisConnect = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        const req = alert.destroy({
            title: '연동을 해제하시겠습니까?',
            onConfirm: () => organizationConnectGoogleWorkspaceApi.disconnect(orgId),
        });

        setDeleteLoading(true);
        req.then((res) => {
            if (!res) return;

            const store = new OnboardingSkippedStore(SkippedStoreStatus.WorkspaceSkip);
            setIsShow(false);
            store.add(currentOrg.id);

            loadCurrentOrg();
            toast.success('삭제가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.message));
        req.finally(() => setDeleteLoading(false));
    };

    return (
        <div className="flex justify-between px-5 border rounded-2xl mb-2 min-h-[74px] items-center">
            <p className="flex gap-3 self-center font-base">
                {logo} {tool}
            </p>
            <div className="flex gap-3 items-center">
                <div>{button}</div>

                {tool === ToolType.google && (
                    <MoreDropdown onSync={onSync} onDelete={onDisConnect} className="self-center" />
                )}
            </div>
        </div>
    );
});
