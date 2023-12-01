import {useModal} from '^v3/share/modals/useModal';
import {useRecoilState} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember/type';
import {subjectTeamMemberAtom, teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';

export const useTeamMemberShowModalSubject = () => {
    const modal = useModal(teamMemberShowModal);
    const [subjectMemberShow, setSubjectMemberShow] = useRecoilState(subjectTeamMemberAtom);

    return {
        subjectMemberShow,
        setSubjectMemberShow: (member: TeamMemberDto | null) => {
            setSubjectMemberShow(member);
            member ? modal.open() : modal.close();
        },
    };
};
