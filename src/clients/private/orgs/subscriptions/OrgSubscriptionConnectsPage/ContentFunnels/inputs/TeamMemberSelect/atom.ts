import {atom} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember';

export const selectedTeamMembersAtom = atom<TeamMemberDto[]>({
    key: 'selectedTeamMembersAtom',
    default: [],
});
