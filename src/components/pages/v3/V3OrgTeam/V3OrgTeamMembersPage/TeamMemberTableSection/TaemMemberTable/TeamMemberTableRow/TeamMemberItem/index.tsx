import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember/type';
import {Avatar} from '^components/Avatar';
import {useModal} from '^v3/share/modals/useModal';
import {useTeamMemberShowModalSubject} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/hooks';
import {teamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/atom';

interface TeamMemberItemProps {
    item: TeamMemberDto;
}

export const TeamMemberItem = memo((props: TeamMemberItemProps) => {
    const {open} = useModal(teamMemberShowModal);
    const {setCurrentTeamMember} = useTeamMemberShowModalSubject();

    const {item: teamMember} = props;
    if (!teamMember) return <></>;

    const {profileImgUrl} = teamMember.makeTeamMemberProfile();

    const onClick = () => {
        open();
        setCurrentTeamMember(teamMember);
    };

    return (
        <div
            className={`flex items-center gap-4 px-3 -mx-3 bg-base-100 text-gray-700  hover:bg-neutral cursor-pointer`}
            onClick={onClick}
        >
            <Avatar src={profileImgUrl} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />

            <div>
                <p className={`font-semibold flex gap-2 items-center`}>
                    <span>{teamMember.name}</span>
                </p>
                <p className="block text-sm font-normal text-gray-400">{teamMember.email}</p>
            </div>
        </div>
    );
});
