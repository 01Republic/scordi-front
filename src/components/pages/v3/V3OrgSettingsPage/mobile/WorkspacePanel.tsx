import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';

export const WorkspacePanel = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">워크스페이스 정보</h1>

                <MobileInfoList>
                    <MobileInfoListItem label="멤버">{`${currentOrg?.users?.length} 명`}</MobileInfoListItem>
                    <MobileInfoListItem label="주소">{`https://scordi.io/v3/orgs/${currentOrg?.id}`}</MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
