import React, {memo} from 'react';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {WorkspaceItem} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/WorkspaceItem';

export const WorkspaceSection = memo(() => {
    return (
        <>
            {/*구글 워크스페이스*/}
            <WorkspaceItem tool={ToolType.google} />

            {/*마이크로소프트 Teams*/}
            <WorkspaceItem tool={ToolType.microsoft} />

            {/*네이버 Works*/}
            <WorkspaceItem tool={ToolType.naver} />
        </>
    );
});
