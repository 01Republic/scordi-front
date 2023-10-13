import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMemberItem';
import {useTeamMembers} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';
import {AddMemberButton} from '../AddMemberButton';

interface TeamMembersPanel {
    maxLength?: number | null;
}

export const TeamMembersPanel = memo((props: TeamMembersPanel) => {
    const {result} = useTeamMembers();
    const teamMembers = result.items;
    const length = teamMembers.length;
    const {maxLength} = props;

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="멤버">
                    <AddMemberButton textButton={length ? '멤버 추가' : '멤버 없음'} />
                </MobileSection.Heading>

                {length ? (
                    <>
                        {teamMembers.map((teamMember, i) => {
                            if (i > (maxLength ?? result.pagination.itemsPerPage)) return <></>;
                            return <TeamMemberItem key={i} item={teamMember} />;
                        })}
                    </>
                ) : (
                    <ContentEmpty
                        text="등록된 멤버가 없어요"
                        subtext="눌러서 멤버 추가"
                        // onClick={inviteOrgMemberModalShow}
                    />
                )}

                <AddMemberButton direction="top" />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
