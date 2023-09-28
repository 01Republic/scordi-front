import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMemberItem';
import {useModal} from '^v3/share/modals/useModal';
import {isOpenNewTeamMemberModalAtom} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/NewTeamMemberModal/atom';
import {useTeamMembers} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';

interface TeamMembersPanel {
    maxLength?: number | null;
}

export const TeamMembersPanel = memo((props: TeamMembersPanel) => {
    const {isShow, setIsShow} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const {result} = useTeamMembers();
    const teamMembers = result.items;
    const length = teamMembers.length;
    const {maxLength} = props;

    const onAddButtonClick = () => setIsShow(true);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="멤버">
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer" onClick={onAddButtonClick}>
                            {length ? '멤버 추가' : '멤버 없음'}
                        </div>
                    </div>
                </MobileSection.Heading>

                {length ? (
                    <>
                        {teamMembers.map((teamMember, i) => {
                            if (i > (maxLength ?? result.pagination.itemsPerPage)) return <></>;
                            return <TeamMemberItem key={i} item={teamMember} />;
                        })}
                    </>
                ) : (
                    <ContentEmpty text="등록된 멤버가 없어요" subtext="눌러서 멤버 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
