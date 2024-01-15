import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {currentOrgAtom} from '^models/Organization/atom';
import {useToast} from '^hooks/useToast';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {orgIdParamState} from '^atoms/common';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';
import {isDeleteLoadingAtom, isSyncLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';

interface WorkspaceItemProps {
    tool: ToolType;
    logo: JSX.Element;
    button: JSX.Element;
    lastSyncAccount?: GoogleTokenDataDto | undefined;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const setSyncLoading = useSetRecoilState(isSyncLoadingAtom);
    const setDeleteLoading = useSetRecoilState(isDeleteLoadingAtom);
    const setCurrentOrg = useSetRecoilState(currentOrgAtom);
    const {toast} = useToast();
    const {tool, logo, button, lastSyncAccount} = props;

    if (!currentOrg) return <></>;

    const onSync = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        setSyncLoading(true);
        const req = organizationConnectGoogleWorkspaceApi.sync(orgId);
        req.then(() => toast.success('연동이 완료됐습니다.'));
        req.catch((err) => toast.error(err.message));
        req.finally(() => setSyncLoading(false));
    };
    const onDelete = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        setDeleteLoading(true);
        const req = organizationConnectGoogleWorkspaceApi.disconnect(orgId);
        req.then((res) => {
            setCurrentOrg(res.data);
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
                    <MoreDropdown onSync={onSync} onDelete={onDelete} className="self-center" />
                )}
            </div>
        </div>
    );
});
