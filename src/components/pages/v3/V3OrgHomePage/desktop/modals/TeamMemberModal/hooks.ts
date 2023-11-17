import {useModal} from '^v3/share/modals/useModal';
import {subjectMemberAtom, teamMemberModal} from './atom';
import {useRecoilState} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember/type';

export const useTeamMemberModalSubject = () => {
    const modal = useModal(teamMemberModal);
    const [subjectMember, setSubjectMember] = useRecoilState(subjectMemberAtom);

    return {
        subjectMember,
        setSubjectMember: (member: TeamMemberDto | null) => {
            setSubjectMember(member);
            member ? modal.open() : modal.close();
        },
    };
};
