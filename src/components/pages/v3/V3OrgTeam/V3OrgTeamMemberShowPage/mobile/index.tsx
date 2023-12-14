import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {orgIdParamState} from '^atoms/common';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {TeamMemberShowBody} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {EditButton} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/EditButton';
import {DeleteButton} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/DeleteButton';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {SelectTeamMemberModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/SelectTeamMemberModal';
import {SelectSubscriptionModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SelectSubscriptionModal';

export const V3OrgTeamMemberShowPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const DeleteButtonWrap = () => (
        <DeleteButton onFinish={() => router.replace(V3OrgTeamMembersPageRoute.path(orgId))} />
    );

    return (
        <V3ModalLikeLayoutMobile
            topRightButtons={[EditButton, DeleteButtonWrap]}
            backBtnOnClick={() => router.push(V3OrgTeamMembersPageRoute.path(orgId))}
            modals={[
                SelectTeamMemberModal,
                AccountListModal,
                SelectSubscriptionModal, // 멤버상세 모달 -> 구독서비스 추가
            ]}
        >
            <MobileSection.List className="h-full !gap-0">
                <TeamMemberShowBody />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
