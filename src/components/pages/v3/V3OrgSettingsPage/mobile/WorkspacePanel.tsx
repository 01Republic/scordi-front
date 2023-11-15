import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/type';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';

export const WorkspacePanel = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    const users = (currentOrg?.users || []).filter((user) => !user.isAdmin);
    const findUserById = (id: number) => users.find((u) => u.id === id)!;
    const memberships = users.flatMap((u) => (u?.memberships || []).find((m) => m.organizationId === currentOrg?.id));
    const masterMembership = memberships.find((m) => m && m.level === MembershipLevel.OWNER);
    const master = masterMembership ? findUserById(masterMembership.userId) : null;
    const invitees = memberships.filter((m) => m && m.approvalStatus === ApprovalStatus.PENDING);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">워크스페이스 정보</h1>

                <MobileInfoList>
                    <MobileInfoListItem label="워크스페이스 이름">{currentOrg?.name}</MobileInfoListItem>
                    <MobileInfoListItem label="워크스페이스 관리자">{master && master.email}</MobileInfoListItem>

                    <MobileInfoListItem label="생성일시">
                        {currentOrg ? yyyy_mm_dd_hh_mm(currentOrg.createdAt) : ''}
                    </MobileInfoListItem>
                    <hr />
                    <MobileInfoListItem label="전체 회원">{`${users.length} 명`}</MobileInfoListItem>
                    <MobileInfoListItem label="초대를 대기중인 회원">{`${invitees.length} 명`}</MobileInfoListItem>
                    {/*<MobileInfoListItem label="주소">{`https://scordi.io/v3/orgs/${currentOrg?.id}`}</MobileInfoListItem>*/}
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
