import {useModal} from '^v3/share/modals/useModal';
import {useRecoilState} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember/type';
import {currentTeamMemberState} from '^models/TeamMember/atom';
import {teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';

export const useTeamMemberShowModalSubject = () => {
    const modal = useModal(teamMemberShowModal);
    const [currentTeamMember, setCurrentTeamMember] = useRecoilState(currentTeamMemberState);

    return {
        currentTeamMember,
        setCurrentTeamMember: (member: TeamMemberDto | null) => {
            setCurrentTeamMember(member);
            member ? modal.open() : modal.close();
        },
    };
};
