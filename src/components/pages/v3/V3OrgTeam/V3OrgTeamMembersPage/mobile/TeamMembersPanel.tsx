import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMemberItem';
import {AddMemberButton, ButtonTypes} from '../AddMemberButton';
import {isOpenInviteOrgMemberModalAtom} from '../../modals/InviteMemberModal/atom';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {ApprovalStatus} from 'src/models/Membership/types';
import {useTeamMembers} from '^models/TeamMember/hook';

interface TeamMembersPanel {
    maxLength?: number | null;
}

export const TeamMembersPanel = memo((props: TeamMembersPanel) => {
    const {result, search} = useTeamMembers();
    const teamMembers = result.items;
    const length = teamMembers.length;
    const {maxLength} = props;
    const {isShow, setIsShow} = useModal({
        isShowAtom: isOpenInviteOrgMemberModalAtom,
    });
    const currentOrg = useRecoilValue(currentOrgAtom);

    useEffect(() => {
        if (!currentOrg) return;
        search({
            order: {createdAt: 'DESC'},
        });
    }, [isShow]);

    // approvalStatus Approved -> Pending 순으로 보여지도록 구현
    const persistedTeamMembers = teamMembers.filter((m) => m.membership?.approvalStatus === ApprovalStatus.APPROVED);
    const newTeamMembers = teamMembers.filter((m) => m.membership?.approvalStatus !== ApprovalStatus.APPROVED);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="멤버">
                    <AddMemberButton text={length ? '멤버 등록' : '멤버 없음'} type={ButtonTypes.TextBtn} />
                </MobileSection.Heading>

                {length ? (
                    <>
                        {persistedTeamMembers.map((teamMember, i) => (
                            <TeamMemberItem key={i} item={teamMember} />
                        ))}
                        {newTeamMembers.map((teamMember, i) => {
                            if (i > (maxLength ?? result.pagination.itemsPerPage)) return <></>;
                            return <TeamMemberItem key={i} item={teamMember} />;
                        })}
                    </>
                ) : (
                    <ContentEmpty
                        text="등록된 멤버가 없어요"
                        subtext="눌러서 멤버 추가"
                        onClick={() => setIsShow(true)}
                    />
                )}

                <AddMemberButton direction="top" type={ButtonTypes.PlusBtn} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
