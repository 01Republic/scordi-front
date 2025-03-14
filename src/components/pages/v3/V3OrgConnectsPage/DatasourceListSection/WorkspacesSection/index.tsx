import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useToast} from '^hooks/useToast';
import {orgIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {ListContainer} from '^v3/V3OrgConnectsPage/DatasourceListSection/Layouts/ListContainer';
import {ConnectWorkspaceButtonInConnectsPage as ConnectWorkspaceButton} from '^v3/V3OrgConnectsPage/DatasourceListSection/WorkspacesSection/ConnectWorkspaceButton';
import {WorkspaceItem} from '^v3/V3OrgConnectsPage/DatasourceListSection/WorkspacesSection/WorkspaceItem';
import {Inbox} from 'lucide-react';

export const WorkspacesSection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg(orgId);
    const {toast} = useToast();

    const tokenData = currentOrg?.lastGoogleSyncHistory?.googleTokenData;

    const onClick = () => {
        // if already exists
        if (tokenData) return toast.info('최대 1개까지 등록 가능합니다.');
    };

    return (
        <ListContainer
            title="워크스페이스"
            Icon={() => <Inbox size={20} />}
            onClickAddButton={() => onClick()}
            isShowAddButton={false}
            className="border-r"
        >
            {/*워크스페이스 추가 버튼*/}
            {!tokenData && <ConnectWorkspaceButton />}

            {tokenData && <WorkspaceItem tokenData={tokenData} />}
        </ListContainer>
    );
});
