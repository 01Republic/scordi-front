import React, {memo} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {GoogleTokenDataResponseDto} from '^models/GoogleTokenData/type';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {isWorkspaceDisConnectLoadingAtom, isWorkspaceSyncLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';
import {OnboardingSkippedStore, SkippedStoreStatus} from '^v3/share/OnboardingFlow/SkipButton';
import {onboardingModalIsShow} from '^v3/share/OnboardingFlow/atom';
import {useCurrentOrg} from '^models/Organization/hook';
import {useAlert} from '^hooks/useAlert';

interface WorkspaceItemProps {
    tool: ToolType;
    logo: JSX.Element;
    button: JSX.Element;
    tokenData?: GoogleTokenDataResponseDto | undefined;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isSyncLoading, setSyncLoading] = useRecoilState(isWorkspaceSyncLoadingAtom);
    const [isDisConnectLoading, setDisConnectLoading] = useRecoilState(isWorkspaceDisConnectLoadingAtom);
    const setIsShow = useSetRecoilState(onboardingModalIsShow);
    const {reload: reloadCurrentOrg, currentOrg} = useCurrentOrg(orgId);
    const {alert} = useAlert();
    const {toast} = useToast();
    const {tool, logo, button, tokenData} = props;

    if (!currentOrg) return <></>;

    const onSync = () => {
        if (!orgId) return;
        if (!tokenData) return toast.error('연동된 계정이 없습니다.');

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
        if (!tokenData) return toast.error('연동된 계정이 없습니다.');

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
        <div className="flex justify-between px-5 border rounded-2xl mb-2 min-h-[74px] items-center">
            <p className="flex gap-3 self-center font-base">
                {logo} {tool}
            </p>
            <div className="flex gap-3 items-center">
                <div>{button}</div>
                {tokenData && (
                    <MoreDropdown
                        onSync={onSync}
                        onDelete={onDisConnect}
                        isSyncLoading={isSyncLoading}
                        isDisConnectLoading={isDisConnectLoading}
                        className="self-center"
                    />
                )}
            </div>
        </div>
    );
});
