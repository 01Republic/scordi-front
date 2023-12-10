import {useRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals';
import {teamMemberListAtom, teamMemberSelectModalAtom} from './atom';
import {TeamMemberDto} from '^models/TeamMember';

export const useTeamMemberSelectModal = () => {
    const {open, close, ...specs} = useModal(teamMemberSelectModalAtom);
    const [list, setList] = useRecoilState(teamMemberListAtom);

    const show = async (teamMembers: TeamMemberDto[]) => {
        setList(teamMembers);
        open();
    };

    const hide = async () => {
        close();
        setList([]);
    };

    return {...specs, show, hide, list};
};
