import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/share/ContentEmpty';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMemberItem';
import {AddMemberButton, ButtonTypes} from '../AddMemberButton';
import {isOpenInviteOrgMemberModalAtom} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/atom';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {useRecoilValue} from 'recoil';
import {useTeamMembers} from '^models/TeamMember/hook';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberManager} from '^models/TeamMember';

interface TeamMembersPanel {
    maxLength?: number | null;
}

export const TeamMembersPanel = memo((props: TeamMembersPanel) => {
    const {result, search} = useTeamMembers();
    const teamMembers = result.items;
    const length = teamMembers.length;
    const {isShow, setIsShow} = useModal({
        isShowAtom: isOpenInviteOrgMemberModalAtom,
    });
    const orgId = useRecoilValue(orgIdParamState);
    const {maxLength} = props;

    const teamMemberManager = TeamMemberManager.init(teamMembers);
    const sortedTeamMembers = teamMemberManager.sortByCreatedAtDescending(teamMembers);

    useEffect(() => {
        if (!orgId) return;

        search({
            order: {createdAt: 'DESC'},
        });
    }, [isShow, orgId]);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="멤버">
                    <AddMemberButton text={length ? '멤버 등록' : '멤버 없음'} type={ButtonTypes.TextBtn} />
                </MobileSection.Heading>

                {length ? (
                    <>
                        {sortedTeamMembers.map((teamMember, i) => {
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
